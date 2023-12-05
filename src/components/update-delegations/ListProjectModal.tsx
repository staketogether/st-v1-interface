import useLocaleTranslation from '@/hooks/useLocaleTranslation'

import React, { useState } from 'react'
import styled from 'styled-components'
import Modal from '../shared/Modal'
import { useDebounce } from 'usehooks-ts'
import CommunityLogo from '../shared/community/CommunityLogo'
import CommunityName from '../shared/community/CommunityName'
import { PiPlus } from 'react-icons/pi'
import Button from '../shared/Button'
import PoolsInputSearch from '../invest/PoolsInputSearch'
import useContentfulProjectListByStatus from '@/hooks/contentful/useContentfulProjectListByStatus'
import Loading from '../shared/icons/Loading'
import PoolsEmptyState from '../invest/PoolsEmptyState'

type ListProjectModalProps = {
  isOpen: boolean
  handleCloseModal: () => void
  handleAddNewProject: (walletAddress: `0x${string}`) => void
  delegationAddress: `0x${string}`[]
}

export default function ListProjectModal({
  isOpen,
  handleCloseModal,
  handleAddNewProject,
  delegationAddress
}: ListProjectModalProps) {
  const [skipPoolList, setSkipPoolList] = useState(0)
  const [search, setSearch] = useState('')
  const { t } = useLocaleTranslation()
  const isSearchAddress = search.startsWith('0x')
  const debouncedSearch = useDebounce(search, 300)
  const { projectList, initialLoading, loadMore, loadingFetchMore, totalProjects } =
    useContentfulProjectListByStatus({
      status: 'approved',
      projectName: isSearchAddress ? undefined : debouncedSearch,
      projectAddress: isSearchAddress ? debouncedSearch : undefined,
      excludeProjectAddress: delegationAddress
    })

  const handleLoadMore = () => {
    const newSkip = skipPoolList + 10
    setSkipPoolList(newSkip)
    loadMore({ first: 10, skip: newSkip })
  }

  return (
    <Modal
      title={<Title>{t('v2.updateDelegations.listPoolsModalTitle')}</Title>}
      isOpen={isOpen}
      onClose={handleCloseModal}
      showCloseIcon={true}
    >
      <Container>
        <PoolsInputSearch search={search} setSearch={value => setSearch(value)} gray />
        <List>
          {!!(!initialLoading && !projectList.length) && (
            <PoolsEmptyState handleClickButton={() => setSearch('')} key='pool-row-empty' />
          )}
          {!!(!initialLoading && projectList.length) &&
            projectList.map(pool => {
              return (
                <Row key={`list-modal-${pool.wallet}`}>
                  <Project>
                    <CommunityLogo
                      size={24}
                      src={pool.logo.url}
                      alt={pool.logo.fileName || ''}
                      loading={initialLoading}
                    />
                    {pool.name ? (
                      <CommunityName name={pool.name} loading={initialLoading} />
                    ) : (
                      <CommunityName walletAddress={pool.wallet} loading={initialLoading} />
                    )}
                  </Project>
                  <Button
                    icon={<PiPlus />}
                    small
                    isLoading={false}
                    onClick={() => {
                      handleAddNewProject(pool.wallet)
                      handleCloseModal()
                    }}
                    label={''}
                    disabled={false}
                  />
                </Row>
              )
            })}
        </List>
        {projectList.length > 0 && projectList.length < totalProjects && (
          <LoadMoreButton onClick={handleLoadMore}>
            {loadingFetchMore && <Loading />}
            {!loadingFetchMore && <PiPlus />}
            {t('loadMore')}
          </LoadMoreButton>
        )}
      </Container>
    </Modal>
  )
}
const { Title, Container, List, Row, Project, LoadMoreButton } = {
  Title: styled.header`
    width: 100%;
    text-align: center;
  `,
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,
  List: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 500px;
    overflow-y: auto;
  `,
  Row: styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
  `,
  Project: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
  `,

  LoadMoreButton: styled.button`
    display: flex;
    gap: ${({ theme }) => theme.size[4]};
    align-items: center;
    justify-content: center;
    width: auto;
    height: 32px;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background: ${({ theme }) => theme.colorV2.gray[2]};
    border: none;
    border-radius: ${({ theme }) => theme.size[8]};
    padding: 0 ${({ theme }) => theme.size[16]};
    transition: background-color 0.1s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    &:hover {
      background-color: ${({ theme }) => theme.color.whiteAlpha[800]};
    }

    &.active {
      color: ${({ theme }) => theme.color.secondary};
    }
  `
}
