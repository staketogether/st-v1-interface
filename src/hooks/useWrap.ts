import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import stSymbol from '@assets/st-symbol.svg'
import wstpSymbol from '@assets/wstp-symbol.svg'
import useStAccount from '@/hooks/subgraphs/useStAccount'
import useConnectedAccount from '@/hooks/useConnectedAccount'
import chainConfig from '@/config/chain'
import { useStakeTogetherAllowance, useStakeTogetherWrapperBalanceOf } from '@/types/Contracts'

export type WrapWidgetToken = {
  address: `0x${string}`
  symbol: string
  icon: string
  balance: bigint
  loading?: boolean
  allowance: bigint
}

type UseWrapProps = {
  isUnwraping?: boolean
}

export function useWrap({ isUnwraping = false }: UseWrapProps) {
  const { t } = useLocaleTranslation()
  const { account } = useConnectedAccount()
  const { accountBalance, accountIsLoading } = useStAccount(account)
  const { contracts } = chainConfig()
  const token1Address = contracts.StakeTogether
  const token2Address = contracts.WrappedStageTogether

  const { data: allowanceToken2ToToken1, isLoading: isLoadingAllowanceToken2ToToken1 } =
    useStakeTogetherAllowance({
      address: token2Address,
      args: [account!, token1Address],
      enabled: !!account
    })

  const { data: allowanceToken1ToToken2, isLoading: isLoadingAllowanceToken1ToToken2 } =
    useStakeTogetherAllowance({
      address: token1Address,
      args: [account!, token2Address],
      enabled: !!account
    })

  const { data: balanceOfToken2, isLoading: isLoadingBalanceOfToken2 } = useStakeTogetherWrapperBalanceOf({
    address: token2Address,
    args: [account!],
    enabled: !!account
  })

  const token1: WrapWidgetToken = {
    address: token1Address,
    icon: stSymbol,
    symbol: t('lsd.symbol'),
    balance: accountBalance || BigInt(0),
    loading: accountIsLoading || isLoadingAllowanceToken1ToToken2,
    allowance: BigInt(allowanceToken2ToToken1 || '0')
  }

  const token2: WrapWidgetToken = {
    address: token2Address,
    icon: wstpSymbol,
    symbol: t('wstp.symbol'),
    balance: BigInt(balanceOfToken2 || '0'),
    loading: accountIsLoading || isLoadingAllowanceToken2ToToken1 || isLoadingBalanceOfToken2,
    allowance: BigInt(allowanceToken1ToToken2 || '0')
  }

  const tokens = isUnwraping ? [token2, token1] : [token1, token2]

  return { tokens }
}

export default useWrap
