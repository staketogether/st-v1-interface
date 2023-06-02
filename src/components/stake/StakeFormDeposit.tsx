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

interface StakeFormDepositProps {
  accountAddress: `0x${string}`
  communityAddress: `0x${string}`
}

export default function StakeFormDeposit({ communityAddress, accountAddress }: StakeFormDepositProps) {
  const { fee } = globalConfig
  const { t } = useTranslation()
  const ethBalance = useEthBalanceOf(accountAddress)

  const [amount, setAmount] = useState<string>('')
  const debouncedAmount = useDebounce(amount, 500)

  const stakeAmount = debouncedAmount || '0'
  const { deposit, isSuccess, isLoading } = useDeposit(stakeAmount, accountAddress, communityAddress)

  const delegationFee = truncateEther(fee.delegation.mul(100).toString())
  const protocolFee = truncateEther(fee.operator.add(fee.protocol).mul(100).toString())

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
      />
      <StakeButton isLoading={isLoading} onClick={deposit} label={t('depositButton.deposit')} />
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
