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
import { Community } from '@/types/Community'
import { useCommunityCache } from '@/hooks/cache/useCommunityCache'
import { Account } from "@/types/Account";
import { useAccountCache } from "@/hooks/cache/useAccountCache";
import { BigNumber } from "ethers";

interface StakeFormDepositProps {
  account?: Account
  walletAddress: `0x${string}`
  community: Community
}

export default function StakeFormDeposit({ community, account, walletAddress }: StakeFormDepositProps) {
  const { fee } = globalConfig

  const { t } = useTranslation()

  const { balance: accountBalance } = useEthBalanceOf(walletAddress)
  const { addStake: withdrawCommunityStake } = useCommunityCache()
  const { addStake: withdrawAccountStake } = useAccountCache()
  const [label, setLabel] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const debouncedAmount = useDebounce(amount, 500)
  const stakeAmount = debouncedAmount || '0'

  const { deposit, isSuccess, isLoading } = useDeposit(stakeAmount, walletAddress, community.address)

  const delegationFee = truncateEther(fee.delegation.mul(100).toString())
  const protocolFee = truncateEther(fee.operator.add(fee.protocol).mul(100).toString())

  const disabled = !community || !walletAddress

  useEffect(() => {
    const getLabel = () => {
      if (isLoading) {
        return t('processing')
      }
      return t('stake')
    }

    setLabel(getLabel())
  }, [account, community, isLoading, t])

  useEffect(() => {
    if (isSuccess) {
      const virtualAccount: Account = account || {
        id: walletAddress.toLowerCase(),
        address: walletAddress.toLowerCase() as `0x${string}`,
        shares: BigNumber.from(0),
        sentDelegationsCount: 1,
        balance: BigNumber.from(0),
        rewardsShares: BigNumber.from(0),
        delegations: [],
      }

      withdrawCommunityStake(community, walletAddress, stakeAmount)
      withdrawAccountStake(community, virtualAccount, stakeAmount)
      setAmount('')
    }
  }, [account, community, isSuccess, stakeAmount, walletAddress, withdrawAccountStake, withdrawCommunityStake])

  return (
    <>
      <StakeContainer>
        <StakeFormInput
          value={amount}
          onChange={value => setAmount(value)}
          balance={accountBalance}
          symbol={t('eth.symbol')}
          disabled={disabled}
        />
        <StakeButton isLoading={isLoading} onClick={deposit} label={label} disabled={disabled} />
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
