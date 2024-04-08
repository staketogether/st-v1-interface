import React from 'react'
import Image from 'next/image'
import { ProductSymbol } from '@/types/Product'
import stIcon from '@assets/st-symbol.svg'
import stpRETHIcon from '@assets/stpRETHIcon.svg'
import styled from 'styled-components'
import { Tooltip } from 'antd'
import useAddSethToWallet from '@/hooks/useAddSethToWallet'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { PiPlusBold } from 'react-icons/pi'

type SymbolIconsProps = {
  productSymbol: ProductSymbol
  size: number
  contractAddress?: `0x${string}`
  showPlusIcon?: boolean
}

export default function SymbolIcons({ productSymbol, size, showPlusIcon, contractAddress }: SymbolIconsProps) {
  const productSymbolIcons = {
    stpETH: stIcon,
    strETH: stpRETHIcon,
    stpPOL: stIcon,
    stpSOL: stIcon,
    stpTIA: stIcon,
    stpNear: stIcon,
    stpDOT: stIcon,
    stpATOM: stIcon,
    stpBTC: stIcon,
    stpCHZ: stIcon
  }
  const { addToWalletAction } = useAddSethToWallet({
    productSymbol,
    contractAddress: contractAddress ? contractAddress : `0x${productSymbol}`
  })
  const { t } = useLocaleTranslation()

  return (
    <Tooltip title={t('addToWalletTooltip')}>
      <Warper size={size} onClick={showPlusIcon ? addToWalletAction : () => {}}>
        <Image src={productSymbolIcons[productSymbol]} width={size} height={size} alt={productSymbol} />
        {showPlusIcon && (
          <div>
            <PiPlusBold style={{ fontSize: size <= 24 ? 7 : 9 }} />
          </div>
        )}
      </Warper>
    </Tooltip>
  )
}

const { Warper } = {
  Warper: styled.div<{ size: number }>`
    position: relative;
    cursor: pointer;
    width: ${({ size }) => `${size}px`};
    height: ${({ size }) => `${size}px`};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    border-radius: 100%;
    img {
      border-radius: 100%;
      box-shadow: ${({ theme }) => theme.shadow[100]};
    }
    > div {
      display: flex;
      padding: 2px;
      align-items: center;

      background: ${({ theme }) => theme.colorV2.blue[1]};
      border-radius: 99px;

      position: absolute;
      bottom: -3px;
      right: -3px;

      color: ${({ theme }) => theme.colorV2.white};
      box-shadow: ${({ theme }) => theme.shadow[100]};
    }
  `
}
