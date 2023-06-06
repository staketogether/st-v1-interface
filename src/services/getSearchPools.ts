import { ENSPool } from '../types/Pool'
import { getEns } from './getEns'

export default async function getSearchPools(addresses: `0x${string}`[]): Promise<ENSPool[]> {
  const poolsPromises = addresses.map(async address => getEns(address))

  const pools = await Promise.all(poolsPromises)

  return pools
}
