import { useState } from 'react'
import styled from 'styled-components'
import { globalConfig } from '../../config/global'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import useEthBalanceOf from '../../hooks/contracts/useEthBalanceOf'
import useTranslation from '../../hooks/useTranslation'
import { truncateEther } from '../../services/truncateEther'
import StakeButton from './StakeButton'
import StakeFormInput from './StakeInput'

interface StakeFormDepositEmptyAccountProps {
  accountAddress?: `0x${string}`
}

export default function StakeFormDepositEmptyAccount({
  accountAddress
}: StakeFormDepositEmptyAccountProps) {
  const { t } = useTranslation()
  const ethBalance = useEthBalanceOf(accountAddress)
  const { openConnectModal } = useConnectModal()

  const [amount, setAmount] = useState<string>('')

  const { fee } = globalConfig
  const delegationFee = truncateEther(fee.delegation.mul(100).toString())
  const protocolFee = truncateEther(fee.operator.add(fee.protocol).mul(100).toString())

  const handleOnClickButton = () => {
    if (!accountAddress && openConnectModal) {
      openConnectModal()
      return
    }
  }

  return (
    <StakeContainer>
      <StakeFormInput
        value={amount}
        onChange={value => setAmount(value)}
        balance={ethBalance}
        symbol={t('eth.symbol')}
        disabled={true}
      />
      <StakeButton isLoading={false} onClick={handleOnClickButton} label={t('depositButton.wallet')} />
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
