import { useEffect, useState } from 'react'
import getEns from '../services/getEns'

export default function useEns(address: `0x${string}`) {
  const [name, setName] = useState<string | undefined>(undefined)
  const [avatar, setAvatar] = useState<string | undefined>(undefined)

  useEffect(() => {
    const getEnsData = async () => {
      const ens = await getEns(address)

      setAvatar(ens.avatar)

      setName(ens.name)
    }

    getEnsData()
  }, [address])

  return { address, name, avatar }
}
