export function loadScript(src: string, asyncScript = true) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.async = asyncScript
    script.onload = () => {
      resolve(true)
    }
    script.onerror = (e) => {
      reject(e)
    }
    document.head.appendChild(script)
  })
}
