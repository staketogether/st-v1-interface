import Fuse from 'fuse.js'
import Link from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'

import useCommunities from '../../../hooks/useCommunities'
import useSearchCommunities from '../../../hooks/useSearchCommunities'
import useTranslation from '../../../hooks/useTranslation'
import EnsAvatar from '../ens/EnsAvatar'
import EnsName from '../ens/EnsName'
import Overlay from '../Overlay'

export default function LayoutSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [text, setText] = useState<string>('')
  const { t } = useTranslation()

  const { communities } = useCommunities()
  const { searchCommunities, isLoading } = useSearchCommunities(communities)

  const options = {
    includeScore: true,
    keys: [
      {
        name: 'address',
        weight: 1
      },
      {
        name: 'name',
        weight: 2
      }
    ],
    threshold: 0.3
  }

  const fuse = new Fuse(searchCommunities, options)

  const result = fuse.search(text).map(community => community.item)

  const handleButtonClick = () => {
    setIsOpen(!isOpen)
  }

  const handleMouseLeave = () => {
    setIsOpen(false)
  }

  const onChange = (text: string) => {
    setText(text)
    setIsOpen(true)
  }

  return (
    <>
      {isOpen && <Overlay onClick={() => setIsOpen(false)} />}
      <Container onMouseLeave={handleMouseLeave}>
        <InputSearch
          type='text'
          value={text}
          placeholder={t('searchCommunity')}
          onChange={e => onChange(e.target.value)}
          onClick={handleButtonClick}
          className={`${isOpen ? 'active' : ''}`}
        />
        {isOpen && (
          <DropdownMenu isOpen>
            {!isLoading &&
              text.length > 0 &&
              result.length > 0 &&
              result.map(community => (
                <Link href={`/stake/deposit/${community.address}`} key={community.address}>
                  <DropdownMenuItem key={community.address}>
                    <EnsAvatar address={community.address} />
                    <EnsName address={community.address} />
                  </DropdownMenuItem>
                </Link>
              ))}

            {!isLoading &&
              text.length === 0 &&
              communities.map(address => (
                <Link href={`/stake/deposit/${address}`} key={address}>
                  <DropdownMenuItem key={address}>
                    <EnsAvatar address={address} />
                    <EnsName address={address} />
                  </DropdownMenuItem>
                </Link>
              ))}
            {!isLoading && text.length > 0 && result.length === 0 && (
              <NotFound>{t('emptyCommunity')}</NotFound>
            )}
            {isLoading && text.length > 0 && <Loading>{t('loading')}</Loading>}
          </DropdownMenu>
        )}
      </Container>
    </>
  )
}

const { Container, DropdownMenu, InputSearch, DropdownMenuItem, NotFound, Loading } = {
  Container: styled.div`
    width: 100%;
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    height: 32px;
  `,
  InputSearch: styled.input`
    display: grid;
    grid-template-columns: 1fr;

    width: auto;
    height: 32px;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.whiteAlpha[600]};
    border: none;
    border-radius: ${({ theme }) => theme.size[16]};
    padding: 0 16px;
    transition: background-color 0.1s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};
    padding-top: 0;

    &:hover {
      background-color: ${({ theme }) => theme.color.whiteAlpha[800]};
    }

    &:focus {
      background-color: ${({ theme }) => theme.color.whiteAlpha[800]};
      color: ${({ theme }) => theme.color.primary};
      border: none;
      outline: none;
    }

    &.active {
      background-color: ${({ theme }) => theme.color.whiteAlpha[800]};
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    &::-webkit-input-placeholder {
      color: ${({ theme }) => theme.color.blue[300]};
    }
  `,
  DropdownMenu: styled.div<{ isOpen: boolean }>`
    position: absolute;
    cursor: pointer;
    width: 100%;
    height: auto;
    top: 100%;
    z-index: 2;
    display: ${props => (props.isOpen ? 'grid' : 'none')};

    border-radius: ${({ theme }) => theme.size[16]};
    padding: ${({ theme }) => theme.size[12]} ${({ theme }) => theme.size[16]};
    gap: ${({ theme }) => theme.size[12]};
    grid-template-columns: 1fr;

    background-color: ${({ theme }) => theme.color.whiteAlpha[800]};
    transition: background-color 0.2s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  `,
  DropdownMenuItem: styled.div`
    display: grid;
    grid-template-columns: 24px auto;
    align-items: center;
    text-decoration: none;
    gap: ${({ theme }) => theme.size[8]};
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    border: none;
    transition: background-color 0s ease;
  `,
  NotFound: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
  `,
  Loading: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.secondary};
  `
}
