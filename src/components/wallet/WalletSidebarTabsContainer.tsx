import WalletSidebarActivities from '@/components/wallet/WalletSidebarActivities'
import WalletSidebarRewards from '@/components/wallet/WalletSidebarRewards'
import { AccountActivity } from '@/types/AccountActivity'
import { AccountReward } from '@/types/AccountReward'
import { Delegation } from '@/types/Delegation'
import styled from 'styled-components'
import WalletSidebarPortfolio from './WalletSidebarPortfolio'
import { StakingId } from '@/types/Staking'
import { getStakingById } from '@/config/product/staking'

interface WalletSidebarTabsContainerProps {
  accountDelegations: Delegation[]
  accountRewards: AccountReward[]
  accountActivities: AccountActivity[]
  activatedTab: 'delegations' | 'rewards' | 'activity'
  stakingAsset: StakingId
}

export default function WalletSidebarTabsContainer({
  accountDelegations,
  accountActivities,
  accountRewards,
  activatedTab,
  stakingAsset
}: WalletSidebarTabsContainerProps) {
  const staking = getStakingById(stakingAsset)
  const tabs = {
    delegations: <WalletSidebarPortfolio product={staking} accountDelegations={accountDelegations} />,
    rewards: <WalletSidebarRewards product={staking} accountRewards={accountRewards} productSelected={stakingAsset} />,
    activity: <WalletSidebarActivities accountActivities={accountActivities} product={staking} />
  }
  return <Warper>{tabs[activatedTab]}</Warper>
}

const { Warper } = {
  Warper: styled.div`
    min-height: 30px;
  `
}
