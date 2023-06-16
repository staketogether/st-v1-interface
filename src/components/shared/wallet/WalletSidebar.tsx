import { Drawer } from 'antd'
import { useState } from 'react'
import { AiOutlineLogout, AiOutlineRight, AiOutlineSetting } from 'react-icons/ai'
import styled from 'styled-components'
import { useDisconnect } from 'wagmi'
import useEthBalanceOf from '../../../hooks/contracts/useEthBalanceOf'
import useStAccount from '../../../hooks/subgraphs/useStAccount'
import useTranslation from '../../../hooks/useTranslation'
import useWalletSidebar from '../../../hooks/useWalletSidebar'
import { truncateEther } from '../../../services/truncateEther'
import WalletConnectedButton from './WalletConnectedButton'
import WalletSentDelegation from './WalletSentDelegation'
import WalletSlideBarSettings from './WalletSlideBarSettings'

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
            <WalletConnectedButton address={address} showBalance={false} />
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
              <span>{`${t('sidebar.etherBalance')}`}</span>
              <span>
                {truncateEther(ethBalance.toString(), 6)} <span>{t('eth.symbol')}</span>
              </span>
            </div>
            <div>
              <span>{`${t('sidebar.stakedBalance')}`}</span>
              <span>
                {truncateEther(accountBalance.toString(), 6)} <span>{t('lsd.symbol')}</span>
              </span>
            </div>
            <div>
              <span>{t('rewards')}</span>
              <span>
                {truncateEther(accountRewardsBalance.toString(), 6)} <span>{t('lsd.symbol')}</span>
              </span>
            </div>
          </InfoContainer>
          <ContainerPoolsDelegated>
            <div>
              <span>{t('delegations')}</span>
              <span>{accountSentDelegationsCount}</span>
            </div>
            {accountDelegations.length === 0 && (
              <div>
                <span>{t('noDelegations')}</span>
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
  CloseSidebar,
  ClosedSidebarButton,
  Logout,
  Button,
  SettingIcon,
  ContainerPoolsDelegated,
  Actions
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
  InfoContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};
    div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      div {
        display: grid;
        grid-template-columns: 24px auto;
        justify-content: flex-start;
        gap: ${({ theme }) => theme.size[8]};

        span {
          color: ${({ theme }) => theme.color.black};
        }
      }

      span {
        display: flex;
        gap: ${({ theme }) => theme.size[4]};
        font-size: ${({ theme }) => theme.font.size[14]};
        color: ${({ theme }) => theme.color.primary};

        > span {
          color: ${({ theme }) => theme.color.secondary};
        }
      }
    }

    &::after {
      content: '';
      margin-top: ${({ theme }) => theme.size[12]};
      border-top: 1px solid ${({ theme }) => theme.color.blue[100]};
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
  `
}
