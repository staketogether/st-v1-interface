import chainConfig from '@/config/chain'
import useContentfulPoolDetails from '@/hooks/contentful/useContentfulPoolDetails'
import useGiftByWalletAddress from '@/hooks/useGiftByWalletAddress'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { truncateWei } from '@/services/truncate'
import coffee from '@assets/images/coffee.jpg'
import empty from '@assets/images/empty.jpg'
import { Tooltip } from 'antd'
import Image from 'next/image'
import { PiHandCoins, PiShareNetwork } from 'react-icons/pi'
import styled from 'styled-components'
import { useNetwork } from 'wagmi'
import useCoinConversion from '../../hooks/useCoinConversion'
import Button from '../shared/Button'
import CommunityLogo from '../shared/community/CommunityLogo'
import CommunityName from '../shared/community/CommunityName'
import GiftCountDown from './GiftCountDown'

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
  const { poolDetail, loading: poolDetailLoading } = useContentfulPoolDetails({
    poolAddress: userGift?.address
  })
  const { price, symbol } = useCoinConversion(userGift?.amount.toString() || '0')

  function copyToClipboard() {
    navigator.clipboard.writeText(window.location.toString())
  }

  return (
    <>
      {!loading && userGift && (
        <Header>
          {poolDetail && (
            <div>
              <CommunityLogo
                size={32}
                src={poolDetail?.logo?.url}
                alt={poolDetail?.logo?.url}
                loading={poolDetailLoading}
              />
              <div>
                <CommunityName $larger name={poolDetail?.name} loading={poolDetailLoading} />
                <Sent>{`${t('v2.gifts.sent')}`}</Sent>
              </div>
            </div>
          )}
          <Tooltip trigger='click' title={t('copiedToClipboard')}>
            <ShareButton onClick={copyToClipboard}>
              <ShareIcon />
            </ShareButton>
          </Tooltip>
        </Header>
      )}
      {!loading && userGift && <CardImage src={coffee} width={420} height={240} alt={'Coffee'} />}
      {!loading && !userGift && <Image src={empty} width={420} height={240} alt={'Empty'} />}
      {!loading && userGift && (
        <Content>
          <Title>
            {t(`v2.gifts.coffee.title`)}
            <GiftAmount>
              {`${truncateWei(userGift.amount, 4)} ${t('lsd.symbol')}`}
              <Currency>
                {symbol()}
                {truncateWei(BigInt(price || 0n), 2)}
              </Currency>
            </GiftAmount>
          </Title>
          <Description>{t(`v2.gifts.coffee.description`)}</Description>
        </Content>
      )}
      {!loading && !userGift && (
        <EmptyArea>
          <Empty>{t('v2.gifts.notGift')}</Empty>
        </EmptyArea>
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

const {
  CardImage,
  ClaimIcon,
  GiftAmount,
  Header,
  ShareIcon,
  ShareButton,
  Sent,
  Title,
  Description,
  Content,
  Empty,
  EmptyArea,
  Currency
} = {
  CardImage: styled(Image)`
    border-radius: 8px;
    box-shadow: ${({ theme }) => theme.shadow[300]};
    max-width: 86%;
    height: auto;
    margin: 0 auto;
    margin-top: 8px;
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
  Sent: styled.span`
    font-size: 20px;
    font-weight: 400;
    color: ${({ theme }) => theme.colorV2.purple[1]};
    margin-left: 6px;
  `,
  EmptyArea: styled.div`
    display: flex;
    justify-content: center;
  `,
  Empty: styled.span`
    font-size: 16px;
    font-weight: 400;
    color: ${({ theme }) => theme.color.whiteAlpha[400]};
    text-align: center;
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 8px;
  `,
  Title: styled.div`
    font-size: 22px;
    font-weight: 400;
    color: ${({ theme }) => theme.colorV2.blue[1]};
    text-align: center;
  `,
  Description: styled.div`
    font-size: 16px;
    font-weight: 400;
    color: ${({ theme }) => theme.colorV2.gray[1]};
    text-align: center;
  `,
  GiftAmount: styled.span`
    font-size: 20px;
    color: ${({ theme }) => theme.color.green[500]};
    text-align: center;
    margin-left: 12px;
    display: inline-flex;
    align-items: center;
  `,
  Currency: styled.span`
    font-size: 14px;
    margin-left: 12px;
    color: ${({ theme }) => theme.colorV2.blue[3]};
  `
}
