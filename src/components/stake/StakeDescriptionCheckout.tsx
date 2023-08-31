import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { truncateDecimal, truncateWei } from '@/services/truncate'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { styled } from 'styled-components'
import TooltipComponent from '../shared/TooltipComponent'

type StakeDescriptionCheckoutProps = {
  type: 'deposit' | 'withdraw'
  sharesByEthRatio: bigint
  ethBySharesRatio: bigint
  youReceiveDeposit: bigint
  amount: string
}

export default function StakeDescriptionCheckout({
  type,
  youReceiveDeposit,
  amount,
  sharesByEthRatio,
  ethBySharesRatio
}: StakeDescriptionCheckoutProps) {
  const { t } = useLocaleTranslation()
  return (
    <StakeInfo>
      <div>
        <span>
          {`${t('v2.stake.descriptionForm.youReceive')} `}{' '}
          <TooltipComponent text='Pools'>
            <QuestionIcon />
          </TooltipComponent>
        </span>
        {type === 'deposit' && (
          <span>
            <span className='purple'>{`${truncateWei(youReceiveDeposit, 18) || '0'} `}</span>
            <span className='purple'>{t('lsd.symbol')}</span>
          </span>
        )}
        {type === 'withdraw' && (
          <span>
            <span className='blue'>{` ${truncateDecimal(amount, 5) || '0'} `}</span>
            <span className='blue'>{t('eth.symbol')}</span>
          </span>
        )}
      </div>
      <div>
        <span>
          {`${t('v2.stake.descriptionForm.exchange')} `}{' '}
          <TooltipComponent text='Pools'>
            <QuestionIcon />
          </TooltipComponent>
        </span>
        {type === 'deposit' && (
          <span>
            <span className='blue'>1</span> <span className='blue'>{t('eth.symbol')}</span> ={' '}
            <span className='purple'>{truncateWei(sharesByEthRatio)}</span>{' '}
            <span className='purple'>{t('lsd.symbol')}</span>
          </span>
        )}
        {type === 'withdraw' && (
          <span>
            <span className='purple'>1</span> <span className='purple'>{t('lsd.symbol')}</span> ={' '}
            <span className='blue'>{truncateWei(ethBySharesRatio)}</span>{' '}
            <span className='blue'>{t('eth.symbol')}</span>
          </span>
        )}
      </div>
      {type === 'deposit' && (
        <div>
          <span>
            {`${t('v2.stake.descriptionForm.transactionFee')} `}{' '}
            <TooltipComponent text='Pools'>
              <QuestionIcon />
            </TooltipComponent>
          </span>
          <span>0.3%</span>
        </div>
      )}
      <div>
        <span>
          {`${t('v2.stake.descriptionForm.rewardsFee')} `}
          <TooltipComponent text='Pools'>
            <QuestionIcon />
          </TooltipComponent>
        </span>
        <span>0.45%</span>
      </div>
    </StakeInfo>
  )
}

const { StakeInfo, QuestionIcon } = {
  StakeInfo: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};
    font-size: ${({ theme }) => theme.size[12]};

    > div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      font-size: ${({ theme }) => theme.font.size[13]};

      > span:nth-child(1) {
        font-weight: 400;
      }
      > span:nth-child(2) {
        font-weight: 500;
      }
      span {
        color: ${({ theme }) => theme.colorV2.gray[1]};

        &.purple {
          color: ${({ theme }) => theme.colorV2.purple[1]};
        }
        &.blue {
          color: ${({ theme }) => theme.colorV2.blue[1]};
        }
      }
    }
  `,
  QuestionIcon: styled(AiOutlineQuestionCircle)`
    width: 14px;
    height: 14px;
    color: ${({ theme }) => theme.colorV2.gray[1]};
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.color.secondary};
    }
  `
}
