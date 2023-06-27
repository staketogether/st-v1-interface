import { AiOutlineWallet } from 'react-icons/ai'
import { styled } from 'styled-components'
import { useConnect } from 'wagmi'
import useTranslation from '../../../hooks/useTranslation'

export default function WalletButtonDisconnected() {
  const { t } = useTranslation()

  const { connect, connectors } = useConnect()

  return (
    <DisconnectedButton
      onClick={() => {
        connect({ connector: connectors[0] })
      }}
    >
      <AiOutlineWallet fontSize={16} />
      {t('wallet')}
    </DisconnectedButton>
  )
}

const { DisconnectedButton } = {
  DisconnectedButton: styled.button`
    display: grid;
    grid-template-columns: 16px auto;
    gap: ${({ theme }) => theme.size[4]};
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
