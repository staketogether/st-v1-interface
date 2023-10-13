import useLocaleTranslation from '@/hooks/useLocaleTranslation'

import React, { useState } from 'react'
import styled from 'styled-components'
import Modal from '../shared/Modal'
import useContentfulPoolsList from '@/hooks/contentful/useContentfulPoolsList'
import CommunityLogo from '../shared/community/CommunityLogo'
import CommunityName from '../shared/community/CommunityName'
import { PiPlus } from 'react-icons/pi'
import Button from '../shared/Button'
import PoolsInputSearch from '../invest/PoolsInputSearch'
import Fuse from 'fuse.js'

type ListProjectModalProps = {
  isOpen: boolean
  handleCloseModal: () => void
  handleAddNewProject: (walletAddress: `0x${string}`) => void
}

export default function ListProjectModal({
  isOpen,
  handleCloseModal,
  handleAddNewProject
}: ListProjectModalProps) {
  const [search, setSearch] = useState('')
  const { t } = useLocaleTranslation()
  const { poolsList, isLoading } = useContentfulPoolsList()
  const options = {
    includeScore: true,
    keys: [
      {
        name: 'wallet',
        weight: 1
      },
      {
        name: 'name',
        weight: 2
      }
    ],
    threshold: 0.3
  }

  const fuse = new Fuse(poolsList, options)

  function searchPools() {
    if (!search || search.trim() === '') {
      return poolsList
    }
    const itemFiltered = fuse.search(search).map(pool => pool.item)

    return poolsList.filter(pool => itemFiltered.find(item => item.wallet === pool.wallet))
  }

  const poolsFilterBySearch = searchPools()

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
          {!!(!isLoading && poolsFilterBySearch.length) &&
            poolsFilterBySearch.map(pool => {
              return (
                <Row key={`list-modal-${pool.wallet}`}>
                  <Project>
                    <CommunityLogo
                      size={24}
                      src={pool.logo.url}
                      alt={pool.logo.fileName || ''}
                      loading={isLoading}
                    />
                    {pool.name ? (
                      <CommunityName name={pool.name} loading={isLoading} />
                    ) : (
                      <CommunityName walletAddress={pool.wallet} loading={isLoading} />
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
      </Container>
    </Modal>
  )
}
const { Title, Container, List, Row, Project } = {
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
  `
}
