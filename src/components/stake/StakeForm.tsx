import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { globalConfig } from '../../config/global'
import Image from 'next/image'
import chainConfig from '@/config/chain'
import { useMinDepositAmount } from '@/hooks/contracts/useMinDepositAmount'
import { useWithdrawalLiquidityBalance } from '@/hooks/contracts/useWithdrawalLiquidityBalance'
import useDelegationShares from '@/hooks/subgraphs/useDelegationShares'
import useStakeConfirmModal from '@/hooks/useStakeConfirmModal'
import { ethers } from 'ethers'
import { useDebounce } from 'usehooks-ts'
import { useNetwork, useSwitchNetwork } from 'wagmi'
import useDeposit from '../../hooks/contracts/useDeposit'
import useEthBalanceOf from '../../hooks/contracts/useEthBalanceOf'
import useWithdraw from '../../hooks/contracts/useWithdraw'
import useTranslation from '../../hooks/useTranslation'
import { truncateWei } from '../../services/truncate'
import StakeButton from './StakeButton'
import StakeConfirmModal from './StakeConfirmModal'
import StakeFormInput from './StakeInput'
import WalletBuyEthModal from '../shared/wallet/WalletBuyEthModal'
import stIcon from '@assets/icons/staked-icon.svg'
import ethIcon from '@assets/icons/eth-icon.svg'
import { AiOutlineCreditCard } from 'react-icons/ai'
import useWalletByEthModal from '@/hooks/useWalletByEthModal'
import usePooledEthByShares from '@/hooks/contracts/usePooledEthByShares'
import usePooledShareByEth from '@/hooks/contracts/useSharesByPooledEth'

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
  const {
    delegationSharesFormatted,
    loading: delegationSharesLoading,
    refetch: delegationSharesRefetch
  } = useDelegationShares(accountAddress, poolAddress)
  const { withdrawalLiquidityBalance } = useWithdrawalLiquidityBalance()
  const { minDepositAmount } = useMinDepositAmount()

  const [amount, setAmount] = useState<string>('')
  const { balance: ethByShare } = usePooledEthByShares(ethers.parseUnits(amount || '0', 'ether').toString())
  const { balance: shareByEth } = usePooledShareByEth(ethByShare)
  const debouncedAmount = useDebounce(amount, 1000)

  const { setOpenModal: openByEthModal } = useWalletByEthModal()

  const inputAmount = debouncedAmount || '0'

  const {
    deposit,
    isSuccess: depositSuccess,
    isLoading: depositLoading,
    estimateGas: depositEstimateGas,
    awaitWalletAction: depositAwaitWalletAction,
    resetState: depositResetState,
    txHash: depositTxHash
  } = useDeposit(inputAmount, accountAddress, poolAddress, type === 'deposit')

  const {
    withdraw,
    isLoading: withdrawLoading,
    isSuccess: withdrawSuccess,
    estimateGas: withdrawEstimateGas,
    awaitWalletAction: withdrawAwaitWalletAction,
    resetState: withdrawResetState,
    txHash: withdrawTxHash
  } = useWithdraw(inputAmount, accountAddress, poolAddress, type === 'withdraw')

  const rewardsFee = truncateWei(fee.protocol * 100n)

  const isLoading = depositLoading || withdrawLoading
  const isSuccess = depositSuccess || withdrawSuccess

  const balance = type === 'deposit' ? ethBalance : delegationSharesFormatted
  const actionLabel = type === 'deposit' ? t('form.deposit') : t('form.withdraw')
  const balanceLabel = type === 'deposit' ? t('eth.symbol') : t('lsd.symbol')
  const receiveSymbol = type === 'deposit' ? t('lsd.symbol') : t('eth.symbol')

  const estimateGas = type === 'deposit' ? depositEstimateGas : withdrawEstimateGas
  const txHash = type === 'deposit' ? depositTxHash : withdrawTxHash
  const resetState = type === 'deposit' ? depositResetState : withdrawResetState

  const amountBigNumber = ethers.parseEther(amount || '0')

  const insufficientFunds = amountBigNumber > balance
  const insufficientMinDeposit = type === 'deposit' && amountBigNumber < minDepositAmount && amount.length > 0
  const insufficientWithdrawalLiquidity =
    type === 'withdraw' && amountBigNumber > withdrawalLiquidityBalance && amount.length > 0
  const amountIsEmpty = amountBigNumber === 0n || !amount

  const errorLabel =
    (insufficientFunds && t('form.insufficientFunds')) ||
    (insufficientMinDeposit &&
      `${t('form.insufficientMinDeposit')} ${truncateWei(minDepositAmount)} ${t('eth.symbol')}`) ||
    (insufficientWithdrawalLiquidity &&
      `${t('form.insufficientLiquidity')} ${truncateWei(withdrawalLiquidityBalance)} ${t('lsd.symbol')}`) ||
    ''
  const titleConfirmStakeModal =
    type === 'deposit' ? t('confirmStakeModal.reviewDeposit') : t('confirmStakeModal.reviewWithdraw')
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

  const handleBuyEthSuccess = () => {
    delegationSharesRefetch()
    refetchEthBalance()
  }

  return (
    <>
      <StakeContainer>
        {delegationSharesFormatted > 0 && (
          <CardInfo>
            <div>
              <div>
                <Image src={stIcon} width={24} height={24} alt='staked Icon' />
              </div>
              <div>
                <h4>{t('staked')}</h4>
                <span className='purple'>{truncateWei(delegationSharesFormatted, 6)} SETH</span>
              </div>
            </div>
            <div>
              <h4>{t('rewards')}</h4>
              <span className='green'>
                +0.54321 <span className='purple'> SETH</span>
              </span>
            </div>
          </CardInfo>
        )}
        <CardInfo>
          <div>
            <div>
              <Image src={ethIcon} width={24} height={24} alt='staked Icon' />
            </div>
            <div>
              <h4>{t('availableToStake')}</h4>
              <span className='purple'>{truncateWei(ethBalance, 6)} ETH</span>
            </div>
          </div>
          <div>
            <BuyEthButton
              onClick={() => openByEthModal(true)}
              className={`${type === 'withdraw' ? 'purple' : ''}`}
            >
              <AiOutlineCreditCard />
              {t('buyEth.button')}
            </BuyEthButton>
          </div>
        </CardInfo>
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
            insufficientFunds || insufficientMinDeposit || insufficientWithdrawalLiquidity || amountIsEmpty
          }
        />
        <StakeInfo>
          <div>
            <span>{`${t('youReceive')} `}</span>
            <span>{` ${type === 'deposit' ? truncateWei(shareByEth, 4) || '0' : amount}`}</span>
          </div>
          {type === 'deposit' && (
            <div>
              <span>{`${t('rewardsFee')}`}</span>
              <span>{`${rewardsFee}%`}</span>
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
      <WalletBuyEthModal walletAddress={accountAddress} onBuyEthIsSuccess={handleBuyEthSuccess} />
    </>
  )
}

