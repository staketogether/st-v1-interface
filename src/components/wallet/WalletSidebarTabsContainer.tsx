import { AccountReward } from '@/types/AccountReward'
import { Delegation } from '@/types/Delegation'
import { AccountActivity } from '@/types/AccountActivity'
import WalletSidebarActivities from '@/components/wallet/WalletSidebarActivities'
import WalletSidebarRewards from '@/components/wallet/WalletSidebarRewards'
import WalletSidebarPortfolio from './WalletSidebarPortfolio'
import styled from 'styled-components'

type WalletSidebarTabsContainerProps = {
  accountDelegations: Delegation[]
  accountRewards: AccountReward[]
  accountActivities: AccountActivity[]
  activatedTab: 'delegations' | 'rewards' | 'activity'
}

export default function WalletSidebarTabsContainer({
  accountDelegations,
  accountActivities,
  accountRewards,
  activatedTab
}: WalletSidebarTabsContainerProps) {
  const tabs = {
    delegations: <WalletSidebarPortfolio accountDelegations={accountDelegations} />,
    rewards: <WalletSidebarRewards accountRewards={accountRewards} />,
    activity: <WalletSidebarActivities accountActivities={accountActivities} />
  }
  return <Warper>{tabs[activatedTab]}</Warper>
}

const { Warper } = {
  Warper: styled.div`
    min-height: 30px;
  `
}
