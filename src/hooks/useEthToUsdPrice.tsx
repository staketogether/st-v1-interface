import axios from 'axios'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

export default function useEthToUsdPrice(eth: string) {
  const [price, setPrice] = useState<bigint | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<unknown>(null)

  const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
  const USDC_ADDRESS = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'

  useEffect(() => {
    const fetchPrice = async () => {
      const ethAmount = eth.length > 0 ? ethers.parseEther(eth) : 0n

      try {
        if (ethAmount > 0n) {
          const response = await axios.get('https://api.1inch.io/v5.0/1/quote', {
            params: {
              fromTokenAddress: ETH_ADDRESS,
              toTokenAddress: USDC_ADDRESS,
              amount: ethAmount.toString()
            }
          })

          const price = ethers.parseUnits(response.data.toTokenAmount, 12)

          setPrice(price)
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
