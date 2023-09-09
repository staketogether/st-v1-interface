import { Gift } from '@/types/Gift'
import { useEffect, useState } from 'react'

export default function useGiftHistory() {
  const [giftHistory, setGiftHistory] = useState<Gift[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getHistory = () => {
      const listMock: Gift[] = [
        {
          id: '1',
          type: 'coffee',
          data: new Date().getTime(),
          amount: 5000000000000000n,
          claimed: true,
          txHash: '1',
          address: '0x4b1a2ee5e367c1f8ea5f68ab66288a8e8d157860',
          winner: '0x1B11ecba5e34cA0D9BAA8D281Faf0901c941f638'
        },
        {
          id: '2',
          type: 'coffee',
          data: new Date().getTime(),
          amount: 5000000000000000n,
          claimed: true,
          txHash: '1',
          address: '0x0f2e3e67cb000993d07e60261748963d3f4bd6d9',
          winner: '0x1d930E421dFD2F02BBD9B0c3B877d0eD3FBd1343'
        },
        {
          id: '3',
          type: 'coffee',
          data: new Date().getTime(),
          amount: 5000000000000000n,
          claimed: true,
          txHash: '1',
          address: '0x4b1a2ee5e367c1f8ea5f68ab66288a8e8d157860',
          winner: '0xb327bCbFA79380b8111e3D2EAB0F3F8b0A69D54f'
        },
        {
          id: '4',
          type: 'coffee',
          data: new Date().getTime(),
          amount: 5000000000000000n,
          claimed: true,
          txHash: '1',
          address: '0xf6e525bcbdc574b4b275f884b836d18fb1c6dda3',
          winner: '0x81C5A12Fe0190F792009e3bBcFf9C980867614BB'
        }
      ]

      return listMock
    }

    setGiftHistory(getHistory())
    setLoading(false)
  }, [])

  return {
    loading,
    giftHistory
  }
}
