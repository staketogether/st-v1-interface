import NewStakeControl from '@/components/new-stake/NewStakeControl'
import BuyEthControlModal from '@/components/ramp/BuyEthControlModal'
import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import { fiatAmountVar, openBrlaModalVar } from '@/hooks/ramp/useControlModal'
import useTransak from '@/hooks/useTransak'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  const minAmount = '100'
  const { onInit: buyCrypto } = useTransak({
    productsAvailed: 'BUY'
  })

  useEffect(() => {
    if (router.query?.buy && router.query.payment === 'pix' && router.query.provider == 'brla') {
      fiatAmountVar(router.query?.amount?.toString() ?? minAmount)
      openBrlaModalVar(true)
    } else if (router.query.payment === 'credit') {
      buyCrypto()
    }
  }, [buyCrypto, router, router.events, router.query?.amount, router.query?.buy])

  return (
    <LayoutTemplate>
      <Metatags />
      <NewStakeControl productName='ethereum' type='deposit' />
      <BuyEthControlModal />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common']))
    }
  }
}
