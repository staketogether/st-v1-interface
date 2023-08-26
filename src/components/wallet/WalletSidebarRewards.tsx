import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { truncateWei } from '@/services/truncate'
import { AccountReward } from '@/types/AccountReward'
import { AiOutlineLink } from 'react-icons/ai'
import styled, { useTheme } from 'styled-components'

type WalletSidebarRewards = {
  accountRewards: AccountReward[]
}

export default function WalletSidebarRewards({ accountRewards }: WalletSidebarRewards) {
  const { t } = useLocaleTranslation()
  const theme = useTheme()

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
      {accountRewards.map((reward, index) => (
        <Reward key={index}>
          <span>{reward.timestamp}</span>
          <span>{truncateWei(BigInt(reward.amount))}</span>
          <AiOutlineLink color={theme.color.secondary} />
        </Reward>
      ))}
    </Container>
  )
}

const { Container, Reward, RewardsHeader, EmptyContainer } = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[4]};
    margin-top: ${({ theme }) => theme.size[16]};

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    div > span:nth-child(2) > span {
      color: ${({ theme }) => theme.color.secondary};
    }
  `,
  EmptyContainer: styled.div`
    span {
      width: 100%;
      text-align: center;
    }
  `,
  RewardsHeader: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.size[8]};
  `,
  Reward: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    height: ${({ theme }) => theme.size[24]};
    border-radius: ${({ theme }) => theme.size[16]};
    padding: ${({ theme }) => theme.size[4]} ${({ theme }) => theme.size[8]};
    background-color: ${({ theme }) => theme.color.blackAlpha[50]};

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
