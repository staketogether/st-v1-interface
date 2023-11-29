import { makeVar, useReactiveVar } from '@apollo/client'

const reactiveVar = makeVar(false)

export default function useConfirmTermsModal() {
  const isOpen = useReactiveVar(reactiveVar)
  const setOpen = (value: boolean) => reactiveVar(value)
  return { isOpen, setOpen }
}
