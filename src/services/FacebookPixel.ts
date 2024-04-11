export function fbqTrackEvent(eventTrack: string) {
  if ((window as Window).fbq !== undefined) {
    window.fbq('track', eventTrack)
  }
}
