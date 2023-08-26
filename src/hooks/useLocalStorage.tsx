import { useCallback } from 'react'

export const useLocalStorage = () => {
  const setItem = useCallback((key: string, value: string) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, value)
    }
  }, [])

  const getItem = useCallback((key: string) => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(key)
    }
    return ''
  }, [])

  const removeItem = useCallback((key: string) => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key)
    }
  }, [])

  const clear = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.clear()
    }
  }, [])

  return { setItem, getItem, removeItem, clear }
}
