import useResizeView from '@/hooks/useResizeView'
import useSearchDrawer from '@/hooks/useSearchDrawer'
import useSearchHeader from '@/hooks/useSearchHeader'
import { AiOutlineCheck, AiOutlineFire } from 'react-icons/ai'
import styled from 'styled-components'
import useTranslation from '../../hooks/useTranslation'
import EnsAvatar from '../shared/ens/EnsAvatar'
import EnsName from '../shared/ens/EnsName'

interface StakeSelectPoolProps {
  poolAddress?: `0x${string}`
}

export default function StakeSelectPool({ poolAddress }: StakeSelectPoolProps) {
  const { t } = useTranslation()
  const { screenWidth, breakpoints } = useResizeView()

  const { setOpenSearchDrawer } = useSearchDrawer()
  const { setOpenSearchHeader } = useSearchHeader()
  const handleSearchPool = () => {
    if (screenWidth >= breakpoints.lg) {
      setOpenSearchHeader(true)
      return
    }
    setOpenSearchDrawer(true)
  }

  return (
    <Container onClick={handleSearchPool}>
      {poolAddress ? (
        <PoolSelected>
          <EnsAvatar large address={poolAddress} />
          <Verified>
            <EnsName large address={poolAddress} />
            <AiOutlineCheck fontSize={14} />
          </Verified>
        </PoolSelected>
      ) : (
        <SelectPool>
          <AiOutlineFire fontSize={14} />
          {t('selectPool')}
        </SelectPool>
      )}
    </Container>
  )
}

const { Container, SelectPool, PoolSelected, Verified } = {
  Container: styled.button`
    display: grid;
    grid-template-columns: 1fr;
    height: 32px;

    align-items: center;
    justify-content: flex-start;

    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.transparent};
    border: none;
    border-radius: ${({ theme }) => theme.size[16]};

    transition: background-color 0.1s ease;

    span:first-child {
      align-self: flex-start;

      font-size: ${({ theme }) => theme.font.size[15]};

      color: ${({ theme }) => theme.color.black};
    }
    span:last-child {
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.color.black};
      display: flex;
      align-items: center;
    }
  `,
  SelectPool: styled.div`
    cursor: pointer;
    height: 32px;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.whiteAlpha[300]};
    border: none;
    border-radius: ${({ theme }) => theme.size[16]};
    padding: 0 ${({ theme }) => theme.size[16]};
    transition: background-color 0.1s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    display: flex;
    place-items: center;
    gap: ${({ theme }) => theme.size[4]};

    &:hover {
      background-color: ${({ theme }) => theme.color.whiteAlpha[800]};
    }
  `,
  PoolSelected: styled.div`
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    gap: ${({ theme }) => theme.size[12]};
    cursor: default;
  `,
  Verified: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
    color: ${({ theme }) => theme.color.whatsapp[600]};

    > span {
      width: 124px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
    }
  `
}
