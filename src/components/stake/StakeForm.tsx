import chainConfig from '@/config/chain'
import useDeposit from '@/hooks/contracts/useDeposit'
import useSharesByWei from '@/hooks/contracts/useSharesByWei'
import useWeiByShares from '@/hooks/contracts/useWeiByShares'
import useWithdrawPool from '@/hooks/contracts/useWithdrawPool'
import { useWithdrawPoolBalance } from '@/hooks/contracts/useWithdrawPoolBalance'
import useWithdrawValidator from '@/hooks/contracts/useWithdrawValidator'
import { useWithdrawValidatorBalance } from '@/hooks/contracts/useWithdrawValidatorBalance'
import useDelegationShares from '@/hooks/subgraphs/useDelegationShares'
import { useFeeStakeEntry } from '@/hooks/subgraphs/useFeeStakeEntry'
import useStakeConfirmModal from '@/hooks/useStakeConfirmModal'
import useWalletSidebarConnectWallet from '@/hooks/useWalletSidebarConnectWallet'
import { WithdrawType } from '@/types/Withdraw'
import ethIcon from '@assets/icons/eth-icon.svg'
import stSymbol from '@assets/st-symbol.svg'
import { ethers } from 'ethers'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDebounce } from 'usehooks-ts'
import { useNetwork, useSwitchNetwork } from 'wagmi'
import useEthBalanceOf from '../../hooks/contracts/useEthBalanceOf'
import useStConfig from '../../hooks/contracts/useStConfig'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'
import { truncateWei } from '../../services/truncate'
import Button from '../shared/Button'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import StakeConfirmModal from './StakeConfirmModal'
import StakeFormInput from './StakeInput'
import StakeWithdrawSwitchTypes from './StakeWithdrawSwitchTypes'

import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import { PiArrowLineRight } from 'react-icons/pi'
import StakeDescriptionCheckout from './StakeDescriptionCheckout'

type StakeFormProps = {
  type: 'deposit' | 'withdraw'
  poolAddress: `0x${string}`
  accountAddress?: `0x${string}`
}

