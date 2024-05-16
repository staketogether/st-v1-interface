import chainConfig from '@/config/chain'
import { web3AuthInstanceVar } from '@/config/web3Auth'
import useVerifyWallet from '@/hooks/contentful/useVerifyWallet'
import useStwEthBalance from '@/hooks/contracts/useStwEthBalance'
import useConnectedAccount from '@/hooks/useConnectedAccount'
import useEns from '@/hooks/useEns'
import useWalletProviderImage from '@/hooks/useWalletProviderImage'
import { useReactiveVar } from '@apollo/client'
import { Drawer, Select, notification } from 'antd'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FiCopy } from 'react-icons/fi'
import { PiCaretRight, PiChalkboardTeacher, PiChartBar, PiChartLine, PiChartPieSlice, PiGear, PiSignOut, PiWallet } from 'react-icons/pi'
import styled from 'styled-components'
import { useAccount, useDisconnect } from 'wagmi'
import { mainnet, optimism } from 'wagmi/chains'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'
import useWalletSidebar from '../../hooks/useWalletSidebar'
import { capitalize, truncateAddress, truncateText } from '../../services/truncate'
import PanelWalletSidebarPanel from '../project/panel/PanelWalletSidebarPanel'
import AssetIcon from '../shared/AssetIcon'
import Card from '../shared/Card'
import Withdrawals from '../shared/Withdrawals'
import EnsAvatar from '../shared/ens/EnsAvatar'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import WalletSidebarSettings from './WalletSidebarSettings'
import WalletSidebarTabsContainer from './WalletSidebarTabsContainer'
import WalletSidebarWeb3AuthWalletSettings from './WalletSidebarWeb3AuthSettings'

import { stakingList } from '@/config/product/staking'
import { StakingId } from '@/types/Staking'
import useAccountAssets from '@/hooks/subgraphs/useAccountAssets'
import useAccountAssetsUsdBalance from '@/hooks/subgraphs/useAccountAssetsUsdBalance'
import useCoinUsdToUserCurrency from '@/hooks/useCoinUsdToUserCurrency'
import WalletSidebarAssetContainer from './assets/WalletSidebarAssetContainer'
import useStAccount from '@/hooks/useStAccount'

interface WalletSidebarConnectedProps {
  address: `0x${string}`
}

type TabActivated = 'assets' | 'rewards' | 'historic' | 'delegations'

