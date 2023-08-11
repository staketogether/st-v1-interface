import chainConfig from '@/config/chain'
import usePooledEthByShares from '@/hooks/contracts/usePooledEthByShares'
import usePooledShareByEth from '@/hooks/contracts/useSharesByPooledEth'
import { useWithdrawPoolBalance } from '@/hooks/contracts/useWithdrawPoolBalance'
import useWithdrawValidator from '@/hooks/contracts/useWithdrawValidator'
import { useWithdrawValidatorBalance } from '@/hooks/contracts/useWithdrawValidatorBalance'
import useDelegationShares from '@/hooks/subgraphs/useDelegationShares'
import useStakeConfirmModal from '@/hooks/useStakeConfirmModal'
import useWalletSidebarConnectWallet from '@/hooks/useWalletSidebarConnectWallet'
import { WithdrawType } from '@/types/Withdraw'
import ethIcon from '@assets/icons/eth-icon.svg'
import stIcon from '@assets/icons/seth-icon.svg'
import { ethers } from 'ethers'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDebounce } from 'usehooks-ts'
import { useNetwork, useSwitchNetwork } from 'wagmi'
import useDeposit from '../../hooks/contracts/useDeposit'
import useEthBalanceOf from '../../hooks/contracts/useEthBalanceOf'
import useStConfig from '../../hooks/contracts/useStConfig'
import useWithdrawPool from '../../hooks/contracts/useWithdrawPool'
import useTranslation from '../../hooks/useTranslation'
import { truncateWei } from '../../services/truncate'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import StakeButton from './StakeButton'
import StakeConfirmModal from './StakeConfirmModal'
import StakeFormInput from './StakeInput'
import StakeWithdrawSwitchTypes from './StakeWithdrawSwitchTypes'

type StakeFormProps = {
  type: 'deposit' | 'withdraw'
  poolAddress: `0x${string}`
  accountAddress?: `0x${string}`
}