export function StakeForm({ type, accountAddress, poolAddress }: StakeFormProps) {
  const { t } = useLocaleTranslation()

  const {
    balance: ethBalance,
    isLoading: balanceLoading,
    refetch: refetchEthBalance
  } = useEthBalanceOf(accountAddress)

  const { setOpenSidebarConnectWallet, openSidebarConnectWallet } = useWalletSidebarConnectWallet()

  const {
    delegationBalance,
    loading: delegationSharesLoading,
    refetch: delegationSharesRefetch
  } = useDelegationShares(accountAddress, poolAddress)

  const [withdrawTypeSelected, setWithdrawTypeSelected] = useState(WithdrawType.POOL)
  const { withdrawPoolBalance: withdrawLiquidityPoolBalance, refetch: withdrawPoolBalanceRefetch } =
    useWithdrawPoolBalance()

  const {
    withdrawValidatorsBalance: withdrawLiquidityValidatorsBalance,
    refetch: withdrawValidatorsBalanceRefetch
  } = useWithdrawValidatorBalance()

  const handleWithdrawLiquidity = () => {
    switch (withdrawTypeSelected) {
      case WithdrawType.VALIDATOR:
        return withdrawLiquidityValidatorsBalance

      default:
        return withdrawLiquidityPoolBalance
    }
  }

  const handleWithdrawBalanceRefetch = useCallback(() => {
    switch (withdrawTypeSelected) {
      case WithdrawType.VALIDATOR:
        return withdrawValidatorsBalanceRefetch()

      default:
        return withdrawPoolBalanceRefetch()
    }
  }, [withdrawPoolBalanceRefetch, withdrawValidatorsBalanceRefetch, withdrawTypeSelected])

  const [amount, setAmount] = useState<string>('')

  // Todo: this should be dynamic and come from subgraph
  const { shares: sharesByEthRatio } = useSharesByWei(BigInt('1000000000000000000'))
  const { balance: ethBySharesRatio } = useWeiByShares('1000000000000000000')

  const debouncedAmount = useDebounce(amount, 1000)
  const inputAmount = amount ? debouncedAmount || '0' : '0'

  const { fee, loading: isLoadingFees } = useFeeStakeEntry()
  const parsedAmount = ethers.parseUnits(inputAmount, 18)
  const feeAmount = (parsedAmount * BigInt(fee?.value || 0n)) / ethers.parseEther('1')
  const netDepositAmount = ethers.parseUnits(inputAmount, 18) - feeAmount

  const youReceiveDeposit = netDepositAmount

  const { stConfig } = useStConfig()
  const minDepositAmount = stConfig?.minDepositAmount || 0n

  const {
    deposit,
    isSuccess: depositSuccess,
    isLoading: depositLoading,
    estimatedGas: depositEstimatedCost,
    awaitWalletAction: depositAwaitWalletAction,
    resetState: depositResetState,
    txHash: depositTxHash
    // To deposit, you need to have at least the min deposit amount in your wallet
  } = useDeposit(
    netDepositAmount,
    ethers.parseUnits(inputAmount, 18),
    poolAddress,
    type === 'deposit' && ethBalance > minDepositAmount && !isLoadingFees,
    accountAddress
  )

  const {
    withdrawPool,
    isLoading: withdrawPoolLoading,
    isSuccess: withdrawPoolSuccess,
    estimatedCost: withdrawPoolEstimatedCost,
    awaitWalletAction: withdrawPoolAwaitWalletAction,
    resetState: withdrawPoolResetState,
    txHash: withdrawPoolTxHash
  } = useWithdrawPool(
    inputAmount,
    poolAddress,
    type === 'withdraw' && withdrawTypeSelected === WithdrawType.POOL,
    accountAddress
  )

  const {
    withdrawValidator,
    isLoading: withdrawValidatorLoading,
    isSuccess: withdrawValidatorSuccess,
    estimatedCost: withdrawValidatorEstimatedCost,
    awaitWalletAction: withdrawValidatorAwaitWalletAction,
    resetState: withdrawValidatorResetState,
    txHash: withdrawValidatorTxHash
  } = useWithdrawValidator(
    inputAmount,
    poolAddress,
    type === 'withdraw' && withdrawTypeSelected === WithdrawType.VALIDATOR,
    accountAddress
  )

  const handleWithdraw = () => {
    switch (withdrawTypeSelected) {
      case WithdrawType.VALIDATOR:
        return {
          withdraw: withdrawValidator,
          withdrawLoading: withdrawValidatorLoading,
          withdrawSuccess: withdrawValidatorSuccess,
          withdrawEstimatedCost: withdrawValidatorEstimatedCost,
          withdrawAwaitWalletAction: withdrawValidatorAwaitWalletAction,
          withdrawResetState: withdrawValidatorResetState,
          withdrawTxHash: withdrawValidatorTxHash
        }

      default:
        return {
          withdraw: withdrawPool,
          withdrawLoading: withdrawPoolLoading,
          withdrawSuccess: withdrawPoolSuccess,
          withdrawEstimatedCost: withdrawPoolEstimatedCost,
          withdrawAwaitWalletAction: withdrawPoolAwaitWalletAction,
          withdrawResetState: withdrawPoolResetState,
          withdrawTxHash: withdrawPoolTxHash
        }
    }
  }

  const withdrawData = handleWithdraw()

  const isLoading = depositLoading || withdrawData.withdrawLoading
  const isSuccess = depositSuccess || withdrawData.withdrawSuccess

  const balance = type === 'deposit' ? ethBalance : delegationBalance
  const actionLabel = type === 'deposit' ? t('form.deposit') : t('form.withdraw')

  const estimatedGasCost = type === 'deposit' ? depositEstimatedCost : withdrawData.withdrawEstimatedCost
  const txHash = type === 'deposit' ? depositTxHash : withdrawData.withdrawTxHash
  const resetState = type === 'deposit' ? depositResetState : withdrawData.withdrawResetState

  const amountBigNumber = ethers.parseEther(amount || '0')

  const insufficientMinDeposit = type === 'deposit' && amountBigNumber < minDepositAmount && amount.length > 0
  const insufficientFunds = amountBigNumber > balance
  const insufficientFundsPerGas = type === 'deposit' && amountBigNumber > balance - estimatedGasCost
  const insufficientWithdrawalEthBalance = type === 'withdraw' && ethBalance < estimatedGasCost

  const insufficientWithdrawalBalance =
    type === 'withdraw' && amountBigNumber > handleWithdrawLiquidity() && amount.length > 0
  const amountIsEmpty = amountBigNumber === 0n || !amount

  const errorLabel =
    ((insufficientFunds || insufficientFundsPerGas) && t('form.insufficientFunds')) ||
    (insufficientMinDeposit &&
      `${t('form.insufficientMinDeposit')} ${truncateWei(minDepositAmount)} ${t('eth.symbol')}`) ||
    (insufficientWithdrawalBalance &&
      `${t('form.insufficientLiquidity')} ${truncateWei(handleWithdrawLiquidity())} ${t('lsd.symbol')}`) ||
    (insufficientWithdrawalEthBalance &&
      `${t('form.insufficientFunds')} ${truncateWei(estimatedGasCost, 6)} ${t('eth.symbol')}`) ||
    ''

  const walletActionLoading =
    type === 'deposit' ? depositAwaitWalletAction : withdrawData.withdrawAwaitWalletAction

  const { setOpenStakeConfirmModal, isOpen: isOpenStakeConfirmModal } = useStakeConfirmModal()
  useEffect(() => {
    const handleSuccessfulAction = async () => {
      if (isSuccess && !isOpenStakeConfirmModal) {
        setAmount('')
        await refetchEthBalance()
        await delegationSharesRefetch()
        await handleWithdrawBalanceRefetch()
        resetState()
      }
    }

    handleSuccessfulAction()
  }, [
    delegationSharesRefetch,
    handleWithdrawBalanceRefetch,
    isOpenStakeConfirmModal,
    isSuccess,
    refetchEthBalance,
    resetState
  ])

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
    withdrawData.withdraw()
  }

  const handleLabelButton = () => {
    if (isWrongNetwork) {
      return `${t('switch')} ${chain.name.charAt(0).toUpperCase() + chain.name.slice(1)}`
    }
    if (
      insufficientFunds ||
      insufficientWithdrawalBalance ||
      insufficientMinDeposit ||
      insufficientWithdrawalEthBalance
    ) {
      return errorLabel
    }

    return actionLabel
  }

  const handleInputMaxValue = () => {
    if (estimatedGasCost && type === 'deposit') {
      setAmount(truncateWei(ethBalance - estimatedGasCost, 18))
      return
    }
    setAmount(truncateWei(balance, 18))
  }

  return (
    <>
      <StakeContainer>
        {accountAddress && (
          <CardInfoContainer>
            <CardInfo>
              <div>
                <Image src={ethIcon} width={30} height={30} alt='stpEth' />
              </div>
              <CardInfoData>
                <header>
                  <h4>{t('availableToStake')}</h4>
                </header>
                <div>
                  <span className='primary'>{truncateWei(ethBalance, 6)}</span>
                  <span className='primary'>{t('eth.symbol')}</span>
                </div>
              </CardInfoData>
            </CardInfo>
            <CardInfo>
              <CardInfoData>
                <header>
                  <h4>{t('invested')}</h4>
                </header>
                {delegationSharesLoading ? (
                  <SkeletonLoading height={20} width={120} />
                ) : (
                  <div>
                    <span className='purple'>{truncateWei(BigInt(delegationBalance), 6)}</span>
                    <span className='purple'>{t('lsd.symbol')}</span>
                  </div>
                )}
              </CardInfoData>
              <div>
                <Image src={stSymbol} width={30} height={30} alt='stpEth' />
              </div>
            </CardInfo>
          </CardInfoContainer>
        )}
        {accountAddress && type === 'withdraw' && (
          <StakeWithdrawSwitchTypes
            liquidityPoolBalance={withdrawLiquidityPoolBalance}
            liquidityValidatorsBalance={withdrawLiquidityValidatorsBalance}
            withdrawTypeSelected={withdrawTypeSelected}
            selectWithdrawType={setWithdrawTypeSelected}
          />
        )}
        <StakeFormInput
          value={amount}
          onChange={value => setAmount(value)}
          handleMaxValue={handleInputMaxValue}
          balanceLoading={balanceLoading || delegationSharesLoading}
          disabled={isWrongNetwork || isLoading || !accountAddress}
          hasError={insufficientFunds || insufficientWithdrawalBalance || insufficientMinDeposit}
          type={type}
        />
        {!accountAddress && (
          <Button
            onClick={() => setOpenSidebarConnectWallet(true)}
            label={t('connectWalletSideBar.connectButton')}
            isLoading={openSidebarConnectWallet}
            icon={<ConnectWalletIcon />}
          />
        )}
        {accountAddress && (
          <Button
            isLoading={isLoading || isLoadingFees}
            onClick={openStakeConfirmation}
            label={handleLabelButton()}
            icon={type === 'deposit' ? <DepositIcon /> : <WithdrawIcon />}
            disabled={
              insufficientFunds ||
              insufficientWithdrawalBalance ||
              amountIsEmpty ||
              insufficientMinDeposit ||
              isLoadingFees ||
              insufficientWithdrawalEthBalance
            }
          />
        )}
        {accountAddress && (
          <StakeDescriptionCheckout
            amount={amount}
            type={type}
            youReceiveDeposit={youReceiveDeposit}
            sharesByEthRatio={sharesByEthRatio}
            ethBySharesRatio={ethBySharesRatio}
          />
        )}
      </StakeContainer>
      <StakeConfirmModal
        amount={amount}
        youReceive={type === 'deposit' ? youReceiveDeposit : ethers.parseUnits(amount || '0', 18)}
        txHash={txHash}
        type={type}
        labelButton={handleLabelButton()}
        onClick={handleStakeConfirmation}
        ethBySharesRatio={ethBySharesRatio}
        sharesByEthRatio={sharesByEthRatio}
        transactionLoading={isLoading}
        walletActionLoading={walletActionLoading}
        transactionIsSuccess={isSuccess}
        onClose={() => setOpenStakeConfirmModal(false)}
      />
    </>
  )
}

