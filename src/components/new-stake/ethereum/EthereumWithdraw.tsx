import Button from '@/components/shared/Button'
import StakeConfirmModal from '@/components/stake/StakeConfirmModal'
import StakeWithdrawCounter from '@/components/stake/StakeWithdrawCounter'
import StakeWithdrawSwitchTypes from '@/components/stake/StakeWithdrawSwitchTypes'
import { chainConfigByChainId } from '@/config/chain'
import useGetWithdrawBlock from '@/hooks/contracts/useGetWithdrawBlock'
import useWithdrawPool from '@/hooks/contracts/useWithdrawPool'
import { useWithdrawPoolBalance } from '@/hooks/contracts/useWithdrawPoolBalance'
import useWithdrawValidator from '@/hooks/contracts/useWithdrawValidator'
import { useWithdrawValidatorBalance } from '@/hooks/contracts/useWithdrawValidatorBalance'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import useStakeConfirmModal from '@/hooks/useStakeConfirmModal'
import useWalletSidebarConnectWallet from '@/hooks/useWalletSidebarConnectWallet'
import { formatNumberByLocale } from '@/services/format'
import { truncateWei } from '@/services/truncate'
import { Product } from '@/types/Product'
import { WithdrawType } from '@/types/Withdraw'
import { Tooltip } from 'antd'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { PiArrowLineRight, PiArrowsCounterClockwise, PiQuestion, PiWarningOctagon } from 'react-icons/pi'
import styled from 'styled-components'
import { useDebounce } from 'usehooks-ts'
import { useAccount, useSwitchChain } from 'wagmi'
import EthereumInput from './EthereumInput'
import EthereumShowReceiveCoin from './EthereumShowReceiveCoin'
import useStConfig from '@/hooks/contracts/useStConfig'
import { fbqTrackEvent } from '@/services/FacebookPixel'

type EthereumWithdrawProps = {
  type: 'deposit' | 'withdraw'
  ethBalance: bigint
  ethBalanceLoading: boolean
  ethBalanceRefetch: () => void
  stpETHBalance: bigint
  stpETHBalanceLoading: boolean
  account: `0x${string}` | undefined
  product: Product
  chainId: number
}

