import { useMemoizedFn } from 'ahooks'
import kebabCase from 'lodash.kebabcase'

import { FILE_TYPE } from './controller/enums'
import { post } from "@utils/request"
import { getAudioDuration, getExtentison } from './utils/media'

import { postFilesSignatures } from './controller'

export default function useMultipartUpload(fileType) {
  const uploadToS3 = useMemoizedFn(async (params, file) => {
    const { data, success, errorMsg } = await postFilesSignatures(params)
    if (!success) {
      return Promise.reject(new Error(errorMsg))
    }
    // aws 不能多传参数， expire 不要传
    const { url, expire, fileId, ...uploadParams } = data
    // FormData 浏览器自动设置
    // aws 没有返回任何内容
    function getFormData(data, file, contentType) {
      const { policy, ...rest } = data
      const fd = new FormData()
      if (contentType) {
        fd.append('content-type', contentType === 'audio/x-m4a' ? 'audio/mp4' : contentType)
      }
      fd.append('Policy', policy)
      for (const field in rest) {
        fd.append(kebabCase(field).replace('xamz', 'x-amz'), rest[field])
      }
      // 要放到最后
      fd.append('file', file)
      return fd
    }
    await post(url, getFormData(uploadParams, file, file.type))

    return data
  })

  const handleUpload = useMemoizedFn(async (file) => {
    if (!file) return

    const extension = getExtentison(file?.name)
    const params = {
      fileSize: file.size,
      fileType: fileType || FILE_TYPE.TALKING_PHOTO,
      extension
    }
    if (file?.type.includes('audio') || file?.type.includes('video')) {
      const duration = await getAudioDuration(URL.createObjectURL(file))
      if (duration && duration !== Infinity && duration !== -Infinity) {
        params.parameters = window.btoa(
          JSON.stringify({
            duration: Math.floor(duration) || 1
          })
        )
      }
    }
    return await uploadToS3(params, file)
  })

  return { handleUpload }
}
