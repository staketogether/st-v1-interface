import BuyEthControlModal from '@/components/ramp/BuyEthControlModal'
import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'

import StakeControl from '@/components/stake/StakeControl'
import { contentfulClient } from '@/config/apollo'
import chainConfig from '@/config/chain'
import { amountValue, openModal } from '@/hooks/ramp/useControlModal'
import useTransak from '@/hooks/useTransak'
import { queryContentfulPoolByAddress } from '@/queries/contentful/queryContentfulPoolByAddress'
import { ContentfulPool } from '@/types/ContentfulPool'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
type HomeProps = {
  poolAddress: `0x${string}`
  poolDetail?: ContentfulPool
}



export default function Home({ poolAddress, poolDetail }: HomeProps) {
  const router = useRouter()
  const { onInit: buyCrypto } = useTransak({
    productsAvailed: 'BUY'
  })

  useEffect(() => {
    if (router.query?.buy && (router.query.payment === 'pix' && router.query.provider == 'brla')) {
      amountValue(router.query?.amount?.toString() ?? '100')
      openModal(true)
    } else if (router.query.payment === 'credit') {
      buyCrypto()
    }
  }, [buyCrypto, router, router.events, router.query?.amount, router.query?.buy])
  return (
    <LayoutTemplate>
      <Metatags />
      <StakeControl isStakeTogetherPool poolAddress={poolAddress} type='deposit' poolDetail={poolDetail} />
      <BuyEthControlModal />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { stakeTogetherPool } = chainConfig()
  const { data } = await contentfulClient.query<{ poolCollection: { items: ContentfulPool[] } }>({
    query: queryContentfulPoolByAddress,

    variables: {
      walletAddress: stakeTogetherPool,
      locale: context.locale === 'en' ? 'en-US' : context.locale
    }
  })

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'])),
      poolAddress: stakeTogetherPool,
      poolDetail: data?.poolCollection.items[0] || null
    }
  }
}
