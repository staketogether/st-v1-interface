import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutTemplate from '../../../components/shared/layout/LayoutTemplate'
import MetaPool from '../../../components/shared/meta/MetaPool'
import StakeControl from '../../../components/stake/StakeControl'

type DepositPoolProps = {
  poolAddress: `0x${string}`
  name?: string
  avatar?: string
}

export default function Deposit({ poolAddress, name, avatar }: DepositPoolProps) {
  return (
    <LayoutTemplate>
      <MetaPool name={name} avatar={avatar} />
      <StakeControl poolAddress={poolAddress} type='deposit' />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const params = context?.params as { address: `0x${string}` } | undefined

  // if (params?.address) {
  //   const ens = await getEns(params?.address, true)
  //   const { url } = globalConfig

  //   if (ens) {
  //     return {
  //       props: {
  //         ...(await serverSideTranslations(context.locale || 'en', ['common'], null, ['en'])),
  //         poolAddress: params?.address || '',
  //         name: ens.name ? ens.name : '',
  //         avatar: ens.avatar ? `${url}/_next/image?url${ens.avatar}&q=75` : ''
  //       }
  //     }
  //   }
  // }

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'], null, ['en'])),
      poolAddress: params?.address || ''
    }
  }
}
