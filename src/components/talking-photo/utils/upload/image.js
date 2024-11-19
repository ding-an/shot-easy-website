import pako from 'pako'

// 取反设为透明,获取去除背景的预览图
function toImageDataAlpha(input, origin, width, height) {
  if (width * height !== input.length) {
    console.log(
      `Conflict detected: width(${width}) *  height(${height}) != input length(${input.length})`
    )
  }
  /**
   * a 这里填 0-255的值，注意这里是 Uint8Array -_-
   */
  const originArr = origin.data
  const arr = new Uint8ClampedArray(4 * width * height).fill(0)
  for (let i = 0; i < input.length; i++) {
    if (input[i] > 0.0) {
      arr[4 * i + 0] = originArr[4 * i + 0]
      arr[4 * i + 1] = originArr[4 * i + 1]
      arr[4 * i + 2] = originArr[4 * i + 2]
      arr[4 * i + 3] = originArr[4 * i + 3]
    } else {
      arr[4 * i + 0] = 0
      arr[4 * i + 1] = 0
      arr[4 * i + 2] = 0
      arr[4 * i + 3] = 0
    }
  }
  return new ImageData(arr, width, height)
}

function imageDataToCanvas(imageData) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = imageData.width
  canvas.height = imageData.height
  ctx?.putImageData(imageData, 0, 0)
  return canvas
}
// 扩充为8位
function unit8ToArr(uint8Arr) {
  const byteArray = []
  for (let i = 0; i < uint8Arr.length; i += 1) {
    // 将每位数字转换为8位
    const binaryStr = uint8Arr[i].toString(2).padStart(8, '0').split('')
    byteArray.push(...binaryStr)
  }
  return byteArray
}

interface IGetImageDimensions {
  width: number
  height: number
  imageData: ImageData
}
// 获取图片宽高
export const getImageDimensions: (file: File | string) => Promise<IGetImageDimensions> = (file) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const { width, height } = img
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      resolve({ width, height, imageData })
    }
    img.src = typeof file === 'string' ? file : URL.createObjectURL(file)
  })
}

//生成maskUrl
export const handleMaskUrl = async ({ maskUrl, imageData, width, height }) => {
  try {
    const res = await fetch(maskUrl, { cache: 'no-store' })
    const maskUint8 = await res.arrayBuffer()
    const result = pako.inflate(new Uint8Array(maskUint8))
    const input = unit8ToArr(result)
    const scale = 1
    const imgData = toImageDataAlpha(
      input,
      imageData,
      Math.round(width * scale),
      Math.round(height * scale)
    )
    const canvas = imageDataToCanvas(imgData)
    const url = canvas.toDataURL('image/png')
    return url
  } catch (err) {
    console.log(err.message)
  }
}
