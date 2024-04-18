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
          amount: 50000000000000000n,
          claimed: true,
          txHash: '1',
          address: '0x0207b8e2d327dedba89056118382586d7fb0e4f5',
          winner: '0xC3afC9D818e6ae917B079d9195374d819431722f'
        },
        {
          id: '2',
          type: 'coffee',
          data: getCurrentTimePlus30MinutesTimestamp(),
          amount: 50000000000000000n,
          claimed: true,
          txHash: '1',
          address: '0x0207b8e2d327dedba89056118382586d7fb0e4f5',
          winner: '0xC3afC9D818e6ae917B079d9195374d819431722f'
        },
        {
          id: '3',
          type: 'coffee',
          data: getCurrentTimePlus30MinutesTimestamp(),
          amount: 50000000000000000n,
          claimed: true,
          txHash: '1',
          address: '0x0207b8e2d327dedba89056118382586d7fb0e4f5',
          winner: '0xb327bCbFA79380b8111e3D2EAB0F3F8b0A69D54f'
        },
        {
          id: '4',
          type: 'coffee',
          data: getCurrentTimePlus30MinutesTimestamp(),
          amount: 50000000000000000n,
          claimed: true,
          txHash: '1',
          address: '0x0207b8e2d327dedba89056118382586d7fb0e4f5',
          winner: '0x81C5A12Fe0190F792009e3bBcFf9C980867614BB'
        }
      ]

      const gift = listMock.find(item => item.winner.toLowerCase() === account.toLowerCase())
      if (gift) {
        setUserGift(gift)
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
