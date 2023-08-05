import useWalletSidebarConnectWallet from '@/hooks/useWalletSidebarConnectWallet'
import { BsWallet } from 'react-icons/bs'
import styled from 'styled-components'
import useTranslation from '../../../hooks/useTranslation'
import WalletSidebarDisconnected from './WalletSidebarDisconnected'

export default function WalletConnectButton() {
  const { t } = useTranslation()

  const { setOpenSidebarConnectWallet } = useWalletSidebarConnectWallet()

  return (
    <>
      <DisconnectedButton
        onClick={() => {
          setOpenSidebarConnectWallet(true)
        }}
      >
        <BsWallet fontSize={16} />
        {t('v2.header.connect')}
      </DisconnectedButton>
      <WalletSidebarDisconnected />
    </>
  )
}

const { DisconnectedButton } = {
  DisconnectedButton: styled.button`
    display: grid;
    grid-template-columns: 24px auto;

    align-items: center;
    width: auto;
    height: 32px;
    font-size: ${({ theme }) => theme.font.size[16]};
    font-weight: 300;
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.primary};
    border: none;
    border-radius: ${({ theme }) => theme.size[16]};
    padding: 0 ${({ theme }) => theme.size[16]};
    transition: background-color 0.1s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    &:hover {
      background-color: ${({ theme }) => theme.color.secondary};
    }
  `
}
