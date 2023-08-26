export const useLocalStorage = () => {
  const setItem = (key: string, value: string) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, value)
    }
  }

  const getItem = (key: string) => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(key)
    }
    return ''
  }

  const removeItem = (key: string) => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key)
    }
  }

  const clear = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.clear()
    }
  }

  return { setItem, getItem, removeItem, clear }
}
