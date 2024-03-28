import { useEffect, useState } from 'react'
import { useEnsAvatar, useEnsName } from 'wagmi'

export default function useEns(address: `0x${string}`, chainId: number) {
  const [name, setName] = useState<string | undefined>(undefined)
  const [avatar, setAvatar] = useState<string | undefined>(undefined)

  const ensName = useEnsName({
    address,
    chainId
  })

  const ensAvatar = useEnsAvatar({
    name,
    chainId
  })

  useEffect(() => {
    setName(ensName.data?.toString())
  }, [ensName.data])

  useEffect(() => {
    setAvatar(ensAvatar.data?.toString())
  }, [ensAvatar.data])

  return { address, name, avatar, avatarLoading: ensAvatar.isFetching, nameLoading: ensName.isFetching }
}
