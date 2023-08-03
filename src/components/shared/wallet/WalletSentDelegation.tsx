import Link from 'next/link'
import styled from 'styled-components'
import useTranslation from '../../../hooks/useTranslation'
import { truncateWei } from '../../../services/truncate'
import { Delegation } from '../../../types/Delegation'
import EnsAvatar from '../ens/EnsAvatar'
import EnsName from '../ens/EnsName'
import useWalletSidebar from '@/hooks/useWalletSidebar'

type WalletSentDelegationProps = {
  delegation: Delegation
}

export default function WalletSentDelegation({ delegation }: WalletSentDelegationProps) {
  const { t } = useTranslation()

  const { setOpenSidebar } = useWalletSidebar()

  return (
    <Container href={`/stake/deposit/${delegation.delegated.address}`} onClick={() => setOpenSidebar(false)}>
      <div>
        <div>
          <EnsAvatar address={delegation.delegated.address} />
          <EnsName address={delegation.delegated.address} />
        </div>
      </div>
      <span>
        {truncateWei(delegation.delegationBalance, 6)}
        <span>{t('lsd.symbol')}</span>
      </span>
    </Container>
  )
}

const { Container } = {
  Container: styled(Link)`
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    border-radius: ${({ theme }) => theme.size[16]};
    transition: background-color 0.1s ease;

    > div {
      display: flex;
      > div {
        display: flex;
        gap: ${({ theme }) => theme.size[8]};
      }

      > span {
        color: ${({ theme }) => theme.color.black};
      }
    }

    > span {
      display: flex;
      gap: ${({ theme }) => theme.size[4]};
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.color.primary};

      > span {
        color: ${({ theme }) => theme.color.secondary};
      }
    }

    &:hover {
      background-color: ${({ theme }) => theme.color.whiteAlpha[800]};
    }
  `
}
