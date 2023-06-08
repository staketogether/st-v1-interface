import * as i18next from 'next-i18next'
import { useCallback } from 'react'

export default function useTranslation() {
  const { t } = i18next.useTranslation('common')

  const translation = useCallback(
    (key: string) => {
      if (t(key) == key) {
        console.warn('missing translation key', key)
        throw new Error(`key:[${key}] was not found in the translation file`)
      }

      return t(key)
    },
    [t]
  )

  return { t: translation }
}
