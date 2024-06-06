import { makeVar, useReactiveVar } from '@apollo/client'

type HeaderDrawer = boolean

const reactiveVar = makeVar<HeaderDrawer>(false)

export default function useHeaderDrawer() {
  const openDrawer = useReactiveVar(reactiveVar)
  const setOpenDrawer = (value: HeaderDrawer) => reactiveVar(value)
  return { openDrawer, setOpenDrawer }
}