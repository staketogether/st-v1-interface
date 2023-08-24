import useConnectedAccount from '@/hooks/useConnectedAccount'
import useEns from '@/hooks/useEns'
import useWalletByEthModal from '@/hooks/useWalletByEthModal'
import useWalletProviderImage from '@/hooks/useWalletProviderImage'
import { Drawer, notification } from 'antd'
import Image from 'next/image'
import ethIcon from '@assets/icons/eth-icon.svg'
import stIcon from '@assets/icons/seth-icon.svg'
import { useState } from 'react'
import {
  AiOutlineBarChart,
  AiOutlineLineChart,
  AiOutlineLogout,
  AiOutlinePieChart,
  AiOutlineQuestionCircle,
  AiOutlineRight,
  AiOutlineSetting
} from 'react-icons/ai'
import { FiCopy } from 'react-icons/fi'
import styled from 'styled-components'
import { useDisconnect } from 'wagmi'
import useEthBalanceOf from '../../hooks/contracts/useEthBalanceOf'
import useStAccount from '../../hooks/subgraphs/useStAccount'
import useTranslation from '../../hooks/useTranslation'
import useWalletSidebar from '../../hooks/useWalletSidebar'
import { capitalize, truncateAddress, truncateText, truncateWei } from '../../services/truncate'
import Tabs, { TabsItems } from '../shared/Tabs'
import EnsAvatar from '../shared/ens/EnsAvatar'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import WalletBuyEthModal from './WalletBuyEthModal'
import WalletSidebarPoolsDelegated from './WalletSidebarPoolsDelegated'
import WalletSidebarSettings from './WalletSidebarSettings'
import WalletSidebarRewards from '@/components/wallet/WalletSidebarRewards'
import WalletSidebarActivities from '@/components/wallet/WalletSidebarActivities'

type WalletSidebarConnectedProps = {
  address: `0x${string}`
}

