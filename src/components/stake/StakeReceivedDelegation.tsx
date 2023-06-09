import styled from 'styled-components'
import usePooledEthByShares from '../../hooks/usePooledEthByShares'
import useTranslation from '../../hooks/useTranslation'
import { truncateEther } from '../../services/truncateEther'
import { Delegation } from '../../types/Delegation'
import EnsAvatar from '../shared/ens/EnsAvatar'
import EnsName from '../shared/ens/EnsName'

type StakeReceivedDelegationProps = {
  delegation: Delegation
}

export default function StakeReceivedDelegation({ delegation }: StakeReceivedDelegationProps) {
  const { t } = useTranslation()

  const { balance: delegationAmount } = usePooledEthByShares(delegation.delegationShares)

  return (
    <DelegationItem>
      <div>
        <EnsAvatar address={delegation.delegate.address} />
        <EnsName address={delegation.delegate.address} />
      </div>
      <div>
        <span>
          {`${truncateEther(delegationAmount.toString(), 6)} `}
          <span>{t('lsd.symbol')}</span>
        </span>
      </div>
    </DelegationItem>
  )
}

export const { DelegationItem } = {
  DelegationItem: styled.div`
    display: grid;
    grid-template-columns: 2fr auto;
    align-items: center;
    gap: 8px;

    > div:nth-child(1) {
      display: grid;
      grid-template-columns: 24px auto;
      gap: 8px;
    }

    > div:nth-child(2) {
      display: grid;
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.color.primary};

      > span:nth-child(1) {
        > span {
          color: ${({ theme }) => theme.color.secondary};
        }
      }
    }
  `
}
