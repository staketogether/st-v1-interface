import { makeVar, useReactiveVar } from '@apollo/client'
import { Web3AuthNoModal } from '@web3auth/no-modal'
import { useEffect } from 'react'

export const web3InstanceVar = makeVar<Web3AuthNoModal | null>(null)

export default function useWeb3AuthUserInfo() {
  const web3Instance = useReactiveVar(web3InstanceVar)

  useEffect(() => {
    const getUserInfo = async () => {
      console.log('na tela2', web3Instance)
      if (web3Instance) {
        console.log('na tela3')
        const user = await web3Instance.getUserInfo()
        console.log('user', user)
      }
    }
    getUserInfo()
  }, [web3Instance])
}
