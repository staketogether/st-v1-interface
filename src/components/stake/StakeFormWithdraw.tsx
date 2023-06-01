import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { useDebounce } from 'usehooks-ts'
import useReceivedDelegationsOf from '../../hooks/contracts/useReceivedDelegationOf'

import useWithdraw from '../../hooks/contracts/useWithdraw'
import useTranslation from '../../hooks/useTranslation'
import StakeButton from './StakeButton'
import StakeFormInput from './StakeInput'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { searchVar } from '../shared/layout/LayoutSearch'

interface StakeFormWithdrawProps {
  accountAddress?: `0x${string}`
  communityAddress?: `0x${string}`
}

export default function StakeFormWithdraw({ communityAddress, accountAddress }: StakeFormWithdrawProps) {
  const { t } = useTranslation()

  const delegation = useReceivedDelegationsOf(communityAddress || '0x', accountAddress || '0x')

  const cethBalance = delegation.totalAmountReceived

  const [label, setLabel] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const debouncedAmount = useDebounce(amount, 500)
  const unstakeAmount = debouncedAmount || '0'

  const { withdraw, isLoading, isSuccess } = useWithdraw(
    unstakeAmount,
    accountAddress || '0x',
    communityAddress || '0x'
  )

  const disabled = !communityAddress || !accountAddress
  const { openConnectModal } = useConnectModal()

  useEffect(() => {
    const getLabel = () => {
      if (!accountAddress) {
        return t('withdrawButton.wallet')
      }
      if (!communityAddress) {
        return t('withdrawButton.selectCommunity')
      }
      if (isLoading) {
        return t('processing')
      }
      return t('withdrawButton.withdraw')
    }

    setLabel(getLabel())
  }, [accountAddress, communityAddress, isLoading, t])

  useEffect(() => {
    if (isSuccess) {
      setAmount('')
    }
  }, [isSuccess])

  const handleWithdraw = () => {
    if (!accountAddress && openConnectModal) {
      openConnectModal()
      return
    }
    if (!communityAddress) {
      searchVar(true)
      return
    }
    withdraw()
  }

  return (
    <>
      <StakeContainer>
        <StakeFormInput
          value={amount}
          onChange={value => setAmount(value)}
          balance={cethBalance}
          symbol={t('lsd.symbol')}
          disabled={disabled}
          purple
        />
        <StakeButton isLoading={isLoading} onClick={handleWithdraw} label={label} purple />
        <StakeInfo>
          <span>
            {`${t('youReceive')} ${amount || '0'}`}
            <span>{`${t('eth.symbol')}`}</span>
          </span>
          {/* <div>
            <span>{`${t('delegation')} ${delegationFee}%`}</span>
            <span>{`${t('fee')} ${protocolFee}%`}</span>
          </div> */}
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
