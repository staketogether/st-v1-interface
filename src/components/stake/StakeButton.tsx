import styled from 'styled-components'
import useTranslation from '../../hooks/useTranslation'

interface StakeButtonProps {
  onClick: () => void
  label: string
  isLoading: boolean
  disabled?: boolean
  purple?: boolean
}

export default function StakeButton({ onClick, label, disabled, isLoading, purple }: StakeButtonProps) {
  const { t } = useTranslation()

  return (
    <Stake className={`${purple ? 'purple' : ''}`} onClick={onClick} disabled={disabled}>
      {isLoading ? t('processing') : label}
    </Stake>
  )
}

const { Stake } = {
  Stake: styled.button`
    border: none;
    color: ${({ theme }) => theme.color.white};
    border-radius: ${props => props.theme.size[16]};
    background: ${({ theme }) => theme.color.blue[400]};
    transition: background-color 0.2s ease;
    height: 48px;

    font-size: ${({ theme }) => theme.font.size[16]};

    &:hover {
      background: ${({ theme }) => theme.color.blue[600]};
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }

    &.error {
      background: ${({ theme }) => theme.color.red[400]};
    }

    &.purple {
      background: ${({ theme }) => theme.color.purple[700]};
      &:hover {
        background: ${({ theme }) => theme.color.purple[900]};
      }
    }
  `
}