export default function WalletSidebarConnected({ address }: WalletSidebarConnectedProps) {
  const [isSettingsActive, setIsSettingsActive] = useState(false)
  const { disconnect } = useDisconnect()
  const { t } = useTranslation()
  const { openSidebar, setOpenSidebar } = useWalletSidebar()

  const { balance: ethBalance, refetch } = useEthBalanceOf(address)
  const { name, nameLoading } = useEns(address)

  const { web3AuthUserInfo, walletConnected } = useConnectedAccount()
  const handleWalletProviderImage = useWalletProviderImage()
  const { setOpenModal } = useWalletByEthModal()

  const { accountTotalRewards, accountDelegations, accountBalance, accountRewards, accountActivities } =
    useStAccount(address)

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

  const rewardsIsPositive = accountTotalRewards > 1n
  const rewardsIsNegative = accountTotalRewards < 0

  const onBuyEthIsSuccess = () => {
    refetch()
  }

  const tabsItems: TabsItems[] = [
    {
      key: 'pools',
      label: t('pools'),
      icon: <PoolsIcon />,
      children: <WalletSidebarPoolsDelegated accountDelegations={accountDelegations} />
    },
    {
      key: 'rewards',
      label: t('rewards'),
      icon: <AnalyticsIcon />,
      children: <WalletSidebarRewards accountRewards={accountRewards} />
    },
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
            <ClosedSidebarButton onClick={() => setOpenSidebar(false)}>
              <CloseSidebar fontSize={14} />
            </ClosedSidebarButton>
            <HeaderUserContainer>
              <Web3AuthProfileContainer>
                {web3AuthUserInfo && web3AuthUserInfo.profileImage ? (
                  <>
                    <Web3AuthProfileImage
                      src={web3AuthUserInfo.profileImage}
                      alt={t('stakeTogether')}
                      width={40}
                      height={40}
                    />
                    <WarperWallet>
                      {handleWalletProviderImage(capitalize(web3AuthUserInfo.typeOfLogin), 16)}
                    </WarperWallet>
                  </>
                ) : (
                  <>
                    <WarperWallet>{handleWalletProviderImage(walletConnected, 16)}</WarperWallet>
                    <EnsAvatar address={address} size={40} />
                  </>
                )}
              </Web3AuthProfileContainer>
              <div>
                {web3AuthUserInfo && (
                  <span onClick={() => copyToClipboard(web3AuthUserInfo.verifierId)}>
                    {truncateText(web3AuthUserInfo.verifierId, 20)}
                    <CopyIcon />
                  </span>
                )}
                {nameLoading && <SkeletonLoading width={140} height={14} />}
                {!nameLoading && name && !web3AuthUserInfo && (
                  <span onClick={() => copyToClipboard(name)}>
                    {truncateText(name, 16)} <CopyIcon />
                  </span>
                )}
                <span onClick={() => copyToClipboard(address)}>
                  {truncateAddress(address)} <CopyIcon />
                </span>
              </div>
            </HeaderUserContainer>
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
              <TokenContainer>
                <Image src={ethIcon} width={24} height={24} alt='eth icon' />
                <div>
                  <h4>{t('availableToStake')}</h4>
                  <div>
                    <span>{truncateWei(ethBalance, 6)}</span>
                    <span className='purple'>{t('eth.symbol')}</span>
                  </div>
                </div>
              </TokenContainer>
              <BuyCryptoButton onClick={() => setOpenModal(true)}>{t('buyEth.button')}</BuyCryptoButton>
            </div>
            <div>
              <TokenContainer>
                <Image src={stIcon} width={24} height={24} alt='eth icon' />
                <div>
                  <h4>{t('staked')}</h4>
                  <div>
                    <span>{truncateWei(accountBalance, 6)}</span>
                    <span className='purple'>{t('lsd.symbol')}</span>
                  </div>
                </div>
              </TokenContainer>
              <TokenContainer>
                <div>
                  <div>
                    <h4>{t('rewards')}</h4>
                    <QuestionIcon />
                  </div>
                  <div>
                    <span className={`${rewardsIsPositive && 'positive'} ${rewardsIsNegative && 'negative'}`}>
                      {accountTotalRewards > 0 ? truncateWei(accountTotalRewards, 6) : '0'}
                    </span>
                    <span className='purple'>{t('lsd.symbol')}</span>
                  </div>
                </div>
              </TokenContainer>
            </div>
          </InfoContainer>
          <Tabs items={tabsItems} size='small' defaultActiveKey='pools' />
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
  BuyCryptoButton,
  Web3AuthProfileImage,
  Web3AuthProfileContainer,
  WarperWallet,
  CopyIcon,
  PoolsIcon,
  AnalyticsIcon,
  TokenContainer,
  ActivitiesIcon,
  QuestionIcon
} = {
  DrawerContainer: styled(Drawer)`
    background-color: #ecedf7 !important;

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
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `,
  TokenContainer: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[16]};
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
        font-style: normal;
        font-weight: 400;
        color: ${({ theme }) => theme.color.blue[400]};
      }
      span {
        font-size: 16px;
        font-style: normal;
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
    border-radius: ${({ theme }) => theme.size[16]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background: ${({ theme }) => theme.color.whiteAlpha[700]};
    transition: background 0.2s ease;
    line-height: 36px;

    &:hover {
      background: ${({ theme }) => theme.color.whiteAlpha[900]};
    }
  `,
  SettingIcon: styled(AiOutlineSetting)`
    color: ${({ theme }) => theme.color.primary};
  `,
  CloseSidebar: styled(AiOutlineRight)`
    color: ${({ theme }) => theme.color.primary};
  `,
  Button: styled.button`
    display: grid;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: ${({ theme }) => theme.size[16]};
    background: transparent;
    transition: background 0.2s ease;
    line-height: 36px;

    &:hover {
      background: ${({ theme }) => theme.color.blackAlpha[200]};
      box-shadow: ${({ theme }) => theme.shadow[100]};
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
  BuyCryptoButton: styled.button`
    border: none;
    color: ${({ theme }) => theme.color.white};
    border-radius: ${props => props.theme.size[12]};

    background: ${({ theme }) => theme.color.primary};
    transition: background-color 0.2s ease;
    height: 32px;
    padding: 0px ${props => props.theme.size[12]};

    font-size: ${({ theme }) => theme.font.size[14]};

    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.size[8]};

    &:hover {
      background: ${({ theme }) => theme.color.blue[400]};
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }
  `,
  Web3AuthProfileContainer: styled.div`
    position: relative;
  `,
  WarperWallet: styled.div`
    position: absolute;
    top: 27px;
    left: 26px;
    border-radius: 50%;
    img {
      border-radius: 50%;
    }
  `,
  Web3AuthProfileImage: styled(Image)`
    border-radius: 50%;
  `,
  CopyIcon: styled(FiCopy)`
    font-size: ${({ theme }) => theme.font.size[12]};
    display: none;
  `,
  PoolsIcon: styled(AiOutlinePieChart)`
    font-size: 16px;
  `,
  AnalyticsIcon: styled(AiOutlineBarChart)`
    font-size: 16px;
  `,
  ActivitiesIcon: styled(AiOutlineLineChart)`
    font-size: 16px;
  `,
  QuestionIcon: styled(AiOutlineQuestionCircle)`
    font-size: 12px;
  `
}
