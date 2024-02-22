import Button from '@/components/shared/Button'
import React, { useCallback, useEffect, useState } from 'react'
import { PiArrowDown, PiArrowLineRight, PiQuestion, PiShieldCheckeredDuotone } from 'react-icons/pi'
import styled from 'styled-components'
import EthereumInput from './EthereumInput'
import EthereumShowReceiveCoin from './EthereumShowReceiveCoin'
import useEthBalanceOf from '@/hooks/contracts/useEthBalanceOf'
import useConnectedAccount from '@/hooks/useConnectedAccount'
import useStAccount from '@/hooks/subgraphs/useStAccount'
import { formatNumberByLocale } from '@/services/format'
import { truncateWei } from '@/services/truncate'
import useStakeConfirmModal from '@/hooks/useStakeConfirmModal'
import { useRouter } from 'next/router'
import { useNetwork, useSwitchNetwork } from 'wagmi'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import useWalletSidebarConnectWallet from '@/hooks/useWalletSidebarConnectWallet'
import chainConfig from '@/config/chain'
import { useWithdrawPoolBalance } from '@/hooks/contracts/useWithdrawPoolBalance'
import useGetWithdrawBlock from '@/hooks/contracts/useGetWithdrawBlock'
import { WithdrawType } from '@/types/Withdraw'
import { useWithdrawValidatorBalance } from '@/hooks/contracts/useWithdrawValidatorBalance'
import StakeWithdrawSwitchTypes from '@/components/stake/StakeWithdrawSwitchTypes'
import { useDebounce } from 'usehooks-ts'
import useWithdrawPool from '@/hooks/contracts/useWithdrawPool'
import useWithdrawValidator from '@/hooks/contracts/useWithdrawValidator'
import { ethers } from 'ethers'
import StakeConfirmModal from '@/components/stake/StakeConfirmModal'
import StakeWithdrawCounter from '@/components/stake/StakeWithdrawCounter'
import { Tooltip } from 'antd'

type EthereumWithdrawProps = {
  type: 'deposit' | 'withdraw'
}

