import { useEffect, useState } from 'react'
import useLocaleTranslation from './useLocaleTranslation'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function useIncentives(accountAddress?: string) {
  const { t } = useLocaleTranslation()

  const [incentives, setIncentives] = useState<{ name: string; description: string; amount: bigint }[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [amount, setAmount] = useState<bigint>(0n)

  useEffect(() => {
    const getIncentives = () => {
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
  }, [t])

  return {
    loading,
    incentives,
    amount
  }
}
