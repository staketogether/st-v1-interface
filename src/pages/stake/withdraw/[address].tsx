import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutHead from '../../../components/shared/layout/LayoutHead'
import LayoutTemplate from '../../../components/shared/layout/LayoutTemplate'
import { Metatags } from '../../../components/shared/meta/Metatags'
import StakeControl from '../../../components/stake/StakeControl'
import useTranslation from '../../../hooks/useTranslation'
import StakeTitle from '@/components/stake/StakeSelectPool'

type UnstakePoolProps = {
  poolAddress: `0x${string}`
  name?: string
  avatar?: string
}

export default function WithdrawPool({ poolAddress, name, avatar }: UnstakePoolProps) {
  const { t } = useTranslation()

  return (
    <LayoutTemplate>
      <Metatags name={name} avatar={avatar} />
      <StakeTitle poolAddress={poolAddress} />
      <StakeControl poolAddress={poolAddress} type='withdraw' />
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
