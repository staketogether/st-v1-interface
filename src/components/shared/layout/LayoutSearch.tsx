import useSearchHeader from '@/hooks/useSearchHeader'
import Fuse from 'fuse.js'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import { AiOutlineClose, AiOutlineSearch, AiOutlineWarning } from 'react-icons/ai'
import styled from 'styled-components'
import usePools from '../../../hooks/subgraphs/usePools'

import useSearchPools from '../../../hooks/subgraphs/useSearchPools'
import useTranslation from '../../../hooks/useTranslation'
import Overlay from '../Overlay'
import EnsAvatar from '../ens/EnsAvatar'
import EnsName from '../ens/EnsName'

export default function LayoutSearch() {
  const { isOpen, setOpenSearchHeader } = useSearchHeader()
  const [text, setText] = useState<string>('')
  const { t } = useTranslation()
  const router = useRouter()
  const pathname = router.pathname
  const { pools, poolsIsLoading } = usePools()
  const { searchPools, searchLoading } = useSearchPools()

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

  const fuse = new Fuse(searchPools, options)

  const result = fuse.search(text).map(pool => pool.item)

  const handleButtonClick = () => {
    setOpenSearchHeader(!isOpen)
  }

  const handleMouseLeave = () => {
    setOpenSearchHeader(false)
  }

  const onChange = (text: string) => {
    setText(text)
    setOpenSearchHeader(true)
  }

  const clearText = () => {
    setText('')
  }

  const handleRedirectPool = (address: string) => {
    if (pathname.includes('pools')) {
      return `stake/deposit/${address}`
    }
    return `${pathname.replace('[address]', '')}/${address}`
  }

  return (
    <>
      {isOpen && <Overlay onClick={() => setOpenSearchHeader(false)} />}
      <Container onMouseLeave={handleMouseLeave}>
        <InputSearchArea className={`${isOpen ? 'active' : ''}`}>
          <button>
            <AiOutlineSearch fontSize={16} />
          </button>
          <InputSearch
            type='text'
            value={text}
            placeholder={t('searchPool')}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
            onClick={handleButtonClick}
          />
          {text && text.length > 0 && (
            <button onClick={clearText}>
              <AiOutlineClose fontSize={16} />
            </button>
          )}
        </InputSearchArea>
        {isOpen && (
          <DropdownMenu isOpen>
            {!poolsIsLoading &&
              text.length > 0 &&
              result.length > 0 &&
              result.map(pool => (
                <Link href={handleRedirectPool(pool.address)} key={pool.address}>
                  <DropdownMenuItem key={pool.address} onClick={() => setOpenSearchHeader(false)}>
                    <EnsAvatar address={pool.address} />
                    <EnsName address={pool.address} />
                  </DropdownMenuItem>
                </Link>
              ))}

            {!poolsIsLoading &&
              text.length === 0 &&
              pools.map(pool => (
                <Link href={handleRedirectPool(pool.address)} key={pool.address}>
                  <DropdownMenuItem key={pool.address} onClick={() => setOpenSearchHeader(false)}>
                    <EnsAvatar address={pool.address} />
                    <EnsName address={pool.address} />
                  </DropdownMenuItem>
                </Link>
              ))}
            {!poolsIsLoading && !searchLoading && text.length > 0 && result.length === 0 && (
              <NotFound>
                <AiOutlineWarning fontSize={14} />
                <div>{t('emptyPool')}</div>
              </NotFound>
            )}
            {(poolsIsLoading || searchLoading) && text.length > 0 && <Loading>{t('loading')}</Loading>}
          </DropdownMenu>
        )}
      </Container>
    </>
  )
}

const { Container, DropdownMenu, InputSearchArea, InputSearch, DropdownMenuItem, NotFound, Loading } = {
  Container: styled.div`
    width: 100%;
    max-width: 280px;
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    height: 32px;
  `,
  InputSearchArea: styled.div`
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: ${({ theme }) => theme.size[4]};
    align-items: center;

    background-color: ${({ theme }) => theme.color.white};
    border: none;
    border-radius: ${({ theme }) => theme.size[16]};
    padding: 0 ${({ theme }) => theme.size[8]};
    transition: background-color 0.1s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};

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

      button:first-of-type {
        color: ${({ theme }) => theme.color.secondary};
      }
    }

    button {
      padding: ${({ theme }) => theme.size[4]};
      display: grid;
      grid-template-columns: 1fr;
      align-items: center;
      background-color: ${({ theme }) => theme.color.transparent};
      border: none;
      color: ${({ theme }) => theme.color.primary};

      &:hover {
        color: ${({ theme }) => theme.color.secondary};
      }
    }
  `,
  InputSearch: styled.input`
    display: grid;
    grid-template-columns: 1fr;

    background-color: ${({ theme }) => theme.color.transparent};
    border: none;

    padding: 0 ${({ theme }) => theme.size[4]};
    transition: background-color 0.1s ease;

    width: auto;
    height: 32px;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};

    padding-top: 0;

    &:focus {
      color: ${({ theme }) => theme.color.primary};
    }

    &:focus {
      background-color: ${({ theme }) => theme.color.transparent};
      color: ${({ theme }) => theme.color.primary};
      border: none;
      outline: none;
    }

    &:hover {
      background-color: ${({ theme }) => theme.color.transparent};
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

    &:hover {
      background-color: ${({ theme }) => theme.color.whiteAlpha[800]};
      border-radius: ${({ theme }) => theme.size[16]};
      box-shadow: ${({ theme }) => theme.shadow[100]};
    }
  `,
  NotFound: styled.div`
    display: grid;
    grid-template-columns: 16px 1fr;
    gap: 8px;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    cursor: default;
  `,
  Loading: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.secondary};
  `
}
