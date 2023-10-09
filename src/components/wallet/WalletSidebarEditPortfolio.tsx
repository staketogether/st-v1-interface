import useContentfulPoolsList from '@/hooks/contentful/useContentfulPoolsList'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import useWalletSidebarEditPortfolio from '@/hooks/useWalletSidebarEditPortfolio'
import { Delegation } from '@/types/Delegation'
import { Drawer } from 'antd'
import styled from 'styled-components'
import CommunityLogo from '../shared/community/CommunityLogo'
import CommunityName from '../shared/community/CommunityName'
import { formatNumberByLocale } from '@/services/format'
import { truncateWei } from '@/services/truncate'
import { useRouter } from 'next/router'
import Card from '../shared/Card'
import { PiChartPieSlice } from 'react-icons/pi'

type WalletSidebarEditPortfolioProps = {
  accountDelegations: Delegation[]
}

export default function WalletSidebarEditPortfolio({ accountDelegations }: WalletSidebarEditPortfolioProps) {
  const { t } = useLocaleTranslation()
  const { locale } = useRouter()

  const { openSidebar, setOpenSidebar } = useWalletSidebarEditPortfolio()
  const { poolsList, isLoading } = useContentfulPoolsList()

  const handleMetadataPools = (address: `0x${string}`) => {
    return poolsList.find(pool => pool.wallet.toLowerCase() === address.toLocaleLowerCase())
  }

  return (
    <DrawerContainer
      placement='right'
      size='default'
      onClose={() => setOpenSidebar(false)}
      mask={true}
      open={openSidebar}
    >
      <Card title={t('portfolio')} icon={<PoolsIcon />}>
        {accountDelegations.map((delegation, index) => {
          const poolMetadata = handleMetadataPools(delegation.delegated.address)

          return (
            <DelegatedPool key={index}>
              <div>
                <Project>
                  <CommunityLogo
                    size={24}
                    src={poolMetadata?.logo.url}
                    alt={poolMetadata?.logo.fileName || ''}
                    loading={isLoading}
                    listed={!!poolMetadata}
                  />
                  {poolMetadata && poolMetadata.name ? (
                    <CommunityName name={poolMetadata.name} loading={isLoading} />
                  ) : (
                    <CommunityName walletAddress={delegation.delegated.address} loading={isLoading} />
                  )}
                </Project>
              </div>
              <div>
                {formatNumberByLocale(truncateWei(delegation.delegationBalance, 6), locale)}
                <span>{t('lsd.symbol')}</span>
              </div>
            </DelegatedPool>
          )
        })}
      </Card>
    </DrawerContainer>
  )
}

const { DrawerContainer, DelegatedPool, Project, PoolsIcon } = {
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
  DelegatedPool: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;

    padding: ${({ theme }) => theme.size[8]};
    border-radius: ${({ theme }) => theme.size[8]};
    transition: background-color 0.1s ease;

    &:hover {
      background: ${({ theme }) => theme.color.blackAlpha[100]};
    }

    > div {
      display: flex;
      color: ${({ theme }) => theme.colorV2.purple[1]};
      font-size: 13px;

      > div {
        display: flex;
        gap: ${({ theme }) => theme.size[8]};
      }

      > span {
        padding-left: 4px;
        color: ${({ theme }) => theme.colorV2.purple[1]};
      }
    }

    > span {
      display: flex;
      gap: ${({ theme }) => theme.size[4]};
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.color.secondary};
    }
  `,
  Project: styled.div`
    font-size: 13px;

    span {
      font-size: 13px;
    }
  `,
  PoolsIcon: styled(PiChartPieSlice)`
    font-size: 16px;
  `
}
