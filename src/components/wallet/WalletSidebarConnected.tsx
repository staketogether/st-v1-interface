import useConnectedAccount from '@/hooks/useConnectedAccount'
import useEns from '@/hooks/useEns'
import useWalletProviderImage from '@/hooks/useWalletProviderImage'
import { Drawer, Select, notification } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FiCopy } from 'react-icons/fi'
import {
  PiCaretRight,
  PiChalkboardTeacher,
  PiChartBar,
  PiChartLine,
  PiChartPieSlice,
  PiGear,
  PiSignOut,
  PiWallet
} from 'react-icons/pi'
import styled from 'styled-components'
import { useAccount, useDisconnect } from 'wagmi'
import useEthBalanceOf from '../../hooks/contracts/useEthBalanceOf'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'
import useWalletSidebar from '../../hooks/useWalletSidebar'
import { formatNumberByLocale } from '../../services/format'
import { capitalize, truncateAddress, truncateText, truncateWei } from '../../services/truncate'
import useStAccount from './hooks/useStAccount'

import useVerifyWallet from '@/hooks/contentful/useVerifyWallet'
import useStwEthBalance from '@/hooks/contracts/useStwEthBalance'
import PanelWalletSidebarPanel from '../project/panel/PanelWalletSidebarPanel'
import Card from '../shared/Card'
import EnsAvatar from '../shared/ens/EnsAvatar'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import UpdateDelegationsModal from '../update-delegations/UpdateDelegationsModal'

import chainConfig from '@/config/chain'
import { getProductAssetByName } from '@/config/product-asset'
import { productStakingList } from '@/config/product-staking'
import { web3AuthInstanceVar } from '@/config/web3Auth'
import useCoinConversion from '@/hooks/useCoinConversion'
import { ProductStakingName } from '@/types/ProductStaking'
import { useReactiveVar } from '@apollo/client'
import { mainnet, optimism } from 'wagmi/chains'
import AssetIcon from '../shared/AssetIcon'
import Withdrawals from '../shared/Withdrawals'
import TokenStakingIcons from '../tokens/components/TokensStakingIcons'
import WalletSidebarSettings from './WalletSidebarSettings'
import WalletSidebarTabsContainer from './WalletSidebarTabsContainer'
import WalletSidebarWeb3AuthWalletSettings from './WalletSidebarWeb3AuthSettings'

type WalletSidebarConnectedProps = {
  address: `0x${string}`
}

