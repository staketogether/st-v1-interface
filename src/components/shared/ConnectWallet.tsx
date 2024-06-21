import { globalConfig } from '@/config/global'
import { config } from '@/config/wagmi'
import { web3AuthInstanceVar } from '@/config/web3Auth'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import useWalletProviderImage from '@/hooks/useWalletProviderImage'
import { useReactiveVar } from '@apollo/client'
import { type Connector } from '@wagmi/core'
import Image from 'next/image'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useConnect } from 'wagmi'
import NetworkIcons from './NetworkIcons'

interface ConnectWalletProps {
  useModal?: boolean
  hasBtcWallet?: boolean
}

export default function ConnectWallet({ useModal: isCreateProject, hasBtcWallet }: ConnectWalletProps) {
  const [walletTypeConnect, setWalletTypeConnect] = useState<'evm' | 'btc'>('evm')
  const [hasAgreeTerms, setHasAgreeTerms] = useState(false)

  const { connect, connectors } = useConnect({
    config
  })
  // const { btcConnectors, btcConnect } = useBtcConnectWallet()

  const { i18n } = useTranslation(['common'])

  const { t } = useLocaleTranslation()

  const handleConnectorImage = useWalletProviderImage()
  const web3AuthInstance = useReactiveVar(web3AuthInstanceVar)

  function handleTermsAndConditionsExternalLink() {
    if (i18n.language === 'pt') return globalConfig.termsPt

    return globalConfig.termsEn
  }

  function handlePrivacyPolicyExternalLink() {
    if (i18n.language === 'pt') return globalConfig.privacyPt

    return globalConfig.privacyEn
  }

  const handleConnectorIndex = (index: number) => {
    const web3Auth: Record<number, string> = {
      0: 'Google',
      1: 'Facebook',
      2: 'Apple'
    }
    return web3Auth[index]
  }

  const handleConnectWallet = (connector: Connector) => {
    if (connector && connector.id === 'web3auth' && web3AuthInstance) {
      web3AuthInstance.init().then(() => web3AuthInstanceVar(web3AuthInstance))
    }
    connect({ connector })
  }

  return (
    <Container>
      <Terms>
        <input type='checkbox' name='agree' checked={hasAgreeTerms} onChange={e => setHasAgreeTerms(e.target.checked)} />
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
      </Terms>
      {hasBtcWallet && (
        <WalletTypeContainer>
          <div>
            <WalletTypeCard className={`${walletTypeConnect === 'evm' && 'active'}`} onClick={() => setWalletTypeConnect('evm')}>
              <div>
                <NetworkIcons network='ethereum' size={24} showTooltip={false} />
                <span>EVM</span>
              </div>
            </WalletTypeCard>

            <WalletTypeCard className={`${walletTypeConnect === 'btc' && 'active'}`} onClick={() => setWalletTypeConnect('btc')}>
              <div>
                <NetworkIcons network='bitcoin' size={24} showTooltip={false} />
                <span>Bitcoin</span>
              </div>
            </WalletTypeCard>
          </div>
        </WalletTypeContainer>
      )}
      {walletTypeConnect === 'evm' && (
        <ContainerWalletConnect className={`${isCreateProject && 'useModal'}`}>
          {connectors.map((connector, index) => {
            const walletName = connector.id === 'web3auth' ? handleConnectorIndex(index) : connector.name
            return (
              <div
                key={connector.id + index}
                className={`${hasAgreeTerms ? '' : 'disabled'}`}
                onClick={() => hasAgreeTerms && handleConnectWallet(connector)}
              >
                {connector.icon ? (
                  <Image src={connector.icon} alt={connector.name} width={24} height={24} objectFit='fill' />
                ) : (
                  handleConnectorImage(walletName)
                )}

                {walletName}
              </div>
            )
          })}
        </ContainerWalletConnect>
      )}
      {/*{walletTypeConnect === 'btc' && (
        <ContainerWalletConnect>
          {btcConnectors.map(connector => (
            <div key={connector.id} onClick={() => hasAgreeTerms && btcConnect(connector)} className={`${hasAgreeTerms ? '' : 'disabled'}`}>
              <Image src={connector.icon} alt={connector.name} width={24} height={24} objectFit='fill' />
              {connector.name}
            </div>
          ))}
        </ContainerWalletConnect>
      )}*/}
    </Container>
  )
}

const { Container, ContainerWalletConnect, Terms, WalletTypeContainer, WalletTypeCard } = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[16]};
  `,
  ContainerWalletConnect: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};

    &.useModal {
      div {
        background: ${({ theme }) => theme.colorV2.gray[2]};
        &:hover {
          background: #e4e4e4;
        }
      }
    }
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
      font-size: 14px;

      &:hover {
        background: ${({ theme }) => theme.color.whiteAlpha[600]};
      }

      img {
        border-radius: 100%;
        box-shadow: ${({ theme }) => theme.shadow[100]};
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
  `,
  Terms: styled.div`
    width: 100%;
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
  `,
  WalletTypeContainer: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[16]};
    > div {
      width: 100%;
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[8]};
    }
  `,
  WalletTypeCard: styled.div`
    width: 100%;
    height: 56px;

    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.colorV2.white};

    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: ${({ theme }) => theme.shadow[100]};
    cursor: pointer;
    transition: background 0.3s ease;

    > div {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[8]};

      span {
        font-size: 13px;
        font-weight: 500;
        color: ${({ theme }) => theme.colorV2.gray[1]};
      }
    }

    &:hover,
    &.active {
      background: ${({ theme }) => theme.colorV2.blue[1]};
      > div {
        span {
          color: ${({ theme }) => theme.colorV2.white};
        }
      }
    }
  `
}
