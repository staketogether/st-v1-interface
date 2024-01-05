import { makeVar, useReactiveVar } from '@apollo/client'

const reactiveVar = makeVar(false)

export default function useIncentiveConfirmTransactionModal() {
  const isOpen = useReactiveVar(reactiveVar)
  const setIsOpen = (value: boolean) => reactiveVar(value)
  return { isOpen, setIsOpen }
}
