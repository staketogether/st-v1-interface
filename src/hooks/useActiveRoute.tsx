import { useRouter } from 'next/router'

export default function useActiveRoute() {
  const router = useRouter()
  const currentPath = router.pathname

  const isActive = (route: string) => {
    return currentPath.includes(route)
  }
  return { isActive }
}
