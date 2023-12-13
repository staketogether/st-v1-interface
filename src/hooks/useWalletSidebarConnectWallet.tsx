import { makeVar, useReactiveVar } from '@apollo/client'
import { useCallback } from 'react'

type WalletSidebar = boolean

const reactiveVar = makeVar<WalletSidebar>(false)

export default function useWalletSidebarConnectWallet() {
  const openSidebarConnectWallet = useReactiveVar(reactiveVar)
  const setOpenSidebarConnectWallet = useCallback((value: WalletSidebar) => reactiveVar(value), [])
  return { openSidebarConnectWallet, setOpenSidebarConnectWallet }
}
