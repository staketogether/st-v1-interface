export function fbqTrackEvent(eventTrack: string) {
  if (typeof window.fbq !== 'undefined') {
    window.fbq('track', eventTrack)
  }
}
