import styled from 'styled-components'
import usePooledEthByShares from '../../../hooks/usePooledEthByShares'
import useTranslation from '../../../hooks/useTranslation'
import { truncateEther } from '../../../services/truncateEther'
import { Delegation } from '../../../types/Delegation'
import EnsAvatar from '../ens/EnsAvatar'
import EnsName from '../ens/EnsName'

type WalletSentDelegationProps = {
  delegation: Delegation
}

export default function WalletSentDelegation({ delegation }: WalletSentDelegationProps) {
  const { t } = useTranslation()

  const { balance: delegationAmount } = usePooledEthByShares(delegation.delegationShares)

  return (
    <Container>
      <div>
        <div>
          <EnsAvatar address={delegation.delegated.address} />
          <EnsName address={delegation.delegated.address} />
        </div>
      </div>
      <span>
        {`${truncateEther(delegationAmount.toString(), 6)}`}
        <span>{t('lsd.symbol')}</span>
      </span>
    </Container>
  )
}

const { Container } = {
  Container: styled.div`
    display: flex;
    grid-template-columns: 1fr auto;

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
  `
}
