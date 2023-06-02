import { makeVar, useReactiveVar } from '@apollo/client'

const reactiveVar = makeVar(false)

export default function useSearchDrawer() {
  const isOpen = useReactiveVar(reactiveVar)
  const setOpenSearchDrawer = (value: boolean) => reactiveVar(value)
  return { isOpen, setOpenSearchDrawer }
}
