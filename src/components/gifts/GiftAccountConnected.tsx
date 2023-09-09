import React from 'react'
import styled from 'styled-components'
import Button from '../shared/Button'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import GiftCountDown from './GiftCountDown'
import { PiHandCoins, PiShareNetwork } from 'react-icons/pi'
import { useNetwork } from 'wagmi'
import chainConfig from '@/config/chain'
import useGiftByWalletAddress from '@/hooks/useGiftByWalletAddress'
import CommunityLogo from '../shared/community/CommunityLogo'
import CommunityName from '../shared/community/CommunityName'
import { Tooltip } from 'antd'
import useContentfulPoolDetails from '@/hooks/contentful/useContentfulPoolDetails'
import { truncateWei } from '@/services/truncate'

type GiftAccountConnectedProps = {
  account: `0x${string}`
}

export default function GiftAccountConnected({ account }: GiftAccountConnectedProps) {
  const { t } = useLocaleTranslation()

  const chain = chainConfig()
  const { chain: walletChainId } = useNetwork()
  const isWrongNetwork = chain.chainId !== walletChainId?.id

  const handleLabelButton = () => {
    if (isWrongNetwork) {
      return `${t('switch')} ${chain.name.charAt(0).toUpperCase() + chain.name.slice(1)}`
    }
    return t('v2.gifts.ActionButton')
  }

  const { userGift, loading } = useGiftByWalletAddress(account)
  const { poolDetail, loading: poolDetailLoading } = useContentfulPoolDetails(userGift?.address)

  function copyToClipboard() {
    navigator.clipboard.writeText(window.location.toString())
  }

  return (
    <>
      {!loading && !userGift && <Title>{t('v2.gifts.notGift')}</Title>}
      {!loading && userGift && (
        <Header>
          <div>
            <CommunityLogo
              size={32}
              src={poolDetail ? poolDetail?.logo?.url : ''}
              alt={poolDetail ? poolDetail?.logo?.url : ''}
              loading={poolDetailLoading}
            />
            <div>
              <CommunityName $larger name={poolDetail?.name || ''} loading={poolDetailLoading} />
              <Title>{`${t('v2.gifts.sent')}`}</Title>
            </div>
          </div>
          <Tooltip trigger='click' title={t('copiedToClipboard')}>
            <ShareButton onClick={copyToClipboard}>
              <ShareIcon />
            </ShareButton>
          </Tooltip>
        </Header>
      )}
      {!loading && userGift && <CardIconWinner />}
      {!loading && !userGift && <CardIcon />}

      {!loading && userGift && <Description>{t(`v2.gifts.${userGift.type}`)}</Description>}
      {!loading && userGift && (
        <GiftAmount>{`${truncateWei(userGift.amount, 4)} ${t('lsd.symbol')}`}</GiftAmount>
      )}
      {!loading && userGift && <GiftCountDown futureTimestamp={userGift.data} />}

      <Button
        isLoading={false}
        onClick={() => {}}
        label={handleLabelButton()}
        icon={<ClaimIcon />}
        disabled={userGift && userGift.amount ? false : true}
      />
    </>
  )
}

const { CardIcon, ClaimIcon, GiftAmount, CardIconWinner, Header, ShareIcon, ShareButton, Title, Description } =
  {
    CardIcon: styled.div`
      width: 100%;
      height: 237px;
      background: red;
    `,
    CardIconWinner: styled.div`
      width: 100%;
      height: 237px;
      background: blue;
    `,
    ClaimIcon: styled(PiHandCoins)`
      font-size: 18px;
    `,
    Header: styled.header`
      display: flex;
      justify-content: space-between;

      > div {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.size[12]};
        div {
          display: flex;
          align-items: center;
          gap: ${({ theme }) => theme.size[4]};
        }
      }
    `,
    ShareButton: styled.button`
      border: none;
      width: 32px;
      height: 32px;
      font-size: ${({ theme }) => theme.font.size[14]};

      border-radius: 8px;
      transition: background-color 0.1s ease;

      display: flex;
      align-items: center;
      justify-content: center;

      background-color: ${({ theme }) => theme.colorV2.blue[1]};
      color: ${({ theme }) => theme.colorV2.white};
      box-shadow: ${({ theme }) => theme.shadow[300]};

      &:hover {
        background-color: ${({ theme }) => theme.colorV2.purple[1]};
      }
    `,
    ShareIcon: styled(PiShareNetwork)`
      font-size: ${({ theme }) => theme.font.size[15]};
    `,
    Title: styled.span`
      font-size: 20px;
      font-weight: 400;
      color: ${({ theme, color }) => color || theme.colorV2.gray[1]};

      span {
        &.green {
          color: ${({ theme }) => theme.color.green[700]};
        }
      }
    `,
    Description: styled.span`
      font-size: 16px;
      font-weight: 500;
      color: ${({ theme }) => theme.color.secondary};
      text-align: center;
    `,
    GiftAmount: styled.span`
      font-size: 22px;
      font-weight: 500;
      color: ${({ theme }) => theme.color.green[700]};
      text-align: center;
    `
  }
