import { useEffect, useState } from 'react'
import { useEnsAvatar, useEnsName } from 'wagmi'
import chainConfig from '../config/chain'

export default function useEns(address: `0x${string}`) {
  const { chainId } = chainConfig()

  const [name, setName] = useState<string | undefined>(undefined)
  const [avatar, setAvatar] = useState<string | undefined>(undefined)

  const ensName = useEnsName({
    address,
    chainId,
    cacheTime: 60000
  })

  const ensAvatar = useEnsAvatar({
    name,
    chainId,
    cacheTime: 60000
  })

  useEffect(() => {
    setName(ensName.data?.toString())
  }, [ensName.data])

  useEffect(() => {
    setAvatar(ensAvatar.data?.toString())
  }, [ensAvatar.data])

  return { address, name, avatar, avatarLoading: ensAvatar.isFetching, nameLoading: ensName.isFetching }
}
