import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { globalConfig } from '../../config/global'

import { useDebounce } from 'usehooks-ts'
import useCethBalanceOf from '../../hooks/contracts/useCethBalanceOf'
import useUnstake from '../../hooks/contracts/useUnstake'
import useTranslation from '../../hooks/useTranslation'
import StakeButton from './StakeButton'
import StakeFormInput from './StakeInput'

interface StakeFormUnstakeProps {
  accountAddress: `0x${string}`
  communityAddress: `0x${string}`
}

export default function StakeFormUnstake({ communityAddress, accountAddress }: StakeFormUnstakeProps) {
  const { ceth, eth } = globalConfig
  const { t } = useTranslation()

  const cethBalance = useCethBalanceOf(accountAddress)

  const [label, setLabel] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const debouncedAmount = useDebounce(amount, 500)
  const unstakeAmount = debouncedAmount || '0'

  const { unstake, isLoading, isSuccess } = useUnstake(unstakeAmount, accountAddress, communityAddress)

  const disabled = !communityAddress || !accountAddress

  useEffect(() => {
    const getLabel = () => {
      if (isLoading) {
        return 'UnStaking...'
      }
      return 'Unstake'
    }

    setLabel(getLabel())
  }, [accountAddress, communityAddress, isLoading])

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
          balance={cethBalance}
          symbol={ceth.symbol}
          disabled={disabled}
        />
        <StakeButton
          isLoading={isLoading}
          onClick={unstake}
          label={label}
          amount={amount}
          disabled={disabled}
        />
      </StakeContainer>
      <StakeInfo>
        <span>{`${t('youReceive')} ${amount || '0'} ${eth.symbol}`}</span>
        {/* <div>
          <span>{`Delegation ${delegationFee}%`}</span>
          <span>{`Fee ${protocolFee}%`}</span>
        </div> */}
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
