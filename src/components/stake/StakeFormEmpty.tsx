import { useState } from 'react'
import { styled } from 'styled-components'
import { globalConfig } from '../../config/global'

import chainConfig from '@/config/chain'

import { useConnect, useNetwork, useSwitchNetwork } from 'wagmi'
import useEthBalanceOf from '../../hooks/contracts/useEthBalanceOf'
import useResizeView from '../../hooks/useResizeView'
import useSearchDrawer from '../../hooks/useSearchDrawer'
import useSearchHeader from '../../hooks/useSearchHeader'
import useTranslation from '../../hooks/useTranslation'
import { truncateWei } from '../../services/truncate'
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
  const { balance: ethBalance, isLoading } = useEthBalanceOf(accountAddress)

  const [amount, setAmount] = useState<string>('')
  const rewardsFee = truncateWei(fee.protocol * 100n)

  const { setOpenSearchDrawer } = useSearchDrawer()
  const { setOpenSearchHeader } = useSearchHeader()
  const { screenWidth, breakpoints } = useResizeView()

  const { connect } = useConnect()

  const connectAccount = () => {
    if (!accountAddress && connect) {
      connect()
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

  const chain = chainConfig()
  const { chain: walletChainId } = useNetwork()
  const isWrongNetwork = chain.chainId !== walletChainId?.id
  const { switchNetworkAsync } = useSwitchNetwork({
    chainId: chain.chainId
  })

  const handleActionButton = () => {
    if (isWrongNetwork && switchNetworkAsync) {
      switchNetworkAsync()
      return
    }
    if (!accountAddress) {
      return connectAccount()
    }
    selectPool()
  }

  const handleLabelButton = () => {
    if (!accountAddress) {
      return t('form.connectWallet')
    }
    if (isWrongNetwork) {
      return `${t('switch')} ${chain.name.charAt(0).toUpperCase() + chain.name.slice(1)}`
    }
    return t('form.selectPool')
  }

  return (
    <StakeContainer>
      <StakeFormInput
        value={amount}
        onChange={value => setAmount(value)}
        balance={ethBalance}
        symbol={t('eth.symbol')}
        disabled={true}
        balanceLoading={isLoading}
        purple={type === 'withdraw'}
        type={type}
      />
      <StakeButton
        isLoading={false}
        onClick={handleActionButton}
        label={handleLabelButton()}
        purple={type === 'withdraw'}
      />
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
