import Button from '@/components/shared/Button'
import StakeConfirmModal from '@/components/stake/StakeConfirmModal'
import { chainConfigByChainId } from '@/config/chain'
import useDepositPool from '@/hooks/contracts/useDepositPool'
import useStConfig from '@/hooks/contracts/useStConfig'
import { useFeeStakeEntry } from '@/hooks/subgraphs/useFeeStakeEntry'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import useStakeConfirmModal from '@/hooks/useStakeConfirmModal'
import useWalletSidebarConnectWallet from '@/hooks/useWalletSidebarConnectWallet'
import { formatNumberByLocale } from '@/services/format'
import { truncateWei } from '@/services/truncate'
import { Product } from '@/types/Product'
import { WithdrawType } from '@/types/Withdraw'
import { notification } from 'antd'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { PiArrowLineRight, PiArrowsCounterClockwise } from 'react-icons/pi'
import styled from 'styled-components'
import { useDebounce } from 'usehooks-ts'
import { useAccount, useSwitchChain } from 'wagmi'
import EthereumInput from './EthereumInput'
import EthereumProjectSelect from './EthereumProjectSelect'
import EthereumShowReceiveCoin from './EthereumShowReceiveCoin'

type EthereumDepositProps = {
  type: 'deposit' | 'withdraw'
  ethBalance: bigint
  ethBalanceLoading: boolean
  ethBalanceRefetch: () => void
  stpETHBalance: bigint
  stpETHBalanceLoading: boolean
  account: `0x${string}` | undefined
  chainId: number
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
  product,
  chainId
}: EthereumDepositProps) {
  const [amount, setAmount] = useState<string>('')
  const [isActivatedDelegation, setIsActivatedDelegation] = useState(false)

  const { name, isTestnet } = chainConfigByChainId(chainId)
  const stakeTogetherPool = product.stakeTogetherPool[isTestnet ? 'testnet' : 'mainnet']

  const [poolDelegatedSelected, setPoolDelegatedSelected] = useState<`0x${string}`>(stakeTogetherPool)
  const { t } = useLocaleTranslation()
  const { locale, query } = useRouter()

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

  const { stConfig } = useStConfig({ productName: product.name, chainId })
  const minDepositAmount = stConfig?.minDepositAmount || 0n

  const { chain: walletChainId } = useAccount()
  const isWrongNetwork = chainId !== walletChainId?.id

  const {
    deposit,
    isSuccess,
    isLoading,
    awaitWalletAction,
    resetState,
    txHash,
    prepareTransactionIsError,
    prepareTransactionsIsLoading,
    prepareTransactionErrorMessage,
    estimatedGas
  } = useDepositPool(
    youReceiveDeposit,
    ethers.parseUnits(inputAmount, 18),
    poolDelegatedSelected,
    !isWrongNetwork,
    product,
    chainId,
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

  const { switchChain } = useSwitchChain()

  const openStakeConfirmation = () => {
    if (isWrongNetwork && switchChain) {
      switchChain({
        chainId: chainId
      })
      return
    }
    setOpenStakeConfirmModal(true)
  }
  const handleLabelButton = () => {
    if (errorLabel && amount.length > 0) {
      return errorLabel
    }

    return t('form.deposit')
  }

  const handleInputMaxValue = () => {
    if (estimatedGas && ethBalance >= minDepositAmount) {
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
    insufficientFunds ||
    amountIsEmpty ||
    prepareTransactionsIsLoading ||
    insufficientMinDeposit ||
    isLoadingFees ||
    prepareTransactionIsError

  const handleSwitchDelegation = (value: boolean) => {
    if (!value) {
      handleAddProjectOnRoute(stakeTogetherPool)
    }
    setIsActivatedDelegation(value)
  }

  const handleAddProjectOnRoute = (projectAddress: `0x${string}`) => {
    if (window.history && window.history.replaceState) {
      const newUrl = new URL(window.location.href)
      if (projectAddress.toLocaleLowerCase() === stakeTogetherPool.toLocaleLowerCase()) {
        newUrl.searchParams.delete('projectAddress')
      } else {
        newUrl.searchParams.set('projectAddress', projectAddress)
      }
      window.history.replaceState({ path: newUrl.href }, '', newUrl.href)
      setPoolDelegatedSelected(projectAddress)
    }
  }

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
            product={product}
            hasError={cantDeposit && Number(amount) > 0}
            balance={ethBalance}
            balanceLoading={ethBalanceLoading}
            onMaxFunction={handleInputMaxValue}
          />

          <EthereumShowReceiveCoin
            amountValue={formatNumberByLocale(truncateWei(youReceiveDeposit, 5), locale)}
            balance={stpETHBalance}
            balanceLoading={stpETHBalanceLoading}
            type={type}
            chainId={chainId}
            product={product}
          />
        </InputContainer>
        <EthereumProjectSelect
          isActivatedDelegation={isActivatedDelegation}
          onChange={e => handleSwitchDelegation(e)}
          poolDelegatedSelected={poolDelegatedSelected}
          chainId={chainId}
          handleDelegationChange={project => {
            handleAddProjectOnRoute(project)
          }}
        />
        {!!account && !isWrongNetwork && (
          <Button onClick={openStakeConfirmation} label={handleLabelButton()} disabled={cantDeposit} />
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
      </Container>
      <StakeConfirmModal
        amount={amount}
        youReceive={youReceiveDeposit}
        txHash={txHash}
        type={'deposit'}
        product={product}
        labelButton={handleLabelButton()}
        onClick={deposit}
        chainId={chainId}
        transactionLoading={isLoading}
        walletActionLoading={awaitWalletAction}
        transactionIsSuccess={isSuccess}
        onClose={() => setOpenStakeConfirmModal(false)}
        withdrawTypeSelected={WithdrawType.POOL}
      />
    </>
  )
}

const { Container, InputContainer, ConnectWalletIcon, WrongNetworkIcon } = {
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
  WrongNetworkIcon: styled(PiArrowsCounterClockwise)`
    font-size: 16px;
  `
}
