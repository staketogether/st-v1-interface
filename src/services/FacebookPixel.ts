export function fbqTrackEvent(eventTrack: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  if ((window as Window).fbq !== undefined) {
    window.fbq('track', eventTrack)
  }
}
