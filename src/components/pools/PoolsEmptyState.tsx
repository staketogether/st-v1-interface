import useTranslation from '@/hooks/useTranslation'
import React from 'react'
import styled from 'styled-components'

type PoolsEmptyStateProps = {
  handleClickButton: () => void
}

export default function PoolsEmptyState({ handleClickButton }: PoolsEmptyStateProps) {
  const { t } = useTranslation()
  return (
    <Container>
      <h1>{t('airdrop.emptyList')}</h1>
      <BackButton onClick={handleClickButton}>{t('airdrop.emptyButton')}</BackButton>
    </Container>
  )
}
const { Container, BackButton } = {
  Container: styled.section`
    > h1 {
      font-size: 24px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      color: ${({ theme }) => theme.color.primary};
    }

    display: flex;
    padding: ${({ theme }) => theme.font.size[32]};

    flex-direction: column;
    align-items: center;
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
