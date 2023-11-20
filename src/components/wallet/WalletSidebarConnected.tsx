import WalletSidebarActivities from '@/components/wallet/WalletSidebarActivities'
import WalletSidebarRewards from '@/components/wallet/WalletSidebarRewards'
import useConnectedAccount from '@/hooks/useConnectedAccount'
import useEns from '@/hooks/useEns'
import useWalletProviderImage from '@/hooks/useWalletProviderImage'
import ethIcon from '@assets/icons/eth-icon.svg'
import stIcon from '@assets/st-symbol.svg'
import { Drawer, notification } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FiCopy } from 'react-icons/fi'
import {
  PiCaretRight,
  PiChalkboardTeacher,
  PiChartBar,
  PiChartLine,
  PiChartPieSlice,
  PiGear,
  PiSignOut
} from 'react-icons/pi'
import styled from 'styled-components'
import { useDisconnect } from 'wagmi'
import useEthBalanceOf from '../../hooks/contracts/useEthBalanceOf'
import useStAccount from '../../hooks/subgraphs/useStAccount'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'
import useWalletSidebar from '../../hooks/useWalletSidebar'
import { formatNumberByLocale } from '../../services/format'
import { capitalize, truncateAddress, truncateText, truncateWei } from '../../services/truncate'
import Tabs, { TabsItems } from '../shared/Tabs'
import EnsAvatar from '../shared/ens/EnsAvatar'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import WalletBuyEthModal from './WalletBuyEthModal'
import WalletSidebarPoolsDelegated from './WalletSidebarPoolsDelegated'
import WalletSidebarSettings from './WalletSidebarSettings'
import Withdrawals from '../shared/Withdrawals'
import useStwEthBalance from '@/hooks/contracts/useStwEthBalance'
import WalletSidebarPanel from '../project/panel/WalletSidebarPanel'

type WalletSidebarConnectedProps = {
  address: `0x${string}`
}

