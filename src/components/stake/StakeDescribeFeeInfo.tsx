import { globalConfig } from '@/config/global'
import useTranslation from '@/hooks/useTranslation'
import { truncateWei } from '@/services/truncate'
import React from 'react'
import styled from 'styled-components'

type StakeDescribeFeeInfoProps = {
  ratioEthByShare: bigint
  amountEthByShare: bigint
  type: 'deposit' | 'withdraw'
  estimateGasInGwei: string
}

export default function StakeDescribeFeeInfo({
  estimateGasInGwei,
  ratioEthByShare,
  type,
  amountEthByShare
}: StakeDescribeFeeInfoProps) {
  const { t } = useTranslation()
  const { fee } = globalConfig
  const rewardsFee = truncateWei(fee.protocol * 100n)

  return (
    <StakeInfo>
      <div>
        <span>{`${t('youReceive')} `}</span>
        <span>{` ${truncateWei(amountEthByShare, 18) || '0'} ${t('lsd.symbol')}`}</span>
      </div>
      <div>
        <span>{t('confirmStakeModal.exchangeRate')}</span>

        {type === 'deposit' && (
          <span>
            1 <span>{t('eth.symbol')}</span> = {truncateWei(ratioEthByShare)} <span>{t('lsd.symbol')}</span>
          </span>
        )}
        {type === 'withdraw' && (
          <span>
            1 <span>{t('lsd.symbol')}</span> = {truncateWei(ratioEthByShare)} <span>{t('eth.symbol')}</span>
          </span>
        )}
      </div>
      <div>
        <span>{t('confirmStakeModal.networkFee')}</span>
        <span>{estimateGasInGwei}</span>
      </div>

      <div>
        <span>{`${t('rewardsFee')}`}</span>
        <span>{`${rewardsFee}%`}</span>
      </div>

      <div>
        <span>{`${t('entryFee')} `}</span>
        <span>0.3%</span>
      </div>
    </StakeInfo>
  )
}

const { StakeInfo } = {
  StakeInfo: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 8px;
    font-size: ${({ theme }) => theme.size[12]};

    > div:first-child {
      padding: 8px 0px;
      border-bottom: 1px solid ${({ theme }) => theme.color.blue[50]};
      > span:nth-child(2) {
        font-weight: 500;
        color: ${({ theme }) => theme.color.secondary};
      }
    }

    > div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      font-size: ${({ theme }) => theme.font.size[14]};
      font-style: normal;
      line-height: normal;

      > span:nth-child(1) {
        font-weight: 400;
        color: ${({ theme }) => theme.color.blue[400]};
      }
      > span:nth-child(2) {
        font-weight: 500;
        color: ${({ theme }) => theme.color.primary};
        > span {
          color: ${({ theme }) => theme.color.secondary};
        }
      }
    }
  `
}
