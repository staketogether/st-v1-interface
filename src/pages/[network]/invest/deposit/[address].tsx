import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutTemplate from '../../../../components/shared/layout/LayoutTemplate'
import { Metatags } from '../../../../components/shared/meta/Metatags'
import StakeControl from '../../../../components/stake/StakeControl'

type DepositProps = {
  poolAddress: `0x${string}`
  name?: string
  avatar?: string
}

export default function Deposit({ poolAddress }: DepositProps) {
  return (
    <LayoutTemplate>
      <Metatags />
      <StakeControl poolAddress={poolAddress} type='deposit' />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const params = context?.params as { address: `0x${string}` } | undefined

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'])),
      poolAddress: params?.address.toLowerCase() || ''
    }
  }
}