export default function WalletSidebarConnected({ address }: WalletSidebarConnectedProps) {
  const [isSettingsActive, setIsSettingsActive] = useState(false)
  const [isPanelActive, setIsPanelActive] = useState(false)
  const { disconnect } = useDisconnect()
  const { t } = useLocaleTranslation()
  const { openSidebar, setOpenSidebar } = useWalletSidebar()

  const { balance: ethBalance, refetch } = useEthBalanceOf(address)
  const { balance: stwETHBalance, refetch: stwETHRefetch } = useStwEthBalance(address)

  const { name, nameLoading } = useEns(address)

  const { web3AuthUserInfo, walletConnected } = useConnectedAccount()

  const handleWalletProviderImage = useWalletProviderImage()

  const { locale } = useRouter()

  const {
    accountDelegations,
    accountBalance,
    accountRewards,
    accountActivities,
    accountProfitPercentage,
    accountTotalRewards
  } = useStAccount(address)
  function disconnectWallet() {
    setOpenSidebar(false)
    disconnect()
  }

  function copyToClipboard(value: string) {
    navigator.clipboard.writeText(value)
    notification.success({
      message: `${t('copiedToClipboard')}`,
      placement: 'topRight'
    })
  }

  const onBuyEthIsSuccess = () => {
    refetch()
  }

  const tabRewards: TabsItems[] = [
    {
      key: 'rewards',
      label: t('rewards'),
      icon: <AnalyticsIcon />,
      children: <WalletSidebarRewards accountRewards={accountRewards} />
    }
  ]

  const tabPortfolio: TabsItems[] = [
    {
      key: 'portfolio',
      label: t('portfolio'),
      icon: <PoolsIcon />,
      children: <WalletSidebarPoolsDelegated accountDelegations={accountDelegations} />
    }
  ]

  const tabActivities: TabsItems[] = [
    {
      key: 'activity',
      label: t('activity'),
      icon: <ActivitiesIcon />,
      children: <WalletSidebarActivities accountActivities={accountActivities} />
    }
  ]

  return (
    <DrawerContainer
      placement='right'
      size='default'
      onClose={() => setOpenSidebar(false)}
      mask={true}
      open={openSidebar}
    >
      {isSettingsActive && !isPanelActive && (
        <WalletSidebarSettings setIsSettingsActive={setIsSettingsActive} />
      )}
      {isPanelActive && !isSettingsActive && <WalletSidebarPanel setIsPanelActive={setIsPanelActive} />}
      {!isSettingsActive && !isPanelActive && (
        <>
          <HeaderContainer>
            <HeaderUserContainer>
              <Web3AuthProfileContainer>
                {web3AuthUserInfo && web3AuthUserInfo.profileImage ? (
                  <>
                    <Web3AuthProfileImage
                      src={web3AuthUserInfo.profileImage}
                      alt={t('stakeTogether')}
                      width={24}
                      height={24}
                    />
                    <WrapperWallet>
                      {handleWalletProviderImage(capitalize(web3AuthUserInfo.typeOfLogin), 16)}
                    </WrapperWallet>
                  </>
                ) : (
                  <>
                    <WrapperWallet>{handleWalletProviderImage(walletConnected, 16)}</WrapperWallet>
                    <EnsAvatar address={address} size={24} />
                  </>
                )}
              </Web3AuthProfileContainer>
              <div>
                {web3AuthUserInfo && (
                  <WalletAddressContainer>
                    <span onClick={() => copyToClipboard(web3AuthUserInfo.email)}>
                      {truncateText(web3AuthUserInfo.email, 20)}
                    </span>
                  </WalletAddressContainer>
                )}
                {nameLoading && <SkeletonLoading width={140} height={14} />}
                {!nameLoading && name && !web3AuthUserInfo && (
                  <WalletAddressContainer onClick={() => copyToClipboard(name)}>
                    <span>{truncateText(name, 16)}</span>
                    <CopyIcon className='copy' />
                  </WalletAddressContainer>
                )}
                <WalletAddressContainer onClick={() => copyToClipboard(address)}>
                  <span>{truncateAddress(address)}</span>
                  <CopyIcon className='copy' />
                </WalletAddressContainer>
              </div>
            </HeaderUserContainer>
            <ClosedSidebarButton onClick={() => setOpenSidebar(false)}>
              <CloseSidebar fontSize={14} />
            </ClosedSidebarButton>
            <Actions>
              <Button onClick={() => setIsPanelActive(true)}>
                <PanelIcon fontSize={16} />
              </Button>
              <Button onClick={() => setIsSettingsActive(true)}>
                <SettingIcon fontSize={16} />
              </Button>
              <Button onClick={() => disconnectWallet()}>
                <Logout fontSize={14} />
              </Button>
            </Actions>
          </HeaderContainer>
          <InfoContainer>
            <InfoCard>
              <h4>
                {t('availableToStake')} <Image src={ethIcon} width={18} height={18} alt='eth icon' />
              </h4>
              <div>
                <span>{formatNumberByLocale(truncateWei(ethBalance, 6), locale)}</span>
                <span>{` ${t('eth.symbol')}`}</span>
              </div>
            </InfoCard>
            <InfoCard>
              <h4>
                {t('invested')} <Image src={stIcon} width={18} height={18} alt={t('lsd.symbol')} />
              </h4>
              <div>
                <span className='purple'>{formatNumberByLocale(truncateWei(accountBalance, 5), locale)}</span>
                <span className='purple'>{` ${t('lsd.symbol')}`}</span>
              </div>
            </InfoCard>
            <InfoCard>
              <h4>{t('rewards')}</h4>
              <div>
                <span className={`${accountTotalRewards > 1n && 'green'} ${accountTotalRewards < 0 && 'red'}`}>
                  {`${truncateWei(accountTotalRewards, 4)}`}
                </span>
                <span className={`${accountTotalRewards > 1n && 'green'} ${accountTotalRewards < 0 && 'red'}`}>
                  {` ${t('lsd.symbol')}`}
                </span>
              </div>
            </InfoCard>
            <InfoCard>
              <h4>{t('v2.sidebar.percentageProfit')}</h4>
              <div>
                <span className={`${accountTotalRewards > 1n && 'green'}`}>
                  {truncateWei(BigInt(accountProfitPercentage) * BigInt(100), 4)} %
                </span>
              </div>
            </InfoCard>
          </InfoContainer>
          {stwETHBalance > 0n && (
            <Withdrawals balance={stwETHBalance} accountAddress={address} refetchBalance={stwETHRefetch} />
          )}
          <TabsArea>
            <Tabs items={tabPortfolio} defaultActiveKey='portfolio' gray />
          </TabsArea>
          <TabsArea>
            <Tabs items={tabRewards} defaultActiveKey='rewards' gray />
          </TabsArea>
          <TabsArea>
            <Tabs items={tabActivities} defaultActiveKey='activity' gray />
          </TabsArea>
        </>
      )}
      <WalletBuyEthModal walletAddress={address} onBuyEthIsSuccess={onBuyEthIsSuccess} />
    </DrawerContainer>
  )
}

