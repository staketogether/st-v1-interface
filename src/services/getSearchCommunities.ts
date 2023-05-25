import chainConfig from '../config/chain'
import { ENSCommunity } from '../types/Community'

export default async function getSearchCommunities(addresses: `0x${string}`[]): Promise<ENSCommunity[]> {
  const { provider } = chainConfig()

  const getCommunityEns = async (address: `0x${string}`) => {
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

  const communitiesPromises = addresses.map(async address => getCommunityEns(address))

  const communities = await Promise.all(communitiesPromises)

  return communities
}
