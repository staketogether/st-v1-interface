import appleIcon from '@assets/icons/wallets/Apple.svg'
import coinbase from '@assets/icons/wallets/CoinbaseWallet.svg'
import facebook from '@assets/icons/wallets/Facebook.svg'
import google from '@assets/icons/wallets/Google.svg'
import walletConnect from '@assets/icons/wallets/WalletConnect.svg'
import Image from 'next/image'

export default function useWalletProviderImage() {
  const safeLogo =
    'https://user-images.githubusercontent.com/3975770/212338977-5968eae5-bb1b-4e71-8f82-af5282564c66.png'
  const handleWalletProviderImage = (walletName: string, size = 28) => {
    switch (walletName) {
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
      case 'Safe':
        return <Image src={safeLogo} alt={'Safe'} width={size} height={size} />
      default:
        break
    }
  }
  return handleWalletProviderImage
}
