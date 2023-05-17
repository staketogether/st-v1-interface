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
    height: 32px;

    align-items: center;
    justify-content: flex-start;

    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.whiteAlpha[600]};
    border: none;
    border-radius: ${({ theme }) => theme.size[16]};
    padding: 0 ${({ theme }) => theme.size[4]};
    transition: background-color 0.1s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    &:hover {
      background-color: ${({ theme }) => theme.color.whiteAlpha[800]};
    }

    &.active {
      background-color: ${({ theme }) => theme.color.whiteAlpha[800]};
      color: ${({ theme }) => theme.color.secondary};
    }

    span:first-child {
      align-self: flex-start;

      font-size: ${({ theme }) => theme.font.size[14]};

      color: ${({ theme }) => theme.color.black};
    }
    span:last-child {
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.color.primary};
      display: flex;
      align-items: center;
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
