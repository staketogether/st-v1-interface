import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useState } from 'react'
import styled from 'styled-components'
import useTranslation from '../../hooks/useTranslation'
import StakeButton from './StakeButton'
import StakeFormInput from './StakeInput'

interface StakeFormWithdrawEmptyAccountProps {
  accountAddress?: `0x${string}`
}

export default function StakeFormWithdrawEmptyAccount({
  accountAddress
}: StakeFormWithdrawEmptyAccountProps) {
  const { t } = useTranslation()
  const [amount, setAmount] = useState<string>('')

  const disabled = !accountAddress
  const { openConnectModal } = useConnectModal()
  const cethBalance = '0'

  const handleOnClickButton = () => {
    if (openConnectModal) {
      openConnectModal()
    }
  }

  return (
    <StakeContainer>
      <StakeFormInput
        value={amount}
        onChange={value => setAmount(value)}
        balance={cethBalance}
        symbol={t('lsd.symbol')}
        disabled={disabled}
        purple
      />
      <StakeButton
        isLoading={false}
        onClick={handleOnClickButton}
        label={t('withdrawButton.wallet')}
        purple
      />
      <StakeInfo>
        <span>
          {`${t('youReceive')} ${amount || '0'}`}
          <span>{`${t('eth.symbol')}`}</span>
        </span>
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
