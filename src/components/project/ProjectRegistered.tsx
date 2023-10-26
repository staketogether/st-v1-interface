import { ContentfulPool } from '@/types/ContentfulPool'
import React from 'react'
import styled from 'styled-components'
import CommunityName from '../shared/community/CommunityName'
import CommunityLogo from '../shared/community/CommunityLogo'
import { DateTime } from 'luxon'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import Button from '../shared/Button'
import { useRouter } from 'next/router'

type ProjectRegisteredProps = {
  projectDetail: ContentfulPool
}

export default function ProjectRegistered({ projectDetail }: ProjectRegisteredProps) {
  const publishedData = DateTime.fromISO(projectDetail.sys.publishedAt)
  const router = useRouter()
  const { currency, network } = router.query
  const { t } = useLocaleTranslation()
  return (
    <Container>
      <CardContainer>
        <CardHeader>
          {projectDetail.logo?.url && (
            <CommunityLogo size={48} src={projectDetail.logo.url} alt={projectDetail.logo.fileName} />
          )}
          {projectDetail?.name && <CommunityName name={projectDetail?.name} $bold />}
        </CardHeader>
        <StatusContainer className={`${projectDetail.status && `${projectDetail.status}`}`}>
          {projectDetail.status}
        </StatusContainer>
        <PublishedContainer>
          <div>{t('v2.createProject.sent')}</div>
          <div>{publishedData.toFormat('dd/MM/yyyy')}</div>
        </PublishedContainer>
      </CardContainer>
      {projectDetail.status === 'approved' && (
        <Button
          onClick={() => router.push(`/${network}/${currency}/invest/deposit/${projectDetail.wallet}`)}
          label={`${t('v2.createProject.seeMyProject')}`}
          icon={<></>}
          isLoading={false}
        />
      )}
    </Container>
  )
}

const { Container, CardContainer, CardHeader, StatusContainer, PublishedContainer } = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
  `,
  CardContainer: styled.div`
    width: auto;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};

    background: ${({ theme }) => theme.colorV2.gray[2]};
    padding: ${({ theme }) => theme.size[24]};
    border-radius: ${({ theme }) => theme.size[8]};
  `,
  CardHeader: styled.div`
    display: grid;
    align-items: center;
    gap: ${({ theme }) => theme.size[12]};
    font-weight: 500;
    grid-template-columns: auto 1fr;
  `,
  StatusContainer: styled.div`
    background: ${({ theme }) => theme.colorV2.white};
    padding: ${({ theme }) => theme.size[12]};
    border-radius: ${({ theme }) => theme.size[8]};
    text-align: center;
    font-size: ${({ theme }) => theme.font.size[14]};

    &.pending {
      color: ${({ theme }) => theme.color.yellow[500]};
    }
    &.approved {
      color: ${({ theme }) => theme.color.green[500]};
    }
    &.reproved {
      color: ${({ theme }) => theme.color.red[500]};
    }
  `,
  PublishedContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: ${({ theme }) => theme.font.size[14]};
  `
}
