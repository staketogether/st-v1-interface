import { makeVar, useReactiveVar } from '@apollo/client'

type WalletSidebar = boolean

const reactiveVar = makeVar<WalletSidebar>(false)

export default function useProjectEditModal() {
  const isOpenProjectEditModal = useReactiveVar(reactiveVar)
  const setProjectEditModal = (value: WalletSidebar) => reactiveVar(value)
  return { isOpenProjectEditModal, setProjectEditModal }
}
