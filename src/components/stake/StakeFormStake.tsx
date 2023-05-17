import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { globalConfig } from '../../config/global'

import { useDebounce } from 'usehooks-ts'
import useEthBalanceOf from '../../hooks/contracts/useEthBalanceOf'
import useStake from '../../hooks/contracts/useStake'
import useTranslation from '../../hooks/useTranslation'
import { truncateEther } from '../../services/truncateEther'
import StakeButton from './StakeButton'
import StakeFormInput from './StakeInput'

interface StakeFormStakeProps {
  accountAddress: `0x${string}`
  communityAddress: `0x${string}`
}

export default function StakeFormStake({ communityAddress, accountAddress }: StakeFormStakeProps) {
  const { ceth, eth, fee } = globalConfig

  const { t } = useTranslation()

  const ethBalance = useEthBalanceOf(accountAddress)
  const [label, setLabel] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const debouncedAmount = useDebounce(amount, 500)
  const stakeAmount = debouncedAmount || '0'

  const { stake, isSuccess, isLoading } = useStake(stakeAmount, accountAddress, communityAddress)

  const delegationFee = truncateEther(fee.account.mul(100).toString())
  const protocolFee = truncateEther(fee.protocol.mul(100).toString())

  const disabled = !communityAddress || !accountAddress

  useEffect(() => {
    const getLabel = () => {
      if (isLoading) {
        return t('action')
      }
      return t('stake')
    }

    setLabel(getLabel())
  }, [accountAddress, communityAddress, isLoading, t])

  useEffect(() => {
    if (isSuccess) {
      setAmount('')
    }
  }, [isSuccess])

  return (
    <>
      <StakeContainer>
        <StakeFormInput
          value={amount}
          onChange={value => setAmount(value)}
          balance={ethBalance}
          symbol={eth.symbol}
          disabled={disabled}
        />
        <StakeButton
          isLoading={isLoading}
          onClick={stake}
          label={label}
          amount={amount}
          disabled={disabled}
        />
      </StakeContainer>
      <StakeInfo>
        <span>{`${t('youReceive')} ${amount || '0'} ${ceth.symbol}`}</span>
        <div>
          <span>{`${t('delegation')} ${delegationFee}%`}</span>
          <span>{`${t('fee')} ${protocolFee}%`}</span>
        </div>
      </StakeInfo>
    </>
  )
}

const { StakeContainer, StakeInfo } = {
  StakeContainer: styled.div`
    display: grid;
    grid-template-rows: 76px 48px;
    gap: 16px;
  `,
  StakeInfo: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0px 12px;
    > div {
      display: flex;
      gap: 8px;
    }
    > span,
    > div > span {
      font-weight: 400;
      font-size: ${({ theme }) => theme.font.size[14]};
      line-height: 13px;
      display: flex;
      align-items: center;
      > span {
        color: ${({ theme }) => theme.color.blue[300]};
      }

      color: ${({ theme }) => theme.color.purple[600]};
    }
  `
}
