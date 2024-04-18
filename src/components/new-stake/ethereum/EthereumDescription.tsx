import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { ProductStaking } from '@/types/ProductStaking'
import { Tooltip } from 'antd'
import { PiQuestion } from 'react-icons/pi'
import styled from 'styled-components'

interface EthereumDescriptionProps {
  product: ProductStaking
}

export default function EthereumDescription({ product }: EthereumDescriptionProps) {
  const { t } = useLocaleTranslation()
  return (
    <DescriptionContainer>
      <div>
        <div>
          <span>
            {t('v2.stake.descriptionForm.exchange')}
            <Tooltip title={t('v2.stake.descriptionForm.exchangeTooltip')}>
              <QuestionIcon />
            </Tooltip>
          </span>
        </div>
        <div>
          <span className='purple'>1 ETH = </span>
          <span className='blue'>{`1 ${product.symbol}`}</span>
        </div>
      </div>
    </DescriptionContainer>
  )
}

const { QuestionIcon, DescriptionContainer } = {
  QuestionIcon: styled(PiQuestion)`
    color: ${({ theme }) => theme.colorV2.gray[1]};
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.color.secondary};
    }
  `,
  DescriptionContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};

    font-size: 13px;
    font-weight: 400;
    color: ${({ theme }) => theme.colorV2.gray[1]};

    span {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[4]};
      &.blue {
        color: ${({ theme }) => theme.colorV2.blue[1]};
      }
      &.purple {
        color: ${({ theme }) => theme.colorV2.purple[1]};
      }
    }

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      div {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.size[4]};
      }
    }
  `
}
