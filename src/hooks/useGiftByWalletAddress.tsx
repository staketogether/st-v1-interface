import { Gift } from '@/types/Gift'
import { useEffect, useState } from 'react'

export default function useGiftByWalletAddress(account: `0x${string}`) {
  const [userGift, setUserGift] = useState<Gift | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    function getCurrentTimePlus30MinutesTimestamp() {
      const now = new Date()
      now.setMinutes(now.getMinutes() + 30)
      const timestamp = now.getTime()

      return timestamp
    }

    const getHistory = () => {
      const listMock: Gift[] = [
        {
          id: '1',
          type: 'coffee',
          data: getCurrentTimePlus30MinutesTimestamp(),
          amount: 5000000000000000n,
          claimed: true,
          txHash: '1',
          address: '0x0f2e3e67cb000993d07e60261748963d3f4bd6d9',
          winner: '0x1B11ecba5e34cA0D9BAA8D281Faf0901c941f638'
        },
        {
          id: '2',
          type: 'coffee',
          data: getCurrentTimePlus30MinutesTimestamp(),
          amount: 5000000000000000n,
          claimed: true,
          txHash: '1',
          address: '0x0f2e3e67cb000993d07e60261748963d3f4bd6d9',
          winner: '0x1d930E421dFD2F02BBD9B0c3B877d0eD3FBd1343'
        },
        {
          id: '3',
          type: 'coffee',
          data: getCurrentTimePlus30MinutesTimestamp(),
          amount: 5000000000000000n,
          claimed: true,
          txHash: '1',
          address: '0x0f2e3e67cb000993d07e60261748963d3f4bd6d9',
          winner: '0xb327bCbFA79380b8111e3D2EAB0F3F8b0A69D54f'
        },
        {
          id: '4',
          type: 'coffee',
          data: getCurrentTimePlus30MinutesTimestamp(),
          amount: 5000000000000000n,
          claimed: true,
          txHash: '1',
          address: '0x0f2e3e67cb000993d07e60261748963d3f4bd6d9',
          winner: '0x81C5A12Fe0190F792009e3bBcFf9C980867614BB'
        }
      ]

      const userGift = listMock.find(item => item.winner.toLowerCase() === account.toLowerCase())
      if (userGift) {
        setUserGift(userGift)
      }
      setLoading(false)
    }

    getHistory()
  }, [account])

  return {
    loading,
    userGift
  }
}
