import styled from 'styled-components'

import useCommunities from '../../hooks/useCommunities'
import ExploreCard from './ExploreCard'

export default function ExploreList() {
  const { communities, communitiesIsLoading, communitiesIsSuccess } = useCommunities()

  return (
    <Container>
      {communitiesIsLoading && <div>Loading...</div>}
      {communitiesIsSuccess && !communities && <div>No Communities</div>}
      {communitiesIsSuccess &&
        communities &&
        communities.map(address => <ExploreCard address={address} key={address} />)}
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
