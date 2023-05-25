import { DoubleRightOutlined, LogoutOutlined } from '@ant-design/icons'
import { Drawer } from 'antd'

import styled from 'styled-components'
import { useDisconnect } from 'wagmi'
import { globalConfig } from '../../../config/global'

import useStAccount from '../../../hooks/subgraphs/useStAccount'
import useTranslation from '../../../hooks/useTranslation'
import useWalletSidebar from '../../../hooks/useWalletSidebar'
import { truncateEther } from '../../../services/truncateEther'
import EnsAvatar from '../ens/EnsAvatar'
import EnsName from '../ens/EnsName'
import WalletConnectedButton from './WalletConnectedButton'

export type WalletSidebarProps = {
  address: `0x${string}`
}

export default function WalletSidebar({ address }: WalletSidebarProps) {
  const { ceth } = globalConfig
  const { disconnect } = useDisconnect()
  const { t } = useTranslation()

  const { openSidebar, setOpenSidebar } = useWalletSidebar()

  const accountRewards = '0'

  const { account, accountDelegatedAmount, accountTotalDelegates } = useStAccount(address)

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
      <HeaderContainer>
        <ClosedSidebarButton onClick={() => setOpenSidebar(false)}>
          <CloseSidebar />
        </ClosedSidebarButton>
        <WalletConnectedButton address={address} />
        <LogoutButton onClick={() => disconnectWallet()}>
          <Logout />
        </LogoutButton>
      </HeaderContainer>
      <InfoContainer>
        <div>
          <span>{t('rewards')}</span>
          <span>
            {truncateEther(accountRewards)} <span>{ceth.symbol}</span>
          </span>
        </div>
        <div>
          <span>{t('delegated')}</span>
          <span>
            {`${truncateEther(accountDelegatedAmount)}`} <span>{ceth.symbol}</span>
          </span>
        </div>
        <div>
          <span>{t('delegations')}</span>
          <span>{accountTotalDelegates}</span>
        </div>
      </InfoContainer>
      <InfoContainer>
        {account?.delegates.map((delegate, index) => (
          <div key={index}>
            <div>
              <div>
                <EnsAvatar address={delegate.delegated.address} />
                <EnsName address={delegate.delegated.address} />
              </div>
            </div>
            <span>
              {`${truncateEther(delegate.delegated.delegatedAmount.toString())}`}
              <span>{ceth.symbol}</span>
            </span>
          </div>
        ))}
      </InfoContainer>
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
  LogoutButton
} = {
  DrawerContainer: styled(Drawer)`
    background-color: ${({ theme }) => theme.color.whiteAlpha[700]} !important;
    .ant-drawer-header.ant-drawer-header-close-only {
      display: none;
    }
    .ant-drawer-body {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[24]};
    }
  `,
  HeaderContainer: styled.div`
    display: grid;
    grid-template-columns: auto 32px;
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

    &:last-of-type {
      padding-top: ${({ theme }) => theme.size[24]};
      border-top: 1px solid ${({ theme }) => theme.color.blue[100]};
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

    &:hover {
      background: ${({ theme }) => theme.color.whiteAlpha[900]};
    }
  `,
  CloseSidebar: styled(DoubleRightOutlined)`
    color: ${({ theme }) => theme.color.primary};
  `,
  LogoutButton: styled.button`
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: ${({ theme }) => theme.size[16]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background: ${({ theme }) => theme.color.whiteAlpha[700]};
    transition: background 0.2s ease;

    &:hover {
      background: ${({ theme }) => theme.color.whiteAlpha[900]};
    }
  `,
  Logout: styled(LogoutOutlined)`
    color: ${({ theme }) => theme.color.primary};
  `
}
