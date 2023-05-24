import styled from 'styled-components'

import { Community } from '../../types/Community'
import ExploreCard from './ExploreCard'

type ExploreListProps = {
  communities: Community[]
}

export default function ExploreList({ communities }: ExploreListProps) {
  return (
    <Container>
      {!communities && <div>No Communities</div>}
      {communities.map(community => (
        <ExploreCard community={community} key={community.address} />
      ))}
    </Container>
  )
}

const { Container } = {
  Container: styled.div`
    width: 100%;
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(3, 1fr);
    gap: ${props => props.theme.size[24]};
  `
}
