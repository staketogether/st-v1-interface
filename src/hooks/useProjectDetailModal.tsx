import { makeVar, useReactiveVar } from '@apollo/client'

const reactiveVar = makeVar(false)

export default function useProjectDetailModal() {
  const isOpenProjectDetailModal = useReactiveVar(reactiveVar)
  const setProjectDetailModal = (value: boolean) => reactiveVar(value)
  return { isOpenProjectDetailModal, setProjectDetailModal }
}
