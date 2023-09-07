import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { truncateWei } from '@/services/truncate'
import { WithdrawType } from '@/types/Withdraw'
import { PiStack, PiStackSimple } from 'react-icons/pi'
import styled from 'styled-components'

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
        className={`${handleActiveType(WithdrawType.VALIDATOR) ? 'active' : ''}`}
        onClick={() => selectWithdrawType(WithdrawType.VALIDATOR)}
      >
        <header>
          <h4>{t('withdrawCardsType.validators')}</h4>
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

const { Container, Card, RateInfo, PoolIcon, ValidatorsIcon } = {
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

    box-shadow: ${({ theme }) => theme.shadow[200]};

    > header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      > h4 {
        font-size: 14px;
        color: ${({ theme }) => theme.colorV2.gray[1]};

        font-weight: 400;
      }
    }

    &.active,
    &:hover {
      color: ${({ theme }) => theme.colorV2.purple[1]};
      background: ${({ theme }) => theme.colorV2.gray[2]};

      > header {
        > h4 {
          color: ${({ theme }) => theme.colorV2.purple[1]};
        }
      }
    }

    &.disabled {
      cursor: not-allowed;
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
  `
}
