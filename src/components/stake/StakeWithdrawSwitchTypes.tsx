import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { truncateWei } from '@/services/truncate'
import { WithdrawType } from '@/types/Withdraw'
import { PiQuestion, PiStack, PiStackSimple } from 'react-icons/pi'
import styled from 'styled-components'
import TooltipComponent from '../shared/TooltipComponent'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

type StakeWithdrawSwitchTypesProps = {
  withdrawTypeSelected: WithdrawType
  selectWithdrawType: (value: WithdrawType) => void
  liquidityPoolBalance: bigint
  liquidityValidatorsBalance: bigint
  withdrawAmount: string
}

export default function StakeWithdrawSwitchTypes({
  withdrawTypeSelected,
  liquidityPoolBalance,
  liquidityValidatorsBalance,
  withdrawAmount,
  selectWithdrawType
}: StakeWithdrawSwitchTypesProps) {
  const [disabledWithdrawLiquidity, setDisabledWithdrawLiquidity] = useState(false)
  const [disabledWithdrawValidator, setDisabledWithdrawValidator] = useState(false)
  const { t } = useLocaleTranslation()
  const amount = ethers.parseUnits(withdrawAmount.toString(), 18)
  const handleActiveType = (type: WithdrawType) => {
    return type === withdrawTypeSelected
  }

  useEffect(() => {
    if (amount > liquidityPoolBalance) {
      setDisabledWithdrawLiquidity(true)
      setDisabledWithdrawValidator(false)
      selectWithdrawType(WithdrawType.VALIDATOR)
    } else {
      setDisabledWithdrawLiquidity(false)
      setDisabledWithdrawValidator(true)
      selectWithdrawType(WithdrawType.POOL)
    }
  }, [amount, liquidityPoolBalance, selectWithdrawType])

  return (
    <Container>
      <Card
        className={`${handleActiveType(WithdrawType.POOL) ? 'active' : ''} ${
          disabledWithdrawLiquidity && 'disabled'
        }`}
        onClick={() => !disabledWithdrawValidator && selectWithdrawType(WithdrawType.POOL)}
      >
        <header>
          <h4>
            {t('withdrawCardsType.pool')}{' '}
            <TooltipComponent text={t('withdrawCardsType.tooltipPool')}>
              <QuestionIcon className={`${handleActiveType(WithdrawType.POOL) ? 'active' : ''}`} />
            </TooltipComponent>
          </h4>
          <PoolIcon />
        </header>
        <RateInfo>
          <div>
            <span>{t('withdrawCardsType.liquidity')}</span>
            <div className='blue'>
              <span className='blue'>{`${truncateWei(liquidityPoolBalance, 4)} `}</span>
              <span className='blue'>{t('eth.symbol')}</span>
            </div>
          </div>
          <div>
            <span>{t('withdrawCardsType.waitingTime')}</span>
            <div>
              <span className='purple'>{t('withdrawCardsType.instantly')}</span>
            </div>
          </div>
        </RateInfo>
      </Card>
      <Card
        className={`${handleActiveType(WithdrawType.VALIDATOR) ? 'active' : ''} ${
          disabledWithdrawValidator && 'disabled'
        }`}
        onClick={() => !disabledWithdrawValidator && selectWithdrawType(WithdrawType.VALIDATOR)}
      >
        <header>
          <h4>
            {t('withdrawCardsType.beaconChain')}{' '}
            <TooltipComponent text={t('withdrawCardsType.tooltipBeaconChain')}>
              <QuestionIcon className={`${handleActiveType(WithdrawType.VALIDATOR) ? 'active' : ''}`} />
            </TooltipComponent>
          </h4>
          <ValidatorsIcon />
        </header>
        <RateInfo>
          <div>
            <span>{t('withdrawCardsType.liquidity')}</span>
            <div>
              <span className='blue'>{`${truncateWei(liquidityValidatorsBalance, 4)} `}</span>
              <span className='blue'>{t('eth.symbol')}</span>
            </div>
          </div>
          <div>
            <span>{t('withdrawCardsType.waitingTime')}</span>
            <div>
              <span className='purple'>~1-3 {t('days')}</span>
            </div>
          </div>
        </RateInfo>
      </Card>
    </Container>
  )
}

const { Container, Card, RateInfo, PoolIcon, ValidatorsIcon, QuestionIcon } = {
  Container: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 16px;
  `,
  Card: styled.div`
    display: flex;
    flex-direction: column;
    padding: 12px;
    gap: 12px;
    cursor: pointer;

    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.color.gray[400]};

    > header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      > h4 {
        font-size: 14px;
        color: ${({ theme }) => theme.colorV2.gray[1]};

        font-weight: 400;

        display: flex;
      }
    }

    &.active,
    &:hover {
      color: ${({ theme }) => theme.colorV2.purple[1]};
      border: 1px solid ${({ theme }) => theme.colorV2.purple[1]};

      > header {
        > h4 {
          color: ${({ theme }) => theme.colorV2.purple[1]};
        }
      }
    }

    &.disabled {
      border: 1px solid ${({ theme }) => theme.color.gray[400]};
      cursor: not-allowed;
      opacity: 0.4;
    }
  `,
  RateInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 12px;

      span {
        font-size: 12px;
        font-weight: 400;
        color: ${({ theme }) => theme.colorV2.gray[1]};
        line-height: 12px;

        &.blue {
          color: ${({ theme }) => theme.colorV2.blue[3]};
        }

        &.purple {
          color: ${({ theme }) => theme.colorV2.purple[1]};
        }
      }
    }
  `,
  PoolIcon: styled(PiStackSimple)`
    width: 18px;
    height: 18px;
    color: ${({ theme }) => theme.colorV2.gray[1]};
  `,
  ValidatorsIcon: styled(PiStack)`
    width: 18px;
    height: 18px;
    color: ${({ theme }) => theme.colorV2.gray[1]};
  `,
  QuestionIcon: styled(PiQuestion)`
    width: 14px;
    height: 14px;
    color: ${({ theme }) => theme.colorV2.gray[1]};
    margin-left: 3px;
    cursor: pointer;

    &.active,
    &:hover {
      color: ${({ theme }) => theme.color.secondary};
    }
  `
}
