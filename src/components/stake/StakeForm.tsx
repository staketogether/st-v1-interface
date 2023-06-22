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
import StakeConfirmModal from './StakeConfirmModal'
import useStakeConfirmModal from '@/hooks/useStakeConfirmModal'

type StakeFormProps = {
  type: 'deposit' | 'withdraw'
  accountAddress: `0x${string}`
  poolAddress: `0x${string}`
}

export function StakeForm({ type, accountAddress, poolAddress }: StakeFormProps) {
  const { fee } = globalConfig
  const { t } = useTranslation()
  const {
    balance: ethBalance,
    isLoading: balanceLoading,
    refetch: refetchEthBalance
  } = useEthBalanceOf(accountAddress)
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
    isLoading: depositLoading,
    estimateGas: depositEstimateGas,
    awaitWalletAction: depositAwaitWalletAction,
    resetState: depositResetState,
    txHash: depositTxHash
  } = useDeposit(inputAmount, accountAddress, poolAddress)

  const {
    withdraw,
    isLoading: withdrawLoading,
    isSuccess: withdrawSuccess,
    estimateGas: withdrawEstimateGas,
    awaitWalletAction: withdrawAwaitWalletAction,
    resetState: withdrawResetState,
    txHash: withdrawTxHash
  } = useWithdraw(inputAmount, accountAddress, poolAddress)

  const rewardsFee = truncateEther(fee.protocol.mul(100).toString())

  const isLoading = depositLoading || withdrawLoading
  const isSuccess = depositSuccess || withdrawSuccess

  const balance = type === 'deposit' ? ethBalance : delegationSharesFormatted
  const actionLabel = type === 'deposit' ? t('form.deposit') : t('form.withdraw')
  const balanceLabel = type === 'deposit' ? t('eth.symbol') : t('lsd.symbol')
  const receiveLabel = type === 'deposit' ? t('lsd.symbol') : t('eth.symbol')

  const estimateGas = type === 'deposit' ? depositEstimateGas : withdrawEstimateGas
  const txHash = type === 'deposit' ? depositTxHash : withdrawTxHash
  const resetState = type === 'deposit' ? depositResetState : withdrawResetState

  const amountBigNumber = ethers.utils.parseEther(amount || '0')

  const insufficientFunds = amountBigNumber.gt(balance)
  const insufficientMinDeposit =
    type === 'deposit' && amountBigNumber.lt(minDepositAmount) && amount.length > 0
  const insufficientWithdrawalLiquidity =
    type === 'withdraw' && amountBigNumber.gt(withdrawalLiquidityBalance) && amount.length > 0
  const amountIsEmpty = amountBigNumber.isZero() || !amount

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
  const titleConfirmStakeModal =
    type === 'deposit' ? t('confirmStakeModal.reviewStake') : t('confirmStakeModal.reviewWithdraw')
  const walletActionLoading = type === 'deposit' ? depositAwaitWalletAction : withdrawAwaitWalletAction

  const { setOpenStakeConfirmModal, isOpen: isOpenStakeConfirmModal } = useStakeConfirmModal()
  useEffect(() => {
    if (isSuccess && !isOpenStakeConfirmModal) {
      resetState()
      setAmount('')
      refetchEthBalance()
    }
  }, [isOpenStakeConfirmModal, isSuccess, refetchEthBalance, resetState])

  const chain = chainConfig()
  const { chain: walletChainId } = useNetwork()
  const isWrongNetwork = chain.chainId !== walletChainId?.id
  const { switchNetworkAsync } = useSwitchNetwork({
    chainId: chain.chainId
  })

  const openStakeConfirmation = () => {
    if (isWrongNetwork && switchNetworkAsync) {
      switchNetworkAsync()
      return
    }
    setOpenStakeConfirmModal(true)
  }

  const handleStakeConfirmation = () => {
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
    <>
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
          onClick={openStakeConfirmation}
          label={handleLabelButton()}
          purple={type === 'withdraw'}
          disabled={
            insufficientFunds ||
            insufficientMinDeposit ||
            insufficientWithdrawalLiquidity ||
            amountIsEmpty
          }
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
      <StakeConfirmModal
        amount={amount}
        txHash={txHash}
        titleModal={titleConfirmStakeModal}
        type={type}
        labelButton={handleLabelButton()}
        onClick={handleStakeConfirmation}
        estimateGas={estimateGas}
        transactionLoading={isLoading}
        walletActionLoading={walletActionLoading}
        transactionIsSuccess={isSuccess}
        onClose={() => setOpenStakeConfirmModal(false)}
      />
    </>
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
