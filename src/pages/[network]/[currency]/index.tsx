import NewStakeControl from '@/components/new-stake/NewStakeControl'
import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'

// import StakeControl from '@/components/stake/StakeControl'
import { contentfulClient } from '@/config/apollo'
import chainConfig from '@/config/chain'
import { queryContentfulPoolByAddress } from '@/queries/contentful/queryContentfulPoolByAddress'
import { ContentfulPool } from '@/types/ContentfulPool'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

type HomeProps = {
  poolAddress: `0x${string}`
  poolDetail?: ContentfulPool
}

export default function Home({ poolAddress, poolDetail }: HomeProps) {
  return (
    <LayoutTemplate>
      <Metatags />
      {/* <StakeControl isStakeTogetherPool poolAddress={poolAddress} type='deposit' poolDetail={poolDetail} /> */}
      <NewStakeControl
        isStakeTogetherPool
        productName='Ethereum Staking'
        productIcon='ethereum'
        poolAddress={poolAddress}
        type='deposit'
        poolDetail={poolDetail}
      />
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
