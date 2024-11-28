export async function getFileTypeFromS3Url(s3Url, res) {
  const response = res || (await fetch(s3Url))
  const blob = await response.blob()

  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      const arr = new Uint8Array(reader.result).subarray(0, 4)
      let header = ''
      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16)
      }

      let fileType = ''
      switch (header) {
        case '89504e47':
          fileType = 'image/png'
          break
        case '47494638':
          fileType = 'image/gif'
          break
        case 'ffd8ffe0':
        case 'ffd8ffe1':
        case 'ffd8ffe2':
          fileType = 'image/jpeg'
          break
        default:
          fileType = 'application/octet-stream'
          break
      }

      resolve(fileType)
    }

    reader.onerror = () => {
      reject('Error reading file.')
    }

    reader.readAsArrayBuffer(blob)
  })
}
