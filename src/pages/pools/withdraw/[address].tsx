import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutTemplate from '../../../components/shared/layout/LayoutTemplate'
import { Metatags } from '../../../components/shared/meta/Metatags'
import StakeControl from '../../../components/stake/StakeControl'

type UnstakePoolProps = {
  poolAddress: `0x${string}`
  name?: string
  avatar?: string
}

export default function WithdrawPool({ poolAddress }: UnstakePoolProps) {
  return (
    <LayoutTemplate>
      <Metatags />
      <StakeControl poolAddress={poolAddress} type='withdraw' />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const params = context?.params as { address: `0x${string}` } | undefined

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'pt', ['common'])),
      poolAddress: params?.address || ''
    }
  }
}
