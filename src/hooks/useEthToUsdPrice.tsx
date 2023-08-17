import axios from 'axios'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

export default function useEthToUsdPrice(eth: string) {
  const [price, setPrice] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<unknown>(null)

  const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
  const USDC_ADDRESS = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'

  useEffect(() => {
    const fetchPrice = async () => {
      const ethAmount = eth.length > 0 ? ethers.parseEther(eth) : 0n
      const config = {
        params: {
          src: ETH_ADDRESS,
          dst: USDC_ADDRESS,
          amount: ethAmount.toString()
        }
      }
      const url = 'https://api.1inch.dev/swap/v5.2/1/quote'
      try {
        if (ethAmount > 0n) {
          const response = await axios.get(url, config)
          const price = ethers.parseUnits(response.data.toAmount, 12)

          setPrice(price.toString())
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
