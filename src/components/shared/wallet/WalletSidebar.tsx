import { Drawer } from 'antd'
import { useState } from 'react'
import { AiFillCreditCard, AiOutlineLogout, AiOutlineRight, AiOutlineSetting } from 'react-icons/ai'
import styled from 'styled-components'
import { useDisconnect } from 'wagmi'
import useEthBalanceOf from '../../../hooks/contracts/useEthBalanceOf'
import useStAccount from '../../../hooks/subgraphs/useStAccount'
import useTranslation from '../../../hooks/useTranslation'
import useWalletSidebar from '../../../hooks/useWalletSidebar'
import { truncateAddress, truncateWei } from '../../../services/truncate'
import WalletSentDelegation from './WalletSentDelegation'
import WalletSlideBarSettings from './WalletSlideBarSettings'
import EnsAvatar from '../ens/EnsAvatar'
import EnsName from '../ens/EnsName'

type WalletSidebarProps = {
  address: `0x${string}`
}

export default function WalletSidebar({ address }: WalletSidebarProps) {
  const [isSettingsActive, setIsSettingsActive] = useState(false)
  const { disconnect } = useDisconnect()
  const { t } = useTranslation()
  const { openSidebar, setOpenSidebar } = useWalletSidebar()

  const { balance: ethBalance } = useEthBalanceOf(address)

  const { accountSentDelegationsCount, accountRewardsBalance, accountDelegations, accountBalance } =
    useStAccount(address)

  function disconnectWallet() {
    setOpenSidebar(false)
    disconnect()
  }

  const rewardsIsPositive = accountRewardsBalance > 0
  const rewardsIsNegative = accountRewardsBalance < 0

  return (
    <DrawerContainer
      placement='right'
      size='default'
      onClose={() => setOpenSidebar(false)}
      mask={true}
      open={openSidebar}
    >
      {isSettingsActive ? (
        <WalletSlideBarSettings setIsSettingsActive={setIsSettingsActive} />
      ) : (
        <>
          <HeaderContainer>
            <ClosedSidebarButton onClick={() => setOpenSidebar(false)}>
              <CloseSidebar fontSize={14} />
            </ClosedSidebarButton>
            <HeaderUserContainer>
              <EnsAvatar address={address} size={32} />
              <div>
                <EnsName address={address} slice={16} />
                <span>{truncateAddress(address)}</span>
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
            <ContainerData>
              <span>{t('rewards')}</span>
              <div>
                <span className={`${rewardsIsPositive && 'positive'} ${rewardsIsNegative && 'negative'}`}>
                  {accountRewardsBalance > 0 ? truncateWei(accountRewardsBalance, 6) : '0'}
                </span>
                <span className='symbol'>{t('lsd.symbol')}</span>
              </div>
            </ContainerData>
            <div>
              <ContainerData>
                <span>{`${t('sidebar.etherBalance')}`}</span>
                <div>
                  <span>{truncateWei(ethBalance, 6)}</span>
                  <span className='symbol'>{t('eth.symbol')}</span>
                </div>
              </ContainerData>
              <ContainerData>
                <span>{`${t('sidebar.stakedBalance')}`}</span>
                <div>
                  <span>{truncateWei(accountBalance, 6)}</span>
                  <span className='symbol'>{t('lsd.symbol')}</span>
                </div>
              </ContainerData>
            </div>
          </InfoContainer>
          <BuyCryptoButton disabled>
            <AiFillCreditCard />
            {t('BuyEth.button')}
          </BuyCryptoButton>
          <ContainerPoolsDelegated>
            <div>
              <span>{t('staked')}</span>
              <span>
                {accountSentDelegationsCount > 0 ? accountSentDelegationsCount.toString() : '0'}{' '}
                <span className='symbol'>{t('lsd.symbol')}</span>
              </span>
            </div>
            {accountDelegations.length === 0 && (
              <div>
                <span>{t('noStake')}</span>
              </div>
            )}
            {accountDelegations.map((delegation, index) => (
              <WalletSentDelegation key={index} delegation={delegation} />
            ))}
          </ContainerPoolsDelegated>
        </>
      )}
    </DrawerContainer>
  )
}

const {
  DrawerContainer,
  HeaderContainer,
  InfoContainer,
  ContainerData,
  CloseSidebar,
  ClosedSidebarButton,
  Logout,
  Button,
  SettingIcon,
  ContainerPoolsDelegated,
  Actions,
  HeaderUserContainer,
  BuyCryptoButton
} = {
  DrawerContainer: styled(Drawer)`
    background-color: ${({ theme }) => theme.color.whiteAlpha[900]} !important;

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
        width: 378px;
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
    }
  `,
  InfoContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[8]};
    > div {
      display: flex;
      gap: ${({ theme }) => theme.size[8]};
    }
  `,
  ContainerData: styled.div`
    height: 81px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[4]};
    background: ${({ theme }) => theme.color.whiteAlpha[800]};
    border-radius: ${({ theme }) => theme.size[12]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    > span:first-child {
      font-size: ${({ theme }) => theme.font.size[14]};
      font-weight: 300;
    }
    div {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[4]};
      > span:first-child {
        color: ${({ theme }) => theme.color.primary};
      }
      span {
        font-size: ${({ theme }) => theme.font.size[18]};
        &.symbol {
          color: ${({ theme }) => theme.color.secondary};
        }
        &.negative {
          color: ${({ theme }) => theme.color.red[300]};
        }
        &.positive {
          color: ${({ theme }) => theme.color.green[600]};
        }
      }
    }
  `,
  ContainerPoolsDelegated: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};

    > div:first-of-type {
      margin-bottom: ${({ theme }) => theme.size[8]};
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    div > span:nth-child(2) > span {
      color: ${({ theme }) => theme.color.secondary};
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
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background: ${({ theme }) => theme.color.whiteAlpha[700]};
    transition: background 0.2s ease;
    line-height: 36px;

    &:hover {
      background: ${({ theme }) => theme.color.whiteAlpha[900]};
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
    border-radius: ${props => props.theme.size[16]};
    background: ${({ theme }) => theme.color.blue[400]};
    transition: background-color 0.2s ease;
    height: 41px;

    font-size: ${({ theme }) => theme.font.size[14]};

    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.size[8]};

    &:hover {
      background: ${({ theme }) => theme.color.blue[600]};
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }
  `
}
