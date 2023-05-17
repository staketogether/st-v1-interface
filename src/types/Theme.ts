import 'styled-components'

export default interface Theme {
  shadow: {
    100: string
  }
  size: {
    4: string
    8: string
    16: string
    24: string
    32: string
    64: string
  }
  font: {
    size: {
      14: string
      16: string
      18: string
      22: string
      24: string
    }
  }
  color: {
    white: string
    black: string
    green: string
    background: string
    gray: {
      100: string
      200: string
    }
    purple: {
      100: string
      200: string
      300: string
      400: string
      500: string
      600: string
    }
    blue: {
      100: string
      200: string
      300: string
    }
  }
}
