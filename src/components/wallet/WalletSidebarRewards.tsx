import useTranslation from '@/hooks/useTranslation'
import React from 'react'
import styled, { useTheme } from 'styled-components'
import { truncateWei } from "@/services/truncate";
import { AccountReward } from "@/types/AccountReward";
import { AiOutlineLink } from "react-icons/ai";

type WalletSidebarRewards = {
  accountRewards: AccountReward[]
}

export default function WalletSidebarRewards({ accountRewards }: WalletSidebarRewards) {
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <Container>
      {accountRewards.length === 0 && (
        <div>
          <span>{t('noRewards')}</span>
        </div>
      )}
      {accountRewards.length > 0 && (
        <RewardsHeader>
          <span>{t('rewards')}</span>
          <span>{t('amount')}</span>
          <span>{t('tx')}</span>
        </RewardsHeader>
      )}
      {accountRewards.map((reward, index) => (
        <Reward key={index}>
          <span>{reward.timestamp}</span>
          <span>{truncateWei(BigInt(reward.amount))}</span>
          <AiOutlineLink color={theme.color.secondary}/>
        </Reward>
      ))}
    </Container>
  )
}

const { Container, Reward, RewardsHeader } = {
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
