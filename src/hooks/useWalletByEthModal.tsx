import { makeVar, useReactiveVar } from '@apollo/client'

const reactiveVar = makeVar(false)

export default function useWalletByEthModal() {
  const openModal = useReactiveVar(reactiveVar)
  const setOpenModal = (value: boolean) => reactiveVar(value)
  return { openModal, setOpenModal }
}
