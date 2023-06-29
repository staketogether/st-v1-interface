import { makeVar, useReactiveVar } from '@apollo/client'

type WalletSidebar = boolean

const reactiveVar = makeVar<WalletSidebar>(false)

export default function useWalletSidebarConnectWallet() {
  const openSidebarConnectWallet = useReactiveVar(reactiveVar)
  const setOpenSidebarConnectWallet = (value: WalletSidebar) => reactiveVar(value)
  return { openSidebarConnectWallet, setOpenSidebarConnectWallet }
}
