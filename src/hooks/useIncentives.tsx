import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import useLocaleTranslation from './useLocaleTranslation'

export default function useIncentives(accountAddress?: string) {
  const { t } = useLocaleTranslation()

  const [incentives, setIncentives] = useState<{ name: string; description: string; amount: bigint }[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [amount, setAmount] = useState<bigint>(0n)

  const whitelist = ['0x81c5a12fe0190f792009e3bbcff9c980867614bb', '0xC3afC9D818e6ae917B079d9195374d819431722f']

  useEffect(() => {
    const getIncentives = () => {
      if (accountAddress && whitelist.includes(accountAddress.toLowerCase())) {
        const userIncentives = [
          {
            name: t('airdrop.incentives.pool'),
            description: t('airdrop.incentives.poolDescription'),
            amount: 0n
          },
          {
            name: t('airdrop.incentives.social'),
            description: t('airdrop.incentives.socialDescription'),
            amount: ethers.parseEther('1.23')
          },
          {
            name: t('airdrop.incentives.early'),
            description: t('airdrop.incentives.earlyDescription'),
            amount: ethers.parseEther('2.42')
          },
          {
            name: t('airdrop.incentives.gifts'),
            description: t('airdrop.incentives.giftsDescription'),
            amount: ethers.parseEther('0.05')
          }
        ]

        const totalAmount = userIncentives.reduce((acc, curr) => acc + curr.amount, 0n)

        return {
          incentives: userIncentives,
          amount: totalAmount
        }
      }

      const defaultIncentives = [
        {
          name: t('airdrop.incentives.pool'),
          description: t('airdrop.incentives.poolDescription'),
          amount: 0n
        },
        {
          name: t('airdrop.incentives.social'),
          description: t('airdrop.incentives.socialDescription'),
          amount: 0n
        },
        {
          name: t('airdrop.incentives.early'),
          description: t('airdrop.incentives.earlyDescription'),
          amount: 0n
        },
        {
          name: t('airdrop.incentives.gifts'),
          description: t('airdrop.incentives.giftsDescription'),
          amount: 0n
        }
      ]

      const totalAmount = defaultIncentives.reduce((acc, curr) => acc + curr.amount, 0n)

      return {
        incentives: defaultIncentives,
        amount: totalAmount
      }
    }

    const current = getIncentives()

    setIncentives(current.incentives)
    setAmount(current.amount)
    setLoading(false)
  }, [accountAddress, t, whitelist])

  return {
    loading,
    incentives,
    amount
  }
}