export default function EthereumWithdraw({
  type,
  account,
  ethBalance,
  ethBalanceLoading,
  ethBalanceRefetch,
  stpETHBalance,
  stpETHBalanceLoading,
  product,
  chainId
}: EthereumWithdrawProps) {
  const [amount, setAmount] = useState<string>('')

  const debouncedAmount = useDebounce(amount, 1000)
  const inputAmount = amount ? debouncedAmount || '0' : '0'
  const blankPoolAddress = '0x0000000000000000000000000000000000000000'

  const [withdrawTypeSelected, setWithdrawTypeSelected] = useState(WithdrawType.POOL)

  const { t } = useLocaleTranslation()
  const { locale } = useRouter()

  const { setOpenStakeConfirmModal, isOpen: isOpenStakeConfirmModal } = useStakeConfirmModal()
  const { setOpenSidebarConnectWallet, openSidebarConnectWallet } = useWalletSidebarConnectWallet()
  const { name } = chainConfigByChainId(chainId)
  const { chain: walletChainId } = useAccount()
  const isWrongNetwork = chainId !== walletChainId?.id

  const { withdrawPoolBalance: withdrawLiquidityPoolBalance, refetch: withdrawPoolBalanceRefetch } =
    useWithdrawPoolBalance({ product, chainId })
  const { timeLeft: withdrawTimeLeft, getWithdrawBlock } = useGetWithdrawBlock({
    walletAddress: account,
    enabled: withdrawTypeSelected === WithdrawType.POOL,
    product,
    chainId
  })
  const {
    withdrawValidatorsBalance: withdrawLiquidityValidatorsBalance,
    refetch: withdrawValidatorsBalanceRefetch
  } = useWithdrawValidatorBalance({ product, chainId })
  const { stConfig } = useStConfig({ productName: product.name, chainId })
  const minWithdrawAmount = stConfig?.minWithdrawAmount || 0n

  const handleWithdrawLiquidity = () => {
    switch (withdrawTypeSelected) {
      case WithdrawType.VALIDATOR:
        return withdrawLiquidityValidatorsBalance

      default:
        return withdrawLiquidityPoolBalance
    }
  }

  const handleWithdrawBalanceRefetch = useCallback(() => {
    if (withdrawTypeSelected) {
      return withdrawValidatorsBalanceRefetch()
    }
    return withdrawPoolBalanceRefetch()
  }, [withdrawPoolBalanceRefetch, withdrawValidatorsBalanceRefetch, withdrawTypeSelected])

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
    prepareTransactionErrorMessage: withdrawPoolPrepareTransactionErrorMessage,
    prepareTransactionsIsLoading: withdrawPoolPrepareTransactionsIsLoading
  } = useWithdrawPool(
    inputAmount,
    blankPoolAddress,
    withdrawTypeSelected === WithdrawType.POOL,
    product,
    chainId,
    account
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
    prepareTransactionErrorMessage: withdrawValidatorPrepareTransactionErrorMessage,
    prepareTransactionsIsLoading: withdrawValidatorPrepareTransactionsIsLoading
  } = useWithdrawValidator(
    inputAmount,
    blankPoolAddress,
    withdrawTypeSelected === WithdrawType.VALIDATOR,
    product,
    chainId,
    account
  )

  const handleWithdraw = () => {
    if (withdrawTypeSelected === WithdrawType.VALIDATOR) {
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
        prepareTransactionErrorMessage: withdrawValidatorPrepareTransactionErrorMessage,
        prepareTransactionsIsLoading: withdrawValidatorPrepareTransactionsIsLoading
      }
    }
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
      prepareTransactionErrorMessage: withdrawPoolPrepareTransactionErrorMessage,
      prepareTransactionsIsLoading: withdrawPoolPrepareTransactionsIsLoading
    }
  }

  const withdrawData = handleWithdraw()

  useEffect(() => {
    const handleSuccessfulAction = async () => {
      if (withdrawData.withdrawSuccess && !isOpenStakeConfirmModal) {
        setAmount('')
        await handleWithdrawBalanceRefetch()
        withdrawPoolBalanceRefetch()
        withdrawData.withdrawResetState()
        getWithdrawBlock()
      }
    }
    handleSuccessfulAction()
  }, [
    ethBalanceRefetch,
    getWithdrawBlock,
    handleWithdrawBalanceRefetch,
    isOpenStakeConfirmModal,
    withdrawData,
    withdrawData.withdrawResetState,
    withdrawData.withdrawSuccess,
    withdrawPoolBalanceRefetch
  ])

  useEffect(() => {
    const handleSuccessfulAction = async () => {
      if (withdrawData.withdrawSuccess && !isOpenStakeConfirmModal) {
        await ethBalanceRefetch()
      }
    }
    handleSuccessfulAction()
  }, [ethBalanceRefetch, isOpenStakeConfirmModal, withdrawData.withdrawSuccess])

  const { switchChain } = useSwitchChain()

  const openStakeConfirmation = () => {
    if (isWrongNetwork && switchChain) {
      try {
        switchChain({
          chainId: chainId
        })
        return
      } catch {
        return
      }
    }
    fbqTrackEvent(product.eventsTrack.withdraw)
    setOpenStakeConfirmModal(true)
  }

  const amountBigNumber = ethers.parseEther(amount || '0')
  const insufficientFunds = amountBigNumber > stpETHBalance
  const insufficientWithdrawalBalance =
    type === 'withdraw' && amountBigNumber > handleWithdrawLiquidity() && amount.length > 0
  const amountIsEmpty = amountBigNumber === 0n || !amount
  const amountIsMinWithdrawValue = amountBigNumber <= minWithdrawAmount
  const errorLabel =
    (insufficientFunds && t('form.insufficientFunds')) ||
    (insufficientWithdrawalBalance &&
      `${t('form.insufficientLiquidity')} ${truncateWei(handleWithdrawLiquidity())} ${t('lsd.symbol')}`) ||
    (amountIsMinWithdrawValue &&
      `${t('v2.stake.withdrawErrorMessage.LessThanMinimumWithdraw')} ${truncateWei(minWithdrawAmount, 4)}`) ||
    (withdrawData.prepareTransactionErrorMessage &&
      `${t(`v2.stake.withdrawErrorMessage.${withdrawData.prepareTransactionErrorMessage}`)}`) ||
    ''

  const handleLabelButton = () => {
    if (errorLabel && inputAmount.length > 0) {
      return errorLabel
    }

    return t('form.withdraw')
  }

  const cantWithdraw =
    insufficientFunds ||
    insufficientWithdrawalBalance ||
    amountIsEmpty ||
    withdrawData.prepareTransactionIsError ||
    amountIsMinWithdrawValue ||
    !!withdrawTimeLeft

  return (
    <>
      <Container>
        <InputContainer>
          <EthereumInput
            ethAmountValue={amount}
            onChange={value => {
              setAmount(value)
            }}
            hasError={false}
            balance={stpETHBalance}
            balanceLoading={stpETHBalanceLoading}
            onMaxFunction={() => setAmount(truncateWei(stpETHBalance, 18, true))}
            type={type}
            product={product}
          />

          <EthereumShowReceiveCoin
            amountValue={formatNumberByLocale(truncateWei(ethers.parseUnits(inputAmount, 18), 5), locale)}
            balance={ethBalance}
            balanceLoading={ethBalanceLoading}
            type={type}
            product={product}
            chainId={chainId}
          />
        </InputContainer>
        <StakeWithdrawSwitchTypes
          liquidityPoolBalance={withdrawLiquidityPoolBalance}
          liquidityValidatorsBalance={withdrawLiquidityValidatorsBalance}
          withdrawTypeSelected={withdrawTypeSelected}
          selectWithdrawType={setWithdrawTypeSelected}
          withdrawAmount={inputAmount}
          withdrawTimeLeft={withdrawTimeLeft}
        />
        {!!account && !isWrongNetwork && (
          <Button onClick={openStakeConfirmation} label={handleLabelButton()} disabled={cantWithdraw} />
        )}
        {!!isWrongNetwork && account && (
          <Button
            onClick={openStakeConfirmation}
            label={`${t('switch')} ${name.charAt(0).toUpperCase() + name.slice(1)}`}
            disabled={false}
            icon={<WrongNetworkIcon />}
          />
        )}
        {!account && (
          <Button
            onClick={() => setOpenSidebarConnectWallet(true)}
            label={t('v2.header.enter')}
            isLoading={openSidebarConnectWallet}
            icon={<ConnectWalletIcon />}
          />
        )}
        {!!(withdrawTimeLeft && withdrawTimeLeft > 0) && (
          <CardBlock>
            <div>
              <WarningIcon /> <span>{t('v2.stake.withdrawBlocked')}</span>
              <Tooltip title={t('v2.stake.withdrawBlockedTooltip')}>
                <PiQuestion />
              </Tooltip>
            </div>
            <StakeWithdrawCounter withdrawTimeLeft={withdrawTimeLeft} />
          </CardBlock>
        )}
      </Container>
      <StakeConfirmModal
        amount={amount}
        youReceive={ethers.parseUnits(amount || '0', 18)}
        txHash={withdrawData.withdrawTxHash}
        type={'withdraw'}
        labelButton={handleLabelButton()}
        onClick={withdrawData.withdraw}
        transactionLoading={withdrawData.withdrawLoading}
        walletActionLoading={withdrawData.withdrawAwaitWalletAction}
        transactionIsSuccess={withdrawData.withdrawSuccess}
        onClose={() => setOpenStakeConfirmModal(false)}
        withdrawTypeSelected={WithdrawType.POOL}
        chainId={chainId}
        product={product}
      />
    </>
  )
}

const { Container, InputContainer, WarningIcon, CardBlock, ConnectWalletIcon, WrongNetworkIcon } = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
  `,
  InputContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
  `,
  ConnectWalletIcon: styled(PiArrowLineRight)`
    font-size: 16px;
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
    font-size: ${({ theme }) => theme.font.size[13]};

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
  WrongNetworkIcon: styled(PiArrowsCounterClockwise)`
    font-size: 16px;
  `,
  WarningIcon: styled(PiWarningOctagon)`
    font-size: 24px;
    color: ${({ theme }) => theme.colorV2.purple[2]};
  `
}
