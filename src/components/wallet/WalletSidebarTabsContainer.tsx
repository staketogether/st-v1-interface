import WalletSidebarActivities from '@/components/wallet/WalletSidebarActivities'
import WalletSidebarRewards from '@/components/wallet/WalletSidebarRewards'
import { getStakingProduct } from '@/config/products/staking'
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
  productSelected: string
}

export default function WalletSidebarTabsContainer({
  accountDelegations,
  accountActivities,
  accountRewards,
  activatedTab,
  productSelected
}: WalletSidebarTabsContainerProps) {
  const product = getStakingProduct({ name: productSelected })
  const tabs = {
    delegations: <WalletSidebarPortfolio product={product} accountDelegations={accountDelegations} />,
    rewards: <WalletSidebarRewards product={product} accountRewards={accountRewards} productSelected={productSelected} />,
    activity: <WalletSidebarActivities accountActivities={accountActivities} product={product} />
  }
  return <Warper>{tabs[activatedTab]}</Warper>
}

const { Warper } = {
  Warper: styled.div`
    min-height: 30px;
  `
}
