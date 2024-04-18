import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { PiMagnifyingGlass, PiX } from 'react-icons/pi'
import styled from 'styled-components'

interface PoolsInputSearchProps {
  search: string
  setSearch: (value: string) => void
  gray?: boolean
}

export default function PoolsInputSearch({ search, setSearch, gray = false }: PoolsInputSearchProps) {
  const { t } = useLocaleTranslation()
  return (
    <InputSearchArea className={`${search.length > 0 ? 'selected' : ''} ${gray ? 'gray' : ''}`}>
      <button>
        <PiMagnifyingGlass fontSize={16} />
      </button>
      <InputSearch type='text' value={search} placeholder={t('v2.pools.search')} onChange={e => setSearch(e.target.value)} />
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
    grid-template-columns: auto 1fr auto;
    gap: ${({ theme }) => theme.size[4]};
    align-items: center;
    background: ${({ theme }) => theme.color.white};
    border: none;
    border-radius: ${({ theme }) => theme.size[8]};
    padding: 0 ${({ theme }) => theme.size[8]};
    transition: background-color 0.1s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    &.gray {
      background: ${({ theme }) => theme.colorV2.gray[2]};
      &:hover {
        color: ${({ theme }) => theme.colorV2.purple[1]};
        background: ${({ theme }) => theme.colorV2.gray[2]};
      }
      &.active {
        background: ${({ theme }) => theme.colorV2.gray[2]};
      }
      &.selected {
        background: ${({ theme }) => theme.colorV2.gray[2]};
      }
    }
    &:hover {
      color: ${({ theme }) => theme.colorV2.purple[1]};
      background: ${({ theme }) => theme.color.whiteAlpha[700]};
    }

    &:focus {
      color: ${({ theme }) => theme.colorV2.gray[1]};
      border: none;
      outline: none;
    }

    &.active {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      background: ${({ theme }) => theme.color.white};

      button:first-of-type {
        color: ${({ theme }) => theme.color.secondary};
      }
    }

    &.selected {
      background: ${({ theme }) => theme.color.white};
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
    }
  `
}
