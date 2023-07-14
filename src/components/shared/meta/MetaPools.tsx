import Head from 'next/head'
import { globalConfig } from '../../../config/global'

export function MetaPools() {
  const { url } = globalConfig

  return (
    <Head>
      <title>Stake Together - Ethereum Staking for Communities</title>
      <meta name='title' content='Stake Together - Ethereum Staking for Communities' />
      <meta name='description' content='Growth your Community, Earn Ethereum doing Stake Together' />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={url} />
      <meta property='og:title' content='Stake Together - Ethereum Staking for Communities' />
      <meta property='og:description' content='Growth your Community, Earn Ethereum doing Stake Together' />
      <meta property='og:image' content={`${url}/assets/images/st_meta.jpg`} />
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content={url} />
      <meta property='twitter:title' content='Stake Together - Ethereum Staking for Communities' />
      <meta
        property='twitter:description'
        content='Growth your Community, Earn Ethereum doing Stake Together'
      />
      <meta property='twitter:image' content={`${url}/assets/images/st_meta.jpg`} />
      <link rel='apple-touch-icon' sizes='180x180' href={`${url}/assets/images/apple-touch-icon.png`} />
      <link rel='icon' type='image/png' sizes='32x32' href={`${url}/assets/images/favicon-32x32.png`} />
      <link rel='icon' type='image/png' sizes='16x16' href={`${url}/assets/images/favicon-16x16.png`} />
      <link rel='manifest' href={`${url}/site.webmanifest`} />
      <link rel='mask-icon' href={`${url}/assets/images/safari-pinned-tab.svg`} color='#89a8f2' />
      <meta name='msapplication-TileColor' content='#89a8f2' />
      <meta name='theme-color' content='#ffffff' />
    </Head>
  )
}
