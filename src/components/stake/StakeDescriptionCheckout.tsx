import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { truncateDecimal, truncateWei } from '@/services/truncate'
import { WithdrawType } from '@/types/Withdraw'
import { PiQuestion } from 'react-icons/pi'
import styled from 'styled-components'
import TooltipComponent from '../shared/TooltipComponent'
import { Product } from '@/types/Product'
import { chainConfigByChainId } from '@/config/chain'
import { useReadContract } from 'wagmi'
import { stakeTogetherAbi } from '@/types/Contracts'
import SkeletonLoading from '../shared/icons/SkeletonLoading'

type StakeDescriptionCheckoutProps = {
  type: 'deposit' | 'withdraw'
  youReceiveDeposit: bigint
  amount: string
  withdrawTypeSelected: WithdrawType
  product: Product
  chainId: number
}

export default function StakeDescriptionCheckout({
  type,
  youReceiveDeposit,
  amount,
  withdrawTypeSelected,
  product,
  chainId
}: StakeDescriptionCheckoutProps) {
  const { t } = useLocaleTranslation()

  const { isTestnet } = chainConfigByChainId(chainId)
  const stakeTogetherContract = product.contracts[isTestnet ? 'testnet' : 'mainnet'].StakeTogether

  const { data: feeData, isFetching } = useReadContract({
    address: stakeTogetherContract,
    args: [1],
    abi: stakeTogetherAbi,
    functionName: 'getFee'
  })

  const fee = (feeData ?? 0n) * BigInt(100) || 0n

  return (
    <StakeInfo>
      <div>
        <span>
          {`${t('v2.stake.descriptionForm.receive')} `}
          <TooltipComponent text={t('v2.stake.descriptionForm.receiveTooltip')}>
            <QuestionIcon />
          </TooltipComponent>
        </span>
        {type === 'deposit' && (
          <span>
            <span className='purple'>{`${truncateWei(youReceiveDeposit, 18) || '0'} `}</span>
            <span className='purple'>{product.symbol}</span>
          </span>
        )}
        {type === 'withdraw' && (
          <span>
            <span className='blue'>{` ${truncateDecimal(amount, 6) || '0'} `}</span>
            <span className='blue'>{` ${
              withdrawTypeSelected === WithdrawType.POOL ? t('eth.symbol') : t('wse.symbol')
            }`}</span>
          </span>
        )}
      </div>
      <div>
        <span>
          {`${t('v2.stake.descriptionForm.exchange')} `}
          <TooltipComponent text={t('v2.stake.descriptionForm.exchangeTooltip')}>
            <QuestionIcon />
          </TooltipComponent>
        </span>
        {type === 'deposit' && (
          <span>
            <span className='blue'>1</span> <span className='blue'>{t('eth.symbol')}</span>
            {`  = `}
            <span className='purple'>1</span>
            <span className='purple'>{product.symbol}</span>
          </span>
        )}
        {type === 'withdraw' && (
          <span>
            <span className='purple'>1</span> <span className='purple'>{product.symbol}</span> =
            <span className='blue'>1</span>
            <span className='blue'>{` ${
              withdrawTypeSelected === WithdrawType.POOL ? t('eth.symbol') : t('wse.symbol')
            }`}</span>
          </span>
        )}
      </div>
      {type === 'deposit' && (
        <div>
          <span>
            {`${t('v2.stake.descriptionForm.rewards')} `}
            <TooltipComponent text={t('v2.stake.descriptionForm.rewardsTooltip')}>
              <QuestionIcon />
            </TooltipComponent>
          </span>
          <span>{isFetching ? <SkeletonLoading width={70} /> : truncateWei(fee, 2)}%</span>
        </div>
      )}
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
      line-height: 13px;
      height: 13px;

      > span:nth-child(1) {
        font-weight: 400;
        display: flex;
        align-items: center;
        line-height: 13px;
      }
      > span:nth-child(2) {
        font-weight: 500;
        display: flex;
        align-items: center;
        line-height: 13px;
        gap: 2px;
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
  QuestionIcon: styled(PiQuestion)`
    width: 14px;
    height: 14px;
    color: ${({ theme }) => theme.colorV2.gray[1]};
    margin-left: 3px;
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.color.secondary};
    }
  `
}
