import { makeVar, useReactiveVar } from '@apollo/client'

type WalletSidebar = boolean

const reactiveVar = makeVar<WalletSidebar>(false)

export default function useCommunityCreateModal() {
  const isOpenCommunityCreateModal = useReactiveVar(reactiveVar)
  const setCommunityCreateModal = (value: WalletSidebar) => reactiveVar(value)
  return { isOpenCommunityCreateModal, setCommunityCreateModal }
}
