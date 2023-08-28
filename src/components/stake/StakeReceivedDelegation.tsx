import { styled } from 'styled-components'
import useLocaleTranslation from '../../hooks/useLocaleTranslation'
import { truncateWei } from '../../services/truncate'
import { Delegation } from '../../types/Delegation'
import EnsAvatar from '../shared/ens/EnsAvatar'
import EnsName from '../shared/ens/EnsName'

type StakeReceivedDelegationProps = {
  delegation: Delegation
  rank: number
}

export default function StakeReceivedDelegation({ delegation, rank }: StakeReceivedDelegationProps) {
  const { t } = useLocaleTranslation()

  return (
    <DelegationItem>
      <div>{rank}</div>
      <div>
        <EnsAvatar address={delegation.delegate.address} />
        <EnsName address={delegation.delegate.address} />
      </div>
      <div>
        <span>
          {`${truncateWei(delegation.delegationBalance, 6)} `}
          <span>{t('lsd.symbol')}</span>
        </span>
      </div>
    </DelegationItem>
  )
}

export const { DelegationItem } = {
  DelegationItem: styled.div`
    display: grid;
    grid-template-columns: 16px 2fr auto;
    align-items: center;
    gap: 8px;

    > div:nth-child(2) {
      display: grid;
      grid-template-columns: 24px auto;
      align-items: center;
      gap: 8px;
    }

    > div:nth-child(3) {
      display: grid;
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.color.secondary};
    }
  `
}
