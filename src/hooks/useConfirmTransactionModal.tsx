import { makeVar, useReactiveVar } from '@apollo/client'

const reactiveVar = makeVar(false)

export default function useConfirmTransactionModal() {
  const isOpen = useReactiveVar(reactiveVar)
  const setConfirmTransactionModal = (value: boolean) => reactiveVar(value)
  return { isOpen, setConfirmTransactionModal }
}
