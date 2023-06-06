import { makeVar, useReactiveVar } from '@apollo/client'

const reactiveVar = makeVar(false)

export default function useSearchHeader() {
  const isOpen = useReactiveVar(reactiveVar)
  const setOpenSearchHeader = (value: boolean) => reactiveVar(value)
  return { isOpen, setOpenSearchHeader }
}
