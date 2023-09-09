import chainConfig from '@/config/chain'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { truncateTimestamp, truncateWei } from '@/services/truncate'
import { AccountReward } from '@/types/AccountReward'

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
          <span>{t('tx')}</span>
          <span>{t('time')}</span>
          <span>{t('rewards')}</span>
        </RewardsHeader>
      )}
      {accountRewards.map(reward => {
        return (
          <Reward key={reward.txHash} href={`${blockExplorer.baseUrl}/tx/${reward.txHash}`} target='_blank'>
            <AiOutlineLink color={theme.color.secondary} />
            <span>{truncateTimestamp(reward.timestamp, router.locale || 'en')}</span>
            <span>
              {truncateWei(BigInt(reward.amount))} {t('lsd.symbol')}
            </span>
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
    grid-template-columns: 0.3fr 1fr 0.9fr;
    gap: ${({ theme }) => theme.size[8]};

    display: none;

    padding: 0px 4px;
    margin-bottom: ${({ theme }) => theme.size[8]};

    color: ${({ theme }) => theme.color.blue[500]};
    font-weight: 500;
    font-size: ${({ theme }) => theme.font.size[12]};
  `,
  Reward: styled(Link)`
    height: 32px;
    display: grid;
    grid-template-columns: 20px 1fr 0.9fr;
    gap: ${({ theme }) => theme.size[8]};
    padding: 8px;

    border-radius: ${({ theme }) => theme.size[8]};

    align-items: center;

    &:hover {
      background: ${({ theme }) => theme.colorV2.gray[4]};
      box-shadow: ${({ theme }) => theme.shadow[100]};
    }

    > span {
      display: flex;
      align-items: center;

      gap: ${({ theme }) => theme.size[4]};
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.color.primary};

      > span {
        color: ${({ theme }) => theme.color.secondary};
      }
    }

    > span:last-of-type {
      justify-self: flex-end;
    }
  `
}
