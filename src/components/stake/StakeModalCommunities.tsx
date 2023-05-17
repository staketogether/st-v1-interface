import { Modal } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from 'styled-components'

import useCommunities from '../../hooks/useCommunities'
import useModalCommunity from '../../hooks/useModalCommunities'
import useTranslation from '../../hooks/useTranslation'
import EnsAvatarServer from '../shared/ens/EnsAvatar'
import EnsNameCommunity from '../shared/ens/EnsName'

type StakeModalCommunitiesProps = {
  type: 'stake' | 'unstake'
}

export default function StakeModalCommunities({ type }: StakeModalCommunitiesProps) {
  const { t } = useTranslation()
  const { communities, communitiesIsSuccess } = useCommunities()
  const { openModal, setOpenModal } = useModalCommunity()
  const [search, setSearch] = useState<string>('')
  const router = useRouter()

  const handleCancel = () => {
    setOpenModal(false)
  }

  const handleClick = (address: string) => {
    setOpenModal(false)
    router.push(`/${type}/${address}`)
  }

  return (
    <ModalWrapper open={openModal} title={t('emptyCommunity')} onCancel={handleCancel} footer={false}>
      <InputSearch
        type='text'
        value={search}
        placeholder={t('searchCommunity')}
        onChange={e => setSearch(e.target.value)}
      />
      {communitiesIsSuccess &&
        communities &&
        communities.map(address => (
          <div key={address}>
            <a onClick={() => handleClick(address)}>
              <Community>
                <EnsAvatarServer address={address} />
                <EnsNameCommunity address={address} />
              </Community>
            </a>
          </div>
        ))}
    </ModalWrapper>
  )
}

const { ModalWrapper, InputSearch, Community } = {
  ModalWrapper: styled(Modal)`
    width: 463px !important;
    .ant-modal-content {
      border: 1px solid ${({ theme }) => theme.color.gray[200]};
      padding: 24px 26px;
      border-radius: ${({ theme }) => theme.size[16]};
      > .ant-modal-body {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }
    }
  `,
  InputSearch: styled.input`
    border-radius: ${({ theme }) => theme.size[16]};
    height: 32px;
    width: 100%;
    border: none;
    padding: 0 16px;

    background: ${({ theme }) => theme.color.purple[100]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    ::-webkit-input-placeholder {
      color: ${({ theme }) => theme.color.blue[300]};
    }

    ::placeholder {
      color: ${({ theme }) => theme.color.blue[300]};
    }
    > input {
      font-weight: 400;
      font-size: 14px !important;
      line-height: 22px;
      color: ${({ theme }) => theme.color.blue[300]};
    }
  `,
  Community: styled.div`
    display: flex;
    gap: 8px;
  `
}
