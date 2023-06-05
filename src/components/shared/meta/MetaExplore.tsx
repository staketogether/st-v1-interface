import Head from 'next/head'
import { globalConfig } from '../../../config/global'

export function MetaExplore() {
  const { url } = globalConfig

  return (
    <Head>
      <title>Stake Together - Ethereum Staking for Communities</title>
      <meta name='title' content='Stake Together - Ethereum Staking for Communities' />
      <meta name='description' content='Growth your Community, Earn Ethereum doing Stake Together' />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={url} />
      <meta property='og:title' content='Stake Together - Ethereum Staking for Communities' />
      <meta
        property='og:description'
        content='Growth your Community, Earn Ethereum doing Stake Together'
      />
      <meta property='og:image' content={`${url}/images/st_meta.jpg`} />

      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content='https://beta.staketogether.app/explore' />
      <meta property='twitter:title' content='Stake Together - Ethereum Staking for Communities' />
      <meta
        property='twitter:description'
        content='Growth your Community, Earn Ethereum doing Stake Together'
      />
      <meta property='twitter:image' content={`${url}/images/st_meta.jpg`} />
    </Head>
  )
}
