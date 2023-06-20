import { makeVar, useReactiveVar } from '@apollo/client'

const reactiveVar = makeVar(false)

export default function useStakeConfirmModal() {
  const isOpen = useReactiveVar(reactiveVar)
  const setOpenStakeConfirmModal = (value: boolean) => reactiveVar(value)
  return { isOpen, setOpenStakeConfirmModal }
}
