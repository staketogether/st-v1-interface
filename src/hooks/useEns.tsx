import { useEffect, useState } from 'react'
import { useEnsAvatar, useEnsName } from 'wagmi'
import chainConfig from '../config/chain'

export default function useEns(address: `0x${string}`) {
  const { chainId } = chainConfig()

  const [name, setName] = useState<string | undefined>(undefined)
  const [avatar, setAvatar] = useState<string | undefined>(undefined)

  const ensAvatar = useEnsAvatar({
    address,
    chainId,
    cacheTime: 3000
  })

  const ensName = useEnsName({
    address,
    chainId,
    cacheTime: 3000
  })

  useEffect(() => {
    setAvatar(ensAvatar.data?.toString())
  }, [ensAvatar.data])

  useEffect(() => {
    setName(ensName.data?.toString())
  }, [ensName.data])

  return { address, name, avatar }
}
