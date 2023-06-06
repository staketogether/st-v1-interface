import { useEffect, useState } from "react";
import mixpanel from 'mixpanel-browser'
import { useRouter } from "next/router";
import useConnectedAccount from "@/hooks/useConnectedAccount";
import chainConfig from "@/config/chain";

export const Mixpanel = () => {
  const [mixpanelInitialized, setMixpanelInitialized] = useState(false)
  const router = useRouter()
  const { account, accountIsConnected } = useConnectedAccount()
  const chain = chainConfig()
  
  useEffect(() => {
    mixpanel.init(`${process.env.NEXT_PUBLIC_MIXPANEL_ID}`)
    setMixpanelInitialized(true)
  }, [])
  
  useEffect(() => {
    if (!mixpanelInitialized) {
      return
    }

    router.events.on('routeChangeComplete', () => {
      mixpanel.track('Page View', {
        path: window.location.pathname,
        referrer: window.document.referrer,
        walletAddress: accountIsConnected ? account : 'Not Connected',
        chainId: chain.chainId
      })
    })
  }, [account, accountIsConnected, mixpanelInitialized, router])
}