const {
  StakeContainer,
  CardInfoContainer,
  CardInfo,
  CardInfoData,
  ConnectWalletIcon,
  DepositIcon,
  WithdrawIcon
} = {
  StakeContainer: styled.div`
    display: grid;
    gap: ${({ theme }) => theme.size[24]};
    padding: ${({ theme }) => theme.size[24]} ${({ theme }) => theme.size[24]};
  `,
  CardInfoContainer: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;

    border-radius: 8px;
    gap: ${({ theme }) => theme.size[16]};
    height: 32px;

    > div:nth-child(2) {
      justify-content: flex-end;
      header {
        justify-content: flex-end;
      }
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      gap: ${({ theme }) => theme.size[24]};
      grid-template-columns: 1fr 1fr;
    }
  `,
  CardInfo: styled.div`
    display: flex;
    align-items: center;

    gap: ${({ theme }) => theme.size[16]};
    height: 32px;

    img {
      box-shadow: ${({ theme }) => theme.shadow[300]};
      border-radius: 100%;
    }

    > div {
      display: grid;
      align-items: center;
      justify-content: flex-start;
      height: 32px;

      > div {
        display: flex;
        justify-content: flex-start;
        align-self: flex-start;
      }
    }
  `,
  CardInfoData: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${({ theme }) => theme.size[4]};

    > header {
      display: flex;

      gap: ${({ theme }) => theme.size[4]};
      > h4 {
        font-size: ${({ theme }) => theme.font.size[12]};
        font-weight: 400;
        color: ${({ theme }) => theme.colorV2.gray[1]};
      }
    }
    > div {
      display: flex;
      gap: ${({ theme }) => theme.size[4]};
      span {
        font-size: ${({ theme }) => theme.font.size[14]};

        font-weight: 500;
        color: ${({ theme }) => theme.colorV2.gray[1]};

        &.primary {
          color: ${({ theme }) => theme.colorV2.blue[3]};
        }

        &.purple {
          color: ${({ theme }) => theme.colorV2.purple[1]};
        }

        &.negative {
          color: ${({ theme }) => theme.color.red[500]};
        }

        &.positive {
          color: ${({ theme }) => theme.color.green[500]};
        }
      }
    }
  `,
  ConnectWalletIcon: styled(PiArrowLineRight)`
    font-size: 16px;
  `,
  DepositIcon: styled(BsArrowDown)`
    font-size: 16px;
  `,
  WithdrawIcon: styled(BsArrowUp)`
    font-size: 16px;
  `
}
