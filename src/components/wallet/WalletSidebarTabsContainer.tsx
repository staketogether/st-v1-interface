import WalletSidebarActivities from '@/components/wallet/WalletSidebarActivities'
import WalletSidebarRewards from '@/components/wallet/WalletSidebarRewards'
import { getProductByName } from '@/config/product-staking'
import { AccountActivity } from '@/types/AccountActivity'
import { AccountReward } from '@/types/AccountReward'
import { Delegation } from '@/types/Delegation'
import { ProductStakingName } from '@/types/ProductStaking'
import styled from 'styled-components'
import WalletSidebarPortfolio from './WalletSidebarPortfolio'

type WalletSidebarTabsContainerProps = {
  accountDelegations: Delegation[]
  accountRewards: AccountReward[]
  accountActivities: AccountActivity[]
  activatedTab: 'delegations' | 'rewards' | 'activity'
  productSelected: ProductStakingName
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
