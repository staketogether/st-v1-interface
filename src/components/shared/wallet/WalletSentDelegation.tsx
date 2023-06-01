import usePooledEthByShares from '../../../hooks/contracts/usePooledEthByShares'
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

  const delegationAmount = usePooledEthByShares(delegation.delegationShares)

  return (
    <div>
      <div>
        <div>
          <EnsAvatar address={delegation.delegated.address} />
          <EnsName address={delegation.delegated.address} />
        </div>
      </div>
      <span>
        {`${truncateEther(delegationAmount.toString())}`}
        <span>{t('lsd.symbol')}</span>
      </span>
    </div>
  )
}
