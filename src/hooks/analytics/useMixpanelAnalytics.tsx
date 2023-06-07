import mixpanel from 'mixpanel-browser'
import { useCallback, useState } from "react";

export const useMixpanelAnalytics = () => {
  const [isInitialized, setIsInitialized] = useState(false)

  const init = useCallback(() => {
    mixpanel.init(`${process.env.NEXT_PUBLIC_MIXPANEL_ID}`, {
      debug: true,
      persistence: 'localStorage'
    })
    setIsInitialized(true)
  }, [])

  const registerConnectWallet = useCallback((account: string, chainId: number) => {
    mixpanel.track('Wallet Connected', {
      walletAddress: account,
      chainId: chainId,
      path: window.location.pathname
    })
  }, [])

  const registerPageView = useCallback((account: string, chainId: number) => {
    mixpanel.track('Page View', {
      path: window.location.pathname,
      referrer: window.document.referrer,
      walletAddress: account,
      chainId: chainId
    })
  }, [])

  const registerDeposit = useCallback((walletAddress: string, chainId: number, poolAddress: string, amount: string) => {
    mixpanel.track('Deposit', {
      walletAddress,
      chainId,
      amount,
      poolAddress,
      path: window.location.pathname
    })
  }, [])

  const registerWithdraw = useCallback((walletAddress: string, chainId: number, poolAddress: string, amount: string) => {
    mixpanel.track('Withdraw', {
      walletAddress,
      chainId,
      amount,
      poolAddress,
      path: window.location.pathname
    })
  }, [])

  return {
    isInitialized,
    init,
    registerPageView,
    registerConnectWallet,
    registerDeposit,
    registerWithdraw
  }
}
