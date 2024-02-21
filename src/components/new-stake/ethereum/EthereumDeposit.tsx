import Button from '@/components/shared/Button'
import React, { useEffect, useState } from 'react'
import { PiArrowDown, PiArrowLineRight, PiQuestion } from 'react-icons/pi'
import styled from 'styled-components'
import EthereumInput from './EthereumInput'
import EthereumStpETHInput from './EthereumInputStpETH'
import useEthBalanceOf from '@/hooks/contracts/useEthBalanceOf'
import useConnectedAccount from '@/hooks/useConnectedAccount'
import useStAccount from '@/hooks/subgraphs/useStAccount'
import { useDebounce } from 'usehooks-ts'
import { useFeeStakeEntry } from '@/hooks/subgraphs/useFeeStakeEntry'
import { ethers } from 'ethers'
import useStConfig from '@/hooks/contracts/useStConfig'
import useDepositPool from '@/hooks/contracts/useDepositPool'
import chainConfig from '@/config/chain'
import { formatNumberByLocale } from '@/services/format'
import { truncateWei } from '@/services/truncate'
import useStakeConfirmModal from '@/hooks/useStakeConfirmModal'
import { useRouter } from 'next/router'
import { useNetwork, useSwitchNetwork } from 'wagmi'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import StakeConfirmModal from '@/components/stake/StakeConfirmModal'
import { WithdrawType } from '@/types/Withdraw'
import useWalletSidebarConnectWallet from '@/hooks/useWalletSidebarConnectWallet'
import { notification } from 'antd'

export default function EthereumDeposit() {
  const [amount, setAmount] = useState<string>('')

  const { t } = useLocaleTranslation()
  const { locale } = useRouter()

  const { account } = useConnectedAccount()
  const { balance: ethBalance, isLoading: ethBalanceLoading } = useEthBalanceOf(account)
  const { accountBalance: stpETHBalance, accountIsLoading: stpETHBalanceLoading } = useStAccount(account)
  const { setOpenStakeConfirmModal, isOpen: isOpenStakeConfirmModal } = useStakeConfirmModal()
  const { setOpenSidebarConnectWallet, openSidebarConnectWallet } = useWalletSidebarConnectWallet()

  const debouncedAmount = useDebounce(amount, 400)
  const inputAmount = amount ? debouncedAmount || '0' : '0'

  const { fee, loading: isLoadingFees } = useFeeStakeEntry()
  const parsedAmount = ethers.parseUnits(inputAmount, 18)
  const feeAmount = (parsedAmount * BigInt(fee?.value || 0n)) / ethers.parseEther('1')
  const youReceiveDeposit = ethers.parseUnits(inputAmount, 18) - feeAmount

  const { stConfig } = useStConfig()
  const minDepositAmount = stConfig?.minDepositAmount || 0n
  const { stakeTogetherPool, chainId, name } = chainConfig()

  const { chain: walletChainId } = useNetwork()
  const isWrongNetwork = chainId !== walletChainId?.id

  const {
    deposit,
    isSuccess,
    isLoading,
    awaitWalletAction,
    resetState,
    txHash,
    prepareTransactionIsError,
    prepareTransactionErrorMessage,
    estimatedGas
  } = useDepositPool(
    youReceiveDeposit,
    ethers.parseUnits(inputAmount, 18),
    stakeTogetherPool,
    !isWrongNetwork,
    account
  )

  useEffect(() => {
    const handleSuccessfulAction = async () => {
      if (isSuccess && !isOpenStakeConfirmModal) {
        setAmount('')
        resetState()
      }
    }

    handleSuccessfulAction()
  }, [isOpenStakeConfirmModal, isSuccess, resetState])

  const amountBigNumber = ethers.parseEther(amount || '0')
  const amountIsEmpty = amountBigNumber === 0n || !amount
  const insufficientMinDeposit = amountBigNumber < minDepositAmount && amount.length > 0
  const insufficientFunds = amountBigNumber > ethBalance
  const errorLabel =
    (insufficientFunds && t('form.insufficientFunds')) ||
    (insufficientMinDeposit &&
      `${t('form.insufficientMinDeposit')} ${truncateWei(minDepositAmount)} ${t('eth.symbol')}`) ||
    (prepareTransactionErrorMessage &&
      `${t(`v2.stake.depositErrorMessage.${prepareTransactionErrorMessage}`)}`) ||
    ''

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

  const handleLabelButton = () => {
    if (isWrongNetwork) {
      return `${t('switch')} ${name.charAt(0).toUpperCase() + name.slice(1)}`
    }
    if (errorLabel && amount.length > 0) {
      return errorLabel
    }

    return t('form.deposit')
  }

  const handleInputMaxValue = () => {
    if (estimatedGas && ethBalance > ethers.parseEther('0.01')) {
      notification.info({
        message: `${t('v2.stake.maxDepositButtonMessage')}`,
        placement: 'topRight'
      })
      setAmount(truncateWei(ethBalance - estimatedGas, 18, true))
      return
    }
    setAmount(truncateWei(ethBalance, 18, true))
  }

  const cantDeposit =
    (insufficientFunds ||
      amountIsEmpty ||
      insufficientMinDeposit ||
      isLoadingFees ||
      prepareTransactionIsError) &&
    !isWrongNetwork
  return (
    <>
      <Container>
        <InputContainer>
          <EthereumInput
            ethAmountValue={amount}
            onChange={value => {
              setAmount(value)
            }}
            hasError={cantDeposit}
            ethBalance={ethBalance}
            ethBalanceLoading={ethBalanceLoading}
            onMaxFunction={handleInputMaxValue}
          />
          <DividerBox>
            <PiArrowDown style={{ fontSize: 16 }} />
          </DividerBox>
          <EthereumStpETHInput
            sptETHAmountValue={formatNumberByLocale(truncateWei(youReceiveDeposit, 5), locale)}
            stpETHBalance={stpETHBalance}
            stpETHBalanceLoading={stpETHBalanceLoading}
          />
        </InputContainer>
        {!!account && (
          <Button onClick={openStakeConfirmation} label={handleLabelButton()} disabled={cantDeposit} />
        )}
        {!account && (
          <Button
            onClick={() => setOpenSidebarConnectWallet(true)}
            label={t('v2.header.enter')}
            isLoading={openSidebarConnectWallet}
            icon={<ConnectWalletIcon />}
          />
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
              <span className='blue'> 0.98 stpETH</span>
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
        youReceive={youReceiveDeposit}
        txHash={txHash}
        type={'deposit'}
        labelButton={handleLabelButton()}
        onClick={deposit}
        transactionLoading={isLoading}
        walletActionLoading={awaitWalletAction}
        transactionIsSuccess={isSuccess}
        onClose={() => setOpenStakeConfirmModal(false)}
        withdrawTypeSelected={WithdrawType.POOL}
      />
    </>
  )
}

const { Container, InputContainer, DescriptionContainer, QuestionIcon, DividerBox, ConnectWalletIcon } = {
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
  `
}
