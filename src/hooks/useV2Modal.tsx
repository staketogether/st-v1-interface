import { makeVar, useReactiveVar } from '@apollo/client'

const reactiveVar = makeVar(true)

export default function useV2Modal() {
  const openModal = useReactiveVar(reactiveVar)
  const setOpenModal = (value: boolean) => reactiveVar(value)
  return { openModal, setOpenModal }
}
