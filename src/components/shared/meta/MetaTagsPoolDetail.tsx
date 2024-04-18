import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { ContentfulPool } from '@/types/ContentfulPool'
import Head from 'next/head'

type MetaTagsPoolDetailProps = {
  poolDetail?: ContentfulPool
}

export function MetaTagsPoolDetail({ poolDetail }: MetaTagsPoolDetailProps) {
  const { t } = useLocaleTranslation()
  const descriptionPt = t('v2.meta.stake.description').replace('projectName', poolDetail?.name || '')
  const image = poolDetail && poolDetail.logo?.url ? poolDetail.logo.url : `/assets/icons/stake-together/meta.png`
  return (
    <Head>
      <>
        <meta property='og:description' content={descriptionPt} key='ogDescription' />
        <meta property='og:image' content={image} key='ogImage' />
        <meta property='twitter:card' content='summary_large_image' key='xImageLarge' />
        <meta property='twitter:description' content={descriptionPt} key='xDescription' />
        <meta property='twitter:image' content={image} key='xImage' />
      </>

      <link rel='apple-touch-icon' sizes='180x180' href={`/assets/icons/stake-together/apple-touch-icon.png`} />
      <link rel='icon' type='image/png' sizes='32x32' href={`/assets/icons/stake-together/favicon-32x32.png`} />
      <link rel='icon' type='image/png' sizes='16x16' href={`/assets/icons/stake-together/favicon-16x16.png`} />
      <link rel='manifest' href={`/assets/icons/stake-together/site.webmanifest`} />
      <link rel='mask-icon' href={`/assets/icons/stake-together/safari-pinned-tab.svg' color='#373b8a`} />
      <link rel='shortcut icon' href={`/assets/icons/stake-together/favicon.ico`} />
      <meta name='apple-mobile-web-app-title' content='Stake Together' />
      <meta name='application-name' content='Stake Together' />
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta name='msapplication-config' content={`/assets/icons/stake-togetherbrowserconfig.xml`} />
      <meta name='theme-color' content='#ffffff' />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
        href={`/assets/icons/stake-together/splash-screens/iPhone_14_Pro_Max_landscape.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
        href={`/assets/icons/stake-together/splash-screens/iPhone_14_Pro_landscape.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
        href={`/assets/icons/stake-together/splash-screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
        href={`/assets/icons/stake-together/splash-screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
        href={`/assets/icons/stake-together/splash-screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
        href={`/assets/icons/stake-together/splash-screens/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
        href={`/assets/icons/stake-together/splash-screens/iPhone_11__iPhone_XR_landscape.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
        href={`/assets/icons/stake-together/splash-screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
        href={`/assets/icons/stake-together/splash-screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
        href={`/assets/icons/stake-together/splash-screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
        href={`/assets/icons/stake-together/splash-screens/12.9__iPad_Pro_landscape.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
        href={`/assets/icons/stake-together/splash-screens/11__iPad_Pro__10.5__iPad_Pro_landscape.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
        href={`/assets/icons/stake-together/splash-screens/10.9__iPad_Air_landscape.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
        href={`/assets/icons/stake-together/splash-screens/10.5__iPad_Air_landscape.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
        href={`/assets/icons/stake-together/splash-screens/10.2__iPad_landscape.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
        href={`/assets/icons/stake-together/splash-screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
        href={`/assets/icons/stake-together/splash-screens/8.3__iPad_Mini_landscape.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        href={`/assets/icons/stake-together/splash-screens/iPhone_14_Pro_Max_portrait.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        href={`/assets/icons/stake-together/splash-screens/iPhone_14_Pro_portrait.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        href={`/assets/icons/stake-together/splash-screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        href={`/assets/icons/stake-together/splash-screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        href={`/assets/icons/stake-together/splash-screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        href={`/assets/icons/stake-together/splash-screens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        href={`/assets/icons/stake-together/splash-screens/iPhone_11__iPhone_XR_portrait.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
        href={`/assets/icons/stake-together/splash-screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        href={`/assets/icons/stake-together/splash-screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        href={`/assets/icons/stake-together/splash-screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        href={`/assets/icons/stake-together/splash-screens/12.9__iPad_Pro_portrait.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        href={`/assets/icons/stake-together/splash-screens/11__iPad_Pro__10.5__iPad_Pro_portrait.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        href={`/assets/icons/stake-together/splash-screens/10.9__iPad_Air_portrait.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        href={`/assets/icons/stake-together/splash-screens/10.5__iPad_Air_portrait.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        href={`/assets/icons/stake-together/splash-screens/10.2__iPad_portrait.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        href={`/assets/icons/stake-together/splash-screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png`}
      />
      <link
        rel='apple-touch-startup-image'
        media='screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
        href={`/assets/icons/stake-together/splash-screens/8.3__iPad_Mini_portrait.png`}
      />
    </Head>
  )
}
