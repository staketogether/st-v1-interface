import chainConfig from '../config/chain'
import { ENSPool } from '../types/Pool'

export default async function getSearchPools(addresses: `0x${string}`[]): Promise<ENSPool[]> {
  const { provider } = chainConfig()

  const getPoolEns = async (address: `0x${string}`) => {
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

  const poolsPromises = addresses.map(async address => getPoolEns(address))

  const pools = await Promise.all(poolsPromises)

  return pools
}
