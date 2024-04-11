import { useEffect } from 'react'

export const useFacebookPixel = (eventTrack: string, isTracked = true) => {
  useEffect(() => {
    function fbqTrackEvent() {
      if (typeof window.fbq !== 'undefined') {
        window.fbq('track', eventTrack)
      }
    }
    isTracked && fbqTrackEvent()
  }, [eventTrack, isTracked])
}
