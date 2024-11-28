/**
 * 上传图片之前对图片进行预处理：裁剪、压缩
 */
export function preprocessImage(file, maxWidth, maxHeight, downsamplingRatio, usePNG = false) {
  return new Promise<Blob>((resolve, reject) => {
    let loadImage
    Promise.all([
      import('blueimp-load-image/js/load-image'),
      import('blueimp-load-image/js/load-image-iptc-map'),
      import('blueimp-load-image/js/load-image-exif-map'),
      import('blueimp-load-image/js/load-image-orientation')
    ])
      .then((ret) => {
        const [mod] = ret
        const opts = {
          maxWidth,
          maxHeight,
          canvas: true,
          // 设置成 window.devicePixelRatio 后像素可能超过 1280
          pixelRatio: 1,
          downsamplingRatio,
          orientation: true,
          imageSmoothingEnabled: true,
          meta: true
        }
        // image: img
        // imageHead:
        // ArrayBuffer(3244)
        // originalHeight: 1080
        // originalWidth: 1920
        loadImage = mod.default
        return loadImage(file, opts)
      })
      .then((data) => {
        console.debug(data.image.width, data.image.height)
        if (data.imageHead) {
          if (data.exif) {
            console.debug(`EXIF=${data.exif[0x0112]}`)
            // Reset Exif Orientation data:
            loadImage.writeExifData(data.imageHead, data, 'Orientation', 1)
          }
        } else {
          console.debug('No image head')
        }
        data.image.toBlob(
          function (blob) {
            if (!blob) {
              reject(new Error(`Empty file`))
              return
            }

            if (data.imageHead && data.exif) {
              loadImage.replaceHead(blob, data.imageHead, function (newBlob) {
                resolve(newBlob)
              })
            } else {
              resolve(blob)
            }
          },
          usePNG && file.type === 'image/png' ? 'image/png' : 'image/jpeg'
        )
      })
      .catch((e) => reject(e))
  })
}

/*生成随机字符串*/
export function randomStr(length) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
  return result
}
