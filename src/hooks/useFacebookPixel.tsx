import { useEffect } from 'react'

export const useFacebookPixel = (eventTrack: string, isTracked = true) => {
  useEffect(() => {
    function fbqTrackEvent() {
      if ((window as Window).fbq !== undefined) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        window.fbq('track', eventTrack)
      }
    }
    isTracked && fbqTrackEvent()
  }, [eventTrack, isTracked])
}
