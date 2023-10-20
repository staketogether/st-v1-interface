import { contentfulClient } from '@/config/apollo'
import { queryContentfulCategoryCollection } from '@/queries/contentful/queryContentfulCategoryCollection'
import { ContentFulCategory } from '@/types/ContentfulPool'
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'

export default function useContentfulCategoryCollection() {
  const [categories, setCategories] = useState<ContentFulCategory[] | null>(null)
  const [poolsIsLoading, setPoolsIsLoading] = useState<boolean>(false)

  const { data, loading } = useQuery<{ categoryCollection: { items: ContentFulCategory[] } }>(
    queryContentfulCategoryCollection,
    {
      client: contentfulClient
    }
  )

  useEffect(() => {
    // remove this logic when collection no more duplicates on contentful
    if (data?.categoryCollection.items) {
      const clearOptions: ContentFulCategory[] = []
      data?.categoryCollection.items.every(
        item => !clearOptions.find(option => option.name.includes(item.name)) && clearOptions.push(item)
      )
      setCategories(clearOptions)
    }
  }, [data])

  useEffect(() => {
    setPoolsIsLoading(loading)
  }, [loading, setPoolsIsLoading])

  return { categories, loading: poolsIsLoading }
}
