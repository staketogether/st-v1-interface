import useActiveRoute from '@/hooks/useActiveRoute'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PiCurrencyEth } from 'react-icons/pi'
import styled from 'styled-components'
import useLocaleTranslation from '../../../hooks/useLocaleTranslation'

function LayoutMenuMobile() {
  const { t } = useLocaleTranslation()
  const { isActive } = useActiveRoute()
  const { query, pathname, isReady } = useRouter()
  const { currency } = query
  const basePath = `/[currency]`
  const isHome = pathname === basePath && isReady
  return (
    <Container>
      <NextLink href={`/${currency as string}/crypto`} className={`${isHome || isActive('crypto') ? 'active' : ''}`}>
        <InvestIcon />
        {t('v2.header.assets')}
      </NextLink>
      <NextLink href={`/${currency as string}/staking`} className={`${isHome || isActive('staking') ? 'active' : ''}`}>
        <InvestIcon />
        {t('v2.header.staking')}
      </NextLink>
    </Container>
  )
}

const { Container, NextLink, InvestIcon } = {
  Container: styled.nav`
    width: 100vw;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: ${({ theme }) => theme.color.white};
    padding: 12px ${({ theme }) => theme.size[16]};

    z-index: 999;

    display: flex;
    align-items: center;
    justify-content: space-around;

    border-top: 1px solid ${({ theme }) => theme.color.blue[200]};
    box-shadow: ${({ theme }) => theme.shadow[100]};

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      display: none;
    }
  `,
  NextLink: styled(Link)`
    text-decoration: none;
    color: ${({ theme }) => theme.colorV2.gray[1]};
    font-size: ${({ theme }) => theme.font.size[14]};

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;

    &.active {
      color: ${({ theme }) => theme.color.secondary};
    }
  `,
  InvestIcon: styled(PiCurrencyEth)`
    font-size: 14px;
  `
  // IncentivesIcon: styled(PiCellSignalFull)`
  //   font-size: 16px;
  // `,
  // ProjectsIcon: styled(PiCodesandboxLogo)`
  //   font-size: 15px;
  // `
  // GiftsIcon: styled(PiGift)`
  //   font-size: 14px;
  // `
}

export default LayoutMenuMobile
