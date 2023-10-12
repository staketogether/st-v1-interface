import { useRouter } from 'next/router'

export const WrapContainer = () => {
  const router = useRouter()
  console.log(router.query.slug)
  return <div>{router.query.slug?.includes('unwrap') ? <div>unwrap</div> : <div>wrap</div>}</div>
}
export default WrapContainer
