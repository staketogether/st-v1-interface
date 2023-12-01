import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useVerifyWallet(useWalletAddress: `0x${string}`) {
  const [userCanViewPanel, setUserCanViewPanel] = useState(false)
  const [verifyWalletLoading, setVerifyWalletLoading] = useState(false)
  useEffect(() => {
    const userCanViewPanel = async () => {
      try {
        setVerifyWalletLoading(true)
        const response = await axios.get(`/api/project/verifyWallet`, {
          params: {
            useWalletAddress
          }
        })
        setUserCanViewPanel(response.data)
        setVerifyWalletLoading(false)
      } catch (error) {
        setVerifyWalletLoading(false)
      }
    }
    userCanViewPanel()
  }, [useWalletAddress])

  return { userCanViewPanel, verifyWalletLoading }
}