export default function WalletSidebarConnected({ address }: WalletSidebarConnectedProps) {
  const [isSettingsActive, setIsSettingsActive] = useState(false)
  const [isPanelActive, setIsPanelActive] = useState(false)
  const [isWeb3AuthSettingsActive, setIsWeb3AuthSettingsActive] = useState(false)
  const [tabActivated, setTabActivated] = useState<TabActivated>('delegations')
  const [productTabSelected, setProductTabSelected] = useState<StakingId>('eth-staking')
  const [userNetWorth, setUserNetWorth] = useState<string>('0')

  const { userCanViewPanel, verifyWalletLoading } = useVerifyWallet(address)
  const { connector } = useAccount()
  const showWalletSidebarWeb3AuthSettings = connector && connector.id === 'web3auth'
  const { disconnect } = useDisconnect()
  const { t } = useLocaleTranslation()
  const { openSidebar, setOpenSidebar } = useWalletSidebar()

  const { balance: stwETHBalance, refetch: stwETHRefetch } = useStwEthBalance(address)

  const { chainId } = chainConfig()

  const { name, nameLoading } = useEns(address, chainId)

  const web3AuthInstance = useReactiveVar(web3AuthInstanceVar)
  const { web3AuthUserInfo, walletConnected } = useConnectedAccount()

  const handleWalletProviderImage = useWalletProviderImage()

  const {
    accountDelegations: stakeAccountDelegations,
    accountBalance: stakeAccountBalance,
    accountRewards: stakeAccountRewards,
    accountActivities: stakeAccountActivities,
    accountIsLoading: stakeAccountIsLoading,
    accountShare: stakeAccountShare
  } = useStAccount({ address: address, productName: 'eth-staking', chainId: mainnet.id })

  const { accountAssets } = useAccountAssets(address)
  const { balance: usdTotalBalance } = useAccountAssetsUsdBalance(address)
  const { handleQuotePrice } = useCoinUsdToUserCurrency()

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
    }
  }

  const { accountDelegations, accountRewards, accountActivities, accountShare } = stAccount[productTabSelected]

  async function disconnectWallet() {
    setOpenSidebar(false)
    disconnect()
    if (web3AuthInstance && web3AuthInstance.status === 'connected') {
      await web3AuthInstance.logout()
      web3AuthInstanceVar(undefined)
    }
  }

  function copyToClipboard(value: string) {
    navigator.clipboard.writeText(value)
    notification.success({
      message: `${t('copiedToClipboard')}`,
      placement: 'topRight'
    })
  }

  useEffect(() => {
    if (address) {
      setIsPanelActive(false)
    }
  }, [address])

  useEffect(() => {
    setUserNetWorth(handleQuotePrice(Number(usdTotalBalance)))
  }, [handleQuotePrice, usdTotalBalance])

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

  const tabOptions: { label: string; value: TabActivated }[] = [
    { label: t('assets'), value: 'assets' },
    { label: t('rewards'), value: 'rewards' },
    { label: t('historic'), value: 'historic' },
    { label: t('delegations'), value: 'delegations' }
  ]

  const activeTab = {
    assets: <WalletSidebarAssetContainer accountAssets={accountAssets} />,
    rewards: <WalletSidebarAssetContainer accountAssets={accountAssets} />,
    historic: <WalletSidebarAssetContainer accountAssets={accountAssets} />,
    delegations: <WalletSidebarAssetContainer accountAssets={accountAssets} />
  }

  return (
    <DrawerContainer placement='right' size='default' onClose={() => setOpenSidebar(false)} mask={true} open={openSidebar}>
      {isSettingsActive && !isPanelActive && <WalletSidebarSettings setIsSettingsActive={setIsSettingsActive} />}
      {isPanelActive && !isSettingsActive && !isWeb3AuthSettingsActive && <PanelWalletSidebarPanel setIsPanelActive={setIsPanelActive} />}
      {!isSettingsActive && !isPanelActive && isWeb3AuthSettingsActive && (
        <WalletSidebarWeb3AuthWalletSettings setWeb3authWalletActive={setIsWeb3AuthSettingsActive} walletAddress={address} />
      )}
      {!isSettingsActive && !isPanelActive && !isWeb3AuthSettingsActive && (
        <>
          <HeaderContainer>
            <HeaderUserContainer>
              <Web3AuthProfileContainer>
                {web3AuthUserInfo && web3AuthUserInfo.typeOfLogin && web3AuthUserInfo.profileImage ? (
                  <>
                    <Web3AuthProfileImage src={web3AuthUserInfo.profileImage} alt={t('stakeTogether')} width={32} height={32} />{' '}
                    <WrapperWallet>{handleWalletProviderImage(capitalize(web3AuthUserInfo.typeOfLogin), 16)}</WrapperWallet>
                  </>
                ) : (
                  <>
                    <WrapperWallet>{handleWalletProviderImage(walletConnected, 16)}</WrapperWallet>
                    <EnsAvatar address={address} size={32} chainId={chainId} />
                  </>
                )}
              </Web3AuthProfileContainer>
              <div>
                {web3AuthUserInfo?.email && (
                  <WalletAddressContainer
                    className='bold'
                    onClick={() => web3AuthUserInfo?.email && copyToClipboard(web3AuthUserInfo.email)}
                  >
                    {truncateText(web3AuthUserInfo.email, 20)}
                  </WalletAddressContainer>
                )}
                {nameLoading && <SkeletonLoading width={140} height={14} />}
                {!nameLoading && name && !web3AuthUserInfo && (
                  <WalletAddressContainer onClick={() => copyToClipboard(name)}>
                    {truncateText(name, 16)}
                    <CopyIcon className='copy' />
                  </WalletAddressContainer>
                )}
                <WalletAddressContainer onClick={() => copyToClipboard(address)} className={`${!web3AuthUserInfo?.email && 'bold'}`}>
                  {truncateAddress(address)}
                  <CopyIcon className='copy' />
                </WalletAddressContainer>
              </div>
            </HeaderUserContainer>
            <ClosedSidebarButton onClick={() => setOpenSidebar(false)}>
              <CloseSidebar fontSize={14} />
            </ClosedSidebarButton>
            <Actions>
              {userCanViewPanel && !verifyWalletLoading && (
                <SidebarButton onClick={() => setIsPanelActive(true)}>
                  <PanelIcon fontSize={16} />
                </SidebarButton>
              )}
              {showWalletSidebarWeb3AuthSettings && (
                <SidebarButton onClick={() => setIsWeb3AuthSettingsActive(true)}>
                  <WalletIcon fontSize={16} />
                </SidebarButton>
              )}
              <SidebarButton onClick={() => setIsSettingsActive(true)}>
                <SettingIcon fontSize={16} />
              </SidebarButton>
              <SidebarButton onClick={() => disconnectWallet()}>
                <Logout fontSize={14} />
              </SidebarButton>
            </Actions>
          </HeaderContainer>
          <EstimatedBalanceContainer>
            <span>{t('estimatedBalance')}</span>
            <span>{userNetWorth}</span>
          </EstimatedBalanceContainer>
          <TabContainer>
            {tabOptions.map((tab, index) => (
              <TabItem key={index} onClick={() => setTabActivated(tab.value)} className={tabActivated === tab.value ? 'activated' : ''}>
                <span>{tab.label}</span>
              </TabItem>
            ))}
          </TabContainer>
          {activeTab[tabActivated]}

          <Card
            header={
              <HeaderTabContainer>
                <div>
                  <span>{t('selectProduct')}</span>
                  <Select
                    defaultValue='eth-staking'
                    style={{ width: '100%', height: '40px' }}
                    onChange={e => setProductTabSelected(e as 'eth-staking' | 'eth-restaking')}
                    options={selectProductOptions}
                  />
                </div>
                <HeaderTabHeader>
                  <div onClick={() => setTabActivated('delegations')} className={`${tabActivated === 'delegations' && 'activated'} `}>
                    <PoolsIcon />
                    <span>{t('delegations')}</span>
                  </div>
                  <div onClick={() => setTabActivated('rewards')} className={`${tabActivated === 'rewards' && 'activated'} `}>
                    <AnalyticsIcon />
                    <span>{t('rewards')}</span>
                  </div>
                  <div onClick={() => setTabActivated('activity')} className={`${tabActivated === 'activity' && 'activated'} `}>
                    <ActivitiesIcon />
                    <span>{t('activity')}</span>
                  </div>
                </HeaderTabHeader>
              </HeaderTabContainer>
            }
          >
            <WalletSidebarTabsContainer
              accountDelegations={accountDelegations}
              accountRewards={accountRewards}
              accountActivities={accountActivities}
              activatedTab={tabActivated}
              stakingAsset={productTabSelected}
              accountTotalShares={accountShare}
              userWalletAddress={address}
            />
          </Card>

          {stwETHBalance > 0n && <Withdrawals balance={stwETHBalance} accountAddress={address} refetchBalance={stwETHRefetch} />}
        </>
      )}
    </DrawerContainer>
  )
}

