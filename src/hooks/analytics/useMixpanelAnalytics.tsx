import mixpanel from 'mixpanel-browser'
import { useCallback, useState } from 'react'

export const useMixpanelAnalytics = () => {
  const [isInitialized, setIsInitialized] = useState(false)

  const init = useCallback(() => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return
    }

    mixpanel.init(`${process.env.NEXT_PUBLIC_MIXPANEL_ID}`, {
      debug: false,
      persistence: 'localStorage'
    })
    setIsInitialized(true)
  }, [])

  const registerConnectWallet = useCallback(
    (account: string, chainId: number) => {
      if (!isInitialized) {
        return
      }

      mixpanel.track('Wallet Connected', {
        walletAddress: account,
        chainId: chainId,
        path: window.location.pathname
      })
    },
    [isInitialized]
  )

  const registerPageView = useCallback(
    (account: string, chainId: number) => {
      if (!isInitialized) {
        return
      }

      mixpanel.track('Page View', {
        path: window.location.pathname,
        referrer: window.document.referrer,
        walletAddress: account,
        chainId: chainId
      })
    },
    [isInitialized]
  )

  const registerDeposit = useCallback(
    (walletAddress: string, chainId: number, poolAddress: string, amount: string) => {
      if (!isInitialized) {
        return
      }

      mixpanel.track('Deposit', {
        walletAddress,
        chainId,
        amount,
        poolAddress,
        path: window.location.pathname
      })
    },
    [isInitialized]
  )

  const registerWithdraw = useCallback(
    (walletAddress: string, chainId: number, poolAddress: string, amount: string) => {
      if (!isInitialized) {
        return
      }

      mixpanel.track('Withdraw', {
        walletAddress,
        chainId,
        amount,
        poolAddress,
        path: window.location.pathname
      })
    },
    [isInitialized]
  )

  return {
    isInitialized,
    init,
    registerPageView,
    registerConnectWallet,
    registerDeposit,
    registerWithdraw
  }
}
