import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import stSymbol from '@assets/st-symbol.svg'
import { PiPlusBold } from 'react-icons/pi'
import { Tooltip } from 'antd'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import useAddSethToWallet from '@/hooks/useAddSethToWallet'
import { getContractsByProductName } from '@/config/product'
import chainConfig from '@/config/chain'

type StpEthIconProps = {
  size?: number
  showPlusIcon?: boolean
}
/**
 * @deprecated
 */
export default function StpEthIcon({ size = 32, showPlusIcon }: StpEthIconProps) {
  const { isTestnet } = chainConfig()
  const { StakeTogether } = getContractsByProductName({
    productName: 'ethereum-stake',
    isTestnet
  })
  const { addToWalletAction } = useAddSethToWallet({ productSymbol: 'stpETH', contractAddress: StakeTogether })
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

    img {
      background: ${({ theme }) => theme.colorV2.purple[4]};
      box-shadow: ${({ theme }) => theme.shadow[300]};
      border-radius: 100%;
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
    }
  `,
  PlusIcon: styled(PiPlusBold)`
    font-size: 9px;
  `
}