const {
  DrawerContainer,
  HeaderContainer,
  CloseSidebar,
  ClosedSidebarButton,
  HeaderTabContainer,
  Logout,
  SettingIcon,
  WalletIcon,
  PanelIcon,
  Actions,
  HeaderUserContainer,
  Web3AuthProfileImage,
  TabItem,
  Web3AuthProfileContainer,
  WrapperWallet,
  CopyIcon,
  PoolsIcon,
  AnalyticsIcon,
  ProductSelectCard,
  ActivitiesIcon,
  SidebarButton,
  WalletAddressContainer,
  EstimatedBalanceContainer,
  HeaderTabHeader,
  TabContainer
} = {
  DrawerContainer: styled(Drawer)`
    background-color: ${({ theme }) => theme.colorV2.white} !important;

    .ant-drawer-header.ant-drawer-header-close-only {
      display: none;
    }

    .ant-drawer-body {
      width: calc(100vw - 60px);
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[16]};
      padding: ${({ theme }) => theme.size[16]};
      @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        width: 420px;
      }
    }
  `,
  HeaderContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${({ theme }) => theme.size[16]};
  `,
  HeaderUserContainer: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[12]};
    border-radius: 8px;
    padding: 4px 8px;

    border-radius: 8px;

    > div {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[4]};

      span {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.size[4]};
        cursor: pointer;
      }
    }
  `,
  ClosedSidebarButton: styled.button`
    position: absolute;
    left: -44px;
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: ${({ theme }) => theme.size[8]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background: ${({ theme }) => theme.color.white};
    transition: background 0.2s ease;
    line-height: 36px;

    &:hover {
      background: ${({ theme }) => theme.color.whiteAlpha[700]};
    }
  `,
  SettingIcon: styled(PiGear)``,
  WalletIcon: styled(PiWallet)``,
  PanelIcon: styled(PiChalkboardTeacher)``,
  CloseSidebar: styled(PiCaretRight)`
    color: ${({ theme }) => theme.colorV2.blue[1]} !important;
  `,
  SidebarButton: styled.button`
    display: grid;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.colorV2.blue[1]};
    color: ${({ theme }) => theme.color.white};
    transition: background 0.2s ease;
    line-height: 36px;
    box-shadow: ${({ theme }) => theme.shadow[300]};

    svg {
      color: ${({ theme }) => theme.color.white};
    }

    &:hover {
      background: ${({ theme }) => theme.colorV2.purple[1]};
    }

    &:first-of-type {
      margin-left: auto;
    }
  `,
  Logout: styled(PiSignOut)`
    color: ${({ theme }) => theme.color.primary};
  `,
  Actions: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
  `,
  Web3AuthProfileContainer: styled.div`
    position: relative;
  `,
  WrapperWallet: styled.div`
    position: absolute;
    top: 20px;
    left: 21px;
    border-radius: 50%;
    box-shadow: ${({ theme }) => theme.shadow[100]};
    width: 14px;
    height: 14px;

    img {
      border: 1px solid ${({ theme }) => theme.colorV2.blue[1]} !important;
      border-radius: 50%;
      width: 14px;
      height: 14px;
    }
  `,
  Web3AuthProfileImage: styled(Image)`
    border-radius: 50%;
  `,
  CopyIcon: styled(FiCopy)`
    font-size: 11px;
    color: ${({ theme }) => theme.colorV2.gray[1]};

    &:hover {
      cursor: pointer;
      color: ${({ theme }) => theme.colorV2.purple[1]};
    }
  `,
  WalletAddressContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    color: ${({ theme }) => theme.colorV2.gray[1]};
    cursor: pointer;

    &.bold {
      font-weight: 500;
    }

    svg {
      color: ${({ theme }) => theme.colorV2.gray[1]};
    }
  `,
  PoolsIcon: styled(PiChartPieSlice)`
    font-size: 16px;
  `,
  AnalyticsIcon: styled(PiChartBar)`
    font-size: 16px;
  `,
  ActivitiesIcon: styled(PiChartLine)`
    font-size: 16px;
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
  `,
  TabContainer: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
  `,
  TabItem: styled.div`
    border-radius: 8px;
    display: flex;
    padding: 0px 8px;
    align-items: center;
    height: 32px;
    cursor: pointer;
    transition: background 0.2s ease;

    span {
      color: ${({ theme }) => theme.colorV2.gray[1]};
      font-size: ${({ theme }) => theme.font.size[13]};
      font-weight: 400;
    }

    &:hover,
    &.activated {
      background: ${({ theme }) => theme.colorV2.blue[1]};
      span {
        color: ${({ theme }) => theme.color.white};
      }
    }
  `,
  HeaderTabHeader: styled.div`
    width: 100%;
    height: 48px;
    padding: 0px 12px;
    border-bottom: 1px solid ${({ theme }) => theme.colorV2.gray[2]};
    border-radius: 8px 8px 0 0;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.size[4]};

    align-items: center;

    div {
      height: 100%;
      font-size: ${({ theme }) => theme.font.size[13]};
      font-weight: 400;
      cursor: pointer;
      border-bottom: 1px solid transparent;

      position: relative;
      display: inline-block;
      text-decoration: none;
      overflow: hidden;

      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[8]};

      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        bottom: 0;
        left: 0;
        background-color: ${({ theme }) => theme.colorV2.purple[1]};
        transform: scaleX(0);
        transform-origin: bottom left;
        transition: transform 0.3s ease-out;
      }

      &:hover {
        color: ${({ theme }) => theme.colorV2.purple[1]};

        span {
          opacity: 1;
          color: ${({ theme }) => theme.colorV2.purple[1]};
        }
      }

      &:hover::after {
        transform: scaleX(1);
      }

      &.activated::after,
      &.activated:hover::after {
        transform: scaleX(0);
        transition: none;
      }

      &.activated {
        border-bottom: 1px solid ${({ theme }) => theme.colorV2.purple[1]};
        color: ${({ theme }) => theme.colorV2.purple[1]};

        span {
          color: ${({ theme }) => theme.colorV2.purple[1]};
          opacity: 1;
        }
      }

      span {
        color: ${({ theme }) => theme.colorV2.gray[1]};
        opacity: 0.6;
      }
    }
  `,

  EstimatedBalanceContainer: styled.div`
    display: flex;
    flex-direction: column;

    gap: 4px;

    span {
      &:nth-child(1) {
        color: ${({ theme }) => theme.colorV2.gray[1]};
        font-size: ${({ theme }) => theme.font.size[13]};
        font-weight: 500;
        opacity: 0.6;
      }

      &:nth-child(2) {
        font-size: ${({ theme }) => theme.font.size[32]};
        color: ${({ theme }) => theme.colorV2.purple[1]};
        font-weight: 500;
      }
    }
  `,
  ProductSelectCard: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

    gap: ${({ theme }) => theme.size[8]};

    div {
      display: flex;
      align-items: center;
    }
  `
}
