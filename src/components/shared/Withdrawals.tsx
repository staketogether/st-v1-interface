import React, { useEffect } from 'react'
import { PiHandCoins, PiQuestion, PiSwap, PiWarningOctagon } from 'react-icons/pi'
import styled from 'styled-components'
import ethIcon from '@assets/icons/eth-icon.svg'
import Image from 'next/image'
import Button from './Button'
import { truncateWei } from '@/services/truncate'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import SkeletonLoading from './icons/SkeletonLoading'
import useWithdrawalsIsReady from '@/hooks/contracts/useWithdrawalsIsReady'
import useWithdrawalsStwEth from '@/hooks/contracts/useWithdrawalsStwEth'

import { getProductByName } from '@/config/product-staking'
import useWithdrawalsBeaconBlock from '@/hooks/contracts/useWithdrawalsBeaconBlock'
import StakeWithdrawCounter from '../stake/StakeWithdrawCounter'
import { Tooltip } from 'antd'

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
  const product = getProductByName({ productName: 'ethereum-stake' })

  const { timeLeft: withdrawTimeLeft } = useWithdrawalsBeaconBlock({
    walletAddress: accountAddress,
    product,
    chainId: 1
  })

  const {
    isLoading: withdrawalWithdrawLoading,
    withdrawalsWithdraw,
    isSuccess,
    prepareTransactionIsError
  } = useWithdrawalsStwEth(balance, accountAddress, true)

  useEffect(() => {
    if (isSuccess) {
      refetchBalance()
    }
  }, [isSuccess, refetchBalance])

  const canWithdraw = isReady && !isReadyLoading && !withdrawalWithdrawLoading && !prepareTransactionIsError

  return (
    <Container>
      <header>
        <WithdrawIcon />
        <span>{t('v2.withdrawals.title')}</span>
      </header>
      <WithdrawContainer>
        <div>
          <Image src={ethIcon} width={24} height={24} alt='stpEth' />
          {isLoading ? (
            <SkeletonLoading height={62} $borderRadius='8px' />
          ) : (
            <>{`${truncateWei(balance, 4)} ${t('wse.symbol')}`}</>
          )}
        </div>
        {!isLoading && balance > 0n && (
          <Button
            small={smallAction}
            label={`${isReady ? t('v2.withdrawals.claim') : t('v2.withdrawals.pending')}`}
            disabled={!canWithdraw}
            onClick={withdrawalsWithdraw}
            icon={<ClaimIcon />}
            isLoading={withdrawalWithdrawLoading}
          />
        )}
        {!!(withdrawTimeLeft && withdrawTimeLeft > 0) && (
          <CardBlock>
            <div>
              <WarningIcon /> <span>{t('v2.stake.withdrawBlocked')}</span>
              <Tooltip title={t('v2.stake.withdrawBlockedTooltip')}>
                <PiQuestion />
              </Tooltip>
            </div>
            <StakeWithdrawCounter withdrawTimeLeft={withdrawTimeLeft} />
          </CardBlock>
        )}
      </WithdrawContainer>
    </Container>
  )
}

const { Container, WithdrawIcon, WarningIcon, CardBlock, WithdrawContainer, ClaimIcon } = {
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
  WarningIcon: styled(PiWarningOctagon)`
    font-size: 24px;
    color: ${({ theme }) => theme.colorV2.purple[2]};
  `,
  CardBlock: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    gap: 12px;

    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colorV2.gray[1]};
    color: ${({ theme }) => theme.colorV2.gray[1]};
    opacity: 0.7;
    font-size: ${({ theme }) => theme.font.size[13]};

    div:nth-child(1) {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[4]};
    }
    div:nth-child(2) {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[8]};
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
