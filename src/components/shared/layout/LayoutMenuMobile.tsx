import useActiveRoute from '@/hooks/useActiveRoute'

import Link from 'next/link'
import styled from 'styled-components'
import useLocaleTranslation from '../../../hooks/useLocaleTranslation'
function LayoutMenuMobile() {
  const { t } = useLocaleTranslation()
  const { isActive } = useActiveRoute()
  return (
    <Container>
      <NextLink
        href='/invest'
        className={`${isActive('invest') || isActive('deposit') || isActive('withdraw') ? 'active' : ''}`}
      >
        {t('v2.header.invest')}
      </NextLink>
      <NextLink href='/incentives' className={`${isActive('incentives') ? 'active' : ''}`}>
        {t('v2.header.incentives')}
      </NextLink>
    </Container>
  )
}

const { Container, NextLink } = {
  Container: styled.nav`
    width: 100vw;
    height: 48px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: ${({ theme }) => theme.color.white};
    padding: 0px ${({ theme }) => theme.size[16]};

    z-index: 999;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: ${({ theme }) => theme.size[32]};
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
    &.active {
      color: ${({ theme }) => theme.color.secondary};
    }
  `
}

export default LayoutMenuMobile
