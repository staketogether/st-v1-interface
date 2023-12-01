import { makeVar, useReactiveVar } from '@apollo/client'
import { useCallback } from 'react'

type WalletSidebar = boolean

const reactiveVar = makeVar<WalletSidebar>(false)

export default function useProjectCreateModal() {
  const isOpenProjectCreateModal = useReactiveVar(reactiveVar)
  const setOpenProjectCreateModal = useCallback((value: WalletSidebar) => reactiveVar(value), [])
  return { isOpenProjectCreateModal, setOpenProjectCreateModal }
}
