import AssetIcon from '@/components/shared/AssetIcon'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { Asset } from '@/types/Asset'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

interface AssetCardProps {
  asset: Asset
}

const AssetPrice = dynamic(() => import('../shared/AssetPrice'), {
  ssr: false,
  suspense: true
})

export default function AssetCard({ asset }: AssetCardProps) {
  const { t } = useLocaleTranslation()
  const { query } = useRouter()
  const { currency } = query as { currency: string }

  return (
    <CardContainer
      href={asset.url.replace('currency', currency)}
      className={`${!asset.enabled && 'disabled'}`}
      style={{
        pointerEvents: !asset.enabled ? 'none' : undefined
      }}
    >
      <ImageContainer>
        <div>
          <AssetIcon image={asset.symbolImage} chain={asset.chains[0]} size={28} altName={asset.id} />
          <span>{t(`v3.products.${asset.id}.name`)}</span>
        </div>
        {!asset.enabled && <Soon>{t('soon')}</Soon>}
      </ImageContainer>
      <PriceContainer>
        <AssetPrice asset={asset} showChangePercentage />
      </PriceContainer>
    </CardContainer>
  )
}

const { CardContainer, ImageContainer, PriceContainer, Soon } = {
  CardContainer: styled(Link)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 12px 16px;
    gap: 0;
    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.colorV2.white};
    box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.2);
    border: 1px solid transparent;
    transition:
      border 0.3s ease,
      color 0.3s ease;

    &:hover {
      border: 1px solid ${({ theme }) => theme.colorV2.purple[1]};

      > div:first-child > div > span {
        color: ${({ theme }) => theme.colorV2.purple[1]};
      }
    }

    &.disabled {
      opacity: 0.6;
    }
  `,
  PriceContainer: styled.div`
    gap: ${({ theme }) => theme.size[8]};
    display: inline-flex;

    flex-direction: row;
    align-items: center;
    justify-content: center;

    > span {
      color: ${({ theme }) => theme.colorV2.blue[1]};
      font-size: 16px;
      font-weight: 500;
      border-radius: ${({ theme }) => theme.size[8]};
      padding: ${({ theme }) => theme.size[4]} ${({ theme }) => theme.size[8]};
      white-space: nowrap;

      &.price {
        display: flex;
        align-self: flex-end;
        background: ${({ theme }) => theme.colorV2.white[1]};
        font-size: ${({ theme }) => theme.font.size[14]};
        font-weight: 600;
        line-height: normal;
        padding-top: 2px;
        min-width: 70px;
      }

      &.price-up {
        align-self: end;
        font-size: ${({ theme }) => theme.font.size[14]};
        font-weight: 600;
        color: ${({ theme }) => theme.color.green[500]};
        border: 1px solid ${({ theme }) => theme.color.green[500]};
        border-radius: 4px;
        min-width: 70px;
      }

      &.price-down {
        align-self: end;
        font-weight: 600;
        font-size: ${({ theme }) => theme.font.size[14]};
        color: ${({ theme }) => theme.color.red[500]};
        border: 1px solid ${({ theme }) => theme.color.red[500]};
        border-radius: 4px;
        min-width: 70px;
      }
    }
  `,

  ImageContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${({ theme }) => theme.size[12]};
    > div {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[16]};

      > span {
        color: ${({ theme }) => theme.colorV2.black};
        font-size: ${({ theme }) => theme.font.size[16]};
        font-weight: 500;
      }
    }
  `,
  Soon: styled.div`
    display: flex;
    padding: 3px 8px;
    align-items: center;
    gap: 10px;
    height: 25px;

    border-radius: 99px;
    border-radius: ${({ theme }) => theme.size[4]};
    background-color: ${({ theme }) => theme.colorV2.gray[2]};
    border: 1px solid ${({ theme }) => theme.color.blackAlpha[100]};

    color: ${({ theme }) => theme.colorV2.gray[6]};

    font-size: 13px;
    font-weight: 400;
  `
  // NewTag: styled.div`
  //   width: 50px;
  //   height: 25px;

  //   display: flex;
  //   align-items: center;
  //   justify-content: center;

  //   color: ${({ theme }) => theme.colorV2.white} !important;
  //   border-radius: ${({ theme }) => theme.size[4]};
  //   background: linear-gradient(108deg, #3c43ee -11.12%, #ab00fc 110.08%);

  //   font-size: 13px;
  //   font-weight: 500;
  // `
}
