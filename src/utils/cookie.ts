function get(key: string, cookie = ""): string {
  const reg = new RegExp(key + "=([^;]*)");
  if (typeof document !== "undefined" && !cookie) {
    cookie = document.cookie;
  }
  try {
    return cookie.match(reg)?.[1] ?? "";
  } catch (e) {
    return "";
  }
}

function set(key: string, value: string, expires?: number): void {
  let exp = "";
  if (expires) {
    exp = new Date(new Date().getTime() + expires).toUTCString();
  } else {
    exp = "Session";
  }
  document.cookie = key + "=" + value + ";path=/; expires=" + exp;
}

function del(key: string): void {
  const expires = new Date();
  expires.setTime(expires.getTime() - 1000);
  document.cookie = key + "=xxx;path=/;expires=" + expires.toUTCString();
}

const cookie = {
  set,
  get,
  del,
};

export default cookie;
