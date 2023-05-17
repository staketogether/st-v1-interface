import * as i18next from 'next-i18next'

export default function useTranslation() {
  const { t } = i18next.useTranslation('common')

  const translation = (key: string) => {
    if (t(key) == key) {
      throw new Error(`key:[${key}] was not found in the translation file`)
    }

    return t(key)
  }

  return { t: translation }
}
