import useAddSethToWallet from '@/hooks/useAddSethToWallet'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import bitcoinIcon from '@assets/assets/bitcoin.svg'
import ethereumIcon from '@assets/assets/ethereum.svg'
import optimismIcon from '@assets/assets/optimism.svg'
import mengoIcon from '@assets/assets/mengo.png'
import galoIcon from '@assets/assets/galo.png'
import fluIcon from '@assets/assets/flu.png'
import defaultIcon from '@assets/assets/default-erc-20.svg'
import arbitrumIcon from '@assets/assets/arbitrum.svg'
import polygonIcon from '@assets/assets/polygon.svg'
import chilizIcon from '@assets/assets/chiliz.svg'
import pendleIcon from '@assets/assets/pendle.png'
import chainlinkIcon from '@assets/assets/chainlink.png'
import renderIcon from '@assets/assets/render.png'
import theGraphIcon from '@assets/assets/thegraph.png'
import worldcoinIcon from '@assets/assets/worldcoin.png'
import uniswapIcon from '@assets/assets/uniswap.png'
import ssvIcon from '@assets/assets/ssv.png'
import usdcIcon from '@assets/assets/usdc.png'
import usdtIcon from '@assets/assets/usdt.png'
import brlaIcon from '@assets/assets/brla.png'
import eurtIcon from '@assets/assets/eurt.png'
import xautIcon from '@assets/assets/xaut.png'
import solanaIcon from '@assets/assets/solana.png'
import thorchainIcon from '@assets/assets/thorchain.png'
import aaveIcon from '@assets/assets/aave.png'
import stIcon from '@assets/st-symbol.svg'
import stpRETHIcon from '@assets/stpRETHIcon.svg'
import { Tooltip } from 'antd'
import Image from 'next/image'
import { PiPlusBold } from 'react-icons/pi'
import styled from 'styled-components'

interface TokensSymbolIconsProps {
  productSymbol: string
  size: number
  contractAddress?: `0x${string}`
  showPlusIcon?: boolean
}

export default function TokensSymbolIcons({ productSymbol, size, showPlusIcon, contractAddress }: TokensSymbolIconsProps) {
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
    stpCHZ: stIcon,
    wBTC: bitcoinIcon,
    ETH: ethereumIcon,
    CHZ: chilizIcon,
    OP: optimismIcon,
    MATIC: polygonIcon,
    ARB: arbitrumIcon,
    MENGO: mengoIcon,
    GALO: galoIcon,
    FLU: fluIcon,
    VASCO: defaultIcon,
    VERDAO: defaultIcon,
    SACI: defaultIcon,
    SPFC: defaultIcon,
    BAHIA: defaultIcon,
    PENDLE: pendleIcon,
    LINK: chainlinkIcon,
    RNDR: renderIcon,
    GRT: theGraphIcon,
    WRLD: worldcoinIcon,
    UNI: uniswapIcon,
    SSV: ssvIcon,
    USDC: usdcIcon,
    USDT: usdtIcon,
    BRLA: brlaIcon,
    EURT: eurtIcon,
    XAUT: xautIcon,
    SOL: solanaIcon,
    RUNE: thorchainIcon,
    AAVE: aaveIcon
  }
  const { addToWalletAction } = useAddSethToWallet({
    productSymbol,
    contractAddress: contractAddress ? contractAddress : `0x${productSymbol}`
  })
  const { t } = useLocaleTranslation()

  return (
    <Tooltip title={t('addToWalletTooltip')}>
      <Warper size={size} onClick={showPlusIcon ? addToWalletAction : () => {}}>
        <Image src={productSymbolIcons[productSymbol as keyof typeof productSymbolIcons]} width={size} height={size} alt={productSymbol} />
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
