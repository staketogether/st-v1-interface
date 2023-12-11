import { makeVar, useReactiveVar } from '@apollo/client'

type WalletSidebar = boolean

const reactiveVar = makeVar<WalletSidebar>(false)

export default function useWalletSidebarEditPortfolio() {
  const openSidebar = useReactiveVar(reactiveVar)
  const setOpenSidebar = (value: WalletSidebar) => reactiveVar(value)
  return { openSidebar, setOpenSidebar }
}
