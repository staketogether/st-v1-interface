import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { globalConfig } from '../../config/global'

import { useDebounce } from 'usehooks-ts'
import useDeposit from '../../hooks/contracts/useDeposit'
import useEthBalanceOf from '../../hooks/contracts/useEthBalanceOf'
import useTranslation from '../../hooks/useTranslation'
import { truncateEther } from '../../services/truncateEther'
import StakeButton from './StakeButton'
import StakeFormInput from './StakeInput'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { searchVar } from '../shared/layout/LayoutSearch'
import useResizeView from '@/hooks/useResizeView'
import { searchModalVar } from '../shared/layout/LayoutSearchSideBar'

interface StakeFormDepositProps {
  accountAddress?: `0x${string}`
  communityAddress?: `0x${string}`
}

export default function StakeFormDeposit({ communityAddress, accountAddress }: StakeFormDepositProps) {
  const { fee } = globalConfig

  const { t } = useTranslation()
  const ethBalance = useEthBalanceOf(accountAddress)
  const [label, setLabel] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const debouncedAmount = useDebounce(amount, 500)
  const stakeAmount = debouncedAmount || '0'

  const { deposit, isSuccess, isLoading } = useDeposit(
    stakeAmount,
    accountAddress || '0x',
    communityAddress || '0x'
  )

  const delegationFee = truncateEther(fee.delegation.mul(100).toString())
  const protocolFee = truncateEther(fee.operator.add(fee.protocol).mul(100).toString())
  const disabled = !communityAddress || !accountAddress

  const { openConnectModal } = useConnectModal()
  const { screenWidth, breakpoints } = useResizeView()

  useEffect(() => {
    const getLabel = () => {
      if (!accountAddress) {
        return t('depositButton.wallet')
      }
      if (!communityAddress) {
        return t('depositButton.selectCommunity')
      }
      if (isLoading) {
        return t('processing')
      }
      return t('depositButton.deposit')
    }

    setLabel(getLabel())
  }, [accountAddress, communityAddress, isLoading, t])

  useEffect(() => {
    if (isSuccess) {
      setAmount('')
    }
  }, [isSuccess])

  const handleDeposit = () => {
    if (!accountAddress && openConnectModal) {
      openConnectModal()
      return
    }
    if (!communityAddress) {
      if (screenWidth >= breakpoints.lg) {
        searchVar(true)
        return
      }
      searchModalVar(true)
    }
    deposit()
  }

  return (
    <>
      <StakeContainer>
        <StakeFormInput
          value={amount}
          onChange={value => setAmount(value)}
          balance={ethBalance}
          symbol={t('eth.symbol')}
          disabled={disabled}
        />
        <StakeButton isLoading={isLoading} onClick={handleDeposit} label={label} />
        <StakeInfo>
          <span>
            {`${t('youReceive')} ${amount || '0'}`}
            <span>{`${t('lsd.symbol')}`}</span>
          </span>
          <div>
            <span>{`${t('delegation')}: ${delegationFee}%`}</span>
            <span>{`${t('rewardsFee')}: ${protocolFee}%`}</span>
          </div>
        </StakeInfo>
      </StakeContainer>
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
