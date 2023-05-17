import { makeVar, useReactiveVar } from '@apollo/client'

type ModalCommunities = boolean

const reactiveVar = makeVar<ModalCommunities>(false)

export default function useModalCommunity() {
  const openModal = useReactiveVar(reactiveVar)
  const setOpenModal = (value: ModalCommunities) => reactiveVar(value)
  return { openModal, setOpenModal }
}
