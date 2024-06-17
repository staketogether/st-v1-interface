import { chainConfigByChainId } from '@/config/chain'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import etherscan from '@assets/icons/etherscan.svg'
import Image from 'next/image'
import styled from 'styled-components'
import EditAccount from '../shared/EditAccount'
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

const { Container, Card } = {
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
}
