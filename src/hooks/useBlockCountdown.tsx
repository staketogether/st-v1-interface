import { useEffect, useState } from 'react'

import chainConfig from '@/config/chain'

const useBlockCountdown = (targetBlock: number) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null)

  useEffect(() => {
    const provider = chainConfig().provider

    const fetchBlockTime = async () => {
      try {
        const currentBlock: number = await provider.getBlockNumber()
        const remainingBlocks: number = targetBlock - currentBlock

        if (remainingBlocks > 0) {
          const currentBlockInfo = await provider.getBlock(currentBlock)
          const previousBlockNumber: number = (currentBlockInfo && currentBlockInfo.number - 1) || 0
          const previousBlock = await provider.getBlock(previousBlockNumber)

          let averageBlockTime: number = 0
          if (currentBlockInfo && previousBlock) {
            averageBlockTime = currentBlockInfo.timestamp - previousBlock.timestamp
          }
          const remainingTime: number = remainingBlocks * averageBlockTime * 1000
          setTimeLeft(remainingTime)
        } else {
          setTimeLeft(0)
        }
      } catch (error) {
        console.error('Erro ao buscar informações do bloco:', error)
        setTimeLeft(null)
      }
    }

    fetchBlockTime()

    const intervalId = setInterval(fetchBlockTime, 30000)

    return () => {
      clearInterval(intervalId)
    }
  }, [targetBlock, timeLeft])

  return timeLeft
}

export default useBlockCountdown