const { StakeContainer, StakeInfo, CardInfo, BuyEthButton } = {
  StakeContainer: styled.div`
    display: grid;
    gap: ${({ theme }) => theme.size[16]};
    padding: ${({ theme }) => theme.size[24]};
  `,
  CardInfo: styled.div`
    display: flex;
    padding: ${({ theme }) => theme.size[12]} ${({ theme }) => theme.size[16]};
    gap: ${({ theme }) => theme.size[16]};
    justify-content: space-between;

    border-radius: 12px;
    background: ${({ theme }) => theme.color.whiteAlpha[600]};

    h4 {
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: ${({ theme }) => theme.color.blue[400]};
    }
    span {
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      color: ${({ theme }) => theme.color.primary};
    }

    > div:nth-child(1) {
      display: flex;
      gap: ${({ theme }) => theme.size[16]};
      align-items: center;
      div {
        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.size[4]};
        .purple {
          color: ${({ theme }) => theme.color.secondary};
        }
      }
    }
    > div:nth-child(2) {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[4]};
      align-items: center;
      justify-content: center;
      .green {
        color: ${({ theme }) => theme.color.green[500]};
      }
    }
  `,
  StakeInfo: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 8px;
    padding: 0px ${({ theme }) => theme.size[12]};
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
        color: ${({ theme }) => theme.color.blue[400]};
      }
      > span:nth-child(2) {
        font-weight: 500;
        color: ${({ theme }) => theme.color.secondary};
      }
    }
  `,
  BuyEthButton: styled.button`
    border: none;
    height: 24px;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.primary};
    border-radius: 12px;
    transition: background-color 0.1s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    padding: 0px 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    &:hover {
      background: ${({ theme }) => theme.color.blue[600]};
    }

    &.purple {
      background: ${({ theme }) => theme.color.purple[700]};
      &:hover {
        background: ${({ theme }) => theme.color.purple[900]};
      }
    }
  `
}
