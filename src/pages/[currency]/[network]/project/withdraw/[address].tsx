import { MetaTagsPoolDetail } from '@/components/shared/meta/MetaTagsPoolDetail'
import { contentfulClient } from '@/config/apollo'
import { queryContentfulPoolByAddress } from '@/queries/contentful/queryContentfulPoolByAddress'
import { AllowedNetworks, handleChainIdByNetwork } from '@/services/format'
import { ContentfulPool } from '@/types/ContentfulPool'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutTemplate from '../../../../../components/shared/layout/LayoutTemplate'
import StakeControl from '../../../../../components/stake/StakeControl'

interface WithdrawProps {
  poolAddress: `0x${string}`
  poolDetail?: ContentfulPool
  chainId: number
}

export default function Withdraw({ poolAddress, poolDetail, chainId }: WithdrawProps) {
  return (
    <LayoutTemplate>
      <MetaTagsPoolDetail poolDetail={poolDetail} />
      <StakeControl poolAddress={poolAddress} type='withdraw' poolDetail={poolDetail} chainId={chainId} />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { address, network } = context?.params as { address?: `0x${string}`; network: AllowedNetworks }
  const { data } = await contentfulClient.query<{ poolCollection: { items: ContentfulPool[] } }>({
    query: queryContentfulPoolByAddress,
    variables: {
      walletAddress: address?.toLowerCase(),
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
      ...(await serverSideTranslations(context.locale ?? 'en', ['common'])),
      poolAddress: address?.toLowerCase() ?? '',
      poolDetail: data?.poolCollection.items[0] || null,
      chainId
    }
  }
}
