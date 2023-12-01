import { useEffect, useState } from 'react'

import chainConfig from '@/config/chain'

const useBlockCountdown = (targetBlock: number) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null)

  useEffect(() => {
    const provider = chainConfig().provider
    const averageBlockTimeSeconds = 15
    let intervalId: NodeJS.Timeout | null = null

    const fetchBlockTime = async () => {
      try {
        const currentBlock: number = await provider.getBlockNumber()
        const remainingBlocks: number = targetBlock - currentBlock

        if (remainingBlocks > 0) {
          const remainingTime: number = remainingBlocks * averageBlockTimeSeconds * 1000
          setTimeLeft(remainingTime)
        } else {
          setTimeLeft(0)
          if (intervalId) {
            clearInterval(intervalId)
            intervalId = null
          }
        }
      } catch (error) {
        setTimeLeft(null)
      }
    }

    fetchBlockTime()

    intervalId = setInterval(fetchBlockTime, 30000)

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [targetBlock])

  return timeLeft
}

export default useBlockCountdown
