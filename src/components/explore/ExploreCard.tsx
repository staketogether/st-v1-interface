import { CheckCircleFilled } from '@ant-design/icons'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { globalConfig } from '../../config/global'
import useReceivedDelegationsOf from '../../hooks/contracts/useReceivedDelegationsOf'

import useTranslation from '../../hooks/useTranslation'
import { truncateEther } from '../../services/truncateEther'
import EnsAvatar from '../shared/ens/EnsAvatar'
import EnsName from '../shared/ens/EnsName'

type ExploreCardProps = {
  address: `0x${string}`
}

export default function ExploreCard({ address }: ExploreCardProps) {
  const router = useRouter()
  const { ceth } = globalConfig

  const { totalDelegationsReceived, totalAmountReceived } = useReceivedDelegationsOf(address)

  const { t } = useTranslation()

  return (
    <Card onClick={() => router.push(`/stake/${address}`)}>
      <header>
        <EnsAvatar address={address} />
        <div>
          <CheckCircleFilled
            style={{ color: '#39A0FF', fontSize: '12px', paddingTop: 1, paddingRight: 4 }}
          />
          <EnsName address={address} />
        </div>
      </header>
      <CardInfo>
        <div>
          <div>{t('members')}</div>
          <div>{totalDelegationsReceived}</div>
        </div>
        <div>
          <div>{t('delegated')}</div>
          <div>{`${truncateEther(totalAmountReceived)} ${ceth.symbol}`}</div>
        </div>
      </CardInfo>
    </Card>
  )
}

const { Card, CardInfo } = {
  Card: styled.div`
    border-radius: ${props => props.theme.size[16]};
    width: 100%;
    background: rgba(255, 255, 255, 0.4);
    padding: ${props => props.theme.size[16]};
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: ${props => props.theme.size[24]};
    cursor: pointer;
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    box-shadow: ${props => props.theme.size[24]};

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      div {
        display: flex;
        align-items: center;
        gap: 4px;
        > div {
          font-weight: 500;
          font-size: ${props => props.theme.font.size[14]};
          line-height: 17px;
          color: ${props => props.theme.color.black};
        }
      }
    }
  `,
  CardInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      > div:first-child {
        font-weight: 400;
        font-size: ${({ theme }) => theme.font.size[14]};
        line-height: 17px;
        color: ${({ theme }) => theme.color.blue[200]};
      }
      > div:last-child {
        font-weight: 500;
        font-size: ${({ theme }) => theme.font.size[14]};
        line-height: 17px;
        color: ${({ theme }) => theme.color.blue[200]};
      }
    }
  `
}
