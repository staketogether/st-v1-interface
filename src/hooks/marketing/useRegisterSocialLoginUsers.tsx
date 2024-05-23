import useConnectedAccount from '@/hooks/useConnectedAccount'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { globalConfig } from '@/config/global'

export default function useRegisterSocialLoginUsers() {
  const { web3AuthUserInfo } = useConnectedAccount()
  const [alreadySent, setAlreadySent] = useState(false)

  useEffect(() => {
    const registerSocialLoginUser = async () => {
      const url = `${globalConfig.backendUrl}/api/marketing/verify_email`;

      await axios.post(url, {
        email: web3AuthUserInfo?.email,
        name: web3AuthUserInfo?.name
      });

      setAlreadySent(true)
    }

    if (!web3AuthUserInfo || alreadySent) {
      return 
    }

    registerSocialLoginUser()
  }, [web3AuthUserInfo, alreadySent])
}