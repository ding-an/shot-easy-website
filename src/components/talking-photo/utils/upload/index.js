import kebabCase from 'lodash.kebabcase'

import { UPLOAD } from '../../controller/enums'

import { post } from "@utils/request";
import { isMobile } from '../../utils/media'
import { preprocessImage, randomStr } from './preprocess'

/**
 * 上传图片预处理逻辑
 **/
export default async function handleUpload(imgFile, fileType, otherOptions) {
  const {
    isCompress = false,
    isH5 = isMobile(),
    maxSize = UPLOAD.BACK_MAX_SIZE,
    asPNG = false,
    maxWidthHeight
  } = otherOptions || {}
  let file = imgFile
  let ratio = 0.5
  // 最小分辨率限制
  if (16 * 16 > file.size) {
    throw new Error('Resolution needs to be greater than 16x16 !')
  }
  const { maxWidth = UPLOAD.MAX_IMAGE_WIDTH_PC, maxHeight = UPLOAD.MAX_IMAGE_HEIGHT_PC } =
    maxWidthHeight || {}

  // 控制缩放像素
  const maxResolution = isH5
    ? UPLOAD.MAX_IMAGE_WIDTH * UPLOAD.MAX_IMAGE_HEIGHT
    : UPLOAD.MAX_IMAGE_WIDTH_PC * UPLOAD.MAX_IMAGE_HEIGHT_PC //区分H5及Pc端分辨率限制
  // 计算缩放比例
  if (file.size > maxResolution) {
    ratio = +(maxResolution / file.size + 0.01).toFixed(2) //+0.01是为了向上取整保证压缩后小于目标像素
  }

  // 1. 压缩图片
  if (isCompress) {
    const blobFile = await preprocessImage(imgFile, maxWidth, maxHeight, ratio, asPNG)
    // 转回文件类型
    file = new File([blobFile], randomStr(8), { type: blobFile.type })
  }
  // 压缩后再判断大小，防止高分辨率图片不通过, 上传大小为字节,后台限制为4M
  if (file.size > maxSize) {
    console.log('The file cannot exceed 4 MB!', file)
    throw new Error('The file cannot exceed 4 MB!')
  }

  // 此处获取的extension必须与压缩后的文件类型一致
  const type = file.type.split('/')[1]

  // 2. 获取S3上传签名，并上传到s3
  const params = {
    file: file,
    fileType: fileType,
    extension: type
  }
  const fileId = await uploadToS3(params)

  return { fileId, file }
}

async function uploadToS3(params) {
  const { file, fileType, extension } = params
  const { data, success, errorMsg } = await post('/users/me/signatures/-/files', {
    fileType,
    fileSize: file.size,
    extension
  })
  if (!success) {
    throw new Error(errorMsg)
  }

  // aws 不能多传参数， expire 不要传
  const { url, expire,fileId, ...uploadParams } = data.sign
  // FormData 浏览器自动设置
  // aws 没有返回任何内容
  await post(url, getFormData(uploadParams, file, file.type))

  return fileId
}

function getFormData(data, file, contentType) {
  const { policy, ...rest } = data
  const fd = new FormData()
  if (contentType) {
    fd.append('content-type', contentType)
  }
  fd.append('Policy', policy)
  for (const field in rest) {
    fd.append(kebabCase(field).replace('xamz', 'x-amz'), rest[field])
  }
  // 要放到最后
  fd.append('file', file)
  return fd
}

async function uploadFace(imgFile, fileType) {
  // 1. 压缩图片
  const blobFile = await preprocessImage(
    imgFile,
    UPLOAD.MAX_IMAGE_WIDTH,
    UPLOAD.MAX_IMAGE_HEIGHT,
    0.5
  )
  // 转回文件类型
  const file = new File([blobFile], randomStr(8), { type: blobFile.type })
  const type = file.type.split('/')[1]

  // 2. 获取S3上传签名，并上传到s3
  const params = {
    file: file,
    fileType: fileType,
    extension: type
  }
  const fileId = await uploadToS3(params)

  // 3. 人脸检测
  const face = await userFaceDetection(fileId)

  return face
}

// 文件人脸检测
async function userFaceDetection(fileId) {
  const json = await post(`/v1/users/me/files/${fileId}/face-detections`)
  return json
}

export { preprocessImage, randomStr, uploadFace }
