import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'

import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import TokensControl from '../../../../components/tokens/TokensControl'
import BuyEthControlModal from '@/components/ramp/BuyEthControlModal'
import { useEffect } from 'react'
import { openBrlaModalVar } from '@/hooks/ramp/useControlModal'
import axios from 'axios'
import { SWRConfig } from 'swr'
import { globalConfig } from '@/config/global'

export default function Tokens() {
  const { backendUrl } = globalConfig

  useEffect(() => {
    openBrlaModalVar(true)
  }, [])
  
  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        revalidateOnMount: true,
        revalidateIfStale: true,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        errorRetryCount: 100,
        shouldRetryOnError: true,
        fetcher: (uri: string) => axios.get(`${backendUrl}/${uri}`).then(res => {
          return res.data
        },)
      }}
    >
    <LayoutTemplate>
      <Metatags />
      <BuyEthControlModal />
      <TokensControl />
    </LayoutTemplate>
    </SWRConfig>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common']))
    }
  }
}
