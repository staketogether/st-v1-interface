import AssetIcon from '@/components/shared/AssetIcon'
import SkeletonLoading from '@/components/shared/icons/SkeletonLoading'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Staking } from '@/types/Staking'

interface StakingCardProps {
  staking: Staking
}

const AssetPrice = dynamic(() => import('../shared/AssetPrice'), {
  ssr: false,
  loading: () => <SkeletonLoading width={80} />,
  suspense: true
})

export default function StakingCard({ staking }: StakingCardProps) {
  const { t } = useLocaleTranslation()
  const { query } = useRouter()
  const { currency } = query as { currency: string }

  return (
    <CardContainer
      href={staking.url.replace('currency', currency)}
      className={`${!staking.enabled && 'disabled'}`}
      style={{
        pointerEvents: !staking.enabled ? 'none' : undefined
      }}
    >
      <ImageContainer>
        <div>
          <AssetIcon image={staking.logoImage} chain={staking.asset.chains[0]} size={32} altName={staking.id} />
          <span>{t(`v3.products.${staking.id}.name`)}</span>
        </div>
        {!staking.enabled && <Soon>{t('soon')}</Soon>}
        {staking.new && <NewTag>{t('new')}</NewTag>}
      </ImageContainer>
      <PriceContainer>
        <AssetPrice asset={staking.asset} />
        {staking?.apy && (
          <Apy>
            <span className='label'>APY</span>
            {` ${staking.apy}%`}
          </Apy>
        )}
      </PriceContainer>
    </CardContainer>
  )
}

const { CardContainer, ImageContainer, PriceContainer, Soon, NewTag, Apy } = {
  PriceContainer: styled.div`
    gap: ${({ theme }) => theme.size[8]};
    display: flex;
    justify-content: center;
    flex-direction: column;

    > span {
      color: ${({ theme }) => theme.colorV2.blue[1]};
      font-size: ${({ theme }) => theme.font.size[22]};
      font-weight: 500;
    }
  `,
  Apy: styled.div`
    padding: ${({ theme }) => theme.size[4]} ${({ theme }) => theme.size[8]};
    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.colorV2.white[1]};
    color: ${({ theme }) => theme.color.green[400]};
    border: 1px solid ${({ theme }) => theme.color.green[400]};
    font-size: ${({ theme }) => theme.font.size[16]};
    font-weight: 600;
    line-height: normal;

    text-align: center;
  `,
  CardContainer: styled(Link)`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: ${({ theme }) => theme.size[24]};
    gap: ${({ theme }) => theme.size[24]};
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
  ImageContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
    > div {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[12]};
      > span {
        color: ${({ theme }) => theme.colorV2.black};
        font-size: ${({ theme }) => theme.font.size[20]};
        font-weight: 500;
      }
    }
  `,
  Soon: styled.div`
    display: flex;
    padding: 3px ${({ theme }) => theme.size[8]};
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
  `,
  NewTag: styled.div`
    width: 50px;
    height: 25px;

    display: flex;
    align-items: center;
    justify-content: center;

    color: ${({ theme }) => theme.colorV2.white} !important;
    border-radius: ${({ theme }) => theme.size[4]};
    background: linear-gradient(108deg, #3c43ee -11.12%, #ab00fc 110.08%);

    font-size: 13px;
    font-weight: 500;
  `
}
