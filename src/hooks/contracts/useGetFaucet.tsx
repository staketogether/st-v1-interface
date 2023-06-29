// import { notification } from 'antd'
// import { useState } from 'react'
// import { useWaitForTransaction } from 'wagmi'
// import chainConfig from '../../config/chain'
// import { usePrepareStakeTogetherDepositPool, useStakeTogetherDepositPool } from '../../types/Contracts'
// import useTranslation from '../useTranslation'

// export default function useGetFaucet(code: string, accountAddress: `0x${string}`, enabled: boolean) {
//   const { contracts } = chainConfig()
//   const [awaitWalletAction, setAwaitWalletAction] = useState(false)
//   const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined)

//   const { config } = usePrepareStakeTogetherDepositPool({
//     address: contracts.StakeTogether,
//     args: [poolAddress, referral],
//     account: accountAddress,
//     gas: 300000n,
//     enabled: enabled,
//     value: code
//   })

//   const tx = useStakeTogetherDepositPool({
//     ...config,
//     onSuccess: data => {
//       if (data?.hash) {
//         setTxHash(data?.hash)
//       }
//     },
//     onError: () => {
//       setAwaitWalletAction(false)
//     }
//   })

//   const { isLoading } = useWaitForTransaction({
//     hash: txHash,
//     onSuccess: () => {
//       notification.success({
//         message: `${t('notifications.withdrawSuccess')}: ${code}`,
//         placement: 'topRight'
//       })
//     },
//     onError: () => {
//       notification.error({
//         message: `${t('notifications.withdrawError')}: ${code}`,
//         placement: 'topRight'
//       })
//     }
//   })

//   const { t } = useTranslation()

//   const resetState = () => {
//     setAwaitWalletAction(false)
//     setTxHash(undefined)
//   }

//   const getFaucet = () => {
//     setAwaitWalletAction(true)
//     tx.write?.()
//   }

//   return {
//     getFaucet,
//     isLoading,
//     estimateGas: '0',
//     awaitWalletAction,
//     txHash,
//     resetState
//   }
// }
