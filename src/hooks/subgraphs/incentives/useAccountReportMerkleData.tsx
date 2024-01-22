import { stBackendClient } from '@/config/apollo'
import chainConfig from '@/config/chain'
import { queryAccountReportMerkleData } from '@/queries/subgraph/queryReportIncentivesPerReportBlock'
import { AccountReportMerkleData, ReportMerkle } from '@/types/AccountReportMerkleData'
import { useQuery } from '@apollo/client'
import { useState } from 'react'

export default function useAccountReportMerkleData(reportBlock: string, account: `0x${string}`) {
  const [accountReportMerkleData, setAccountReportMerkleData] = useState<AccountReportMerkleData | null>(null)
  const chain = chainConfig()
  const { loading: isLoading } = useQuery<ReportMerkle>(queryAccountReportMerkleData, {
    variables: { accountAddress: account.toLowerCase(), chainId: chain.chainId, reportBlock: reportBlock },
    onCompleted: data => {
      setAccountReportMerkleData(data.accountReportMerkleData)
    },
    client: stBackendClient
  })

  return {
    isLoading,
    accountReportMerkleData
  }
}
