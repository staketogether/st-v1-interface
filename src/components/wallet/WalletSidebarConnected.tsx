import WalletSidebarActivities from '@/components/wallet/WalletSidebarActivities'
import WalletSidebarRewards from '@/components/wallet/WalletSidebarRewards'
import useConnectedAccount from '@/hooks/useConnectedAccount'
import useEns from '@/hooks/useEns'
import useWalletProviderImage from '@/hooks/useWalletProviderImage'
import ethIcon from '@assets/icons/eth-icon.svg'
import stIcon from '@assets/st-symbol.svg'
import { Drawer, notification } from 'antd'
import Image from 'next/image'
import { useState } from 'react'
import {
  AiOutlineBarChart,
  AiOutlineLineChart,
  AiOutlineLogout,
  AiOutlinePieChart,
  AiOutlineRight,
  AiOutlineSetting
} from 'react-icons/ai'
import { FiCopy } from 'react-icons/fi'
import styled from 'styled-components'
import { useDisconnect } from 'wagmi'
import useEthBalanceOf from '../../hooks/contracts/useEthBalanceOf'
import useStAccount from '../../hooks/subgraphs/useStAccount'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'
import useWalletSidebar from '../../hooks/useWalletSidebar'
import { capitalize, truncateAddress, truncateText, truncateWei } from '../../services/truncate'
import Tabs, { TabsItems } from '../shared/Tabs'
import EnsAvatar from '../shared/ens/EnsAvatar'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import WalletBuyEthModal from './WalletBuyEthModal'
import WalletSidebarPoolsDelegated from './WalletSidebarPoolsDelegated'
import WalletSidebarSettings from './WalletSidebarSettings'

type WalletSidebarConnectedProps = {
  address: `0x${string}`
}

