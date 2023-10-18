import styled from "styled-components"

export default function CommunitySidebarRegister() {
  const { t } = useLocaleTranslation()

  const router = useRouter()
  const { currency, network } = router.query
  const { setItem } = useLocalStorage()

  const changeLocale = (newLocale: string) => {
    router.push(router.pathname, router.asPath, { locale: newLocale })
  }

  const changeCurrency = (newCurrency: string) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, currency: newCurrency }
    })

    setItem('currency', newCurrency)
  }

  const changeNetwork = (newNetwork: string) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, network: newNetwork }
    })
    setItem('network', newNetwork)
  }

  return (
   
  )
}

const { Container } = {

  Container: styled.div``
}
