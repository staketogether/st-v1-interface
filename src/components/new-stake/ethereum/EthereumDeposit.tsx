import Button from '@/components/shared/Button'
import React, { useEffect, useState } from 'react'
import { PiArrowDown, PiArrowLineRight } from 'react-icons/pi'
import styled from 'styled-components'
import EthereumInput from './EthereumInput'
import EthereumShowReceiveCoin from './EthereumShowReceiveCoin'
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
import EthereumDescription from './EthereumDescription'
import EthereumProjectSelect from './EthereumProjectSelect'
import { Product } from '@/types/Product'

type EthereumDepositProps = {
  type: 'deposit' | 'withdraw'
  ethBalance: bigint
  ethBalanceLoading: boolean
  ethBalanceRefetch: () => void
  stpETHBalance: bigint
  stpETHBalanceLoading: boolean
  account: `0x${string}` | undefined
  product: Product
}

export default function EthereumDeposit({
  type,
  account,
  ethBalance,
  ethBalanceLoading,
  ethBalanceRefetch,
  stpETHBalance,
  stpETHBalanceLoading,
  product
}: EthereumDepositProps) {
  const [amount, setAmount] = useState<string>('')
  const [isActivatedDelegation, setIsActivatedDelegation] = useState(false)

  const { stakeTogetherPool, chainId, name } = chainConfig()
  const [poolDelegatedSelected, setPoolDelegatedSelected] = useState<`0x${string}`>(stakeTogetherPool)
  const { t } = useLocaleTranslation()
  const { locale, push, pathname, query } = useRouter()

  const handleAddProjectOnRoute = (projectAddress: `0x${string}`) => {
    push(
      {
        pathname: pathname,
        query: { ...query, projectAddress }
      },
      undefined,
      { shallow: true }
    )
  }

  useEffect(() => {
    if (query.projectAddress) {
      setIsActivatedDelegation(true)
      setPoolDelegatedSelected(query.projectAddress as `0x${string}`)
    }
  }, [query.projectAddress])

  const { setOpenStakeConfirmModal, isOpen: isOpenStakeConfirmModal } = useStakeConfirmModal()
  const { setOpenSidebarConnectWallet, openSidebarConnectWallet } = useWalletSidebarConnectWallet()

  const debouncedAmount = useDebounce(amount, 400)
  const inputAmount = amount ? debouncedAmount || '0' : '0'

  const { fee, loading: isLoadingFees } = useFeeStakeEntry()
  const parsedAmount = ethers.parseUnits(inputAmount, 18)
  const feeAmount = (parsedAmount * BigInt(fee?.value || 0n)) / ethers.parseEther('1')
  const youReceiveDeposit = ethers.parseUnits(inputAmount, 18) - feeAmount

  const { stConfig } = useStConfig({ productName: product.name })
  const minDepositAmount = stConfig?.minDepositAmount || 0n

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
    poolDelegatedSelected,
    !isWrongNetwork,
    product,
    account
  )

  useEffect(() => {
    const handleSuccessfulAction = async () => {
      if (isSuccess && !isOpenStakeConfirmModal) {
        setAmount('')
        resetState()
        await ethBalanceRefetch()
      }
    }

    handleSuccessfulAction()
  }, [ethBalanceRefetch, isOpenStakeConfirmModal, isSuccess, resetState])

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
            type={type}
            hasError={cantDeposit}
            balance={ethBalance}
            balanceLoading={ethBalanceLoading}
            onMaxFunction={handleInputMaxValue}
          />
          <DividerBox>
            <PiArrowDown style={{ fontSize: 16 }} />
          </DividerBox>
          <EthereumShowReceiveCoin
            amountValue={formatNumberByLocale(truncateWei(youReceiveDeposit, 5), locale)}
            balance={stpETHBalance}
            balanceLoading={stpETHBalanceLoading}
            type={type}
          />
        </InputContainer>
        <EthereumProjectSelect
          isActivatedDelegation={isActivatedDelegation}
          onChange={e => setIsActivatedDelegation(e)}
          poolDelegatedSelected={poolDelegatedSelected}
          handleDelegationChange={project => {
            handleAddProjectOnRoute(project)
          }}
        />
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
        <EthereumDescription />
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

const { Container, InputContainer, DividerBox, ConnectWalletIcon } = {
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
  ConnectWalletIcon: styled(PiArrowLineRight)`
    font-size: 16px;
  `
}
