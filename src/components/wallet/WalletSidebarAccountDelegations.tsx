import WalletSidebarPortfolio from './WalletSidebarPortfolio'
import { getStakingById, stakingList } from '@/config/product/staking'
import useStAccount from '@/hooks/useStAccount'
import { StakingId } from '@/types/Staking'
import { useState } from 'react'
import styled from 'styled-components'
import { mainnet, optimism } from 'viem/chains'
import AssetIcon from '../shared/AssetIcon'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { Select } from 'antd'
import LottieAnimation from '@/components/shared/LottieAnimation'
import loadingAnimation from '@assets/animations/loading-animation.json'

interface WalletSidebarAssetContainerProps {
  address: `0x${string}`
}

export default function WalletSidebarAccountDelegations({ address }: WalletSidebarAssetContainerProps) {
  const [productTabSelected, setProductTabSelected] = useState<StakingId>('eth-staking')
  const { t } = useLocaleTranslation()

  const {
    accountDelegations: stakeAccountDelegations,
    accountBalance: stakeAccountBalance,
    accountRewards: stakeAccountRewards,
    accountActivities: stakeAccountActivities,
    accountIsLoading: stakeAccountIsLoading,
    accountShare: stakeAccountShare
  } = useStAccount({ address: address, productName: 'eth-staking', chainId: mainnet.id })

  const {
    accountDelegations: stpChzAccountDelegations,
    accountBalance: stpChzAccountBalance,
    accountRewards: stpChzAccountRewards,
    accountActivities: stpChzAccountActivities,
    accountIsLoading: stpChzAccountIsLoading,
    accountShare: stpChzAccountShare
  } = useStAccount({ address: address, productName: 'chz-staking', chainId: 88882 })

  const {
    accountDelegations: restakingAccountDelegations,
    accountBalance: restakingAccountBalance,
    accountRewards: restakingAccountRewards,
    accountActivities: restakingAccountActivities,
    accountIsLoading: restakingAccountIsLoading,
    accountShare: restakingAccountShare
  } = useStAccount({ address: address, productName: 'eth-restaking', chainId: optimism.id })

  const stAccount = {
    'eth-staking': {
      accountDelegations: stakeAccountDelegations,
      accountBalance: stakeAccountBalance,
      accountRewards: stakeAccountRewards,
      accountActivities: stakeAccountActivities,
      accountIsLoading: stakeAccountIsLoading,
      accountShare: stakeAccountShare
    },
    'eth-restaking': {
      accountDelegations: restakingAccountDelegations,
      accountBalance: restakingAccountBalance,
      accountRewards: restakingAccountRewards,
      accountActivities: restakingAccountActivities,
      accountIsLoading: restakingAccountIsLoading,
      accountShare: restakingAccountShare
    },
    'chz-staking': {
      accountDelegations: stpChzAccountDelegations,
      accountBalance: stpChzAccountBalance,
      accountRewards: stpChzAccountRewards,
      accountActivities: stpChzAccountActivities,
      accountIsLoading: stpChzAccountIsLoading,
      accountShare: stpChzAccountShare
    }
  }

  const { accountDelegations, accountShare, accountIsLoading } = stAccount[productTabSelected]
  const staking = getStakingById(productTabSelected)

  const products = stakingList.filter(product => product.enabled)

  const selectProductOptions = products.map(product => {
    return {
      value: product.id,
      label: (
        <ProductSelectCard>
          <AssetIcon image={product.logoImage} size={24} altName={product.id} chain={product.asset.chains[0]} />
          <span>{t(`v3.products.${product.id}.name`)}</span>
        </ProductSelectCard>
      )
    }
  })

  return (
    <Container>
      <>
        <HeaderTabContainer>
          <div>
            <span>{t('selectProduct')}</span>
            <Select
              defaultValue='eth-staking'
              style={{ width: '100%', height: '50px' }}
              onChange={e => setProductTabSelected(e as unknown as 'eth-staking' | 'eth-restaking')}
              options={selectProductOptions}
            />
          </div>
        </HeaderTabContainer>
        {accountIsLoading ? (
          <LottieAnimation animationData={loadingAnimation} width={70} height={70} loop />
        ) : (
          <WalletSidebarPortfolio
            product={staking}
            accountDelegations={accountDelegations}
            accountTotalShares={accountShare}
            userWalletAddress={address}
          />
        )}
      </>
    </Container>
  )
}

const { Container, HeaderTabContainer, ProductSelectCard } = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};
  `,
  ProductSelectCard: styled.div`
    width: 100%;
    min-height: 44px;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
    div {
      display: flex;
      align-items: center;
    }
  `,
  HeaderTabContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    > div {
      &:nth-child(1) {
        padding: 12px 12px 0px 12px;
        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.size[8]};
        > span {
          font-size: ${({ theme }) => theme.font.size[13]};
          font-style: normal;
          font-weight: 400;
          color: ${({ theme }) => theme.colorV2.gray[1]};
        }
      }
    }
    gap: ${({ theme }) => theme.size[8]};
  `
}
