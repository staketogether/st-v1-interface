import { useEffect } from 'react'

export const useFacebookPixel = (eventTrack: string, isTracked = true, eventData?: Record<string, string | number>) => {
  useEffect(() => {
    function fbqTrackEvent() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      if ((window as Window).fbq !== undefined) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        window.fbq('track', eventTrack, eventData)
      }
    }
    if (isTracked) {
      fbqTrackEvent()
    }
  }, [eventData, eventTrack, isTracked])
}
