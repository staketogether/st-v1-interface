import { makeVar, useReactiveVar } from '@apollo/client'
import { useCallback } from 'react'

type WalletSidebar = boolean

const reactiveVar = makeVar<WalletSidebar>(false)

export default function useWalletSidebarMobileSettings() {
  const walletSidebarMobileSettings = useReactiveVar(reactiveVar)
  const setWalletSidebarMobileSettings = useCallback((value: WalletSidebar) => reactiveVar(value), [])
  return { walletSidebarMobileSettings, setWalletSidebarMobileSettings }
}
