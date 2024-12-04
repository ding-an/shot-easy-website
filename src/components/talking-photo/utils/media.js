// 判断是否是H5
export function isMobile() {
  try {
    ;/Mobi|Android|iPhone/i.test(navigator.userAgent) || document.createEvent('TouchEvent')
    return true
  } catch (e) {
    return false
  }
}

export async function getVideoDuration(url) {
  return new Promise((resolve, reject) => {
    // 创建一个 video 元素
    const video = document.createElement('video')
    // 一旦接收到元数据(metadata),就可以访问视频的时长
    video.onloadedmetadata = function () {
      // 将视频的时长解析为一个数值并返回
      resolve(video.duration)
    }
    // 处理错误
    video.onerror = function () {
      reject('Error loading video file.')
    }
    // 设置源文件 URL
    video.src = url
    // 加载视频
    video.load()
  })
}

export async function getAudioDuration(url) {
  return new Promise((resolve, reject) => {
    // 创建一个 video 元素
    const audio = document.createElement('audio')
    // 一旦接收到元数据(metadata),就可以访问视频的时长
    audio.onloadedmetadata = async function () {
      // audioDuration 为 Infinity 时，需要循环获取时长
      let audioDuration = audio.duration
      while (audioDuration === Infinity) {
        await new Promise((resolve) => setTimeout(resolve, 200))
        audio.currentTime = 10000000000 * Math.random()
        audioDuration = audio.duration
      }
      // 将时长解析为一个数值并返回
      resolve(Math.floor(audio.duration))
    }
    // 处理错误
    audio.onerror = function () {
      reject('Error loading file.')
    }
    // 设置源文件 URL
    audio.src = url
    // 加载
    audio.load()
  })
}

export async function getVideo(url) {
  return new Promise((resolve, reject) => {
    // 创建一个 video 元素
    const video = document.createElement('video')
    // 一旦接收到元数据(metadata),就可以访问视频的时长
    video.onloadedmetadata = function () {
      // 将视频的时长解析为一个数值并返回
      resolve(video)
    }
    // 处理错误
    video.onerror = function () {
      const img = document.createElement('img')
      img.onload = function () {
        resolve(img)
      }
      img.onerror = function () {
        reject('Error loading file.')
      }
      img.src = url
      img.crossOrigin = 'anonymous'
    }
    // 设置源文件 URL
    video.src = url
    // 加载视频
    video.load()
  })
}

// 上传限制
export const UPLOAD = {
  MAX_IMAGE_WIDTH: 1280, //为了满足ios最大canvas像素限制
  MAX_IMAGE_HEIGHT: 1280,
  MAX_IMAGE_WIDTH_PC: 2048,
  MAX_IMAGE_HEIGHT_PC: 2048,
  MAX_VIDEO_WIDTH: 1920,
  MAX_VIDEO_HEIGHT: 1920,
  MIN_VIDEO_WIDTH: 160,
  MIN_VIDEO_HEIGHT: 160,
  MAX_DURATION_BETA: 10,
  MAX_IMAGE_SIZE: 10 * 1024 * 1024,
  BACK_MAX_SIZE: 4 * 1024 * 1024,
  MAX_GIF_SIZE: 15 * 1024 * 1024,
  MAX_VIDEO_SIZE_BETA: 500,
  ALLOWED_EXTS: ['avi', 'mov', 'mp4', 'jpg', 'jpeg', 'png', 'gif'],
  ALLOWED_VIDEO_TYPES: ['x-msvideo', 'quicktime', 'mp4', 'mov']
}

// 预览获取文件信息时校验:主要为视频
export function validatePreviewFile({
  duration,
  naturalWidth,
  naturalHeight,
  videoWidth,
  videoHeight
}) {
  if (duration) {
    const maxDuration = UPLOAD.MAX_DURATION_BETA * 60
    if (Math.floor(duration) > maxDuration) {
      return `The video cannot exceed ${maxDuration} seconds`
    }

    /**
     * 编码格式不支持，无法预览，直接放过
     */
    if (videoHeight === 0 && videoWidth === 0) {
      return
    }

    if (
      videoHeight > UPLOAD.MAX_VIDEO_HEIGHT ||
      videoWidth > UPLOAD.MAX_VIDEO_WIDTH ||
      videoHeight < UPLOAD.MIN_VIDEO_HEIGHT ||
      videoWidth < UPLOAD.MIN_VIDEO_WIDTH
    ) {
      return `The resolution must be within the range of ${UPLOAD.MIN_VIDEO_WIDTH}*${UPLOAD.MIN_VIDEO_HEIGHT} to ${UPLOAD.MAX_VIDEO_WIDTH}*${UPLOAD.MAX_VIDEO_HEIGHT}`
    }
  } else {
    // 此宽高为媒体渲染的宽高 改为1920
    if (
      naturalWidth > UPLOAD.MAX_VIDEO_WIDTH ||
      naturalHeight > UPLOAD.MAX_VIDEO_HEIGHT ||
      naturalWidth < UPLOAD.MIN_VIDEO_WIDTH ||
      naturalHeight < UPLOAD.MIN_VIDEO_HEIGHT
    ) {
      // 跟视频一样的限制
      return `The resolution must be within the range of ${UPLOAD.MIN_VIDEO_WIDTH}*${UPLOAD.MIN_VIDEO_HEIGHT} to ${UPLOAD.MAX_VIDEO_WIDTH}*${UPLOAD.MAX_VIDEO_HEIGHT}`
    }
  }
}

export async function tryCatch(asyncFn) {
  let data, error
  const isFunc = typeof asyncFn === 'function'
  try {
    data = isFunc ? await asyncFn() : await asyncFn
  } catch (err) {
    console.error(err)
    error = err
  }

  return {
    data,
    error
  }
}

export function getExtentison(filename) {
  let ext = filename?.split('.').pop()
  if (ext) {
    if (ext === 'apng') ext = 'gif'
    return ext.toLowerCase()
  }
}