export default function WalletSidebarConnected({ address }: WalletSidebarConnectedProps) {
  const [isSettingsActive, setIsSettingsActive] = useState(false)
  const { disconnect } = useDisconnect()
  const { t } = useLocaleTranslation()
  const { openSidebar, setOpenSidebar } = useWalletSidebar()

  const { balance: ethBalance, refetch } = useEthBalanceOf(address)
  const { name, nameLoading } = useEns(address)

  const { web3AuthUserInfo, walletConnected } = useConnectedAccount()

  const handleWalletProviderImage = useWalletProviderImage()

  const { accountDelegations, accountBalance, accountRewards, accountActivities } = useStAccount(address)

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

  const tab1: TabsItems[] = [
    {
      key: 'rewards',
      label: t('rewards'),
      icon: <AnalyticsIcon />,
      children: <WalletSidebarRewards accountRewards={accountRewards} />
    }
  ]

  const tab2: TabsItems[] = [
    {
      key: 'portfolio',
      label: t('portfolio'),
      icon: <PoolsIcon />,
      children: <WalletSidebarPoolsDelegated accountDelegations={accountDelegations} />
    }
  ]

  const tab3: TabsItems[] = [
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
      {isSettingsActive ? (
        <WalletSidebarSettings setIsSettingsActive={setIsSettingsActive} />
      ) : (
        <>
          <HeaderContainer>
            <HeaderUserContainer>
              <div>
                {web3AuthUserInfo && (
                  <span onClick={() => copyToClipboard(web3AuthUserInfo.email)}>
                    {truncateText(web3AuthUserInfo.email, 20)}
                  </span>
                )}
                {nameLoading && <SkeletonLoading width={140} height={14} />}
                {!nameLoading && name && !web3AuthUserInfo && (
                  <span onClick={() => copyToClipboard(name)}>{truncateText(name, 16)}</span>
                )}
                <span onClick={() => copyToClipboard(address)}>{truncateAddress(address)}</span>
              </div>
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
              <CopyIcon className='copy' />
            </HeaderUserContainer>
            <ClosedSidebarButton onClick={() => setOpenSidebar(false)}>
              <CloseSidebar fontSize={14} />
            </ClosedSidebarButton>
            <Actions>
              <Button onClick={() => setIsSettingsActive(true)}>
                <SettingIcon fontSize={16} />
              </Button>
              <Button onClick={() => disconnectWallet()}>
                <Logout fontSize={14} />
              </Button>
            </Actions>
          </HeaderContainer>
          <InfoContainer>
            <div>
              <LeftContainer>
                <Image src={ethIcon} width={24} height={24} alt='eth icon' />
                <div>
                  <h4>{t('availableToStake')}</h4>
                  <div>
                    <span>{truncateWei(ethBalance, 6)}</span>
                    <span>{t('eth.symbol')}</span>
                  </div>
                </div>
              </LeftContainer>
              <RightContainer>
                <div>
                  <h4>{t('invested')}</h4>
                  <div>
                    <span className='purple'>{truncateWei(accountBalance, 5)}</span>
                    <span className='purple'>{t('lsd.symbol')}</span>
                  </div>
                </div>
                <Image src={stIcon} width={24} height={24} alt={t('lsd.symbol')} />
              </RightContainer>
            </div>
          </InfoContainer>
          <TabsArea>
            <Tabs items={tab1} defaultActiveKey='rewards' gray />
          </TabsArea>
          <TabsArea>
            <Tabs items={tab2} defaultActiveKey='portfolio' gray />
          </TabsArea>
          <TabsArea>
            <Tabs items={tab3} defaultActiveKey='activity' gray />
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
  Actions,
  HeaderUserContainer,
  Web3AuthProfileImage,
  Web3AuthProfileContainer,
  WrapperWallet,
  CopyIcon,
  PoolsIcon,
  AnalyticsIcon,
  LeftContainer,
  RightContainer,
  ActivitiesIcon,
  TabsArea
} = {
  DrawerContainer: styled(Drawer)`
    background-color: ${({ theme }) => theme.colorV2.foreground} !important;

    .ant-drawer-header.ant-drawer-header-close-only {
      display: none;
    }

    .ant-drawer-body {
      width: calc(100vw - 80px);
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[24]};
      padding: ${({ theme }) => theme.size[24]};
      @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        width: 380px;
      }
    }
  `,
  HeaderContainer: styled.div`
    display: flex;
    justify-content: space-between;
    gap: ${({ theme }) => theme.size[16]};
  `,
  HeaderUserContainer: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.colorV2.white};
    border-radius: 8px;
    box-shadow: ${({ theme }) => theme.shadow[100]};
    padding: 0px ${({ theme }) => theme.size[12]};

    &:hover {
      background: ${({ theme }) => theme.colorV2.gray[4]};
      cursor: pointer;

      .copy {
        display: block;
        color: ${({ theme }) => theme.colorV2.blue[1]};
      }
    }
    > div {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[4]};
      span {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.size[4]};
        cursor: pointer;
        &:hover {
          svg {
            display: block;
          }
        }
      }
    }
  `,
  InfoContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
    background: ${({ theme }) => theme.colorV2.white};
    border-radius: 8px;
    box-shadow: ${({ theme }) => theme.shadow[100]};
    padding: 16px;
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `,
  LeftContainer: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[16]};

    img {
      box-shadow: ${({ theme }) => theme.shadow[300]};
      border-radius: 100%;
    }

    > div {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[4]};
      > div {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.size[4]};
      }
      h4 {
        font-size: 12px;

        font-weight: 400;
        color: ${({ theme }) => theme.color.blue[400]};
      }
      span {
        font-size: 14px;

        font-weight: 400;
        color: ${({ theme }) => theme.color.primary};

        &.purple {
          color: ${({ theme }) => theme.color.secondary};
        }
        &.negative {
          color: ${({ theme }) => theme.color.red[300]};
        }
        &.positive {
          color: ${({ theme }) => theme.color.green[500]};
        }
      }
    }
  `,
  RightContainer: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[16]};

    img {
      box-shadow: ${({ theme }) => theme.shadow[100]};
      border-radius: 100%;
    }

    > div {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[4]};
      align-items: end;

      > div {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.size[4]};
      }
      h4 {
        font-size: 12px;

        font-weight: 400;
        color: ${({ theme }) => theme.color.blue[400]};
      }
      span {
        font-size: 14px;

        font-weight: 400;
        color: ${({ theme }) => theme.color.primary};

        &.purple {
          color: ${({ theme }) => theme.color.secondary};
        }
        &.negative {
          color: ${({ theme }) => theme.color.red[300]};
        }
        &.positive {
          color: ${({ theme }) => theme.color.green[500]};
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
      svg {
        color: ${({ theme }) => theme.colorV2.purple[1]};
      }
    }
  `,
  SettingIcon: styled(AiOutlineSetting)`
    color: ${({ theme }) => theme.colorV2.blue[1]};

    &:hover {
      color: ${({ theme }) => theme.colorV2.purple[1]};
    }
  `,
  CloseSidebar: styled(AiOutlineRight)`
    color: ${({ theme }) => theme.colorV2.blue[1]};

    &:hover {
      color: ${({ theme }) => theme.colorV2.purple[1]};
    }
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
  Logout: styled(AiOutlineLogout)`
    color: ${({ theme }) => theme.color.primary};
  `,
  Actions: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.size[8]};
  `,
  Web3AuthProfileContainer: styled.div`
    position: relative;
  `,
  WrapperWallet: styled.div`
    position: absolute;
    top: 10px;
    left: 13px;
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
    font-size: ${({ theme }) => theme.font.size[12]};
    display: none;
    position: absolute;
    margin-left: 162px;
    color: ${({ theme }) => theme.colorV2.blue[1]};
  `,
  PoolsIcon: styled(AiOutlinePieChart)`
    font-size: 16px;
  `,
  AnalyticsIcon: styled(AiOutlineBarChart)`
    font-size: 16px;
  `,
  ActivitiesIcon: styled(AiOutlineLineChart)`
    font-size: 16px;
  `
}
