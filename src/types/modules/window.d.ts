// eslint-disable-next-line import/prefer-default-export
export declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: { event: string; page: string }[]
  }
}
