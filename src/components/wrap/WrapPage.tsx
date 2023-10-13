import styled from 'styled-components'
import LayoutTitle from '@/components/shared/layout/LayoutTitle'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import WrapWidget from './WrapWidget'

export const WrapPage = () => {
  const { t } = useLocaleTranslation()

  return (
    <Container>
      <LayoutTitle title={t('v2.pages.wrap.title')} description={t('v2.pages.wrap.description')} />
      <Card>
        <WrapWidget />
      </Card>
    </Container>
  )
}

export const { Container, Card } = {
  Container: styled.div`
    display: grid;
    justify-content: center;
    gap: ${({ theme }) => theme.size[24]};
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      gap: ${({ theme }) => theme.size[24]};
      max-width: 468px;
    }
  `,
  Card: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.white};
    border: none;
    border-radius: ${({ theme }) => theme.size[8]};
    transition: background-color 0.2s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};
    > header {
      padding: ${({ theme }) => theme.size[24]} ${({ theme }) => theme.size[24]} ${({ theme }) => theme.size[8]};
      font-size: ${({ theme }) => theme.font.size[14]};
      border: none;
      transition: background-color 0.1s ease;
      display: flex;
      justify-content: space-between;
      > div {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.size[8]};
      }
    }
  `
}

export default WrapPage
