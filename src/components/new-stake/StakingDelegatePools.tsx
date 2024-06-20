import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { Staking } from '@/types/Staking'
import React from 'react'
import styled from 'styled-components'
import AssetIcon from '../shared/AssetIcon'
import WalletSidebarPortfolio from '../wallet/WalletSidebarPortfolio'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import { truncateWei } from '@/services/truncate'
import useStAccount from '@/hooks/useStAccount'

interface StakingDelegatePoolsProps {
  staking: Staking
  userWalletAddress: `0x${string}`
  stpETHBalance: bigint
  stpETHBalanceLoading: boolean
}

export default function StakingDelegatePools({
  staking,
  userWalletAddress,
  stpETHBalance,
  stpETHBalanceLoading
}: StakingDelegatePoolsProps) {
  const { t } = useLocaleTranslation()

  const { accountDelegations, accountShare } = useStAccount({
    address: userWalletAddress,
    productName: staking.id,
    chainId: staking.asset.chains[0]
  })
  return (
    <Container>
      <header>
        <span>{t('delegation')}</span>
        <AssetIcon image={staking.symbolImage} size={24} altName={staking.id} chain={staking.asset.chains[0]} />
        <span>{staking.symbol}</span>
      </header>
      <BalanceDelegated>
        <span>{t('totalDelegated')}</span>
        <div>
          <div>
            {stpETHBalanceLoading ? <SkeletonLoading width={50} /> : <span className='purple'>{truncateWei(stpETHBalance, 6)}</span>}
            <span className='purple'>{staking.symbol}</span>
          </div>
        </div>
      </BalanceDelegated>
      <WalletSidebarPortfolio
        product={staking}
        accountTotalShares={accountShare}
        accountDelegations={accountDelegations}
        userWalletAddress={userWalletAddress}
      />
    </Container>
  )
}

const { Container, BalanceDelegated } = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};

    header {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[8]};
      span {
        font-size: ${({ theme }) => theme.size[16]};
        font-weight: 500;
      }
    }
  `,
  BalanceDelegated: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.size[8]};

    padding: 12px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colorV2.gray[2]};

    span {
      font-size: ${({ theme }) => theme.font.size[13]};
      font-weight: 500;
      &.purple {
        font-size: ${({ theme }) => theme.font.size[15]};
        color: ${({ theme }) => theme.colorV2.purple[1]};
      }
    }

    div {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[4]};
    }
  `
}
