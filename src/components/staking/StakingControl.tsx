import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import styled from 'styled-components'
import StakingCard from './StakingCard'
import { Staking } from '@/types/Staking'

interface TokenControlProps {
  stakingList: Staking[]
}

export default function StakingControl({ stakingList }: TokenControlProps) {
  const { t } = useLocaleTranslation()

  return (
    <Container>
      <Title>
        <h1>{t(`v3.pages.staking.title`)}</h1>
        <h2>{t(`v3.pages.staking.description`)}</h2>
      </Title>
      <Products>
        {stakingList.map(staking => (
          <StakingCard staking={staking} key={staking.id} />
        ))}
      </Products>
    </Container>
  )
}

const { Container, Products, Title } = {
  Container: styled.div`
    width: 100%;
    display: grid;
    gap: ${({ theme }) => theme.size[24]};
    grid-template-columns: 1fr;
  `,
  Title: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};
    color: ${({ theme }) => theme.colorV2.blue[1]};
    h1 {
      font-size: ${({ theme }) => theme.font.size[32]};
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      line-height: 52px;
    }
    h2 {
      font-size: ${({ theme }) => theme.font.size[20]};
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: ${({ theme }) => theme.color.gray[600]};
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      gap: ${({ theme }) => theme.size[8]};

      h1 {
        font-size: 48px;
      }
    }
  `,
  Products: styled.nav`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: ${({ theme }) => theme.size[8]};

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    }
  `
}
