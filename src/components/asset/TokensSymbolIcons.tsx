import useAddTokenToWallet, { AddSethToWalletProps } from '@/hooks/useAddTokenToWallet'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { Tooltip } from 'antd'
import Image, { StaticImageData } from 'next/image'
import { PiPlusBold } from 'react-icons/pi'
import styled from 'styled-components'

interface TokensSymbolIconsProps {
  image: string | StaticImageData
  altName: string
  size: number
  contractAddress?: `0x${string}`
  tokenForAddWallet?: AddSethToWalletProps
}

export default function TokensSymbolIcons({ image, size, tokenForAddWallet, altName }: TokensSymbolIconsProps) {
  const { addToWalletAction } = useAddTokenToWallet()
  const { t } = useLocaleTranslation()

  return (
    <Tooltip title={t('addToWalletTooltip')}>
      <Warper size={size} onClick={tokenForAddWallet ? () => addToWalletAction(tokenForAddWallet) : () => {}}>
        <Image src={image} width={size} height={size} alt={altName} />
        {!!tokenForAddWallet && (
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
