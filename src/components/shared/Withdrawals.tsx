import React, { useEffect } from 'react'
import { PiHandCoins, PiSwap } from 'react-icons/pi'
import styled from 'styled-components'
import ethIcon from '@assets/icons/eth-icon.svg'
import Image from 'next/image'
import Button from './Button'
import { truncateWei } from '@/services/truncate'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import SkeletonLoading from './icons/SkeletonLoading'
import useWithdrawalsIsReady from '@/hooks/contracts/useWithdrawalsIsReady'
import useWithdrawalsStwEth from '@/hooks/contracts/useWithdrawalsStwEth'

type WithdrawalsProps = {
  balance: bigint
  accountAddress: `0x${string}`
  smallAction?: boolean
  isLoading?: boolean
  refetchBalance: () => void
}

export default function Withdrawals({
  smallAction = true,
  accountAddress,
  balance = 0n,
  isLoading = false,
  refetchBalance
}: WithdrawalsProps) {
  const { t } = useLocaleTranslation()
  const { isReady, loading: isReadyLoading } = useWithdrawalsIsReady(balance)
  const { isLoading: withdrawalWithdrawLoading, withdrawalsWithdraw, isSuccess } = useWithdrawalsStwEth(balance, accountAddress, true)

  useEffect(() => {
    if (isSuccess) {
      refetchBalance()
    }
  }, [isSuccess, refetchBalance])

  return (
    <Container>
      <header>
        <WithdrawIcon />
        <span>{t('v2.withdrawals.title')}</span>
      </header>
      <WithdrawContainer>
        <div>
          <Image src={ethIcon} width={24} height={24} alt='stpEth' />
          {isLoading ? <SkeletonLoading height={62} $borderRadius='8px' /> : <>{`${truncateWei(balance, 4)} ${t('wse.symbol')}`}</>}
        </div>
        {!isLoading && balance > 0n && (
          <Button
            small={smallAction}
            label={`${isReady ? t('v2.withdrawals.claim') : t('v2.withdrawals.pending')}`}
            disabled={!isReady || isReadyLoading}
            onClick={withdrawalsWithdraw}
            icon={<ClaimIcon />}
            isLoading={withdrawalWithdrawLoading}
          />
        )}
      </WithdrawContainer>
    </Container>
  )
}

const { Container, WithdrawIcon, WithdrawContainer, ClaimIcon } = {
  Container: styled.div`
    background: ${({ theme }) => theme.colorV2.white};
    border-radius: 8px;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    width: 100%;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    display: flex;
    align-items: center;
    flex-direction: column;

    header {
      height: 48px;
      display: flex;
      width: 100%;
      gap: ${({ theme }) => theme.size[8]};
      align-items: center;
      justify-content: center;
      box-shadow: ${({ theme }) => theme.shadow[100]};

      font-weight: 400;
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.colorV2.gray[1]};
      border-bottom: 1px solid ${({ theme }) => theme.colorV2.gray[2]};
      border-radius: 8px 8px 0 0;
    }
  `,
  WithdrawContainer: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: ${({ theme }) => theme.size[16]};

    > div {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[8]};
      color: ${({ theme }) => theme.colorV2.purple[1]};
    }
  `,
  WithdrawIcon: styled(PiSwap)`
    font-size: 16px;
  `,
  ClaimIcon: styled(PiHandCoins)`
    font-size: 18px;
  `
}
