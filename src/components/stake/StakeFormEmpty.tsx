import { useState } from 'react'
import styled from 'styled-components'
import { globalConfig } from '../../config/global'

import { useConnectModal } from '@rainbow-me/rainbowkit'
import useEthBalanceOf from '../../hooks/contracts/useEthBalanceOf'
import useResizeView from '../../hooks/useResizeView'
import useSearchDrawer from '../../hooks/useSearchDrawer'
import useSearchHeader from '../../hooks/useSearchHeader'
import useTranslation from '../../hooks/useTranslation'
import { truncateEther } from '../../services/truncateEther'
import StakeButton from './StakeButton'
import StakeFormInput from './StakeInput'

type StakeFormProps = {
  type: 'deposit' | 'withdraw'
  accountAddress?: `0x${string}`
  poolAddress?: `0x${string}`
}

export function StakeFormEmpty({ type, accountAddress, poolAddress }: StakeFormProps) {
  const { fee } = globalConfig
  const { t } = useTranslation()
  const ethBalance = useEthBalanceOf(accountAddress)

  const [amount, setAmount] = useState<string>('')
  const rewardsFee = truncateEther(fee.protocol.mul(100).toString())

  const { openConnectModal } = useConnectModal()
  const { setOpenSearchDrawer } = useSearchDrawer()
  const { setOpenSearchHeader } = useSearchHeader()
  const { screenWidth, breakpoints } = useResizeView()

  const connectAccount = () => {
    if (!accountAddress && openConnectModal) {
      openConnectModal()
      return
    }
  }

  const selectPool = () => {
    if (!poolAddress) {
      if (screenWidth >= breakpoints.lg) {
        setOpenSearchHeader(true)
        return
      }
      setOpenSearchDrawer(true)
    }
  }

  const action = !accountAddress ? connectAccount : selectPool

  const actionLabel = !accountAddress ? t('form.connectWallet') : t('form.selectPool')

  return (
    <StakeContainer>
      <StakeFormInput
        value={amount}
        onChange={value => setAmount(value)}
        balance={ethBalance}
        symbol={t('eth.symbol')}
        disabled={true}
        purple={type === 'withdraw'}
      />
      <StakeButton isLoading={false} onClick={action} label={actionLabel} purple={type === 'withdraw'} />
      <StakeInfo>
        <span>
          {`${t('youReceive')} ${amount || '0'}`}
          <span>{`${type === 'deposit' ? t('lsd.symbol') : t('eth.symbol')}`}</span>
        </span>
        {type === 'deposit' && (
          <div>
            <span>{`${t('rewardsFee')}: ${rewardsFee}%`}</span>
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

    color: ${({ theme }) => theme.color.blue[300]};

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
