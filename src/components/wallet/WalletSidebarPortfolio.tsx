import useContentfulPoolsList from '@/hooks/contentful/useContentfulPoolsList'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import useWalletSidebar from '@/hooks/useWalletSidebar'
import useWalletSidebarEditPortfolio from '@/hooks/useWalletSidebarEditPortfolio'
import { truncateWei } from '@/services/truncate'
import { Delegation } from '@/types/Delegation'
import { ProductStaking } from '@/types/ProductStaking'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PiPen } from 'react-icons/pi'
import styled from 'styled-components'
import { formatNumberByLocale } from '../../services/format'
import Button from '../shared/Button'
import CommunityLogo from '../shared/community/CommunityLogo'
import CommunityName from '../shared/community/CommunityName'

type WalletSidebarPortfolioProps = {
  accountDelegations: Delegation[]
  product: ProductStaking
}

export default function WalletSidebarPortfolio({ accountDelegations, product }: WalletSidebarPortfolioProps) {
  const { t } = useLocaleTranslation()
  const { setOpenSidebar } = useWalletSidebar()
  const { query, locale } = useRouter()
  const { currency } = query as { currency: string }
  const { poolsList, isLoading } = useContentfulPoolsList()
  const { setOpenSidebar: setOpenSidebarEditPortfolio } = useWalletSidebarEditPortfolio()
  const handleMetadataPools = (address: `0x${string}`) => {
    return poolsList.find(pool => pool.wallet.toLowerCase() === address.toLocaleLowerCase())
  }
  const stakeTogetherPool = product.stakeTogetherPool['mainnet']

  return (
    <Container>
      {accountDelegations.length === 0 && (
        <EmptyContainer>
          <span>{t('noStake')}</span>
        </EmptyContainer>
      )}
      {accountDelegations.map((delegation, index) => {
        const poolMetadata = handleMetadataPools(delegation.delegated.address)
        const urlRedirect =
          stakeTogetherPool?.toLowerCase() === delegation.delegated.address.toLowerCase()
            ? `${product.urlRedirect}`
            : `${product.urlRedirect.replace('currency', currency)}?projectAddress=${delegation.delegated.address}`
        return (
          <DelegatedPool key={index} href={urlRedirect} onClick={() => setOpenSidebar(false)}>
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
              <span>{product.symbol}</span>
            </div>
          </DelegatedPool>
        )
      })}
      {accountDelegations.length > 0 && (
        <Button small={true} label={t('edit')} icon={<EditIcon />} block onClick={() => setOpenSidebarEditPortfolio(true)} />
      )}
    </Container>
  )
}
const { Container, DelegatedPool, EditIcon, EmptyContainer, Project } = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    div > span:nth-child(2) > span {
      color: ${({ theme }) => theme.color.secondary};
    }
  `,
  EmptyContainer: styled.div`
    font-size: 13px;
    padding: 8px;
    span {
      width: 100%;
      text-align: center;
    }
  `,
  DelegatedPool: styled(Link)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
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
  EditIcon: styled(PiPen)`
    font-size: 16px;
  `
}
