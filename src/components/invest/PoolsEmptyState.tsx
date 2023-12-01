import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { BsX } from 'react-icons/bs'
import styled from 'styled-components'

type PoolsEmptyStateProps = {
  handleClickButton: () => void
}

export default function PoolsEmptyState({ handleClickButton }: PoolsEmptyStateProps) {
  const { t } = useLocaleTranslation()
  return (
    <Container>
      <p>{t('v2.pools.emptyList')}</p>
      <BackButton onClick={handleClickButton}>
        <BsX fontSize={20} />
        {t('v2.pools.emptyButton')}
      </BackButton>
    </Container>
  )
}
const { Container, BackButton } = {
  Container: styled.section`
    > p {
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.colorV2.gray[1]};
    }
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({ theme }) => theme.size[8]} ${({ theme }) => theme.size[16]};
    height: 48px;
    gap: 32px;
    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.colorV2.white};
    box-shadow: ${({ theme }) => theme.shadow[100]};
  `,
  BackButton: styled.button`
    display: grid;

    grid-template-columns: 20px auto;
    gap: 4px;
    height: 32px;
    align-items: center;

    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.colorV2.blue[1]};

    border: none;
    padding: 0 ${({ theme }) => theme.size[16]};
    padding-left: 12px;
    transition: background-color 0.1s ease;
    border-radius: ${({ theme }) => theme.size[8]};

    &:hover {
      background-color: ${({ theme }) => theme.color.secondary};
    }
  `
}
