import { useEffect } from 'react'

export const useFacebookPixel = (eventTrack: string, isTracked = true) => {
  useEffect(() => {
    function fbqTrackEvent() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      if ((window as Window).fbq !== undefined) {
        window.fbq('track', eventTrack)
      }
    }
    isTracked && fbqTrackEvent()
  }, [eventTrack, isTracked])
}
