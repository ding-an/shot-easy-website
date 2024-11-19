
export const redirectTo = (url) => {
 window.location.href = url
}


// 获取 window.location.pathname 和 window.location.search
export function getWindowLocation() {
  return new Promise((resolve) => {
resolve({ pathname: window.location.pathname, search: window.location.search })
  });
}
