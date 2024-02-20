import chainConfig from '@/config/chain'
import useDepositPool from '@/hooks/contracts/useDepositPool'
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
import pixImage from '@assets/images/pix-image.svg'
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

import useGetWithdrawBlock from '@/hooks/contracts/useGetWithdrawBlock'
import { StepBuyEth, openModal, stepBuyCrypto } from '@/hooks/ramp/useControlModal'
import useTransak from '@/hooks/useTransak'
import { Tooltip, notification } from 'antd'
import { useRouter } from 'next/router'
import { PiArrowDown, PiArrowLineRight, PiArrowUp, PiQuestion, PiShieldCheckeredDuotone } from 'react-icons/pi'
import { formatNumberByLocale } from '../../services/format'
import StpEthIcon from '../shared/StpethIcon'
import StakeDescriptionCheckout from './StakeDescriptionCheckout'
import StakeWithdrawCounter from './StakeWithdrawCounter'


type StakeFormProps = {
  type: 'deposit' | 'withdraw'
  poolAddress: `0x${string}`
  accountAddress?: `0x${string}`
}

export function StakeForm({ type, accountAddress, poolAddress }: StakeFormProps) {
  const { t } = useLocaleTranslation()
  const { locale } = useRouter()
  const {
    balance: ethBalance,
    isLoading: balanceLoading,
    refetch: refetchEthBalance
  } = useEthBalanceOf(accountAddress)

  const { setOpenSidebarConnectWallet, openSidebarConnectWallet } = useWalletSidebarConnectWallet()

  const handleRefetchEthBalance = useCallback(() => {
    refetchEthBalance()
  }, [refetchEthBalance])

  const { onInit: buyCrypto } = useTransak({
    onSuccess: handleRefetchEthBalance,
    productsAvailed: 'BUY'
  })

  const { onInit: sellCrypto } = useTransak({
    onSuccess: handleRefetchEthBalance,
    productsAvailed: 'SELL'
  })

  const {
    delegationBalance,
    loading: delegationSharesLoading,
    refetch: delegationSharesRefetch
  } = useDelegationShares(accountAddress, poolAddress)

  const [withdrawTypeSelected, setWithdrawTypeSelected] = useState(WithdrawType.POOL)
  const { withdrawPoolBalance: withdrawLiquidityPoolBalance, refetch: withdrawPoolBalanceRefetch } =
    useWithdrawPoolBalance()
  const { timeLeft: withdrawTimeLeft, getWithdrawBlock } = useGetWithdrawBlock(
    accountAddress,
    withdrawTypeSelected === WithdrawType.POOL
  )

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
    txHash: depositTxHash,
    prepareTransactionIsError: depositPrepareTransactionIsError,
    prepareTransactionErrorMessage: depositPrepareTransactionErrorMessage
  } = useDepositPool(
    netDepositAmount,
    ethers.parseUnits(inputAmount, 18),
    poolAddress,
    type === 'deposit',
    accountAddress
  )

  const {
    withdrawPool,
    isLoading: withdrawPoolLoading,
    isSuccess: withdrawPoolSuccess,
    estimatedCost: withdrawPoolEstimatedCost,
    awaitWalletAction: withdrawPoolAwaitWalletAction,
    resetState: withdrawPoolResetState,
    txHash: withdrawPoolTxHash,
    prepareTransactionIsError: withdrawPoolPrepareTransactionIsError,
    prepareTransactionIsSuccess: withdrawPoolPrepareTransactionIsSuccess,
    prepareTransactionErrorMessage: withdrawPoolPrepareTransactionErrorMessage
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
    txHash: withdrawValidatorTxHash,
    prepareTransactionIsError: withdrawValidatorPrepareTransactionIsError,
    prepareTransactionIsSuccess: withdrawValidatorPrepareTransactionIsSuccess,
    prepareTransactionErrorMessage: withdrawValidatorPrepareTransactionErrorMessage
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
          withdrawTxHash: withdrawValidatorTxHash,
          prepareTransactionIsError: withdrawValidatorPrepareTransactionIsError,
          prepareTransactionIsSuccess: withdrawValidatorPrepareTransactionIsSuccess,
          prepareTransactionErrorMessage: withdrawValidatorPrepareTransactionErrorMessage
        }

      default:
        return {
          withdraw: withdrawPool,
          withdrawLoading: withdrawPoolLoading,
          withdrawSuccess: withdrawPoolSuccess,
          withdrawEstimatedCost: withdrawPoolEstimatedCost,
          withdrawAwaitWalletAction: withdrawPoolAwaitWalletAction,
          withdrawResetState: withdrawPoolResetState,
          withdrawTxHash: withdrawPoolTxHash,
          prepareTransactionIsError: withdrawPoolPrepareTransactionIsError,
          prepareTransactionIsSuccess: withdrawPoolPrepareTransactionIsSuccess,
          prepareTransactionErrorMessage: withdrawPoolPrepareTransactionErrorMessage
        }
    }
  }

  const withdrawData = handleWithdraw()

  const isLoading = depositLoading || withdrawData.withdrawLoading
  const isSuccess = depositSuccess || withdrawData.withdrawSuccess

  const prepareTransactionIsError =
    type === 'deposit' ? depositPrepareTransactionIsError : withdrawData.prepareTransactionIsError
  const prepareTransactionErrorMessage =
    type === 'deposit' ? depositPrepareTransactionErrorMessage : withdrawData.prepareTransactionErrorMessage

  const balance = type === 'deposit' ? ethBalance : delegationBalance
  const actionLabel = type === 'deposit' ? t('form.deposit') : t('form.withdraw')

  const estimatedGasCost = type === 'deposit' ? depositEstimatedCost : withdrawData.withdrawEstimatedCost

  const txHash = type === 'deposit' ? depositTxHash : withdrawData.withdrawTxHash
  const resetState = type === 'deposit' ? depositResetState : withdrawData.withdrawResetState

  const amountBigNumber = ethers.parseEther(amount || '0')

  const insufficientMinDeposit = type === 'deposit' && amountBigNumber < minDepositAmount && amount.length > 0
  const insufficientFunds = amountBigNumber > balance

  const insufficientWithdrawalBalance =
    type === 'withdraw' && amountBigNumber > handleWithdrawLiquidity() && amount.length > 0
  const amountIsEmpty = amountBigNumber === 0n || !amount

  const errorLabel =
    (insufficientFunds && t('form.insufficientFunds')) ||
    (insufficientMinDeposit &&
      `${t('form.insufficientMinDeposit')} ${truncateWei(minDepositAmount)} ${t('eth.symbol')}`) ||
    (insufficientWithdrawalBalance &&
      `${t('form.insufficientLiquidity')} ${truncateWei(handleWithdrawLiquidity())} ${t('lsd.symbol')}`) ||
    (prepareTransactionErrorMessage &&
      `${type === 'deposit'
        ? t(`v2.stake.depositErrorMessage.${prepareTransactionErrorMessage}`)
        : t(`v2.stake.withdrawErrorMessage.${prepareTransactionErrorMessage}`)
      }`) ||
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
        getWithdrawBlock()
      }
    }

    handleSuccessfulAction()
  }, [
    delegationSharesRefetch,
    getWithdrawBlock,
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
    if (errorLabel && amount.length > 0) {
      return errorLabel
    }

    return actionLabel
  }

  const handleInputMaxValue = () => {
    if (estimatedGasCost && type === 'deposit' && ethBalance > ethers.parseEther('0.01')) {
      notification.info({
        message: `${t('v2.stake.maxDepositButtonMessage')}`,
        placement: 'topRight'
      })
      setAmount(truncateWei(ethBalance - estimatedGasCost, 18, true))
      return
    }
    setAmount(truncateWei(balance, 18, true))
  }

  const handleActiveRamp = () => {
    // reset process
    stepBuyCrypto(StepBuyEth.Quotation)
    openModal(true)
  }

  const cantDeposit =
    insufficientFunds || amountIsEmpty || insufficientMinDeposit || isLoadingFees || prepareTransactionIsError

  const cantWithdraw =
    insufficientFunds ||
    insufficientWithdrawalBalance ||
    amountIsEmpty ||
    isLoadingFees ||
    prepareTransactionIsError ||
    !!withdrawTimeLeft

  return (
    <>
      <StakeContainer>
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
                <span className='primary'>{formatNumberByLocale(truncateWei(ethBalance, 6), locale)}</span>
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
                  <span className='purple'>
                    {formatNumberByLocale(truncateWei(BigInt(delegationBalance), 6), locale)}
                  </span>
                  <span className='purple'>{t('lsd.symbol')}</span>
                </div>
              )}
            </CardInfoData>
            <div>
              <StpEthIcon showPlusIcon />
            </div>
          </CardInfo>
        </CardInfoContainer>

        {type === 'withdraw' && (
          <StakeWithdrawSwitchTypes
            liquidityPoolBalance={withdrawLiquidityPoolBalance}
            liquidityValidatorsBalance={withdrawLiquidityValidatorsBalance}
            withdrawTypeSelected={withdrawTypeSelected}
            selectWithdrawType={setWithdrawTypeSelected}
            withdrawAmount={inputAmount}
            withdrawTimeLeft={withdrawTimeLeft}
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
          minDepositAmount={stConfig?.minDepositAmount}
          minWithdrawAmount={stConfig?.minWithdrawAmount}
        />
        {!accountAddress && (
          <Button
            onClick={() => setOpenSidebarConnectWallet(true)}
            label={t('v2.header.enter')}
            isLoading={openSidebarConnectWallet}
            icon={<ConnectWalletIcon />}
          />
        )}
        {accountAddress && type === 'deposit' && (
          <>
            <Button
              isLoading={isLoading || isLoadingFees}
              onClick={openStakeConfirmation}
              label={handleLabelButton()}
              icon={type === 'deposit' ? <DepositIcon /> : <WithdrawIcon />}
              disabled={type === 'deposit' ? cantDeposit : cantWithdraw}
            />

            <Button onClick={buyCrypto} label={t('buyCryptoTitle')} />
          </>
        )}
        {type === 'deposit' && (
          <OnRampButton onClick={handleActiveRamp}>
            <Image src={pixImage} width={32} height={32} alt='pix image' /> Comprar ETH com PIX
          </OnRampButton>
        )}

        {!!(type === 'withdraw' && withdrawTimeLeft && withdrawTimeLeft > 0) && (
          <CardBlock>
            <div>
              <PiShieldCheckeredDuotone /> <span>{t('v2.stake.withdrawBlocked')}</span>
              <Tooltip title={t('v2.stake.withdrawBlockedTooltip')}>
                <PiQuestion />
              </Tooltip>
            </div>
            <StakeWithdrawCounter withdrawTimeLeft={withdrawTimeLeft} />
          </CardBlock>
        )}

        {type === 'withdraw' && accountAddress && <Button onClick={sellCrypto} label={t('sellCryptoTitle')} />}
        {accountAddress && (
          <StakeDescriptionCheckout
            amount={amount}
            type={type}
            youReceiveDeposit={youReceiveDeposit}
            withdrawTypeSelected={withdrawTypeSelected}
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
        transactionLoading={isLoading}
        walletActionLoading={walletActionLoading}
        transactionIsSuccess={isSuccess}
        onClose={() => setOpenStakeConfirmModal(false)}
        withdrawTypeSelected={withdrawTypeSelected}
      />
    </>
  )
}

const {
  StakeContainer,
  CardBlock,
  CardInfoContainer,
  CardInfo,
  CardInfoData,
  ConnectWalletIcon,
  DepositIcon,
  OnRampButton,
  WithdrawIcon
} = {
  StakeContainer: styled.div`
    display: grid;
    gap: ${({ theme }) => theme.size[24]};
    padding: ${({ theme }) => theme.size[24]} ${({ theme }) => theme.size[24]};
  `,
  CardBlock: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    gap: 12px;

    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colorV2.gray[1]};
    color: ${({ theme }) => theme.colorV2.gray[1]};
    opacity: 0.7;
    > header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      > h4 {
        font-size: 14px;
        color: ${({ theme }) => theme.colorV2.purple[1]};

        font-weight: 400;

        display: flex;
      }
    }
    div:nth-child(1) {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[4]};
    }
    div:nth-child(2) {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[8]};
    }
  `,
  CardInfoContainer: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
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
    }
  `,
  CardInfo: styled.div`
    display: flex;
    align-items: center;

    gap: ${({ theme }) => theme.size[16]};
    height: 32px;
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
  DepositIcon: styled(PiArrowDown)`
    font-size: 16px;
  `,
  WithdrawIcon: styled(PiArrowUp)`
    font-size: 16px;
  `,
  OnRampButton: styled.button`
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};

    border-radius: ${({ theme }) => theme.size[8]};
    border: 1px solid #00bdae;
    background: ${({ theme }) => theme.colorV2.white};
    color: #00bdae;

    font-weight: 500;
    font-size: ${({ theme }) => theme.font.size[15]};
  `
}