export function StakeForm({ type, accountAddress, poolAddress }: StakeFormProps) {
  const { t } = useTranslation()
  const { stConfig } = useStConfig()
  const minDepositAmount = stConfig?.minDepositAmount || 0n

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
      case WithdrawType.VALIDATORS:
        return withdrawLiquidityValidatorsBalance

      default:
        return withdrawLiquidityPoolBalance
    }
  }

  const handleWithdrawBalanceRefetch = useCallback(() => {
    switch (withdrawTypeSelected) {
      case WithdrawType.VALIDATORS:
        return withdrawValidatorsBalanceRefetch()

      default:
        return withdrawPoolBalanceRefetch()
    }
  }, [withdrawPoolBalanceRefetch, withdrawValidatorsBalanceRefetch, withdrawTypeSelected])

  const [amount, setAmount] = useState<string>('')

  // Todo: this should be dynamic and come from subgraph
  const { balance: sharesRatio } = usePooledShareByEth(BigInt('1000000000000000000'))
  const { balance: ratioEthByShare } = usePooledEthByShares(sharesRatio.toString())

  const debouncedAmount = useDebounce(amount, 1000)
  const inputAmount = amount ? debouncedAmount || '0' : '0'

  const {
    deposit,
    isSuccess: depositSuccess,
    isLoading: depositLoading,
    estimatedGas: depositEstimatedCost,
    awaitWalletAction: depositAwaitWalletAction,
    resetState: depositResetState,
    txHash: depositTxHash
    // To deposit, you need to have at least the min deposit amount in your wallet
  } = useDeposit(inputAmount, poolAddress, type === 'deposit' && ethBalance > minDepositAmount, accountAddress)

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
    type === 'withdraw' && withdrawTypeSelected === WithdrawType.VALIDATORS,
    accountAddress
  )

  const depositingCost = type === 'deposit' ? depositEstimatedCost : 0n

  const { balance: expectedShares } = usePooledShareByEth(ethers.parseEther(amount || '0') - depositingCost)
  const { balance: expectedSeth } = usePooledEthByShares(expectedShares.toString())

  const handleWithdraw = () => {
    switch (withdrawTypeSelected) {
      case WithdrawType.VALIDATORS:
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
  const operationSymbol = type === 'deposit' ? t('lsd.symbol') : t('eth.symbol')

  const estimateCost = type === 'deposit' ? depositEstimatedCost : withdrawData.withdrawEstimatedCost
  const estimatedCostInEther = ethers.formatEther(estimateCost)
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
    ''
  const titleConfirmStakeModal =
    type === 'deposit' ? t('confirmStakeModal.reviewDeposit') : t('confirmStakeModal.reviewWithdraw')
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
    if (insufficientFunds || insufficientWithdrawalBalance || insufficientMinDeposit) {
      return errorLabel
    }

    return actionLabel
  }

  return (
    <>
      <StakeContainer>
        <CardInfoContainer>
          {type === 'deposit' && (
            <CardInfo>
              <div>
                <div>
                  <Image src={ethIcon} width={24} height={24} alt='staked Icon' />
                </div>
                <CardInfoData>
                  <header>
                    <h4>{t('availableToStake')}</h4>
                  </header>
                  <div>
                    <span>{truncateWei(ethBalance, 6)}</span>
                    <span>{t('eth.symbol')}</span>
                  </div>
                </CardInfoData>
              </div>
            </CardInfo>
          )}
          <CardInfo>
            <div>
              <div>
                <Image src={stIcon} width={24} height={24} alt='staked Icon' />
              </div>
              <CardInfoData>
                <header>
                  <h4>{t('staked')}</h4>
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
            </div>
          </CardInfo>
        </CardInfoContainer>
        {type === 'withdraw' && (
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
          balance={balance}
          balanceLoading={balanceLoading || delegationSharesLoading}
          disabled={isWrongNetwork || isLoading || !accountAddress}
          purple={type === 'withdraw'}
          hasError={insufficientFunds || insufficientWithdrawalBalance || insufficientMinDeposit}
          type={type}
        />
        {!accountAddress && (
          <StakeButton
            onClick={() => setOpenSidebarConnectWallet(true)}
            label={t('connectWalletSideBar.connectButton')}
            isLoading={openSidebarConnectWallet}
          />
        )}
        {accountAddress && (
          <StakeButton
            isLoading={isLoading}
            onClick={openStakeConfirmation}
            label={handleLabelButton()}
            purple={type === 'withdraw'}
            disabled={
              insufficientFunds || insufficientWithdrawalBalance || amountIsEmpty || insufficientMinDeposit
            }
          />
        )}
        <StakeInfo>
          <div>
            <span>{`${t('youReceive')} `}</span>
            <span>{` ${truncateWei(expectedSeth, 18) || '0'} ${operationSymbol}`}</span>
          </div>
          <div>
            <span>{t('confirmStakeModal.exchangeRate')}</span>
            {type === 'deposit' && (
              <span>
                1 <span>{t('eth.symbol')}</span> = {truncateWei(ratioEthByShare)} <span>{t('lsd.symbol')}</span>
              </span>
            )}
            {type === 'withdraw' && (
              <span>
                1 <span>{t('lsd.symbol')}</span> = {truncateWei(ratioEthByShare)} <span>{t('eth.symbol')}</span>
              </span>
            )}
          </div>
          <div>
            <span>{`${t('fee')} `}</span>
            <span>0.3%</span>
          </div>
        </StakeInfo>
      </StakeContainer>
      <StakeConfirmModal
        amount={amount}
        amountEthByShare={expectedSeth}
        txHash={txHash}
        titleModal={titleConfirmStakeModal}
        type={type}
        labelButton={handleLabelButton()}
        onClick={handleStakeConfirmation}
        ethRatio={ratioEthByShare}
        estimatedCost={estimatedCostInEther}
        transactionLoading={isLoading}
        walletActionLoading={walletActionLoading}
        transactionIsSuccess={isSuccess}
        onClose={() => setOpenStakeConfirmModal(false)}
      />
    </>
  )
}

const { StakeContainer, CardInfoContainer, StakeInfo, CardInfo, CardInfoData } = {
  StakeContainer: styled.div`
    display: grid;
    gap: ${({ theme }) => theme.size[16]};
    padding: ${({ theme }) => theme.size[24]};
  `,
  CardInfoContainer: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    gap: ${({ theme }) => theme.size[16]};
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      gap: ${({ theme }) => theme.size[24]};
      grid-template-columns: 1fr 1fr;
    }
  `,
  CardInfo: styled.div`
    display: flex;
    justify-content: space-between;

    border-radius: ${({ theme }) => theme.size[12]};

    div:nth-child(1) {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[16]};
    }
  `,
  CardInfoData: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${({ theme }) => theme.size[4]};
    > header {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[4]};
      > h4 {
        font-size: ${({ theme }) => theme.font.size[12]};
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: ${({ theme }) => theme.color.blue[600]};
      }
    }
    > div {
      display: flex;
      gap: ${({ theme }) => theme.size[4]};
      span {
        font-size: ${({ theme }) => theme.font.size[16]};
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        color: ${({ theme }) => theme.color.primary};

        &.purple {
          color: ${({ theme }) => theme.color.secondary};
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
  StakeInfo: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};
    font-size: ${({ theme }) => theme.size[12]};

    > div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      font-size: ${({ theme }) => theme.font.size[14]};
      font-style: normal;
      line-height: normal;

      > span:nth-child(1) {
        font-weight: 400;
        color: ${({ theme }) => theme.color.blue[600]};
      }
      > span:nth-child(2) {
        font-weight: 500;
        color: ${({ theme }) => theme.color.primary};
        > span {
          color: ${({ theme }) => theme.color.secondary};
        }
      }
    }
  `
  // QuestionIcon: styled(AiOutlineQuestionCircle)
  //   width: 12px;
  //   height: 12px;
  //   color: ${({ theme }) => theme.color.blackAlpha[500]};
  //   cursor: pointer;
  // `
}
