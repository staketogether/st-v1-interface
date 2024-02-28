import NewStakeControl from '@/components/new-stake/NewStakeControl'
import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import StakeControl from '@/components/stake/StakeControl'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Home() {

  const router = useRouter()
  const minAmount = '100'
  const { onInit: buyCrypto } = useTransak({
    productsAvailed: 'BUY'
  })

  useEffect(() => {
    if (router.query?.buy && (router.query.payment === 'pix' && router.query.provider == 'brla')) {
      fiatAmountVar(router.query?.amount?.toString() ?? minAmount)
      openModal(true)
    } else if (router.query.payment === 'credit') {
      buyCrypto()
    }
  }, [buyCrypto, router, router.events, router.query?.amount, router.query?.buy])
  return (
    <LayoutTemplate>
      <Metatags />
      <NewStakeControl productName='ethereum' type='deposit' />
      <StakeControl isStakeTogetherPool poolAddress={poolAddress} type='deposit' poolDetail={poolDetail} />
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
