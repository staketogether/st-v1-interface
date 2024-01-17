import appleIcon from '@assets/icons/wallets/Apple.svg'
import coinbase from '@assets/icons/wallets/CoinbaseWallet.svg'
import facebook from '@assets/icons/wallets/Facebook.svg'
import google from '@assets/icons/wallets/Google.svg'
import metamask from '@assets/icons/wallets/Metamask.svg'
import rabby from '@assets/icons/wallets/Rabby.svg'
import walletConnect from '@assets/icons/wallets/WalletConnect.svg'
import Image from 'next/image'

export default function useWalletProviderImage() {
  const handleWalletProviderImage = (walletName: string, size = 28) => {
    switch (walletName) {
      case 'MetaMask':
        return <Image src={metamask} alt={'metamask'} width={size} height={size} />
      case 'Rabby':
        return <Image src={rabby} alt={'rabby'} width={size} height={size} />
      case 'WalletConnect':
        return <Image src={walletConnect} alt={'walletConnect'} width={size} height={size} />
      case 'Coinbase Wallet':
        return <Image src={coinbase} alt={'coinbase'} width={size} height={size} />
      case 'Facebook':
        return <Image src={facebook} alt={'facebook'} width={size} height={size} />
      case 'Google':
        return <Image src={google} alt={'google'} width={size} height={size} />
      case 'Apple':
        return <Image src={appleIcon} alt={'apple'} width={size} height={size} />
      default:
        break
    }
  }
  return handleWalletProviderImage
}
