import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutHead from '../../../components/shared/layout/LayoutHead'
import LayoutTemplate from '../../../components/shared/layout/LayoutTemplate'
import { MetaPool } from '../../../components/shared/meta/MetaPool'
import StakeControl from '../../../components/stake/StakeControl'
import usePool from '../../../hooks/subgraphs/usePool'
import useTranslation from '../../../hooks/useTranslation'
import { getEns } from '../../../services/getEns'

type UnstakePoolProps = {
  poolAddress: string
  name?: string
  avatar?: string
}

export default function WithdrawPool({ poolAddress, name, avatar }: UnstakePoolProps) {
  const { t } = useTranslation()

  const { pool } = usePool(poolAddress)

  return (
    <LayoutTemplate>
      <MetaPool name={name} avatar={avatar} />
      <LayoutHead text={t('titles.stake')} />
      <StakeControl pool={pool} type='withdraw' />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const params = context?.params as { address: `0x${string}` } | undefined

  if (params?.address) {
    const ens = await getEns(params?.address, true)

    if (ens) {
      return {
        props: {
          ...(await serverSideTranslations(context.locale || 'en', ['common'], null, ['en'])),
          poolAddress: params?.address || '',
          name: ens.name ? ens.name : '',
          avatar: ens.avatar ? ens.avatar : ''
        }
      }
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'], null, ['en'])),
      poolAddress: params?.address || ''
    }
  }
}
