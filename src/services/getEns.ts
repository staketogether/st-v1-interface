import chainConfig from '../config/chain'

export async function getEns(address: `0x${string}`, avatar?: boolean) {
  const { provider } = chainConfig()

  const empty = {
    address,
    name: undefined,
    avatar: undefined
  }

  const ensResolverAddress = await provider.lookupAddress(address)

  if (!ensResolverAddress) {
    return empty
  }
  const resolver = await provider.getResolver(ensResolverAddress)

  if (!resolver) {
    return empty
  }

  const name = resolver && resolver.name ? resolver.name : undefined

  if (avatar) {
    const avatar = await provider.getAvatar(ensResolverAddress)

    return {
      address,
      name,
      avatar: avatar ? avatar : undefined
    }
  }

  return {
    address,
    name,
    avatar: undefined
  }
}
