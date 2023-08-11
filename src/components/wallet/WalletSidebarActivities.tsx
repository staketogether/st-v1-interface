import useTranslation from '@/hooks/useTranslation'
import React from 'react'
import styled, { useTheme } from 'styled-components'
import { truncateWei } from '@/services/truncate'
import { AiOutlineLink } from 'react-icons/ai'
import { AccountActivity } from '@/types/AccountActivity'

type WalletSidebarActivities = {
  accountActivities: AccountActivity[]
}

export default function WalletSidebarActivities({ accountActivities }: WalletSidebarActivities) {
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <Container>
      {accountActivities.length === 0 && (
        <div>
          <span>{t('noActivities')}</span>
        </div>
      )}
      {accountActivities.length > 0 && (
        <ActivitiesHeader>
          <span>{t('time')}</span>
          <span>{t('type')}</span>
          <span>{t('value')}</span>
          <span>{t('tx')}</span>
        </ActivitiesHeader>
      )}
      {accountActivities.map((activity, index) => (
        <Activity key={index}>
          <span>{activity.timestamp}</span>
          <span>{t(`v2.wallet.activities.type.${activity.type}`)}</span>
          <span>{truncateWei(BigInt(activity.amount))}</span>
          <AiOutlineLink color={theme.color.secondary} />
        </Activity>
      ))}
    </Container>
  )
}

const { Container, Activity, ActivitiesHeader } = {
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
  ActivitiesHeader: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.size[8]};
  `,
  Activity: styled.div`
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
