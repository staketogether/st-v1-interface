import { makeVar, useReactiveVar } from '@apollo/client'

const reactiveVar = makeVar(false)

export default function useModal() {
  const openModal = useReactiveVar(reactiveVar)
  const setOpenSidebar = (value: boolean) => reactiveVar(value)
  return { openModal, setOpenSidebar }
}
