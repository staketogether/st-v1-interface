import { useConnectModal } from '@rainbow-me/rainbowkit'

import styled from 'styled-components'
import useTranslation from '../../../hooks/useTranslation'

export default function WalletButtonDisconnected() {
  const { t } = useTranslation()

  const { openConnectModal } = useConnectModal()

  return <DisconnectedButton onClick={openConnectModal}>{t('wallet')}</DisconnectedButton>
}

const { DisconnectedButton } = {
  DisconnectedButton: styled.button`
    display: grid;
    align-items: center;
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

    &:hover {
      background-color: ${({ theme }) => theme.color.whiteAlpha[800]};
    }

    &.active {
      background-color: ${({ theme }) => theme.color.whiteAlpha[800]};
      color: ${({ theme }) => theme.color.secondary};
    }
  `
}
