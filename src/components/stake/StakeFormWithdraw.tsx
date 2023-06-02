import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { useDebounce } from 'usehooks-ts'

import useCethBalanceOf from '../../hooks/contracts/useCethBalanceOf'
import useWithdraw from '../../hooks/contracts/useWithdraw'
import useTranslation from '../../hooks/useTranslation'
import StakeButton from './StakeButton'
import StakeFormInput from './StakeInput'
import { Account } from "@/types/Account";
import { Community } from "@/types/Community";
import { useCommunityCache } from "@/services/useCommunityCache";
import { useAccountCache } from "@/services/useAccountCache";

interface StakeFormWithdrawProps {
  walletAddress: `0x${string}`
  stAcccount?: Account
  community: Community
}

export default function StakeFormWithdraw({ community, stAcccount, walletAddress }: StakeFormWithdrawProps) {
  const { t } = useTranslation()

  const { balance: accountBalance, refetch: refetchAccountBalance } = useCethBalanceOf(walletAddress)
  const { withdrawStake: withdrawCommunityStake } = useCommunityCache()
  const { withdrawStake: withdrawAccountStake } = useAccountCache()

  const [label, setLabel] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const debouncedAmount = useDebounce(amount, 500)
  const unstakeAmount = debouncedAmount || '0'

  const { withdraw, isLoading, isSuccess } = useWithdraw(unstakeAmount, walletAddress, community.address)

  const disabled = !community || !stAcccount

  useEffect(() => {
    const getLabel = () => {
      if (isLoading) {
        return t('processing')
      }
      return t('unstake')
    }

    setLabel(getLabel())
  }, [stAcccount, community, isLoading, t])

  useEffect(() => {
    if (isSuccess) {
      refetchAccountBalance()
      withdrawCommunityStake(community, walletAddress, unstakeAmount)
      stAcccount && withdrawAccountStake(community, stAcccount, unstakeAmount)
      setAmount('')
    }
  }, [stAcccount, community, isSuccess, refetchAccountBalance, unstakeAmount, walletAddress, withdrawAccountStake, withdrawCommunityStake])

  return (
    <>
      <StakeContainer>
        <StakeFormInput
          value={amount}
          onChange={value => setAmount(value)}
          balance={accountBalance}
          symbol={t('lsd.symbol')}
          disabled={disabled}
          purple
        />
        <StakeButton isLoading={isLoading} onClick={withdraw} label={label} disabled={disabled} purple />
        <StakeInfo>
          <span>
            {`${t('youReceive')} ${amount || '0'}`}
            <span>{`${t('eth.symbol')}`}</span>
          </span>
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
