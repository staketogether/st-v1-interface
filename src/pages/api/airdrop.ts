import { ethers } from "ethers";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { queryPoolsMarketShare } from "@/queries/subgraph/queryPoolsMarketShare";

interface PoolsMarketShareData {
  pools: {
    id: string
    marketShare: bigint
  }[]
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const rewardsAmount = ethers.parseEther('0.1')
  const oneEther = ethers.parseEther('1')
  // 3% fee, where 1 ether is 100%
  const poolFeePercentage = ethers.parseEther('0.03')
  const poolsRewardsAmount = rewardsAmount * poolFeePercentage / oneEther

  const subgraphClient = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/staketogether/stake-together-goerli',
    cache: new InMemoryCache()
  })

  const { data } = await subgraphClient.query<PoolsMarketShareData>({
    query: queryPoolsMarketShare
  })

  const poolsReward = data.pools.map((pool) => {
    const rewardsPerPool = poolsRewardsAmount * pool.marketShare / oneEther
    return [ethers.getAddress(pool.id), rewardsPerPool]
  })

}
