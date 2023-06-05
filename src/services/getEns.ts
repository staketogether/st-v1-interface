import chainConfig from '../config/chain'

export async function getEns(address: `0x${string}`) {
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

  return {
    address,
    name: resolver && resolver.name ? resolver.name : undefined,
    avatar: undefined
  }
}
