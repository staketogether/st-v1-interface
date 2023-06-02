import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { globalConfig } from '../../config/global'

import { useDebounce } from 'usehooks-ts'
import useDeposit from '../../hooks/contracts/useDeposit'
import useEthBalanceOf from '../../hooks/contracts/useEthBalanceOf'
import useWithdraw from '../../hooks/contracts/useWithdraw'
import useTranslation from '../../hooks/useTranslation'
import { truncateEther } from '../../services/truncateEther'
import StakeButton from './StakeButton'
import StakeFormInput from './StakeInput'

type StakeFormProps = {
  type: 'deposit' | 'withdraw'
  accountAddress: `0x${string}`
  communityAddress: `0x${string}`
}

export function StakeForm({ type, accountAddress, communityAddress }: StakeFormProps) {
  const { fee } = globalConfig
  const { t } = useTranslation()
  const ethBalance = useEthBalanceOf(accountAddress)

  const [amount, setAmount] = useState<string>('')
  const debouncedAmount = useDebounce(amount, 500)

  const inputAmount = debouncedAmount || '0'

  const {
    deposit,
    isSuccess: depositSuccess,
    isLoading: depositLoading
  } = useDeposit(inputAmount, accountAddress, communityAddress)

  const {
    withdraw,
    isLoading: withdrawLoading,
    isSuccess: withdrawSuccess
  } = useWithdraw(inputAmount, accountAddress, communityAddress)

  const delegationFee = truncateEther(fee.community.mul(100).toString())
  const protocolFee = truncateEther(fee.operator.add(fee.protocol).mul(100).toString())

  const isLoading = depositLoading || withdrawLoading

  const isSuccess = depositSuccess || withdrawSuccess
  const action = type === 'deposit' ? deposit : withdraw
  const actionLabel =
    amount.length > 0
      ? type === 'deposit'
        ? t('form.deposit')
        : t('form.withdraw')
      : t('form.inputAmount')

  const coinLabel = type === 'deposit' ? t('lsd.symbol') : t('eth.symbol')

  useEffect(() => {
    if (isSuccess) {
      setAmount('')
    }
  }, [isSuccess])

  return (
    <StakeContainer>
      <StakeFormInput
        value={amount}
        onChange={value => setAmount(value)}
        balance={ethBalance}
        symbol={t('eth.symbol')}
        disabled={isLoading}
        purple={type === 'withdraw'}
      />
      <StakeButton
        isLoading={isLoading}
        onClick={action}
        label={actionLabel}
        purple={type === 'withdraw'}
      />
      <StakeInfo>
        <span>
          {`${t('youReceive')} ${amount || '0'}`}
          <span>{`${coinLabel}`}</span>
        </span>
        {type === 'deposit' && (
          <div>
            <span>{`${t('delegation')}: ${delegationFee}%`}</span>
            <span>{`${t('rewardsFee')}: ${protocolFee}%`}</span>
          </div>
        )}
      </StakeInfo>
    </StakeContainer>
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
