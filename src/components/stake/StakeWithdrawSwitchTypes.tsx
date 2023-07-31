import React from 'react'
import styled from 'styled-components'
import {
  AiOutlineClockCircle,
  AiOutlineDashboard,
  AiOutlineDatabase,
  AiOutlineInteraction
} from 'react-icons/ai'
import useTranslation from '@/hooks/useTranslation'
import { WithdrawType } from '@/types/Withdraw'
import { truncateWei } from '@/services/truncate'

type StakeWithdrawSwitchTypesProps = {
  withdrawTypeSelected: WithdrawType
  selectWithdrawType: (value: WithdrawType) => void
  liquidityPoolBalance: bigint
  liquidityValidatorsBalance: bigint
  liquidityLiquidityBalance: bigint
}

export default function StakeWithdrawSwitchTypes({
  withdrawTypeSelected,
  liquidityPoolBalance,
  liquidityValidatorsBalance,
  liquidityLiquidityBalance,
  selectWithdrawType
}: StakeWithdrawSwitchTypesProps) {
  const { t } = useTranslation()
  const handleActiveType = (type: WithdrawType) => {
    return type === withdrawTypeSelected
  }

  return (
    <Container>
      <Card
        className={`${handleActiveType(WithdrawType.POOL) ? 'active' : ''}`}
        onClick={() => selectWithdrawType(WithdrawType.POOL)}
      >
        <header>
          <h4>{t('withdrawCardsType.pool')}</h4>
          <PoolIcon />
        </header>
        <RateInfo>
          <div>
            <span>{t('withdrawCardsType.rate')}</span>
            <span>1:1</span>
          </div>
          <div>
            <span>{t('withdrawCardsType.liquidity')}</span>
            <span>{`${truncateWei(liquidityPoolBalance, 4)} ETH`}</span>
          </div>
        </RateInfo>
        <Time>
          <ClockIcon />
          <div>
            <span>{t('withdrawCardsType.waitingTime')}</span>
            <span>{t('withdrawCardsType.instantly')}</span>
          </div>
        </Time>
      </Card>
      <Card
        className={`${handleActiveType(WithdrawType.LIQUIDITY) ? 'active' : ''} disabled`}
        onClick={() => selectWithdrawType(WithdrawType.LIQUIDITY)}
      >
        <header>
          <h4>{t('withdrawCardsType.lendingPool')}</h4>
          <LendingPoolIcon />
        </header>
        <RateInfo>
          <div>
            <span>{t('withdrawCardsType.bestRate')}</span>
            <span>1:0.9999</span>
          </div>
          <div>
            <span>{t('withdrawCardsType.liquidity')}</span>
            <span>{`${truncateWei(liquidityLiquidityBalance, 4)} ETH`}</span>
          </div>
        </RateInfo>
        <Time>
          <ClockIcon />
          <div>
            <span>{t('withdrawCardsType.waitingTime')}</span>
            <span>{t('withdrawCardsType.instantly')}</span>
          </div>
        </Time>
      </Card>
      <Card
        className={`${handleActiveType(WithdrawType.VALIDATORS) ? 'active' : ''}`}
        onClick={() => selectWithdrawType(WithdrawType.VALIDATORS)}
      >
        <header>
          <h4>{t('withdrawCardsType.validators')}</h4>
          <ValidatorsIcon />
        </header>
        <RateInfo>
          <div>
            <span>{t('withdrawCardsType.rate')}</span>
            <span>1:1</span>
          </div>
          <div>
            <span>{t('withdrawCardsType.liquidity')}</span>
            <span>{`${truncateWei(liquidityValidatorsBalance, 4)} ETH`}</span>
          </div>
        </RateInfo>
        <Time>
          <ClockIcon />
          <div>
            <span>{t('withdrawCardsType.waitingTime')}</span>
            <span>~1-3</span>
          </div>
        </Time>
      </Card>
    </Container>
  )
}

const { Container, Card, RateInfo, Time, ClockIcon, PoolIcon, LendingPoolIcon, ValidatorsIcon } = {
  Container: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 8px;
  `,
  Card: styled.div`
    display: flex;
    flex-direction: column;
    padding: 8px;
    gap: 8px;
    cursor: pointer;

    border-radius: 16px;
    background: white;

    > header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      > h4 {
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: ${({ theme }) => theme.color.secondary};
      }
    }

    &:hover,
    &.active {
      border: 2px solid ${({ theme }) => theme.color.secondary};
    }

    &.disabled {
      cursor: not-allowed;
    }
  `,
  RateInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    > div {
      display: flex;
      justify-content: space-between;
      span {
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
      > span:nth-child(1) {
        color: ${({ theme }) => theme.color.blackAlpha[500]};
      }
      > span:nth-child(2) {
        color: ${({ theme }) => theme.color.primary};
      }
    }
  `,
  Time: styled.div`
    display: flex;
    align-items: center;
    gap: 4px;

    border-radius: 8px;
    padding: 4px;
    background-color: ${({ theme }) => theme.color.blackAlpha[50]};

    > div {
      display: flex;
      flex-direction: column;
      span {
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: ${({ theme }) => theme.color.blackAlpha[500]};
      }
      > span:nth-child(2) {
        color: ${({ theme }) => theme.color.primary};
      }
    }
  `,
  ClockIcon: styled(AiOutlineClockCircle)`
    font-size: 16px;
    color: ${({ theme }) => theme.color.secondary};
  `,
  PoolIcon: styled(AiOutlineDashboard)`
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.color.secondary};
  `,
  LendingPoolIcon: styled(AiOutlineInteraction)`
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.color.secondary};
  `,
  ValidatorsIcon: styled(AiOutlineDatabase)`
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.color.secondary};
  `
}
