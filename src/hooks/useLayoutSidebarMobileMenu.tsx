import { makeVar, useReactiveVar } from '@apollo/client'

const sidebarMobileMenuVar = makeVar(false)

export default function useLayoutSidebarMobileMenu() {
  const openSidebarMobileMenu = useReactiveVar(sidebarMobileMenuVar)
  const setOpenSidebarMobileMenu = (value: boolean) => {
    sidebarMobileMenuVar(value)
  }
  return { openSidebarMobileMenu, setOpenSidebarMobileMenu }
}
