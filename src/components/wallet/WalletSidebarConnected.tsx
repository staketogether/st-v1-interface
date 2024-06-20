import { web3AuthInstanceVar } from '@/config/web3Auth'
import useVerifyWallet from '@/hooks/contentful/useVerifyWallet'
import useStwEthBalance from '@/hooks/contracts/useStwEthBalance'
import useConnectedAccount from '@/hooks/useConnectedAccount'
import useEns from '@/hooks/useEns'
import useWalletProviderImage from '@/hooks/useWalletProviderImage'
import { useReactiveVar } from '@apollo/client'
import { Drawer, notification } from 'antd'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FiCopy } from 'react-icons/fi'
import { PiCaretRight, PiChalkboardTeacher, PiGear, PiSignOut, PiWallet } from 'react-icons/pi'
import styled from 'styled-components'
import { useAccount, useDisconnect } from 'wagmi'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'
import useWalletSidebar from '../../hooks/useWalletSidebar'
import { capitalize, truncateAddress, truncateText } from '../../services/truncate'
import PanelWalletSidebarPanel from '../project/panel/PanelWalletSidebarPanel'
import Withdrawals from '../shared/Withdrawals'
import EnsAvatar from '../shared/ens/EnsAvatar'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import WalletSidebarSettings from './WalletSidebarSettings'
import WalletSidebarWeb3AuthWalletSettings from './WalletSidebarWeb3AuthSettings'
import useAccountAssets from '@/hooks/subgraphs/useAccountAssets'
import useAccountAssetsUsdBalance from '@/hooks/subgraphs/useAccountAssetsUsdBalance'
import useCoinUsdToUserCurrency from '@/hooks/useCoinUsdToUserCurrency'
import WalletSidebarAssetContainer from './assets/WalletSidebarAssetContainer'
import useSidebarAccountRewards from '@/hooks/useSidebarAccountRewards'
import useUserAccountHistory from '@/hooks/useUserAccountHistory'
import WalletSidebarRewardsContainer from './WalletSidebarRewardsContainer'
import WalletSidebarAccountHistoryContainer from './WalletSidebarAccountHistoryContainer'
import WalletSidebarAccountDelegations from './WalletSidebarAccountDelegations'

interface WalletSidebarConnectedProps {
  address: `0x${string}`
  walletChainId: number
}

type TabActivated = 'assets' | 'rewards' | 'historic' | 'delegations'
export default function WalletSidebarConnected({ address, walletChainId }: WalletSidebarConnectedProps) {
  const [isSettingsActive, setIsSettingsActive] = useState(false)
  const [isPanelActive, setIsPanelActive] = useState(false)
  const [isWeb3AuthSettingsActive, setIsWeb3AuthSettingsActive] = useState(false)
  const [tabActivated, setTabActivated] = useState<TabActivated>('assets')

  const { userCanViewPanel, verifyWalletLoading } = useVerifyWallet(address)
  const { connector } = useAccount()
  const showWalletSidebarWeb3AuthSettings = connector && connector.id === 'web3auth'
  const { disconnect } = useDisconnect()
  const { t } = useLocaleTranslation()
  const { openSidebar, setOpenSidebar } = useWalletSidebar()

  const { balance: stwETHBalance, refetch: stwETHRefetch } = useStwEthBalance(address)

  const { name, nameLoading, avatar, avatarLoading } = useEns(address, walletChainId)

  const web3AuthInstance = useReactiveVar(web3AuthInstanceVar)
  const { web3AuthUserInfo, walletConnected } = useConnectedAccount()

  const handleWalletProviderImage = useWalletProviderImage()

  const { accountAssets, loading } = useAccountAssets(address)
  const { accountRewards, loading: accountRewardsLoading } = useSidebarAccountRewards({ walletAddress: address })
  const { accountHistory, loading: accountHistoryLoading } = useUserAccountHistory({ walletAddress: address })

  const { balance: usdTotalBalance, loading: assetsUsdBalanceLoading } = useAccountAssetsUsdBalance(address)
  const { handleQuotePrice } = useCoinUsdToUserCurrency()

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

  const tabOptions: { label: string; value: TabActivated }[] = [
    { label: t('assets'), value: 'assets' },
    { label: t('rewards'), value: 'rewards' },
    { label: t('historic'), value: 'historic' },
    { label: t('delegations'), value: 'delegations' }
  ]

  const activeTab = {
    assets: <WalletSidebarAssetContainer accountAssets={accountAssets} accountAssetsLoading={loading} />,
    rewards: <WalletSidebarRewardsContainer accountRewards={accountRewards} accountRewardsLoading={accountRewardsLoading} />,
    historic: <WalletSidebarAccountHistoryContainer accountHistory={accountHistory} accountHistoryLoading={accountHistoryLoading} />,
    delegations: <WalletSidebarAccountDelegations address={address} />
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
                    <Web3AuthProfileImage src={web3AuthUserInfo.profileImage} alt={t('stakeTogether')} width={40} height={40} />
                    <WrapperWallet>{handleWalletProviderImage(capitalize(web3AuthUserInfo.typeOfLogin), 16)}</WrapperWallet>
                  </>
                ) : (
                  <>
                    {handleWalletProviderImage(walletConnected, 16) && (
                      <WrapperWallet>{handleWalletProviderImage(walletConnected, 16)}</WrapperWallet>
                    )}
                    <EnsAvatar address={address} size={40} avatar={avatar} avatarLoading={avatarLoading} />
                  </>
                )}
              </Web3AuthProfileContainer>
              <div>
                {web3AuthUserInfo?.email && (
                  <WalletAddressContainer>
                    <span className='email' onClick={() => web3AuthUserInfo?.email && copyToClipboard(web3AuthUserInfo.email)}>
                      {truncateText(web3AuthUserInfo.email, 20)}
                    </span>
                  </WalletAddressContainer>
                )}
                {nameLoading && <SkeletonLoading width={140} height={14} />}
                {!nameLoading && name && !web3AuthUserInfo && (
                  <WalletAddressContainer onClick={() => copyToClipboard(name)}>
                    {truncateText(name, 16)}
                    <CopyIcon className='copy' />
                  </WalletAddressContainer>
                )}
                <WalletAddressContainer onClick={() => copyToClipboard(address)}>
                  <span>{truncateAddress(address, 4)}</span>
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
            {assetsUsdBalanceLoading ? (
              <SkeletonLoading height={32} width={100} />
            ) : (
              <span>{handleQuotePrice(Number(usdTotalBalance))}</span>
            )}
          </EstimatedBalanceContainer>
          <TabContainer>
            {tabOptions.map((tab, index) => (
              <TabItem key={index} onClick={() => setTabActivated(tab.value)} className={tabActivated === tab.value ? 'activated' : ''}>
                <span>{tab.label}</span>
              </TabItem>
            ))}
          </TabContainer>
          {activeTab[tabActivated]}

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
  SidebarButton,
  WalletAddressContainer,
  EstimatedBalanceContainer,
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
    gap: ${({ theme }) => theme.size[8]};
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
    top: 27px;
    left: 27px;
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
    span {
      &.email {
        width: 111px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
        @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
          width: 100%;
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
  `
}
