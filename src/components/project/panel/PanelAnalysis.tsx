import CommunityLogo from '@/components/shared/community/CommunityLogo'
import CommunityName from '@/components/shared/community/CommunityName'
import Loading from '@/components/shared/icons/Loading'
import SearchInput from '@/components/shared/inputs/SearchInput'
import useContentfulProjectListByStatus from '@/hooks/contentful/useContentfulProjectListByStatus'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import React, { useState } from 'react'
import { PiEye } from 'react-icons/pi'
import styled from 'styled-components'
import { useDebounce } from 'usehooks-ts'
import PanelProjectDetailModal from './PanelProjectDetailModal'
import { ContentfulPool } from '@/types/ContentfulPool'
import useProjectDetailModal from '@/hooks/useProjectDetailModal'

export default function PanelAnalysis() {
  const [search, setSearch] = useState<string>('')
  const [projectSelected, setProjectSelected] = useState<ContentfulPool | null>(null)
  const debouncedSearch = useDebounce(search, 300)
  const isSearchAddress = search.startsWith('0x')
  const { projectList, initialLoading, loadingFetchMore } = useContentfulProjectListByStatus({
    status: 'pending',
    projectName: isSearchAddress ? undefined : debouncedSearch,
    projectAddress: isSearchAddress ? debouncedSearch : undefined,
    pagination: { first: 100, skip: 0 }
  })

  const { t } = useLocaleTranslation()
  const { isOpenProjectDetailModal, setProjectDetailModal } = useProjectDetailModal()

  function handleShowModal(pool: ContentfulPool) {
    setProjectSelected(pool)
    setProjectDetailModal(true)
  }

  return (
    <>
      <Container>
        <SearchInput search={search} setSearch={setSearch} />
        <Content>
          {(initialLoading || loadingFetchMore) && <Loading size={18} />}
          {!!projectList.length &&
            projectList.map(project => (
              <ProjectContainer key={project.wallet}>
                <Project>
                  <CommunityLogo size={24} src={project?.logo.url} alt={project?.logo.fileName || ''} loading={initialLoading} />
                  <CommunityName name={project.name} loading={false} />
                </Project>
                <ViewButton onClick={() => handleShowModal(project)}>
                  <EyeIcon />
                </ViewButton>
              </ProjectContainer>
            ))}
          {!projectList.length && !initialLoading && !loadingFetchMore && <span>{t('projectEmpty')}</span>}
        </Content>
      </Container>
      {projectSelected && isOpenProjectDetailModal && <PanelProjectDetailModal project={projectSelected} />}
    </>
  )
}

const { Container, Content, ProjectContainer, Project, ViewButton, EyeIcon } = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    gap: ${({ theme }) => theme.size[12]};
  `,
  Content: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
  `,
  ProjectContainer: styled.div`
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  Project: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  ViewButton: styled.button`
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: ${({ theme }) => theme.size[8]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background: ${({ theme }) => theme.colorV2.gray[2]};
    transition: background 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.2);

    span {
      font-size: ${({ theme }) => theme.font.size[18]};
      color: ${({ theme }) => theme.color.blue[500]};
      margin-bottom: 3px;
      font-weight: 100;
    }

    &:hover {
      background: #e4e4e4;
    }
  `,
  EyeIcon: styled(PiEye)`
    font-size: 16px;
  `
}
