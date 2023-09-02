import useWalletProviderImage from '@/hooks/useWalletProviderImage'
import useWalletSidebarConnectWallet from '@/hooks/useWalletSidebarConnectWallet'
import { capitalize } from '@/services/truncate'
import { Drawer } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AiOutlineRight, AiOutlineSetting } from 'react-icons/ai'
import styled from 'styled-components'
import { useConnect } from 'wagmi'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'
import WalletSidebarSettings from './WalletSidebarSettings'

export default function WalletSidebarDisconnected() {
  const [isSettingsActive, setIsSettingsActive] = useState(false)
  const [hasAgreeTerms, setHasAgreeTerms] = useState(false)
  const { connect, connectors } = useConnect()
  const { t } = useLocaleTranslation()
  const { openSidebarConnectWallet, setOpenSidebarConnectWallet } = useWalletSidebarConnectWallet()
  const handleConnectorImage = useWalletProviderImage()
  const router = useRouter()

  function handleTermsAndConditionsExternalLink() {
    if (router.locale === 'en') {
      return 'https://docs.staketogether.app/stake-together/v/stake-together-en/documentation/terms-and-conditions'
    }
    return 'https://docs.staketogether.app/stake-together/documentation/termos-de-uso'
  }

  function handlePrivacyPolicyExternalLink() {
    if (router.locale === 'en') {
      return 'https://docs.staketogether.app/stake-together/v/stake-together-en/documentation/privacy-policies'
    }
    return 'https://docs.staketogether.app/stake-together/documentation/politicas-de-privacidade'
  }

  return (
    <DrawerContainer
      placement='right'
      size='default'
      onClose={() => setOpenSidebarConnectWallet(false)}
      mask={true}
      open={openSidebarConnectWallet}
    >
      {isSettingsActive ? (
        <WalletSidebarSettings setIsSettingsActive={setIsSettingsActive} />
      ) : (
        <>
          <HeaderContainer>
            <ClosedSidebarButton onClick={() => setOpenSidebarConnectWallet(false)}>
              <CloseSidebar fontSize={14} />
            </ClosedSidebarButton>
            <Actions>
              <div>
                <h2>{t('connectWalletSideBar.title')}</h2>
                <Button onClick={() => setIsSettingsActive(true)}>
                  <SettingIcon fontSize={16} />
                </Button>
              </div>
              <div>
                <input
                  type='checkbox'
                  name='agree'
                  id='1'
                  checked={hasAgreeTerms}
                  onChange={e => setHasAgreeTerms(e.target.checked)}
                />
                <span>
                  {t('v2.sidebar.disconnected.iAgreeToThe')}
                  <a href={handleTermsAndConditionsExternalLink()} target='_blank'>
                    {' '}
                    {t('v2.sidebar.disconnected.terms&conditions')}{' '}
                  </a>
                  {t('v2.sidebar.disconnected.and')}
                  <a href={handlePrivacyPolicyExternalLink()} target='_blank'>
                    {' '}
                    {t('v2.sidebar.disconnected.privacyPolicy')}
                  </a>
                </span>
              </div>
            </Actions>
          </HeaderContainer>
          <ContainerWalletConnect>
            {connectors.map((connector, index) => {
              const walletName =
                connector.id === 'web3auth'
                  ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    capitalize((connector as any).loginParams.loginProvider)
                  : connector.name
              return (
                <div
                  key={connector.id + index}
                  className={`${hasAgreeTerms ? '' : 'disabled'}`}
                  onClick={() => hasAgreeTerms && connect({ connector })}
                >
                  {handleConnectorImage(walletName)}
                  {walletName}
                </div>
              )
            })}
          </ContainerWalletConnect>
        </>
      )}
    </DrawerContainer>
  )
}

const {
  DrawerContainer,
  HeaderContainer,
  CloseSidebar,
  ClosedSidebarButton,
  Button,
  SettingIcon,
  Actions,
  ContainerWalletConnect
} = {
  DrawerContainer: styled(Drawer)`
    background: ${({ theme }) => theme.colorV2.background} !important;

    .ant-drawer-header.ant-drawer-header-close-only {
      display: none;
    }

    .ant-drawer-body {
      width: calc(100vw - 80px);
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[24]};
      padding: ${({ theme }) => theme.size[24]};
      @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        width: 378px;
      }
    }
  `,
  HeaderContainer: styled.div`
    display: flex;
    justify-content: space-between;
    gap: ${({ theme }) => theme.size[16]};
  `,
  ClosedSidebarButton: styled.button`
    position: absolute;
    left: -44px;
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: ${({ theme }) => theme.size[16]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background: ${({ theme }) => theme.color.whiteAlpha[700]};
    transition: background 0.2s ease;
    line-height: 36px;

    &:hover {
      background: ${({ theme }) => theme.color.whiteAlpha[900]};
    }
  `,
  SettingIcon: styled(AiOutlineSetting)`
    color: ${({ theme }) => theme.color.primary};
  `,
  CloseSidebar: styled(AiOutlineRight)`
    color: ${({ theme }) => theme.color.primary};
  `,
  Button: styled.button`
    display: grid;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: ${({ theme }) => theme.size[8]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background: ${({ theme }) => theme.colorV2.white};

    line-height: 36px;

    &:hover {
      background: ${({ theme }) => theme.color.blackAlpha[200]};
      box-shadow: ${({ theme }) => theme.shadow[100]};
    }

    &:first-of-type {
      margin-left: auto;
    }
  `,
  Actions: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[16]};
    div:first-child {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h2 {
        color: ${({ theme }) => theme.colorV2.blue[1]};
        font-size: ${({ theme }) => theme.font.size[18]};
        font-weight: 500;
      }
    }
    div:last-child {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[8]};

      font-size: ${({ theme }) => theme.font.size[12]};

      font-weight: 500;
      a {
        color: ${({ theme }) => theme.color.primary};
        &:hover {
          color: ${({ theme }) => theme.color.secondary};
        }
      }

      > input {
        cursor: pointer;
      }
    }
  `,
  ContainerWalletConnect: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};
    div {
      cursor: pointer;
      width: 100%;
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[16]};
      padding: ${({ theme }) => theme.size[8]};
      background: ${({ theme }) => theme.colorV2.white};
      box-shadow: ${({ theme }) => theme.shadow[100]};

      border-radius: ${({ theme }) => theme.size[8]};
      &:hover {
        background: ${({ theme }) => theme.color.whiteAlpha[700]};
      }

      img {
        border-radius: 100%;
      }

      &.disabled {
        img {
          filter: grayscale(100%);
        }
        cursor: not-allowed;
        color: ${({ theme }) => theme.color.blackAlpha[600]};
        background: ${({ theme }) => theme.color.blackAlpha[100]};
      }
    }
  `
}
