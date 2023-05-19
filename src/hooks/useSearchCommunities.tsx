import { useEffect, useState } from 'react'
import getSearchCommunities from '../services/getSearchCommunities'
import { Community } from '../types/Community'

export default function useSearchCommunities(addresses: `0x${string}`[]) {
  const [searchCommunities, setSearchCommunities] = useState<Community[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const getCommunities = async () => {
      try {
        const communities = await getSearchCommunities(addresses)
        setSearchCommunities(communities)
        setIsLoading(false)
        setIsSuccess(true)
      } catch (error) {
        setIsError(true)
      }
    }

    getCommunities()
  }, [addresses])

  return { searchCommunities, isLoading, isSuccess, isError, setSearchCommunities }
}
