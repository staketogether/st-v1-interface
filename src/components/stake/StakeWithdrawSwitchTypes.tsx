import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { truncateWei } from '@/services/truncate'
import { WithdrawType } from '@/types/Withdraw'
import { AiOutlineClockCircle, AiOutlineDashboard, AiOutlineDatabase } from 'react-icons/ai'
import { styled } from 'styled-components'

type StakeWithdrawSwitchTypesProps = {
  withdrawTypeSelected: WithdrawType
  selectWithdrawType: (value: WithdrawType) => void
  liquidityPoolBalance: bigint
  liquidityValidatorsBalance: bigint
}

export default function StakeWithdrawSwitchTypes({
  withdrawTypeSelected,
  liquidityPoolBalance,
  liquidityValidatorsBalance,
  selectWithdrawType
}: StakeWithdrawSwitchTypesProps) {
  const { t } = useLocaleTranslation()
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
            <div>
              <span>{`${truncateWei(liquidityPoolBalance, 4)} `}</span>
              <span className='purple'>{t('eth.symbol')}</span>
            </div>
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
        className={`${handleActiveType(WithdrawType.VALIDATOR) ? 'active' : ''}`}
        onClick={() => selectWithdrawType(WithdrawType.VALIDATOR)}
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
            <div>
              <span>{`${truncateWei(liquidityValidatorsBalance, 4)} `}</span>
              <span className='purple'>{t('eth.symbol')}</span>
            </div>
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

const { Container, Card, RateInfo, Time, ClockIcon, PoolIcon, ValidatorsIcon } = {
  Container: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
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
    background: ${({ theme }) => theme.color.whiteAlpha[500]};

    > header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      > h4 {
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        color: ${({ theme }) => theme.color.secondary};
      }
    }

    &:hover,
    &.active {
      background: ${({ theme }) => theme.color.whiteAlpha[800]};
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
        color: ${({ theme }) => theme.color.primary};

        &.purple {
          color: ${({ theme }) => theme.color.secondary};
        }
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
  ValidatorsIcon: styled(AiOutlineDatabase)`
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.color.secondary};
  `
}
