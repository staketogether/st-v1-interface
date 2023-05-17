// eslint-disable-next-line import/prefer-default-export
export declare global {
  interface Window {
    dataLayer: { event: string; page: string }[]
  }
}
