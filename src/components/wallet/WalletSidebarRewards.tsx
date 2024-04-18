import { chainConfigByChainId } from '@/config/chain'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { truncateTimestamp, truncateWei } from '@/services/truncate'
import { AccountReward } from '@/types/AccountReward'
import { ProductStaking } from '@/types/ProductStaking'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PiLink } from 'react-icons/pi'
import styled, { useTheme } from 'styled-components'

interface WalletSidebarRewardsProps {
  accountRewards: AccountReward[]
  productSelected: string
  product: ProductStaking
}

export default function WalletSidebarRewards({ accountRewards, product }: WalletSidebarRewardsProps) {
  const { t } = useLocaleTranslation()
  const theme = useTheme()
  const { locale } = useRouter()
  const { blockExplorer } = chainConfigByChainId(product.chainIdNetworkAvailable)

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
            <PiLink color={theme.color.secondary} />
            <span>{truncateTimestamp(reward.timestamp, locale ?? 'en')}</span>
            <span className='green'>
              {truncateWei(reward.amount, 8)} {product.symbol}
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
    gap: 16px;

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
    display: grid;
    grid-template-columns: 20px auto 1fr;
    gap: ${({ theme }) => theme.size[8]};

    border-radius: ${({ theme }) => theme.size[8]};

    align-items: center;

    > span {
      display: flex;
      align-items: center;

      gap: ${({ theme }) => theme.size[4]};
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.color.primary};

      > span {
        color: ${({ theme }) => theme.color.secondary};
      }
      &.green {
        color: ${({ theme }) => theme.color.green[500]};
      }
    }

    > span:last-of-type {
      justify-self: flex-end;
    }
  `
}
