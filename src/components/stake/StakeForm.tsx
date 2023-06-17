import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { globalConfig } from '../../config/global'

import chainConfig from '@/config/chain'
import { useMinDepositAmount } from '@/hooks/contracts/useMinDepositAmount'
import { useWithdrawalLiquidityBalance } from '@/hooks/contracts/useWithdrawalLiquidityBalance'
import useDelegationShares from '@/hooks/subgraphs/useDelegationShares'
import { ethers } from 'ethers'
import { useDebounce } from 'usehooks-ts'
import { useNetwork, useSwitchNetwork } from 'wagmi'
import useDeposit from '../../hooks/contracts/useDeposit'
import useEthBalanceOf from '../../hooks/contracts/useEthBalanceOf'
import useWithdraw from '../../hooks/contracts/useWithdraw'
import useTranslation from '../../hooks/useTranslation'
import { truncateEther } from '../../services/truncateEther'
import StakeButton from './StakeButton'
import StakeFormInput from './StakeInput'

type StakeFormProps = {
  type: 'deposit' | 'withdraw'
  accountAddress: `0x${string}`
  poolAddress: `0x${string}`
}

export function StakeForm({ type, accountAddress, poolAddress }: StakeFormProps) {
  const { fee } = globalConfig
  const { t } = useTranslation()
  const { balance: ethBalance, isLoading: balanceLoading } = useEthBalanceOf(accountAddress)
  const { delegationSharesFormatted, loading: delegationSharesLoading } = useDelegationShares(
    accountAddress,
    poolAddress
  )
  const { withdrawalLiquidityBalance } = useWithdrawalLiquidityBalance()

  const { minDepositAmount } = useMinDepositAmount()

  const [amount, setAmount] = useState<string>('')
  const debouncedAmount = useDebounce(amount, 1000)

  const inputAmount = debouncedAmount || '0'

  const {
    deposit,
    isSuccess: depositSuccess,
    isLoading: depositLoading
  } = useDeposit(inputAmount, accountAddress, poolAddress)

  const {
    withdraw,
    isLoading: withdrawLoading,
    isSuccess: withdrawSuccess
  } = useWithdraw(inputAmount, accountAddress, poolAddress)

  const rewardsFee = truncateEther(fee.protocol.mul(100).toString())

  const isLoading = depositLoading || withdrawLoading
  const isSuccess = depositSuccess || withdrawSuccess

  const balance = type === 'deposit' ? ethBalance : delegationSharesFormatted
  const actionLabel = type === 'deposit' ? t('form.deposit') : t('form.withdraw')
  const balanceLabel = type === 'deposit' ? t('eth.symbol') : t('lsd.symbol')
  const receiveLabel = type === 'deposit' ? t('lsd.symbol') : t('eth.symbol')

  const amountBigNumber = ethers.utils.parseEther(amount || '0')

  const insufficientFunds = amountBigNumber.gt(balance)
  const insufficientMinDeposit =
    type === 'deposit' && amountBigNumber.lt(minDepositAmount) && amount.length > 0
  const insufficientWithdrawalLiquidity =
    type === 'withdraw' && amountBigNumber.gt(withdrawalLiquidityBalance) && amount.length > 0

  const errorLabel =
    (insufficientFunds && t('form.insufficientFunds')) ||
    (insufficientMinDeposit &&
      `${t('form.insufficientMinDeposit')} ${truncateEther(minDepositAmount.toString())} ${t(
        'eth.symbol'
      )}`) ||
    (insufficientWithdrawalLiquidity &&
      `${t('form.insufficientLiquidity')} ${truncateEther(withdrawalLiquidityBalance.toString())} ${t(
        'lsd.symbol'
      )}`) ||
    ''

  const chain = chainConfig()
  const { chain: walletChainId } = useNetwork()
  const isWrongNetwork = chain.chainId !== walletChainId?.id
  const { switchNetworkAsync } = useSwitchNetwork({
    chainId: chain.chainId
  })

  useEffect(() => {
    if (isSuccess) {
      setAmount('')
    }
  }, [isSuccess])

  const handleActionButton = () => {
    if (isWrongNetwork && switchNetworkAsync) {
      switchNetworkAsync()
      return
    }
    if (type === 'deposit') {
      return deposit()
    }
    withdraw()
  }

  const handleLabelButton = () => {
    if (isWrongNetwork) {
      return `${t('switch')} ${chain.name.charAt(0).toUpperCase() + chain.name.slice(1)}`
    }
    if (insufficientFunds || insufficientWithdrawalLiquidity || insufficientMinDeposit) {
      return errorLabel
    }
    return actionLabel
  }

  return (
    <StakeContainer>
      <StakeFormInput
        value={amount}
        onChange={value => setAmount(value)}
        balance={balance}
        symbol={balanceLabel}
        balanceLoading={balanceLoading || delegationSharesLoading}
        disabled={isWrongNetwork || isLoading}
        purple={type === 'withdraw'}
        hasError={insufficientFunds || insufficientMinDeposit || insufficientWithdrawalLiquidity}
        type={type}
      />
      <StakeButton
        isLoading={isLoading}
        onClick={handleActionButton}
        label={handleLabelButton()}
        purple={type === 'withdraw'}
        disabled={insufficientFunds || insufficientMinDeposit || insufficientWithdrawalLiquidity}
      />
      <StakeInfo>
        <span>
          {`${t('youReceive')} ${amount || '0'}`}
          <span>{`${receiveLabel}`}</span>
        </span>
        {type === 'deposit' && (
          <div>
            <span>{`${t('rewardsFee')}: ${rewardsFee}%`}</span>
          </div>
        )}
      </StakeInfo>
    </StakeContainer>
  )
}

const { StakeContainer, StakeInfo } = {
  StakeContainer: styled.div`
    display: grid;
    gap: ${({ theme }) => theme.size[16]};
  `,
  StakeInfo: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0px ${({ theme }) => theme.size[12]};
    font-size: ${({ theme }) => theme.size[12]};

    > span {
      height: 12px;
      display: flex;
      gap: 4px;

      > span {
      }
    }

    > div {
      display: flex;
      gap: ${({ theme }) => theme.size[8]};
    }
  `
}
