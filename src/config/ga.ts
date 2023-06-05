interface Event {
  action: string
  category: string
  label: string
  value: number | string
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export const pageview = (url: string) => {
  if (!GA_MEASUREMENT_ID || !window.gtag) {
    return
  }

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url
  })
}

export const event = ({ action, category, label, value }: Event) => {
  if (!GA_MEASUREMENT_ID || !window.gtag) {
    return
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value
  })
}
