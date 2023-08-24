import useTranslation from '@/hooks/useTranslation'
import { truncateDecimal, truncateWei } from '@/services/truncate'
import { Tooltip } from 'antd'
import React from 'react'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import styled from 'styled-components'

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
  const { t } = useTranslation()
  return (
    <StakeInfo>
      <div>
        <span className='blue'>
          {`${t('v2.stake.descriptionForm.youReceive')} `}{' '}
          <Tooltip title='Pools'>
            <QuestionIcon />
          </Tooltip>
        </span>
        {type === 'deposit' && (
          <span>
            <span>{`${truncateWei(youReceiveDeposit, 18) || '0'} `}</span>
            <span className='purple'>{t('lsd.symbol')}</span>
          </span>
        )}
        {type === 'withdraw' && (
          <span>
            <span>{` ${truncateDecimal(amount, 5) || '0'} `}</span>
            <span className='purple'>{t('eth.symbol')}</span>
          </span>
        )}
      </div>
      <div>
        <span className='blue'>
          {`${t('v2.stake.descriptionForm.exchange')} `}{' '}
          <Tooltip title='Pools'>
            <QuestionIcon />
          </Tooltip>
        </span>
        {type === 'deposit' && (
          <span>
            1 <span className='purple'>{t('eth.symbol')}</span> = {truncateWei(sharesByEthRatio)}{' '}
            <span className='purple'>{t('lsd.symbol')}</span>
          </span>
        )}
        {type === 'withdraw' && (
          <span>
            1 <span className='purple'>{t('lsd.symbol')}</span> = {truncateWei(ethBySharesRatio)}{' '}
            <span className='purple'>{t('eth.symbol')}</span>
          </span>
        )}
      </div>
      {type === 'deposit' && (
        <div>
          <span className='blue'>
            {`${t('v2.stake.descriptionForm.transactionFee')} `}{' '}
            <Tooltip title='Pools'>
              <QuestionIcon />
            </Tooltip>
          </span>
          <span>0.3%</span>
        </div>
      )}
      <div>
        <span className='blue'>
          {`${t('v2.stake.descriptionForm.rewardsFee')} `}
          <Tooltip title='Pools'>
            <QuestionIcon />
          </Tooltip>
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

      font-size: ${({ theme }) => theme.font.size[14]};
      font-style: normal;
      > span:nth-child(1) {
        font-weight: 400;
      }
      > span:nth-child(2) {
        font-weight: 500;
      }
      span {
        color: ${({ theme }) => theme.color.primary};

        &.purple {
          color: ${({ theme }) => theme.color.secondary};
        }
        &.blue {
          color: ${({ theme }) => theme.color.blue[600]};
        }
      }
    }
  `,
  QuestionIcon: styled(AiOutlineQuestionCircle)`
    width: 14px;
    height: 14px;
    color: ${({ theme }) => theme.color.primary};
    cursor: pointer;
  `
}