export default function WalletSidebarConnected({ address }: WalletSidebarConnectedProps) {
  const [isSettingsActive, setIsSettingsActive] = useState(false)
  const [isPanelActive, setIsPanelActive] = useState(false)
  const [isWeb3AuthSettingsActive, setIsWeb3AuthSettingsActive] = useState(false)
  const [tabActivated, setTabActivated] = useState<'delegations' | 'rewards' | 'activity'>('delegations')
  const [productTabSelected, setProductTabSelected] = useState<ProductStakingName>('ethereum-stake')

  const { userCanViewPanel, verifyWalletLoading } = useVerifyWallet(address)
  const { connector } = useAccount()
  const showWalletSidebarWeb3AuthSettings = connector && connector.id === 'web3auth'
  const { disconnect } = useDisconnect()
  const { t } = useLocaleTranslation()
  const { openSidebar, setOpenSidebar } = useWalletSidebar()
  const { locale } = useRouter()

  const { balance: ethBalance } = useEthBalanceOf({ walletAddress: address, chainId: mainnet.id })
  const formattedEthBalance = formatNumberByLocale(truncateWei(ethBalance, 6), locale)
  const { priceConvertedValue: usdEthBalance } = useCoinConversion(formattedEthBalance)
  const { balance: optimistEthBalance } = useEthBalanceOf({
    walletAddress: address,
    chainId: optimism.id
  })
  const configWbtcOptimist = getProductAssetByName({ productName: 'btc' })
  const { balance: optimistWbtcBalance } = useEthBalanceOf({
    walletAddress: address,
    chainId: optimism.id,
    token: configWbtcOptimist.contract
  })
  const formattedOptimistEthBalance = formatNumberByLocale(truncateWei(optimistEthBalance, 6), locale)
  const formattedOptimistWbtcBalance = formatNumberByLocale(truncateWei(optimistWbtcBalance, 6), locale)
  const { priceConvertedValue: usdOptimismEthBalance } = useCoinConversion(formattedOptimistEthBalance)
  const { priceConvertedValue: usdOptimismWbtcBalance } = useCoinConversion(formattedOptimistWbtcBalance)
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
    // accountProfitPercentage: stakeAccountProfitPercentage,
    accountIsLoading: stakeAccountIsLoading,
    accountShare: stakeAccountShare
  } = useStAccount({ address: address, productName: 'ethereum-stake', chainId: mainnet.id })
  const stpETHAccountBalance = truncateWei(stakeAccountBalance, 6)

  const { priceConvertedValue: usdStpETHBalance } = useCoinConversion(stpETHAccountBalance)

  const {
    accountDelegations: restakingAccountDelegations,
    accountBalance: restakingAccountBalance,
    accountRewards: restakingAccountRewards,
    accountActivities: restakingAccountActivities,
    // accountProfitPercentage: restakingAccountProfitPercentage,
    accountIsLoading: restakingAccountIsLoading,
    accountShare: restakingAccountShare
  } = useStAccount({ address: address, productName: 'ethereum-restaking', chainId: optimism.id })
  const stpRETHAccountBalance = formatNumberByLocale(truncateWei(restakingAccountBalance, 5), locale)
  const { priceConvertedValue: usdStpRETHBalance } = useCoinConversion(stpRETHAccountBalance)

  const stAccount = {
    'ethereum-stake': {
      accountDelegations: stakeAccountDelegations,
      accountBalance: stakeAccountBalance,
      accountRewards: stakeAccountRewards,
      accountActivities: stakeAccountActivities,
      // accountProfitPercentage: stakeAccountProfitPercentage,
      accountIsLoading: stakeAccountIsLoading,
      accountShare: stakeAccountShare
    },
    'ethereum-restaking': {
      accountDelegations: restakingAccountDelegations,
      accountBalance: restakingAccountBalance,
      accountRewards: restakingAccountRewards,
      accountActivities: restakingAccountActivities,
      // accountProfitPercentage: restakingAccountProfitPercentage,
      accountIsLoading: restakingAccountIsLoading,
      accountShare: restakingAccountShare
    }
  }

  const { accountDelegations, accountRewards, accountActivities, accountShare } =
    stAccount[productTabSelected as 'ethereum-stake' | 'ethereum-restaking']

  const totalBalance =
    BigInt(stakeAccountBalance) +
    BigInt(restakingAccountBalance) +
    BigInt(ethBalance) +
    BigInt(optimistEthBalance) +
    BigInt(optimistWbtcBalance)
  const value = truncateWei(totalBalance, 4)
  const { priceConvertedValue: usdTotalBalance } = useCoinConversion(value)

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

  const products = productStakingList.filter(product => product.enabled)

  const selectProductOptions = products.map(product => {
    return {
      value: product.name,
      label: (
        <ProductSelectCard>
          <TokenStakingIcons stakingProduct={product.name} size={24} />
          <span>{t(`v2.products.${product.name}`)}</span>
        </ProductSelectCard>
      )
    }
  })

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
      {isPanelActive && !isSettingsActive && !isWeb3AuthSettingsActive && (
        <PanelWalletSidebarPanel setIsPanelActive={setIsPanelActive} />
      )}
      {!isSettingsActive && !isPanelActive && isWeb3AuthSettingsActive && (
        <WalletSidebarWeb3AuthWalletSettings
          setWeb3authWalletActive={setIsWeb3AuthSettingsActive}
          walletAddress={address}
        />
      )}
      {!isSettingsActive && !isPanelActive && !isWeb3AuthSettingsActive && (
        <>
          <HeaderContainer>
            <HeaderUserContainer>
              <Web3AuthProfileContainer>
                {web3AuthUserInfo && web3AuthUserInfo.typeOfLogin && web3AuthUserInfo.profileImage ? (
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
                    <EnsAvatar address={address} size={24} chainId={chainId} />
                  </>
                )}
              </Web3AuthProfileContainer>
              <div>
                {web3AuthUserInfo && web3AuthUserInfo.email && (
                  <WalletAddressContainer>
                    <span onClick={() => web3AuthUserInfo?.email && copyToClipboard(web3AuthUserInfo.email)}>
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
            <span>{usdTotalBalance}</span>
          </EstimatedBalanceContainer>
          <Card
            header={
              <AssetHeaderCard>
                <span>{t('assets')}</span>
                <span>{t('balance')}</span>
              </AssetHeaderCard>
            }
          >
            <AssetsCard>
              <BalanceContainer>
                <div>
                  <div>
                    <AssetIcon assetIcon='ethereum' networkIcon='ethereum' size={24} />
                  </div>
                  <div>
                    <span>{` ${t('eth.symbol')}`}</span>
                    <span>Ethereum</span>
                  </div>
                </div>
                <div>
                  <span>{formattedEthBalance}</span>
                  <span>{usdEthBalance}</span>
                </div>
              </BalanceContainer>
              <BalanceContainer>
                <div>
                  <div>
                    <AssetIcon assetIcon='ethereum' networkIcon='optimism' size={24} />
                  </div>
                  <div>
                    <span>{`${t('eth.symbol')}`}</span>
                    <span>Optimism</span>
                  </div>
                </div>
                <div>
                  <span>{formattedOptimistEthBalance}</span>
                  <span>{usdOptimismEthBalance}</span>
                </div>
              </BalanceContainer>
              <BalanceContainer>
                <div>
                  <div>
                    <AssetIcon assetIcon={configWbtcOptimist.symbol} networkIcon={configWbtcOptimist.networkAvailable} size={24} />
                  </div>
                  <div>
                    <span>{configWbtcOptimist.symbol}</span>
                    <span>{configWbtcOptimist.networkAvailable}</span>
                  </div>
                </div>
                <div>
                  <span>{formattedOptimistWbtcBalance}</span>
                  <span>{usdOptimismWbtcBalance}</span>
                </div>
              </BalanceContainer>
            </AssetsCard>
          </Card>
          <Card
            header={
              <AssetInvestmentCard>
                <span>{t('investments')}</span>
                <span>{t('rewards')}</span>
                <span>{t('invested')}</span>
              </AssetInvestmentCard>
            }
          >
            <AssetsCard>
              <BalanceInvestmentContainer>
                <div>
                  <div>
                    <AssetIcon assetIcon='stpETH' networkIcon='ethereum' size={24} />
                  </div>
                  <div>
                    <span>{`stpETH`}</span>
                    <span>Ethereum</span>
                  </div>
                </div>
                <div> - </div>
                <div>
                  <span>{stpETHAccountBalance}</span>
                  <span>{usdStpETHBalance}</span>
                </div>
              </BalanceInvestmentContainer>
              <BalanceInvestmentContainer>
                <div>
                  <div>
                    <AssetIcon assetIcon='strETH' networkIcon='optimism' size={24} />
                  </div>
                  <div>
                    <span>{`stpRETH`}</span>
                    <span>Restaking</span>
                  </div>
                </div>
                <div> - </div>
                <div>
                  <span>{stpRETHAccountBalance}</span>
                  <span>{usdStpRETHBalance}</span>
                </div>
              </BalanceInvestmentContainer>
            </AssetsCard>
          </Card>

          <Card
            header={
              <HeaderTabContainer>
                <div>
                  <span>{t('selectProduct')}</span>
                  <Select
                    defaultValue='ethereum-stake'
                    style={{ width: '100%', height: '40px' }}
                    onChange={e => setProductTabSelected(e as 'ethereum-stake' | 'ethereum-restaking')}
                    options={selectProductOptions}
                  />
                </div>
                <HeaderTabHeader>
                  <div
                    onClick={() => setTabActivated('delegations')}
                    className={`${tabActivated === 'delegations' && 'activated'} `}
                  >
                    <PoolsIcon />
                    <span>{t('delegations')}</span>
                  </div>
                  <div
                    onClick={() => setTabActivated('rewards')}
                    className={`${tabActivated === 'rewards' && 'activated'} `}
                  >
                    <AnalyticsIcon />
                    <span>{t('rewards')}</span>
                  </div>
                  <div
                    onClick={() => setTabActivated('activity')}
                    className={`${tabActivated === 'activity' && 'activated'} `}
                  >
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
              productSelected={productTabSelected}
            />
          </Card>

          {stwETHBalance > 0n && (
            <Withdrawals balance={stwETHBalance} accountAddress={address} refetchBalance={stwETHRefetch} />
          )}
        </>
      )}
      <UpdateDelegationsModal
        accountDelegations={accountDelegations}
        accountTotalShares={accountShare}
        userAccount={address}
        productSelected={productTabSelected}
      />
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

  BalanceInvestmentContainer,
  SettingIcon,
  WalletIcon,
  PanelIcon,
  Actions,
  HeaderUserContainer,
  Web3AuthProfileImage,
  Web3AuthProfileContainer,
  WrapperWallet,
  CopyIcon,
  PoolsIcon,
  AnalyticsIcon,
  ProductSelectCard,
  ActivitiesIcon,
  SidebarButton,
  WalletAddressContainer,
  AssetInvestmentCard,
  BalanceContainer,
  AssetHeaderCard,
  EstimatedBalanceContainer,
  HeaderTabHeader,
  AssetsCard
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

    background: ${({ theme }) => theme.colorV2.blue[1]};
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
  WalletIcon: styled(PiWallet)`
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
  SidebarButton: styled.button`
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
    color: ${({ theme }) => theme.color.white};
    svg {
      color: ${({ theme }) => theme.color.foreground};
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

  AssetHeaderCard: styled.div`
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 8px;

    border-bottom: 1px solid ${({ theme }) => theme.colorV2.gray[2]};
    border-radius: 8px 8px 0 0;

    span {
      font-weight: 400;
      font-size: ${({ theme }) => theme.font.size[13]};
      color: ${({ theme }) => theme.colorV2.gray[1]};
      opacity: 0.6;
    }
  `,
  AssetsCard: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[16]};
  `,
  BalanceContainer: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      &:nth-child(1) {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.size[8]};

        > div {
          display: flex;
          flex-direction: column;

          span {
            text-align: start;
            &:nth-child(1) {
              font-size: ${({ theme }) => theme.font.size[13]};
              color: ${({ theme }) => theme.colorV2.gray[1]};
            }
            &:nth-child(2) {
              font-size: ${({ theme }) => theme.font.size[12]};
              color: ${({ theme }) => theme.colorV2.gray[1]};
              opacity: 0.8;
            }
          }
        }
      }
      &:nth-child(2) {
        display: flex;
        flex-direction: column;
        span {
          text-align: end;
          &:nth-child(1) {
            font-size: ${({ theme }) => theme.font.size[13]};
            color: ${({ theme }) => theme.colorV2.purple[1]};
          }
          &:nth-child(2) {
            font-size: ${({ theme }) => theme.font.size[12]};
            color: ${({ theme }) => theme.colorV2.gray[1]};
            opacity: 0.8;
          }
        }
      }
    }
  `,
  AssetInvestmentCard: styled.div`
    width: 100%;
    height: 32px;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 0px 8px;

    border-bottom: 1px solid ${({ theme }) => theme.colorV2.gray[2]};
    border-radius: 8px 8px 0 0;

    span {
      font-weight: 400;
      font-size: ${({ theme }) => theme.font.size[13]};
      color: ${({ theme }) => theme.colorV2.gray[1]};
      opacity: 0.6;
      &:last-child {
        text-align: end;
      }
      &:nth-child(2) {
        text-align: center;
      }
    }
  `,
  BalanceInvestmentContainer: styled.div`
    width: 100%;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr;
    > div {
      &:nth-child(1) {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.size[8]};

        > div {
          display: flex;
          flex-direction: column;

          span {
            text-align: start;
            &:nth-child(1) {
              font-size: ${({ theme }) => theme.font.size[13]};
              color: ${({ theme }) => theme.colorV2.gray[1]};
            }
            &:nth-child(2) {
              font-size: ${({ theme }) => theme.font.size[12]};
              color: ${({ theme }) => theme.colorV2.gray[1]};
              opacity: 0.8;
            }
          }
        }
      }
      &:nth-child(2) {
        text-align: center;

        font-size: ${({ theme }) => theme.font.size[13]};
        color: ${({ theme }) => theme.color.green[500]};
      }
      &:nth-child(3) {
        display: flex;
        flex-direction: column;
        span {
          text-align: end;
          &:nth-child(1) {
            font-size: ${({ theme }) => theme.font.size[13]};
            color: ${({ theme }) => theme.colorV2.purple[1]};
          }
          &:nth-child(2) {
            font-size: ${({ theme }) => theme.font.size[12]};
            color: ${({ theme }) => theme.colorV2.gray[1]};
            opacity: 0.8;
          }
        }
      }
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
    height: 32px;
    min-height: 32px;
    padding: 0px 8px;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
    align-self: stretch;
    border-radius: 8px;
    background: ${({ theme }) => theme.colorV2.white};

    box-shadow: ${({ theme }) => theme.shadow[100]};

    span {
      &:nth-child(1) {
        color: ${({ theme }) => theme.colorV2.gray[1]};
        font-size: ${({ theme }) => theme.font.size[13]};
        font-weight: 400;
        opacity: 0.6;
      }
      &:nth-child(2) {
        font-size: ${({ theme }) => theme.font.size[15]};
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
