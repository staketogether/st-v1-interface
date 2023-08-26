import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'
import styled from 'styled-components'

type PoolsInputSearchProps = {
  search: string
  setSearch: (value: string) => void
}

export default function PoolsInputSearch({ search, setSearch }: PoolsInputSearchProps) {
  const { t } = useLocaleTranslation()
  return (
    <InputSearchArea>
      <button>
        <AiOutlineSearch fontSize={16} />
      </button>
      <InputSearch
        type='text'
        value={search}
        placeholder={t('v2.pools.search')}
        onChange={e => setSearch(e.target.value)}
      />
      {search && search.length > 0 && (
        <button onClick={() => setSearch('')}>
          <AiOutlineClose fontSize={16} />
        </button>
      )}
    </InputSearchArea>
  )
}

const { InputSearchArea, InputSearch } = {
  InputSearchArea: styled.div`
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      width: auto;
    }
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      width: 340px;
    }
    min-width: 340px;
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: ${({ theme }) => theme.size[4]};
    align-items: center;
    background: ${({ theme }) => theme.color.whiteAlpha[500]};
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
      color: ${({ theme }) => theme.color.blue[600]};
    }
  `
}
