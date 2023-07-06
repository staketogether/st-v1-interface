import React from 'react'
import styled from 'styled-components'
import sethIcon from '@assets/icons/seth-icon.svg'
import Image from 'next/image'
import useTranslation from '@/hooks/useTranslation'
import useAddSethToWallet from '@/hooks/useAddSethToWallet'

type AddSethButtonProps = {
  className?: string
}

export default function AddSethButton({ className }: AddSethButtonProps) {
  const { t } = useTranslation()
  const { addToWalletAction } = useAddSethToWallet()
  return (
    <AddAssetInWalletButton onClick={addToWalletAction} className={className}>
      <span>{t('addSethToWallet.add')} </span>
      <Image src={sethIcon} alt={t('stakeTogether')} width={18} height={18} />
      <span>{t('addSethToWallet.yourWallet')}</span>
    </AddAssetInWalletButton>
  )
}

const { AddAssetInWalletButton } = {
  AddAssetInWalletButton: styled.button`
    border: none;
    color: ${({ theme }) => theme.color.white};
    border-radius: ${props => props.theme.size[16]};
    background: ${({ theme }) => theme.color.blue[400]};
    transition: background-color 0.2s ease;
    height: 48px;
    padding: 0px ${({ theme }) => theme.size[16]};

    font-size: ${({ theme }) => theme.font.size[16]};

    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.size[8]};

    &:hover {
      background: ${({ theme }) => theme.color.blue[600]};
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }
  `
}
