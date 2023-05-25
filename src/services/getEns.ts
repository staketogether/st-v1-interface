import chainConfig from '../config/chain'
import { ENSCommunity } from '../types/Community'

export default async function getEns(address: `0x${string}`): Promise<ENSCommunity> {
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

  const avatar = await resolver.getAvatar()
  const name = resolver.name

  return {
    address,
    name,
    avatar: avatar?.url
  }
}
