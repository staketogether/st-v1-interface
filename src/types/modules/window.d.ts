// eslint-disable-next-line import/prefer-default-export
export declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: { event: string; page: string }[]
  }
}
