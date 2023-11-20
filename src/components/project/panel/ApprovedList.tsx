import CommunityLogo from '@/components/shared/community/CommunityLogo'
import CommunityName from '@/components/shared/community/CommunityName'
import Loading from '@/components/shared/icons/Loading'
import SearchInput from '@/components/shared/inputs/SearchInput'
import useContentfulProjectListByStatus from '@/hooks/contentful/useContentfulProjectListByStatus'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useDebounce } from 'usehooks-ts'
import ProjectDetailModal from './ProjectDetailModal'
import { ContentfulPool } from '@/types/ContentfulPool'
import useProjectDetailModal from '@/hooks/useProjectDetailModal'
import ApprovedButton from './ApprovedButton'

export default function ApprovedList() {
  const [search, setSearch] = useState<string>('')
  const [projectSelected, setProjectSelected] = useState<
    (ContentfulPool & { isContractPublished: boolean }) | null
  >(null)
  const debouncedSearch = useDebounce(search, 300)
  const isSearchAddress = search.startsWith('0x')
  const { projectList, initialLoading, loadingFetchMore } = useContentfulProjectListByStatus({
    status: 'approved',
    projectName: isSearchAddress ? undefined : debouncedSearch,
    projectAddress: isSearchAddress ? debouncedSearch : undefined
  })

  const { t } = useLocaleTranslation()
  const { isOpenProjectDetailModal, setProjectDetailModal } = useProjectDetailModal()

  function handleShowModal(pool: ContentfulPool, isContractPublished: boolean) {
    setProjectSelected({ ...pool, isContractPublished })
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
                  <CommunityLogo
                    size={24}
                    src={project?.logo.url}
                    alt={project?.logo.fileName || ''}
                    loading={initialLoading}
                  />
                  <CommunityName name={project.name} loading={false} />
                </Project>
                <ApprovedButton
                  project={project}
                  openModal={isContractPublished => handleShowModal(project, isContractPublished)}
                />
              </ProjectContainer>
            ))}
          {!projectList.length && !initialLoading && !loadingFetchMore && <span>{t('projectEmpty')}</span>}
        </Content>
      </Container>
      {projectSelected && isOpenProjectDetailModal && (
        <ProjectDetailModal
          project={projectSelected}
          isContractPublished={projectSelected.isContractPublished}
          showRejectOptionWhenContractIsNotPublished
        />
      )}
    </>
  )
}

const { Container, Content, ProjectContainer, Project } = {
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
  `
}
