import { queryReportIncentivesPerReportBlock } from '@/queries/subgraph/queryReportIncentivesPerReportBlock'
import { ReportIncentive, Incentives } from '@/types/Incentives'
import { useQuery } from '@apollo/client'
import { StandardMerkleTree } from '@openzeppelin/merkle-tree'
import { useState } from 'react'

export default function useReportIncentivesPerReportBlock(
  reportBlock: string,
  account: `0x${string}`,
  skip = false
) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [incentivesPerReportBlock, setIncentivesPerReportBlock] = useState<ReportIncentive[]>([])
  const [merkleTree, setMerkleTree] = useState<StandardMerkleTree<[bigint, bigint, string, bigint]> | null>(
    null
  )
  const [userProof, setUserProof] = useState<string[]>([])
  useQuery<Incentives>(queryReportIncentivesPerReportBlock, {
    variables: { reportBlock: reportBlock },
    onCompleted: data => {
      setIsLoading(false)
      setIncentivesPerReportBlock(data.reportIncentives)
      let userIndex = 0
      const values: [bigint, bigint, string, bigint][] = data.reportIncentives.map((incentive, index) => {
        if (incentive.account.address === account) {
          userIndex = index
        }
        return [BigInt(index), BigInt(incentive.reportBlock), incentive.account.address, incentive.sharesAmount]
      })
      const tree = StandardMerkleTree.of(values, ['uint256', 'uint256', 'address', 'uint256'])
      const userProof = tree.getProof(userIndex)
      setUserProof(userProof)
      setMerkleTree(tree)
    },
    onError: () => {
      setIsLoading(false)
    },
    skip: skip
  })

  return {
    isLoading,
    incentivesPerReportBlock,
    merkleTree,
    userProof
  }
}
