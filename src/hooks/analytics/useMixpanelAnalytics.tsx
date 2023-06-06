import mixpanel from 'mixpanel-browser'
import { useState } from 'react'

export const useMixpanelAnalytics = () => {
  const [isInitialized, setIsInitialized] = useState(false)

  return {
    isInitialized,
    init: () => {
      mixpanel.init(`${process.env.NEXT_PUBLIC_MIXPANEL_ID}`, {
        debug: true,
        persistence: 'localStorage'
      })
      setIsInitialized(true)
    },
    registerPageView: (account: string, chainId: number) => {
      mixpanel.track('Page View', {
        path: window.location.pathname,
        referrer: window.document.referrer,
        walletAddress: account,
        chainId: chainId
      })
    },
    registerConnectWallet: (account: string, chainId: number) => {
      mixpanel.track('Wallet Connected', {
        walletAddress: account,
        chainId: chainId,
        path: window.location.pathname
      })
    },
    registerDeposit: (account: string, chainId: number, amount: string) => {
      mixpanel.track('Deposit', {
        walletAddress: account,
        chainId: chainId,
        amount: amount,
        path: window.location.pathname
      })
    },
    registerWithdraw: (account: string, chainId: number, amount: string) => {
      mixpanel.track('Withdraw', {
        walletAddress: account,
        chainId: chainId,
        amount: amount,
        path: window.location.pathname
      })
    }
  }
}
