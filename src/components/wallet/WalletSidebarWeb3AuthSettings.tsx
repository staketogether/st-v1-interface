import { chainConfigByChainId } from '@/config/chain'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import etherscan from '@assets/icons/etherscan.svg'
import Image from 'next/image'
import styled from 'styled-components'
import { PiArrowLeft } from 'react-icons/pi'

interface web3AuthWalletSettingsProps {
  setWeb3authWalletActive?: (value: boolean) => void
  walletAddress: `0x${string}`
}

export default function WalletSidebarWeb3AuthWalletSettings({
  setWeb3authWalletActive: setIsWalletSidebarWeb3AuthSettingsActive,
  walletAddress
}: web3AuthWalletSettingsProps) {

  const { t } = useLocaleTranslation()
  const optimism = chainConfigByChainId(10)
  const ethereum = chainConfigByChainId(1)

  return (
    <>
      <Header>
        <h2>{t('web3AuthWalletSettings.editAccount')}</h2>
        <Button onClick={() => setIsWalletSidebarWeb3AuthSettingsActive && setIsWalletSidebarWeb3AuthSettingsActive(false)}>
          <PiArrowLeft />
        </Button>
      </Header>
      <Container>
        <a className='copy' href={`${ethereum.blockExplorer.baseUrl}/address/${walletAddress}`} target='_blank'>
          <Card>
            <Image src={etherscan} alt='etherscan icon' width={16} height={16} />
            {t('web3AuthWalletSettings.showEtherScan')}
          </Card>
        </a>
        <a className='copy' href={`${optimism.blockExplorer.baseUrl}/address/${walletAddress}`} target='_blank'>
          <Card>
            <Image src={etherscan} alt='etherscan icon' width={16} height={16} />
            {t('web3AuthWalletSettings.showOptimismScan')}
          </Card>
        </a>
      </Container>
    </>
  )
}

const { Header, Button, Container, Card } = {
  Header: styled.div`
    min-height: 32px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;

    gap: ${({ theme }) => theme.size[16]};

    h2 {
      font-size: ${({ theme }) => theme.font.size[16]};
      font-weight: 400;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: ${({ theme }) => theme.font.size[18]};
      font-weight: 500;
    }
  `,
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
    padding-top: ${({ theme }) => theme.size[12]};
  `,
  Card: styled.div`
    width: 100%;
    padding: 0px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.size[4]};

    height: 42px;
    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.color.white};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    border: 1px solid ${({ theme }) => theme.color.primary};
    font-size: ${({ theme }) => theme.font.size[15]};
    color: ${({ theme }) => theme.colorV2.gray[1]};
    font-weight: 400;

    cursor: pointer;
    &:hover {
      background: ${({ theme }) => theme.color.whiteAlpha[600]};
    }
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
    background: ${({ theme }) => theme.color.white};
    transition: background 0.2s ease;
    line-height: 36px;

    &:hover {
      background: ${({ theme }) => theme.color.whiteAlpha[600]};
    }

    &:first-of-type {
      margin-left: auto;
    }

    svg {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      color: ${({ theme }) => theme.colorV2.blue[3]};
    }
  `,
}
