import chainConfig from '@/config/chain'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { truncateWei } from '@/services/truncate'
import { AccountReward } from '@/types/AccountReward'
import { DateTime } from 'luxon'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineLink } from 'react-icons/ai'
import styled, { useTheme } from 'styled-components'

type WalletSidebarRewards = {
  accountRewards: AccountReward[]
}

export default function WalletSidebarRewards({ accountRewards }: WalletSidebarRewards) {
  const { t } = useLocaleTranslation()
  const theme = useTheme()
  const router = useRouter()
  const { blockExplorer } = chainConfig()

  return (
    <Container>
      {accountRewards.length === 0 && (
        <EmptyContainer>
          <span>{t('noRewards')}</span>
        </EmptyContainer>
      )}
      {accountRewards.length > 0 && (
        <RewardsHeader>
          <span>{t('time')}</span>
          <span>{t('rewards')}</span>
          <span>{t('tx')}</span>
        </RewardsHeader>
      )}
      {accountRewards.map(reward => {
        const formatTimestamp = reward.timestamp
          ? DateTime.fromSeconds(Number(reward.timestamp)).toRelative({
              locale: router.locale === 'en' ? 'en-US' : router.locale
            }) || ''
          : ''
        return (
          <Reward key={reward.txHash} href={`${blockExplorer.baseUrl}/tx/${reward.txHash}`} target='_blank'>
            <span>{formatTimestamp}</span>
            <span>{truncateWei(BigInt(reward.amount))}</span>
            <AiOutlineLink color={theme.color.secondary} />
          </Reward>
        )
      })}
    </Container>
  )
}

const { Container, Reward, RewardsHeader, EmptyContainer } = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[4]};
    padding: ${({ theme }) => theme.size[8]};

    div > span:nth-child(2) > span {
      color: ${({ theme }) => theme.color.secondary};
    }
  `,
  EmptyContainer: styled.div`
    padding: 8px;
    text-align: center;
    font-size: 13px;
    span {
      width: 100%;
      text-align: center;
    }
  `,
  RewardsHeader: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: ${({ theme }) => theme.size[8]};
    align-items: center;
    justify-content: space-between;

    padding: 0px 4px;
    margin-bottom: ${({ theme }) => theme.size[8]};

    color: ${({ theme }) => theme.color.blue[500]};
    font-weight: 500;
    font-size: ${({ theme }) => theme.font.size[12]};
    > span:nth-child(1) {
      justify-self: start;
    }
    > span:nth-child(2) {
      justify-self: center;
    }
    > span:nth-child(3) {
      justify-self: end;
    }
  `,
  Reward: styled(Link)`
    height: 32px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: ${({ theme }) => theme.size[8]};
    align-items: center;

    padding: 0px 4px;
    border-radius: ${({ theme }) => theme.size[8]};

    padding: ${({ theme }) => theme.size[4]} ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.color.blackAlpha[50]};
    box-shadow: ${({ theme }) => theme.shadow[100]};

    &:hover {
      background: ${({ theme }) => theme.color.blackAlpha[100]};
    }

    > span:nth-child(1) {
      justify-self: start;
    }
    > span:nth-child(2) {
      justify-self: center;
    }
    svg {
      justify-self: end;
    }

    > div {
      display: flex;

      > div {
        display: flex;
        gap: ${({ theme }) => theme.size[8]};
      }

      > span {
        color: ${({ theme }) => theme.color.black};
      }
    }

    > span {
      display: flex;
      gap: ${({ theme }) => theme.size[4]};
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.color.primary};

      > span {
        color: ${({ theme }) => theme.color.secondary};
      }
    }
  `
}