const {
  DrawerContainer,
  HeaderContainer,
  InfoContainer,
  CloseSidebar,
  ClosedSidebarButton,
  Logout,
  Button,
  SettingIcon,
  PanelIcon,
  Actions,
  HeaderUserContainer,
  Web3AuthProfileImage,
  Web3AuthProfileContainer,
  WrapperWallet,
  CopyIcon,
  PoolsIcon,
  AnalyticsIcon,
  ActivitiesIcon,
  TabsArea,
  WalletAddressContainer,
  InfoCard
} = {
  DrawerContainer: styled(Drawer)`
    background-color: ${({ theme }) => theme.colorV2.foreground} !important;

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
        width: 380px;
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

    background: ${({ theme }) => theme.colorV2.white};
    border-radius: 8px;
    box-shadow: ${({ theme }) => theme.shadow[100]};

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
  InfoContainer: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.size[12]};

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      grid-template-columns: 1fr 1fr;
      gap: ${({ theme }) => theme.size[16]};
    }
  `,
  InfoCard: styled.div`
    background: ${({ theme }) => theme.colorV2.white};
    border-radius: 8px;
    box-shadow: ${({ theme }) => theme.shadow[100]};
    padding: 12px 16px;

    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[4]};

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      padding: 12px 16px;
      gap: 4px;
    }

    h4 {
      font-size: 13px;
      font-weight: 400;
      color: ${({ theme }) => theme.colorV2.blue[1]};

      img {
        box-shadow: ${({ theme }) => theme.shadow[100]};
        border-radius: 100%;

        float: right;
        margin-top: -4px;
        margin-right: -8px;
      }
    }

    > div {
      span {
        font-size: 14px;
        line-height: 18px;
        font-weight: 400;
        color: ${({ theme }) => theme.colorV2.blue[3]};

        &.purple {
          color: ${({ theme }) => theme.color.secondary};
        }
        &.red {
          color: ${({ theme }) => theme.color.red[300]};
        }
        &.green {
          color: ${({ theme }) => theme.color.green[500]};
        }
        &.cyan {
          color: ${({ theme }) => theme.color.messenger[400]};
        }
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
  SettingIcon: styled(PiGear)`
    color: ${({ theme }) => theme.colorV2.blue[1]} !important;

    &:hover {
      color: ${({ theme }) => theme.colorV2.purple[1]} !important;
    }
  `,
  PanelIcon: styled(PiChalkboardTeacher)`
    color: ${({ theme }) => theme.colorV2.blue[1]} !important;

    &:hover {
      color: ${({ theme }) => theme.colorV2.purple[1]} !important;
    }
  `,
  CloseSidebar: styled(PiCaretRight)`
    color: ${({ theme }) => theme.colorV2.blue[1]} !important;
  `,
  Button: styled.button`
    display: grid;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.colorV2.white};
    transition: background 0.2s ease;
    line-height: 36px;
    box-shadow: ${({ theme }) => theme.shadow[300]};

    svg {
      color: ${({ theme }) => theme.colorV2.gray[1]};
    }

    &:hover {
      background: ${({ theme }) => theme.colorV2.gray[2]};

      svg {
        color: ${({ theme }) => theme.colorV2.purple[1]};
      }
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
    top: 14px;
    left: 15px;
    border-radius: 50%;
    box-shadow: ${({ theme }) => theme.shadow[100]};
    width: 14px;
    height: 14px;
    img {
      border-radius: 50%;
      width: 14px;
      height: 14px;
    }
  `,
  TabsArea: styled.div`
    background: ${({ theme }) => theme.colorV2.white};
    border-radius: 8px;
    box-shadow: ${({ theme }) => theme.shadow[100]};
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

    &:hover {
      svg {
        color: ${({ theme }) => theme.colorV2.purple[1]};
      }
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
  `
}
