import { HTMLProps } from 'react'
import styled from 'styled-components'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { PiQuestion } from 'react-icons/pi'
import TooltipComponent from '@/components/shared/TooltipComponent'
import { WrapWidgetToken } from './WrapWidgetDetails'
import { truncateDecimal } from '@/services/truncate'

export type WrapWidgetSubtotalProps = HTMLProps<HTMLDivElement> & {
  tokens: WrapWidgetToken[]
}

export const WrapWidgetSubtotal = ({ tokens, ...props }: WrapWidgetSubtotalProps) => {
  const { t } = useLocaleTranslation()
  const [fromToken, toToken] = tokens

  return (
    <Container {...props}>
      <div>
        <span>
          {`${t('v2.wrap.subtotal.maxUnlockFee')} `}
          <TooltipComponent text={t('v2.wrap.subtotal.maxUnlockFeeTooltip')}>
            <QuestionIcon />
          </TooltipComponent>
        </span>
        <span>
          <span className='purple'>{`${truncateDecimal('0', 2)}`}</span>
          <span className='purple'>{t('eth.symbol')}</span>
        </span>
      </div>
      <div>
        <span>
          {`${t('v2.wrap.subtotal.maxGasFee')} `}
          <TooltipComponent text={t('v2.wrap.subtotal.maxGasFeeTooltip')}>
            <QuestionIcon />
          </TooltipComponent>
        </span>
        <span>
          <span className='purple'>{`${truncateDecimal('0', 2)}`}</span>
          <span className='purple'>{t('eth.symbol')}</span>
        </span>
      </div>
      <div>
        <span>
          {`${t('v2.stake.descriptionForm.exchange')} `}
          <TooltipComponent text={t('v2.stake.descriptionForm.exchangeTooltip')}>
            <QuestionIcon />
          </TooltipComponent>
        </span>
        <span>
          <span className='blue'>1</span> <span className='blue'>{fromToken.symbol}</span>
          {`  = `}
          <span className='purple'>0</span>
          <span className='purple'>{toToken.symbol}</span>
        </span>
      </div>
      <div>
        <span>
          {`${t('allowance.title')} `}
          <TooltipComponent text={t('allowance.description')}>
            <QuestionIcon />
          </TooltipComponent>
        </span>
        <span>
          <span className='purple'>{`${truncateDecimal('0', 2)}`}</span>
          <span className='purple'>{fromToken.symbol}</span>
        </span>
      </div>
      <div>
        <span>
          {`${t('v2.stake.descriptionForm.receive')} `}
          <TooltipComponent text={t('v2.stake.descriptionForm.receiveTooltip')}>
            <QuestionIcon />
          </TooltipComponent>
        </span>
        <span>
          <span className='purple'>{`${truncateDecimal('0', 2)}`}</span>
          <span className='purple'>{toToken.symbol}</span>
        </span>
      </div>
    </Container>
  )
}

const { Container, QuestionIcon } = {
  Container: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};
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

export default WrapWidgetSubtotal
