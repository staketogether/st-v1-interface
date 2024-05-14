import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { InputHTMLAttributes } from 'react'
import { PiMagnifyingGlass, PiX } from 'react-icons/pi'
import styled from 'styled-components'

type PoolsInputSearchProps = InputHTMLAttributes<HTMLInputElement> & {
  search: string
  setSearch: (value: string) => void
  className?: string
}

export default function SearchInput({ search, setSearch, className, ...props }: PoolsInputSearchProps) {
  const { t } = useLocaleTranslation()
  return (
    <InputSearchArea className={search.length > 0 ? 'selected' : ''}>
      <InputSearch
        type='text'
        value={search}
        placeholder={t('v2.pools.search')}
        onChange={e => setSearch(e.target.value)}
        className={className}
        {...props}
      />
      {!search && !search.length && (
        <button>
          <PiMagnifyingGlass fontSize={16} />
        </button>
      )}
      {search && search.length > 0 && (
        <button onClick={() => setSearch('')}>
          <PiX fontSize={16} />
        </button>
      )}
    </InputSearchArea>
  )
}

const { InputSearchArea, InputSearch } = {
  InputSearchArea: styled.div`
    width: 100%;
    height: 32px;

    display: grid;
    grid-template-columns: 1fr auto;
    gap: ${({ theme }) => theme.size[4]};
    align-items: center;

    border: none;
    border-radius: ${({ theme }) => theme.size[8]};
    padding: 0 ${({ theme }) => theme.size[16]};

    transition: background-color 0.1s ease;
    background: ${({ theme }) => theme.colorV2.gray[2]};
    box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.2);

    &:focus {
      color: ${({ theme }) => theme.colorV2.gray[1]};
      border: none;
      outline: none;
    }

    &.active {
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
      color: ${({ theme }) => theme.colorV2.gray[1]};

      &:hover {
        cursor: default;
        &:nth-of-type(2) {
          color: ${({ theme }) => theme.colorV2.purple[1]};
          cursor: pointer;
        }
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
    color: ${({ theme }) => theme.colorV2.gray[1]};

    padding-top: 0;

    &:focus {
      background-color: ${({ theme }) => theme.color.transparent};
      color: ${({ theme }) => theme.colorV2.gray[1]};
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
      color: ${({ theme }) => theme.colorV2.gray[1]};
      opacity: 0.5;
    }
  `
}
