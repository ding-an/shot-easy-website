/**
 * loacalStore存取函数
 */
class Cache {
  storage = null
  constructor(isLocal = true) {
    if (typeof window !== 'undefined') {
      this.storage = isLocal ? localStorage : sessionStorage
    }
  }
  setCache(key, value) {
    if (value === undefined || value === null) {
      throw new Error('value error: value not is null!')
    }

    if ((value !== undefined || value !== null) && typeof window !== 'undefined') {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }
  getCache(key) {
    if (typeof window !== 'undefined') {
      const result = this.storage.getItem(key)
      if (result) {
        return JSON.parse(result)
      }
    }
  }
  removeCache(key) {
    if (typeof window !== 'undefined') {
      this.storage.removeItem(key)
    }
  }
  clear() {
    if (typeof window !== 'undefined') {
      this.storage.clear()
    }
  }
}

export const localCache = new Cache()
export const sessionCache = new Cache(false)