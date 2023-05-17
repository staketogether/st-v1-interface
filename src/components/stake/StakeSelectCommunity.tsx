import { DownOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import useModalCommunity from '../../hooks/useModalCommunities'

import useTranslation from '../../hooks/useTranslation'
import EnsAvatar from '../shared/ens/EnsAvatar'
import EnsName from '../shared/ens/EnsName'

interface StakeSelectCommunityProps {
  communityAddress?: `0x${string}`
}

export default function StakeSelectCommunity({ communityAddress }: StakeSelectCommunityProps) {
  const { t } = useTranslation()
  const { setOpenModal } = useModalCommunity()

  const [select, setSelect] = useState(
    <SelectCommunity>
      <span>{t('selectCommunity')}</span>
      <DownOutlined />
    </SelectCommunity>
  )

  useEffect(() => {
    if (communityAddress) {
      setSelect(
        <CommunitySelected>
          <EnsAvatar address={communityAddress} />
          <EnsName address={communityAddress} />
          <DownOutlined />
        </CommunitySelected>
      )
    }
  }, [communityAddress])

  return <Container onClick={() => setOpenModal(true)}>{select}</Container>
}

const { Container, SelectCommunity, CommunitySelected } = {
  Container: styled.button`
    display: grid;
    grid-template-columns: 1fr;
    height: 24px;
    border: 0;
    border-radius: ${({ theme }) => theme.size[16]};
    background-color: ${({ theme }) => theme.color.white};
    align-items: center;
    justify-content: flex-start;
    span:first-child {
      align-self: flex-start;
      font-weight: 400;
      font-size: ${({ theme }) => theme.font.size[14]};

      color: ${({ theme }) => theme.color.blue[300]};
    }
    span:last-child {
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.color.blue[300]};
      margin-top: 4px;
    }
  `,
  SelectCommunity: styled.div`
    padding: 0 8px;
    display: grid;
    grid-template-columns: auto auto;
    gap: 8px;
  `,
  CommunitySelected: styled.div`
    padding: 0 8px;
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 8px;
  `
}
