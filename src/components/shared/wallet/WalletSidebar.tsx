import { DoubleRightOutlined, LogoutOutlined } from '@ant-design/icons'
import { Divider, Drawer } from 'antd'

import styled from 'styled-components'
import { useDisconnect } from 'wagmi'
import { globalConfig } from '../../../config/global'
import useSentDelegationsOf from '../../../hooks/contracts/useSentDelegationsOf'
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
  const { sentDelegations, totalAmountSent, totalDelegationsSent } = useSentDelegationsOf(address)

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
          <span>{t('staked')}</span>
          <span>{`${truncateEther(totalAmountSent.toString())} ${ceth.symbol}`}</span>
        </div>
        <div>
          <span>{t('delegations')}</span>
          <span>{totalDelegationsSent.toString()}</span>
        </div>
      </InfoContainer>
      <Divider style={{ margin: 0, border: '1px solid #B0B5F2' }} />
      <InfoContainer>
        {sentDelegations.map((sentDelegation, index) => (
          <div key={index}>
            <span>
              <div>
                <EnsAvatar address={sentDelegation.account} />
                <EnsName address={sentDelegation.account} />
              </div>
            </span>
            <span>{`${truncateEther(sentDelegation.amount.toString())} ${ceth.symbol}`}</span>
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
    .ant-drawer-header.ant-drawer-header-close-only {
      display: none;
    }
    .ant-drawer-body {
      padding: 32px 22px !important;
      display: flex;
      flex-direction: column;
      gap: 24px;
      background: rgba(255, 255, 255, 0.3);
      border: 1px solid #c3c3e4;
    }
  `,
  HeaderContainer: styled.div`
    display: grid;
    grid-template-columns: 32px auto 32px;
    gap: 16px;
  `,
  InfoContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        font-size: ${({ theme }) => theme.font.size[14]};
        color: ${({ theme }) => theme.color.blue[300]};
      }
    }
  `,
  ClosedSidebarButton: styled.button`
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: ${({ theme }) => theme.size[16]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background-color: ${({ theme }) => theme.color.white};
  `,
  CloseSidebar: styled(DoubleRightOutlined)`
    color: ${({ theme }) => theme.color.purple[600]};
  `,
  LogoutButton: styled.button`
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: ${({ theme }) => theme.size[16]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background-color: ${({ theme }) => theme.color.white};
  `,
  Logout: styled(LogoutOutlined)`
    color: ${({ theme }) => theme.color.purple[600]};
  `
}
