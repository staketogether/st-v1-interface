import { web3AuthInstanceVar } from '@/config/web3Auth'
import { Web3AuthUserInfo } from '@/types/Web3AuthUserInfo'
import { useReactiveVar } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

export default function useConnectedAccount() {
  const [web3AuthUserInfo, setWeb3AuthUserInfo] = useState<Web3AuthUserInfo | null>(null)
  const { address, isConnected, connector } = useAccount()
  const [account, setAccount] = useState<`0x${string}` | undefined>(undefined)
  const [accountIsConnected, setAccountIsConnected] = useState<boolean>(false)
  const [walletConnected, setWalletConnected] = useState('')
  const web3AuthInstance = useReactiveVar(web3AuthInstanceVar)

  useEffect(() => {
    const getUserInfo = async () => {
      if (connector && web3AuthInstance && web3AuthInstance.status === 'connected') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const user = await web3AuthInstance.getUserInfo()

        if (user) {
          setWeb3AuthUserInfo(user)
        }
      }
      if (connector && connector.name) {
        setWalletConnected(connector.name)
      }
    }
    getUserInfo()
  }, [connector, web3AuthInstance])

  useEffect(() => {
    setAccount(address)
  }, [address])

  useEffect(() => {
    setAccountIsConnected(isConnected)
  }, [isConnected])

  return { account, accountIsConnected, web3AuthUserInfo, walletConnected }
}
