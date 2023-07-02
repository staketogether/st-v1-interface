import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { apolloClient } from '../config/apollo'
import { queryBlock } from '../queries/queryBlock'

type HealthCheckProps = {
  blockNumber: number
}

export default function HealthCheck({ blockNumber }: HealthCheckProps) {
  return <div>{blockNumber}</div>
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { data } = await apolloClient.query<{ _meta: { block: { number: number } } }>({
    query: queryBlock,
    fetchPolicy: 'no-cache'
  })

  const blockNumber = data._meta.block.number

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'], null, ['en'])),
      blockNumber
    }
  }
}
