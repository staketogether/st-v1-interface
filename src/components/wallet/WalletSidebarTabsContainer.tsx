import WalletSidebarActivities from '@/components/wallet/WalletSidebarActivities'
import WalletSidebarRewards from '@/components/wallet/WalletSidebarRewards'
import { getAssetById } from '@/config/product/asset'
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
  selectedAsset: StakingId
}

export default function WalletSidebarTabsContainer({
  accountDelegations,
  accountActivities,
  accountRewards,
  activatedTab,
  selectedAsset: productSelected
}: WalletSidebarTabsContainerProps) {
  const staking = getStakingById(productSelected)
  const tabs = {
    delegations: <WalletSidebarPortfolio product={staking} accountDelegations={accountDelegations} />,
    rewards: <WalletSidebarRewards product={staking} accountRewards={accountRewards} productSelected={productSelected} />,
    activity: <WalletSidebarActivities accountActivities={accountActivities} product={staking} />
  }
  return <Warper>{tabs[activatedTab]}</Warper>
}

const { Warper } = {
  Warper: styled.div`
    min-height: 30px;
  `
}
