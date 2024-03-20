import { useRouter } from 'next/router'
import styled from 'styled-components'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'
import { formatNumberByLocale } from '../../services/format'
import { truncateWei } from '../../services/truncate'
import { Delegation } from '../../types/Delegation'
import EnsAvatar from '../shared/ens/EnsAvatar'
import EnsName from '../shared/ens/EnsName'
import chainConfig from '@/config/chain'

type StakeReceivedDelegationProps = {
  delegation: Delegation
  rank: number
}

export default function StakeReceivedDelegation({ delegation, rank }: StakeReceivedDelegationProps) {
  const { t } = useLocaleTranslation()
  const { locale } = useRouter()
  const { chainId } = chainConfig()
  return (
    <DelegationItem>
      <div>{rank}</div>
      <div>
        <EnsAvatar address={delegation.delegate.address} size={18} chainId={1} />
        <EnsName address={delegation.delegate.address} chainId={chainId} />
      </div>
      <div>
        <span>
          {`${formatNumberByLocale(truncateWei(delegation.delegationBalance, 6), locale)} `}
          <span>{t('lsd.symbol')}</span>
        </span>
      </div>
    </DelegationItem>
  )
}

export const { DelegationItem } = {
  DelegationItem: styled.div`
    display: grid;
    grid-template-columns: 0.4fr 1fr 0.7fr;
    align-items: center;
    gap: 16px;
    padding: 7px 8px;

    > div:nth-child(1) {
      color: ${({ theme }) => theme.colorV2.blue[1]};
    }

    > div:nth-child(2) {
      display: grid;
      grid-template-columns: 18px auto;
      align-items: center;
      gap: 8px;
    }

    > div:nth-child(3) {
      display: grid;
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.colorV2.purple[1]};
    }
  `
}
