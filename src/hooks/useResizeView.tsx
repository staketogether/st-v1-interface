import { useEffect, useState } from 'react'
import { lightTheme } from '../styles/theme'

function useResizeView() {
  const [screenWidth, setScreenWidth] = useState<number>(typeof window === 'undefined' ? 0 : window.innerWidth)

  const sm = Number(lightTheme.breakpoints.sm.replace('px', ''))
  const md = Number(lightTheme.breakpoints.md.replace('px', ''))
  const lg = Number(lightTheme.breakpoints.lg.replace('px', ''))
  const xl = Number(lightTheme.breakpoints.xl.replace('px', ''))
  const xxl = Number(lightTheme.breakpoints.xxl.replace('px', ''))
  const breakpoints = {
    sm,
    md,
    lg,
    xl,
    xxl
  }

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return { screenWidth, breakpoints }
}

export default useResizeView
