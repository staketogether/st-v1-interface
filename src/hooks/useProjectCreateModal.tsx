import { makeVar, useReactiveVar } from '@apollo/client'

type WalletSidebar = boolean

const reactiveVar = makeVar<WalletSidebar>(false)

export default function useProjectCreateModal() {
  const isOpenProjectCreateModal = useReactiveVar(reactiveVar)
  const setOpenProjectCreateModal = (value: WalletSidebar) => reactiveVar(value)
  return { isOpenProjectCreateModal, setOpenProjectCreateModal }
}
