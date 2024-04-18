import { truncateAddress, truncateText } from '@/services/truncate'
import { Web3AuthUserInfo } from '@/types/Web3AuthUserInfo'
import SkeletonLoading from '../shared/icons/SkeletonLoading'

type WalletNameProps = {
  walletAddress: `0x${string}`
  web3AuthUserInfo: Web3AuthUserInfo | null
  ensName: string | undefined
  ensLoading: boolean
  className?: string
}

function WalletName({ className, walletAddress, web3AuthUserInfo, ensName, ensLoading }: WalletNameProps) {
  return (
    <>
      {web3AuthUserInfo?.email && <span className={className}>{truncateText(web3AuthUserInfo.email, 15)}</span>}
      {!web3AuthUserInfo && ensLoading && <SkeletonLoading width={100} height={14} />}
      {!web3AuthUserInfo && !ensLoading && ensName && <span className={className}>{truncateText(ensName, 16)}</span>}
      {!web3AuthUserInfo && !ensLoading && !ensName && <span className={className}>{truncateAddress(walletAddress)}</span>}
    </>
  )
}

export default WalletName
