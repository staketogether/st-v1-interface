import { AccountReward } from '@/types/AccountReward'
import { Delegation } from '@/types/Delegation'
import { AccountActivity } from '@/types/AccountActivity'
import WalletSidebarActivities from '@/components/wallet/WalletSidebarActivities'
import WalletSidebarRewards from '@/components/wallet/WalletSidebarRewards'
import WalletSidebarPortfolio from './WalletSidebarPortfolio'
import styled from 'styled-components'
import { StakingProduct } from '@/types/Product'
import { getProductByName } from '@/config/product'

type WalletSidebarTabsContainerProps = {
  accountDelegations: Delegation[]
  accountRewards: AccountReward[]
  accountActivities: AccountActivity[]
  activatedTab: 'delegations' | 'rewards' | 'activity'
  productSelected: StakingProduct
}

export default function WalletSidebarTabsContainer({
  accountDelegations,
  accountActivities,
  accountRewards,
  activatedTab,
  productSelected
}: WalletSidebarTabsContainerProps) {
  const product = getProductByName({ productName: productSelected })
  const tabs = {
    delegations: <WalletSidebarPortfolio product={product} accountDelegations={accountDelegations} />,
    rewards: (
      <WalletSidebarRewards
        product={product}
        accountRewards={accountRewards}
        productSelected={productSelected}
      />
    ),
    activity: <WalletSidebarActivities accountActivities={accountActivities} product={product} />
  }
  return <Warper>{tabs[activatedTab]}</Warper>
}

const { Warper } = {
  Warper: styled.div`
    min-height: 30px;
  `
}
