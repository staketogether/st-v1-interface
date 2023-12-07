import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import stSymbol from '@assets/st-symbol.svg'
import { PiPlusBold } from 'react-icons/pi'
import { Tooltip } from 'antd'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import useAddSethToWallet from '@/hooks/useAddSethToWallet'

type StpethIconProps = {
  size?: number
  showPlusIcon?: boolean
}

export default function StpethIcon({ size = 32, showPlusIcon }: StpethIconProps) {
  const { addToWalletAction } = useAddSethToWallet()
  const { t } = useLocaleTranslation()
  return (
    <Tooltip title={t('addToWalletTooltip')}>
      <Container size={size} onClick={addToWalletAction}>
        <Image src={stSymbol} width={size} height={size} alt='stpEth' />
        {showPlusIcon && (
          <div>
            <PlusIcon />
          </div>
        )}
      </Container>
    </Tooltip>
  )
}

const { Container, PlusIcon } = {
  Container: styled.div<{ size: number }>`
    width: ${({ size }) => `${size}px`};
    height: ${({ size }) => `${size}px`};
    position: relative;
    cursor: pointer;
    > div {
      display: flex;
      padding: 2px;
      align-items: center;

      background: ${({ theme }) => theme.colorV2.gray[2]};
      border-radius: 99px;

      position: absolute;
      bottom: -3px;
      right: -3px;

      color: ${({ theme }) => theme.colorV2.purple[1]} !important;
    }
  `,
  PlusIcon: styled(PiPlusBold)`
    font-size: 9px;
  `
}
