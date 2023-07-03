import styled from 'styled-components'

import { Pool } from '../../types/Pool'
import PoolsCard from './PoolsCard'

type PoolsListProps = {
  pools: Pool[]
}

export default function PoolsList({ pools }: PoolsListProps) {
  return (
    <Container>
      {!pools && <div>No Pools</div>}
      {pools.map(pool => (
        <PoolsCard pool={pool} key={pool.address} />
      ))}
    </Container>
  )
}

const { Container } = {
  Container: styled.div`
    width: 100%;
    display: grid;
    justify-content: center;
    grid-template-columns: 1fr;
    gap: ${props => props.theme.size[24]};
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      grid-template-columns: repeat(3, 1fr);
    }
  `
}
