import axios from 'axios'
import { BigNumber, ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { truncateEther } from '../services/truncateEther'

export default function useEthToUsdPrice(eth: string) {
  const [price, setPrice] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    const fetchPrice = async () => {
      const ethAmount = eth.length > 0 ? ethers.utils.parseEther(eth) : BigNumber.from(0)

      try {
        if (ethAmount.gt(0)) {
          const response = await axios.get<{
            ethereum: {
              usd: number
            }
          }>('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')

          const price = response.data.ethereum.usd as number

          const usdAmount = ethers.utils.parseEther(price.toString()).mul(ethAmount)

          const usdAmountFixed = truncateEther(usdAmount.toString())

          setPrice(usdAmountFixed)
        } else {
          setPrice(undefined)
        }

        setLoading(false)
      } catch (error) {
        console.error('Error fetching ETH to USD price:', error)
        setError(error)
        setLoading(false)
      }
    }

    fetchPrice()
  }, [eth])

  return { price, loading, error }
}
