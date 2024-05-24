import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { stakingList } from '@/config/product/staking'
import StakingControl from '@/components/staking/StakingControl'
import { Staking } from '@/types/Staking'

interface StakingProps {
  stakingItems: Staking[]
}

export default function StakingPage({ stakingItems }: StakingProps) {
  return (
    <LayoutTemplate>
      <Metatags />
      <StakingControl stakingList={stakingItems} />
    </LayoutTemplate>
  )
}
export const getStaticPaths: GetStaticPaths = () => {
  const paths = [{ params: { currency: 'usd' } }, { params: { currency: 'brl' } }, { params: { currency: 'eur' } }]

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (!stakingList?.length) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      stakingItems: stakingList.filter(staking => staking.listed),
      ...(await serverSideTranslations(locale ?? 'en', ['common']))
    },
    revalidate: 24 * 60 * 60
  }
}
