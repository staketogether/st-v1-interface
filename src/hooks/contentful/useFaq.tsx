import { contentfulClient } from '@/config/apollo'
import { queryContentfulFaq } from '@/queries/contentful/queryContentfulFaq'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type Faq = {
  question: string
  answer: string
}

export default function useFaq() {
  const [faqList, setFaqList] = useState<Faq[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const requestLocale = router.locale === 'en' ? 'en-US' : router.locale
  const { data, loading } = useQuery<{ faqCollection: { items: Faq[] } }>(queryContentfulFaq, {
    variables: {
      locale: requestLocale
    },
    client: contentfulClient
  })

  useEffect(() => {
    if (data) {
      setFaqList(data.faqCollection.items)
    }
  }, [data])

  useEffect(() => {
    setIsLoading(loading)
  }, [loading, setIsLoading])

  return { faqList, isLoading }
}
