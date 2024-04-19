import WalletSidebarActivities from '@/components/wallet/WalletSidebarActivities'
import WalletSidebarRewards from '@/components/wallet/WalletSidebarRewards'
import { getAssetById } from '@/config/product/asset'
import { AccountActivity } from '@/types/AccountActivity'
import { AccountReward } from '@/types/AccountReward'
import { Delegation } from '@/types/Delegation'
import styled from 'styled-components'
import WalletSidebarPortfolio from './WalletSidebarPortfolio'

interface WalletSidebarTabsContainerProps {
  accountDelegations: Delegation[]
  accountRewards: AccountReward[]
  accountActivities: AccountActivity[]
  activatedTab: 'delegations' | 'rewards' | 'activity'
  selectedAsset: string
}

export default function WalletSidebarTabsContainer({
  accountDelegations,
  accountActivities,
  accountRewards,
  activatedTab,
  selectedAsset: productSelected
}: WalletSidebarTabsContainerProps) {
  const asset = getAssetById(productSelected)
  const tabs = {
    delegations: <WalletSidebarPortfolio product={asset} accountDelegations={accountDelegations} />,
    rewards: <WalletSidebarRewards product={asset} accountRewards={accountRewards} productSelected={productSelected} />,
    activity: <WalletSidebarActivities accountActivities={accountActivities} product={asset} />
  }
  return <Warper>{tabs[activatedTab]}</Warper>
}

const { Warper } = {
  Warper: styled.div`
    min-height: 30px;
  `
}