export default function EthereumWithdraw({ type }: EthereumWithdrawProps) {
  const [amount, setAmount] = useState<string>('')

  const debouncedAmount = useDebounce(amount, 1000)
  const inputAmount = amount ? debouncedAmount || '0' : '0'

  const [withdrawTypeSelected, setWithdrawTypeSelected] = useState(WithdrawType.POOL)

  const { t } = useLocaleTranslation()
  const { locale } = useRouter()

  const { account } = useConnectedAccount()

  const {
    balance: ethBalance,
    isLoading: ethBalanceLoading,
    refetch: ethBalanceRefetch
  } = useEthBalanceOf(account)
  const { accountBalance: stpETHBalance, accountIsLoading: stpETHBalanceLoading } = useStAccount(account)

  const { setOpenStakeConfirmModal, isOpen: isOpenStakeConfirmModal } = useStakeConfirmModal()
  const { setOpenSidebarConnectWallet, openSidebarConnectWallet } = useWalletSidebarConnectWallet()
  const { chainId, name } = chainConfig()
  const { chain: walletChainId } = useNetwork()
  const isWrongNetwork = chainId !== walletChainId?.id

  const { withdrawPoolBalance: withdrawLiquidityPoolBalance, refetch: withdrawPoolBalanceRefetch } =
    useWithdrawPoolBalance()
  const { timeLeft: withdrawTimeLeft, getWithdrawBlock } = useGetWithdrawBlock(
    account,
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
    '0x0000000000000000000000000000000000000000',
    withdrawTypeSelected === WithdrawType.POOL,
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
    prepareTransactionErrorMessage: withdrawValidatorPrepareTransactionErrorMessage
  } = useWithdrawValidator(
    inputAmount,
    '0x0000000000000000000000000000000000000000',
    withdrawTypeSelected === WithdrawType.VALIDATOR,
    account
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

  useEffect(() => {
    const handleSuccessfulAction = async () => {
      if (withdrawData.withdrawSuccess && !isOpenStakeConfirmModal) {
        setAmount('')
        await handleWithdrawBalanceRefetch()
        withdrawPoolBalanceRefetch()
        withdrawData.withdrawResetState
        getWithdrawBlock()
        await ethBalanceRefetch()
      }
    }

    handleSuccessfulAction()
  }, [
    ethBalanceRefetch,
    getWithdrawBlock,
    handleWithdrawBalanceRefetch,
    isOpenStakeConfirmModal,
    withdrawData.withdrawResetState,
    withdrawData.withdrawSuccess,
    withdrawPoolBalanceRefetch
  ])

  const { switchNetworkAsync } = useSwitchNetwork({
    chainId: chainId
  })

  const openStakeConfirmation = () => {
    if (isWrongNetwork && switchNetworkAsync) {
      switchNetworkAsync()
      return
    }
    setOpenStakeConfirmModal(true)
  }

  const amountBigNumber = ethers.parseEther(amount || '0')
  const insufficientFunds = amountBigNumber > stpETHBalance
  const insufficientWithdrawalBalance =
    type === 'withdraw' && amountBigNumber > handleWithdrawLiquidity() && amount.length > 0
  const amountIsEmpty = amountBigNumber === 0n || !amount
  const errorLabel =
    (insufficientFunds && t('form.insufficientFunds')) ||
    (insufficientWithdrawalBalance &&
      `${t('form.insufficientLiquidity')} ${truncateWei(handleWithdrawLiquidity())} ${t('lsd.symbol')}`) ||
    (withdrawData.prepareTransactionErrorMessage &&
      `${t(`v2.stake.withdrawErrorMessage.${withdrawData.prepareTransactionErrorMessage}`)}`) ||
    ''

  const handleLabelButton = () => {
    if (isWrongNetwork) {
      return `${t('switch')} ${name.charAt(0).toUpperCase() + name.slice(1)}`
    }

    if (errorLabel && inputAmount.length > 0) {
      return errorLabel
    }

    return t('form.withdraw')
  }

  const cantWithdraw =
    insufficientFunds ||
    insufficientWithdrawalBalance ||
    amountIsEmpty ||
    withdrawData.prepareTransactionIsError
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
          />
          <DividerBox>
            <PiArrowDown style={{ fontSize: 16 }} />
          </DividerBox>
          <EthereumShowReceiveCoin
            amountValue={formatNumberByLocale(truncateWei(ethers.parseUnits(inputAmount, 18), 5), locale)}
            balance={ethBalance}
            balanceLoading={ethBalanceLoading}
            type={type}
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
        {!!account && (
          <Button onClick={openStakeConfirmation} label={handleLabelButton()} disabled={cantWithdraw} />
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
              <PiShieldCheckeredDuotone /> <span>{t('v2.stake.withdrawBlocked')}</span>
              <Tooltip title={t('v2.stake.withdrawBlockedTooltip')}>
                <PiQuestion />
              </Tooltip>
            </div>
            <StakeWithdrawCounter withdrawTimeLeft={withdrawTimeLeft} />
          </CardBlock>
        )}

        <DescriptionContainer>
          <div>
            <div>
              <span>
                Cambio:
                <QuestionIcon />
              </span>
            </div>
            <div>
              <span className='purple'>1 ETH = </span>
              <span className='blue'> 1 stpETH</span>
            </div>
          </div>
          <div>
            <div>
              <span>
                Taxa de Operação:
                <QuestionIcon />
              </span>
            </div>
            <span>0.3%</span>
          </div>
        </DescriptionContainer>
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
      />
    </>
  )
}

const {
  Container,
  InputContainer,
  CardBlock,
  DescriptionContainer,
  QuestionIcon,
  DividerBox,
  ConnectWalletIcon
} = {
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
  DividerBox: styled.div`
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.size[8]};
    margin-top: -16px;
    margin-bottom: -16px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colorV2.gray[6]};
    background-color: ${({ theme }) => theme.colorV2.white};
    z-index: 2;
  `,
  DescriptionContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};

    font-size: 13px;
    font-weight: 400;
    color: ${({ theme }) => theme.colorV2.gray[1]};

    span {
      display: flex;
      align-items: center;
      &.blue {
        color: ${({ theme }) => theme.colorV2.blue[1]};
      }
      &.purple {
        color: ${({ theme }) => theme.colorV2.purple[1]};
      }
    }

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      div {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.size[4]};
      }
    }
  `,
  QuestionIcon: styled(PiQuestion)`
    color: ${({ theme }) => theme.colorV2.gray[1]};
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.color.secondary};
    }
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
  `
}
