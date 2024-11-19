export function downloadImage(url, filename) {
  const link = document.createElement('a')
  link.href = url
  link.download = filename || randomStr(8)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/*生成随机字符串*/
export function randomStr(length) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
  return result
}