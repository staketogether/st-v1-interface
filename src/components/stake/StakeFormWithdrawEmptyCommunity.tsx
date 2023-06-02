import useResizeView from '@/hooks/useResizeView'
import useSearchDrawer from '@/hooks/useSearchDrawer'
import useSearchHeader from '@/hooks/useSearchHeader'
import { useState } from 'react'
import styled from 'styled-components'
import useCethBalanceOf from '../../hooks/contracts/useCethBalanceOf'
import useTranslation from '../../hooks/useTranslation'
import StakeButton from './StakeButton'
import StakeFormInput from './StakeInput'

interface StakeFormWithdrawEmptyCommunityProps {
  accountAddress: `0x${string}`
  communityAddress?: `0x${string}`
}

export default function StakeFormWithdrawEmptyCommunity({
  communityAddress,
  accountAddress
}: StakeFormWithdrawEmptyCommunityProps) {
  const { t } = useTranslation()
  const cethBalance = useCethBalanceOf(accountAddress)
  const { setOpenSearchDrawer } = useSearchDrawer()
  const { setOpenSearchHeader } = useSearchHeader()
  const { screenWidth, breakpoints } = useResizeView()

  const [amount, setAmount] = useState<string>('')

  const disabled = !communityAddress || !accountAddress

  const handleOnClickButton = () => {
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
        balance={cethBalance}
        symbol={t('lsd.symbol')}
        disabled={disabled}
        purple
      />
      <StakeButton
        isLoading={false}
        onClick={handleOnClickButton}
        label={t('withdrawButton.selectCommunity')}
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
