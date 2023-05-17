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
    grid-template-columns: auto;
    align-items: center;
    border: none;

    padding-left: 16px;
    padding-right: 8px;
    height: 32px;
    border-radius: ${({ theme }) => theme.size[16]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background-color: ${({ theme }) => theme.color.white};
    color: ${({ theme }) => theme.color.purple[600]};
  `
}
