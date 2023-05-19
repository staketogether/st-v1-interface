import { DoubleRightOutlined, LogoutOutlined } from '@ant-design/icons'
import { Drawer } from 'antd'

import { BigNumber } from 'ethers'
import styled from 'styled-components'
import { useDisconnect } from 'wagmi'
import { globalConfig } from '../../../config/global'
import useCethBalanceOf from '../../../hooks/contracts/useCethBalanceOf'
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
  const { cethBalance } = useCethBalanceOf(address)

  console.log('CETH', cethBalance.toString())
  console.log('TotalAmountSent', totalAmountSent.toString())

  const cethBalanceBN = BigNumber.from(cethBalance)
  const totalAmountSentBN = BigNumber.from(totalAmountSent)

  // Todo!: Fix Precision (Basis Points)
  const pnl = BigNumber.from(cethBalance).gt(0)
    ? cethBalanceBN.sub(totalAmountSentBN).mul(100).div(totalAmountSent)
    : BigNumber.from(0)

  console.log(`PNL: ${pnl.toString()} (${pnl.toString()}%)`)

  const rewards = BigNumber.from(cethBalance).gt(0)
    ? BigNumber.from(cethBalance).sub(BigNumber.from(totalAmountSent))
    : BigNumber.from(0)

  console.log('PNL', pnl.toString())

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
      <InfoHeader>
        <div>
          <span>PNL</span>
          {pnl.gt(0) && <span>{`⇡ ${pnl.toString()}`} %</span>}
          {pnl.eq(0) && <span>{`${pnl.toString()}`} %</span>}
          {pnl.lt(0) && <span>{`⇣ ${pnl.toString()}`} %</span>}
        </div>
        <div>
          <span>{t('balance')}</span>
          <span>
            {`${truncateEther(cethBalance.toString())}`} <span>{ceth.symbol}</span>
          </span>
        </div>
        <div>
          <span>Rewards</span>
          {rewards.gt(0) && (
            <span>
              {`⇡ ${truncateEther(rewards.toString())}`} <span>{ceth.symbol}</span>
            </span>
          )}
          {rewards.eq(0) && (
            <span>
              {` ${truncateEther(rewards.toString())}`} <span>{ceth.symbol}</span>
            </span>
          )}
          {rewards.lt(0) && (
            <span>
              {`⇣ ${truncateEther(rewards.toString())}`} <span>{ceth.symbol}</span>
            </span>
          )}
        </div>
        <div>
          <span>{t('delegated')}</span>
          <span>
            {`${truncateEther(totalAmountSent.toString())}`} <span>{ceth.symbol}</span>
          </span>
        </div>
        <div>
          <span>{t('delegations')}</span>
          <span>{totalDelegationsSent.toString()}</span>
        </div>
      </InfoHeader>
      <InfoContainer>
        {sentDelegations.map((sentDelegation, index) => (
          <div key={index}>
            <div>
              <div>
                <EnsAvatar address={sentDelegation.account} />
                <EnsName address={sentDelegation.account} />
              </div>
            </div>
            <span>
              {`${truncateEther(sentDelegation.amount.toString())}`}
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
  InfoHeader,
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
  InfoHeader: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[16]};
    div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      div {
        display: grid;
        grid-template-columns: 24px auto;
        justify-content: flex-start;
        gap: ${({ theme }) => theme.size[12]};

        span {
          color: ${({ theme }) => theme.color.black};
        }
      }

      span {
        display: flex;
        gap: ${({ theme }) => theme.size[4]};

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
        gap: ${({ theme }) => theme.size[12]};

        span {
          color: ${({ theme }) => theme.color.black};
        }
      }

      span {
        display: flex;
        gap: ${({ theme }) => theme.size[4]};

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
