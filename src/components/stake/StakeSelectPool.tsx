import styled from 'styled-components'
import useTranslation from '../../hooks/useTranslation'

export default function StakeSelectPool() {
  const { t } = useTranslation()

  return (
    <Header>
      <h1>{t('titles.stake')}</h1>
    </Header>
  )
}

const { Header: Header } = {
  Header: styled.header`
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
  `
}
