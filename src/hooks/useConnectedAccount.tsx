import { Web3AuthUserInfo } from '@/types/Web3AuthUserInfo'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

export default function useConnectedAccount() {
  const [web3AuthUserInfo, setWeb3AuthUserInfo] = useState<Web3AuthUserInfo | null>(null)
  const { address, isConnected, connector } = useAccount()
  const [account, setAccount] = useState<`0x${string}` | undefined>(undefined)
  const [accountIsConnected, setAccountIsConnected] = useState<boolean>(false)
  const [walletConnected, setWalletConnected] = useState('')

  useEffect(() => {
    const getUserInfo = async () => {
      if (
        connector &&
        connector.name === 'Web3Auth' &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        connector.web3AuthInstance &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        connector.web3AuthInstance.getUserInfo
      ) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const user = await connector.web3AuthInstance.getUserInfo()

        if (user) {
          setWeb3AuthUserInfo(user)
        }
      }
      if (connector && connector.name) {
        setWalletConnected(connector.name)
      }
    }
    getUserInfo()
  }, [connector])

  useEffect(() => {
    setAccount(address)
  }, [address])

  useEffect(() => {
    setAccountIsConnected(isConnected)
  }, [isConnected])

  return { account, accountIsConnected, web3AuthUserInfo, walletConnected }
}
