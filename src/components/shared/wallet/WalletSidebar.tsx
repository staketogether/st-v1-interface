import { DoubleRightOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons'
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
import useCethBalanceOf from '@/hooks/contracts/useCethBalanceOf'

export type WalletSidebarProps = {
  address: `0x${string}`
}

export default function WalletSidebar({ address }: WalletSidebarProps) {
  const { ceth } = globalConfig
  const { disconnect } = useDisconnect()
  const { t } = useTranslation()
  const cethBalance = useCethBalanceOf(address)
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
        <WalletConnectedButton address={address} showBalance={false} />
        <div>
          <Button>
            <SettingOutlined />
          </Button>
          <Button onClick={() => disconnectWallet()}>
            <Logout />
          </Button>
        </div>
      </HeaderContainer>
      <InfoContainer>
        <div>
          <span>{t('balance')}</span>
          <span>
            {truncateEther(cethBalance)} <span>{ceth.symbol}</span>
          </span>
        </div>
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

      <ContainerCommunitiesDelegated>
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
      </ContainerCommunitiesDelegated>
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
  ContainerCommunitiesDelegated
} = {
  DrawerContainer: styled(Drawer)`
    background-color: ${({ theme }) => theme.color.whiteAlpha[700]} !important;

    .ant-drawer-header.ant-drawer-header-close-only {
      display: none;
    }

    .ant-drawer-body {
      width: 328px;
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[24]};
      padding: ${({ theme }) => theme.size[12]};
      @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
        width: 378px;
        padding: ${({ theme }) => theme.size[24]};
      }
    }
  `,
  HeaderContainer: styled.div`
    display: flex;
    align-items: center;
    > div {
      margin-left: auto;
      display: flex;
      gap: ${({ theme }) => theme.size[8]};
    }
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
      margin-top: ${({ theme }) => theme.size[24]};
      border-top: 1px solid ${({ theme }) => theme.color.blue[100]};
    }
  `,
  ContainerCommunitiesDelegated: styled.div`
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
  Button: styled.button`
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

    &:first-of-type {
      margin-left: auto;
    }
  `,
  Logout: styled(LogoutOutlined)`
    color: ${({ theme }) => theme.color.primary};
  `
}
