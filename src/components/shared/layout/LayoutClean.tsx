import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Montserrat } from 'next/font/google'
import { useRouter } from 'next/router'
import NextNProgress from 'nextjs-progressbar'
import { ReactNode, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { lightTheme } from '../../../styles/theme'
import { Cloudflare } from '../scripts/Cloudflare'
import { FacebookPixel } from '../scripts/FacebookPixel'
import { GoogleTag } from '../scripts/GoogleTag'
import { Hotjar } from '../scripts/Hotjar'
import { Intercom } from '../scripts/Intercom'
import LayoutFooterClean from './LayoutFooterClean'
import LayoutHeaderClean from './LayoutHeaderClean'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500'] })

interface LayoutTemplateProps {
  children: ReactNode
}

export default function LayoutClean({ children }: LayoutTemplateProps) {
  const isProduction = process.env.NODE_ENV == 'production'

  const router = useRouter()
  const { currency } = router.query
  const { setItem, getItem } = useLocalStorage()

  const changeCurrency = useCallback(
    (newCurrency: string) => {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, currency: newCurrency }
      })

      setItem('currency', newCurrency)
    },
    [router, setItem]
  )

  useEffect(() => {
    const userCurrencyConf = getItem('currency')
    if (userCurrencyConf && userCurrencyConf !== currency) {
      changeCurrency(userCurrencyConf)
    }
  }, [changeCurrency, currency, getItem])

  return (
    <Container className={montserrat.className}>
      {isProduction && (
        <>
          <GoogleTag />
          <Hotjar />
          <Cloudflare />
          <FacebookPixel />
          <Intercom />
        </>
      )}
      <NextNProgress color={lightTheme.color.secondary} options={{ showSpinner: false }} />

      <LayoutHeaderClean />
      {children}
      <LayoutFooterClean />
    </Container>
  )
}

const { Container } = {
  Container: styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 80px auto 80px;
    gap: 24px;
    padding: 0 24px;
  `
}
