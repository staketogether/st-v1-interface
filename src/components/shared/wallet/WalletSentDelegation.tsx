import styled from 'styled-components'
import usePooledEthByShares from '../../../hooks/contracts/usePooledEthByShares'
import useTranslation from '../../../hooks/useTranslation'
import { truncateWei } from '../../../services/truncateEther'
import { Delegation } from '../../../types/Delegation'
import EnsAvatar from '../ens/EnsAvatar'
import EnsName from '../ens/EnsName'
import Link from 'next/link'
import { BigNumber } from 'ethers'

type WalletSentDelegationProps = {
  delegation: Delegation
}

export default function WalletSentDelegation({ delegation }: WalletSentDelegationProps) {
  const { t } = useTranslation()

  const { balance: delegationAmount } = usePooledEthByShares(BigNumber.from(delegation.delegationShares))

  return (
    <Container href={`/stake/deposit/${delegation.delegated.address}`}>
      <div>
        <div>
          <EnsAvatar address={delegation.delegated.address} />
          <EnsName address={delegation.delegated.address} />
        </div>
      </div>
      <span>
        {`${truncateWei(delegationAmount.toString(), 6)}`}
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
