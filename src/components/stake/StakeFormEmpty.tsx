import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { globalConfig } from '../../config/global'

import useResizeView from '@/hooks/useResizeView'
import useSearchDrawer from '@/hooks/useSearchDrawer'
import useSearchHeader from '@/hooks/useSearchHeader'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import useEthBalanceOf from '../../hooks/contracts/useEthBalanceOf'
import useTranslation from '../../hooks/useTranslation'
import { truncateEther } from '../../services/truncateEther'
import StakeButton from './StakeButton'
import StakeFormInput from './StakeInput'

interface StakeFormDepositProps {
  accountAddress?: `0x${string}`
  communityAddress?: `0x${string}`
}

export default function StakeFormEmpty({ communityAddress, accountAddress }: StakeFormDepositProps) {
  const { fee } = globalConfig
  const { t } = useTranslation()
  const ethBalance = useEthBalanceOf(accountAddress)
  const [label, setLabel] = useState<string>('')
  const [amount, setAmount] = useState<string>('')

  const { setOpenSearchDrawer } = useSearchDrawer()
  const { setOpenSearchHeader } = useSearchHeader()

  const delegationFee = truncateEther(fee.delegation.mul(100).toString())
  const protocolFee = truncateEther(fee.operator.add(fee.protocol).mul(100).toString())

  const { openConnectModal } = useConnectModal()
  const { screenWidth, breakpoints } = useResizeView()

  useEffect(() => {
    const getLabel = () => {
      if (!accountAddress) {
        return t('depositButton.wallet')
      }

      return t('depositButton.selectCommunity')
    }

    setLabel(getLabel())
  }, [accountAddress, communityAddress, t])

  const handleOnClickButton = () => {
    if (!accountAddress && openConnectModal) {
      openConnectModal()
      return
    }
    if (!communityAddress) {
      if (screenWidth >= breakpoints.lg) {
        setOpenSearchHeader(true)
        return
      }
      setOpenSearchDrawer(true)
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
      <StakeButton isLoading={false} onClick={handleOnClickButton} label={label} />
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
