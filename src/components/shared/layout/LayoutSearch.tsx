import Fuse from 'fuse.js'
import Link from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'

import useCommunities from '../../../hooks/useCommunities'
import useTranslation from '../../../hooks/useTranslation'
import EnsAvatar from '../ens/EnsAvatar'
import EnsName from '../ens/EnsName'

export default function LayoutSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [search, setSearch] = useState<string>('')
  const { t } = useTranslation()

  const { communities } = useCommunities()

  const options = {
    includeScore: true,
    keys: ['address', 'name']
  }

  const fuse = new Fuse([], options)

  const result = fuse.search(search)

  const communitiesSearch = search.length ? result.map(community => community.item) : communities

  const handleButtonClick = () => {
    setIsOpen(!isOpen)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsOpen(false)
  }

  const onChange = (text: string) => {
    setSearch(text)
    setIsOpen(true)
  }

  return (
    <Container>
      <InputSearch
        type='text'
        value={search}
        placeholder={t('searchCommunity')}
        onChange={e => onChange(e.target.value)}
        onClick={handleButtonClick}
      />
      {isOpen && (
        <DropdownMenu
          isOpen={isOpen || isHovered || search.length}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {communitiesSearch.map(address => (
            <Link href={`/stake/${address}`} key={address}>
              <DropdownMenuItem key={address}>
                <EnsAvatar address={address} />
                <EnsName address={address} />
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenu>
      )}
    </Container>
  )
}

const { Container, DropdownMenu, InputSearch, DropdownMenuItem } = {
  Container: styled.div`
    width: 100%;
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    height: 32px;
    align-items: center;
    background: ${({ theme }) => theme.color.gray[200]};
    border-radius: ${({ theme }) => theme.size[16]};
  `,
  InputSearch: styled.input`
    display: grid;
    grid-template-columns: 1fr;

    border-radius: ${({ theme }) => theme.size[16]};
    height: 32px;
    width: 100%;
    border: none;
    padding: 0 16px;

    background: ${({ theme }) => theme.color.purple[100]};
    box-shadow: ${({ theme }) => theme.shadow[100]};

    font-weight: 400;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.blue[300]};

    &::-webkit-input-placeholder {
      color: ${({ theme }) => theme.color.blue[300]};
    }
  `,
  DropdownMenu: styled.div<{ isOpen: boolean }>`
    position: absolute;
    cursor: pointer;
    width: 100%;
    height: auto;
    top: 110%;
    z-index: 1;
    display: ${props => (props.isOpen ? 'grid' : 'none')};
    background: ${({ theme }) => theme.color.purple[100]};
    border-radius: ${({ theme }) => theme.size[16]};
    padding: 16px;
    gap: 8px;
    grid-template-columns: 1fr;
  `,
  DropdownMenuItem: styled.div`
    display: grid;
    grid-template-columns: 24px 1fr;
    gap: 8px;
    text-decoration: none;
  `
}
