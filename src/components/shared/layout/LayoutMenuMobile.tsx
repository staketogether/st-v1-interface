import useActiveRoute from '@/hooks/useActiveRoute'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { AiOutlineCodeSandbox } from 'react-icons/ai'
import styled from 'styled-components'
function LayoutMenuMobile() {
  const { t } = useTranslation()
  const { isActive } = useActiveRoute()
  return (
    <Container>
      <NextLink href='/pools'>
        <MenuButton
          className={`${isActive('pools') || isActive('stake') || isActive('unstake') ? 'active' : ''}`}
        >
          <AiOutlineCodeSandbox size={16} />
          {t('pools')}
        </MenuButton>
      </NextLink>
    </Container>
  )
}

const { Container, NextLink, MenuButton } = {
  Container: styled.nav`
    width: 100vw;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(143, 152, 214);
    padding: ${({ theme }) => theme.size[16]};
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.size[8]};
    border-top: 1px solid ${({ theme }) => theme.color.blackAlpha[500]};
    @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
      display: none;
    }
  `,
  NextLink: styled(Link)`
    display: flex;
    gap: ${({ theme }) => theme.size[4]};
    align-items: center;
  `,
  MenuButton: styled.button`
    width: auto;
    height: 32px;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.whiteAlpha[600]};

    border: none;
    border-radius: ${({ theme }) => theme.size[16]};
    padding: 0 ${({ theme }) => theme.size[16]};
    transition: background-color 0.1s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    display: flex;
    gap: ${({ theme }) => theme.size[4]};
    align-items: center;

    &.active {
      color: ${({ theme }) => theme.color.secondary};
    }

    &:disabled {
      background-color: ${({ theme }) => theme.color.whiteAlpha[300]};
      color: ${({ theme }) => theme.color.blackAlpha[600]};
    }
  `
}

export default LayoutMenuMobile
