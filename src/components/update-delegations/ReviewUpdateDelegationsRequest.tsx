import { ContentfulPool } from '@/types/ContentfulPool'
import { UpdateDelegationForm } from '@/types/UpdateDelegation'
import React from 'react'
import styled, { useTheme } from 'styled-components'
import CommunityLogo from '../shared/community/CommunityLogo'
import CommunityName from '../shared/community/CommunityName'
import { Progress } from 'antd'

type ReviewUpdateDelegationsRequestProps = {
  poolsList: ContentfulPool[]
  delegationForm: UpdateDelegationForm[]
}

export default function ReviewUpdateDelegationsRequest({
  poolsList,
  delegationForm
}: ReviewUpdateDelegationsRequestProps) {
  const handleMetadataPools = (address: `0x${string}`) => {
    return poolsList.find(pool => pool.wallet.toLowerCase() === address.toLocaleLowerCase())
  }
  const theme = useTheme()
  return (
    <Container>
      {delegationForm.map(pool => {
        const poolMetadata = handleMetadataPools(pool.address)
        return (
          <Row key={`review-update-${pool.address}`}>
            <Project>
              <CommunityLogo
                size={24}
                src={poolMetadata?.logo.url}
                alt={poolMetadata?.logo.fileName || ''}
                loading={false}
                listed={!!poolMetadata}
              />
              {poolMetadata && poolMetadata.name ? (
                <CommunityName name={poolMetadata.name} loading={false} />
              ) : (
                <CommunityName walletAddress={pool.address} loading={false} />
              )}
            </Project>
            <Progress
              percent={Number(pool.percentage.toFixed(0))}
              style={{ margin: 0 }}
              strokeColor={theme.colorV2.blue[1]}
            />
          </Row>
        )
      })}
    </Container>
  )
}

const { Container, Row, Project } = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
  `,
  Row: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

    align-items: center;
  `,
  Project: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
  `
}
