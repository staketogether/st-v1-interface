import { contentfulClient } from '@/config/apollo'
import { queryContentfulPoolByAddress } from '@/queries/contentful/queryContentfulPoolByAddress'
import { AllowedNetwork, handleChainIdByNetwork } from '@/services/format'
import { ContentfulPool } from '@/types/ContentfulPool'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutTemplate from '../../../../../components/shared/layout/LayoutTemplate'
import { MetaTagsPoolDetail } from '../../../../../components/shared/meta/MetaTagsPoolDetail'
import StakeControl from '../../../../../components/stake/StakeControl'

type DepositProps = {
  poolAddress: `0x${string}`
  chainId: number,
  poolDetail?: ContentfulPool
}

export default function Deposit({ poolAddress, poolDetail, chainId }: DepositProps) {
  return (
    <LayoutTemplate>
      <MetaTagsPoolDetail poolDetail={poolDetail} />
      <StakeControl poolAddress={poolAddress} type='deposit' poolDetail={poolDetail} chainId={chainId} />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { address, network } = context?.params as { address: `0x${string}`, network: AllowedNetwork }
  const { data } = await contentfulClient.query<{ poolCollection: { items: ContentfulPool[] } }>({
    query: queryContentfulPoolByAddress,

    variables: {
      walletAddress: address.toLowerCase(),
      locale: context.locale === 'en' ? 'en-US' : context.locale
    }
  })
  const chainId = handleChainIdByNetwork(network)
  if (!chainId) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'])),
      poolAddress: address.toLowerCase() || '',
      poolDetail: data?.poolCollection.items[0] || null,
      chainId
    }
  }
}
