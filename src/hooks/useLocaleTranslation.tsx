import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'

export default function useLocaleTranslation() {
  const { t } = useTranslation(['common'])

  const translation = useCallback(
    (key: string) => {
      if (t(key) == key) {
        throw new Error(`key:[${key}] was not found in the translation file`)
      }

      return t(key)
    },
    [t]
  )

  return { t: translation }
}
