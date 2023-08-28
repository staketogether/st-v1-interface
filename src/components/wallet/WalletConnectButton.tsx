import useWalletSidebarConnectWallet from '@/hooks/useWalletSidebarConnectWallet'
import { AiOutlineLogin } from 'react-icons/ai'
import { styled } from 'styled-components'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'
import WalletSidebarDisconnected from './WalletSidebarDisconnected'

export default function WalletConnectButton() {
  const { t } = useLocaleTranslation()

  const { setOpenSidebarConnectWallet } = useWalletSidebarConnectWallet()

  return (
    <>
      <ConnectButton
        onClick={() => {
          setOpenSidebarConnectWallet(true)
        }}
      >
        <AiOutlineLogin fontSize={14} />
        {t('v2.header.enter')}
      </ConnectButton>
      <WalletSidebarDisconnected />
    </>
  )
}

const { ConnectButton } = {
  ConnectButton: styled.button`
    display: grid;
    grid-template-columns: 20px auto;

    align-items: center;
    width: auto;
    height: 32px;
    font-size: ${({ theme }) => theme.font.size[14]};
    font-weight: 400;
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.primary};
    border: none;
    border-radius: ${({ theme }) => theme.size[8]};
    padding: 0 ${({ theme }) => theme.size[16]};
    transition: background-color 0.1s ease;

    &:hover {
      background-color: ${({ theme }) => theme.color.secondary};
    }
  `
}
