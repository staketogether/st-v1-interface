import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { styled } from 'styled-components'

type PoolsEmptyStateProps = {
  handleClickButton: () => void
}

export default function PoolsEmptyState({ handleClickButton }: PoolsEmptyStateProps) {
  const { t } = useLocaleTranslation()
  return (
    <Container>
      <h4>{t('v2.pools.emptyList')}</h4>
      <BackButton onClick={handleClickButton}>{t('v2.pools.emptyButton')}</BackButton>
    </Container>
  )
}
const { Container, BackButton } = {
  Container: styled.section`
    > h4 {
      font-size: ${({ theme }) => theme.font.size[24]};
      font-style: normal;
      font-weight: 500;
      color: ${({ theme }) => theme.color.primary};
    }

    display: flex;
    padding: ${({ theme }) => theme.size[32]};

    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: ${({ theme }) => theme.font.size[16]};
    align-self: stretch;

    border-radius: ${({ theme }) => theme.font.size[12]};
    background: ${({ theme }) => theme.color.whiteAlpha[500]};
  `,
  BackButton: styled.button`
    display: grid;
    width: auto;

    height: 40px;
    align-items: center;

    font-size: ${({ theme }) => theme.font.size[14]};
    font-weight: 500;
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.primary};

    border: none;
    padding: 0 ${({ theme }) => theme.size[16]};
    transition: background-color 0.1s ease;
    border-radius: ${({ theme }) => theme.size[12]};

    &:hover {
      background-color: ${({ theme }) => theme.color.secondary};
    }
  `
}
