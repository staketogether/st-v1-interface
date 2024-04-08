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
import LayoutFooter from './LayoutFooter'
import LayoutHeaderDesktop from './LayoutHeaderDesktop'
import LayoutHeaderMobile from './LayoutHeaderMobile'
import LayoutMenuMobile from './LayoutMenuMobile'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500'] })

interface LayoutTemplateProps {
  children: ReactNode
}

export default function LayoutTemplate({ children }: LayoutTemplateProps) {
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
          <FacebookPixel eventTrack='PageView' />
        </>
      )}
      <NextNProgress color={lightTheme.color.secondary} options={{ showSpinner: false }} />
      <Wrapper>
        <Content>
          <LayoutHeaderDesktop />
          <LayoutHeaderMobile />
          <Body>{children}</Body>
        </Content>
      </Wrapper>
      <LayoutMenuMobile />
      <LayoutFooter />
    </Container>
  )
}

const { Container, Wrapper, Content, Body } = {
  Container: styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 48px;
    gap: 24px;
    min-height: 100vh;
    background: ${({ theme }) => theme.colorV2.background};
    padding: 0;
    padding-bottom: 48px;
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      margin-bottom: 0;
      padding-bottom: 0;
      gap: 64px;
    }
  `,
  Wrapper: styled.div`
    width: 100%;
    display: grid;

    grid-template-columns: 1fr;
    justify-content: center;
    place-items: start center;
    padding: ${({ theme }) => theme.size[16]};

    @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
      grid-template-columns: minmax(320px, ${({ theme }) => theme.breakpoints.xl});
    }
  `,
  Content: styled.div`
    display: grid;
    width: 100%;
    gap: 24px;

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      gap: 64px;
      padding-top: 128px;
    }
  `,
  Body: styled.div`
    display: grid;
    grid-template-columns: minmax(320px, ${({ theme }) => theme.breakpoints.xl});

    gap: ${props => props.theme.size[32]};
    justify-content: center;
    place-items: center;
  `
}
