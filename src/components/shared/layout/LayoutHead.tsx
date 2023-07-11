import styled from 'styled-components'

type LayoutHeadProps = {
  text: string
}

export default function LayoutHead({ text }: LayoutHeadProps) {
  return (
    <Head>
      <Title>{text}</Title>
    </Head>
  )
}

const { Head, Title } = {
  Head: styled.header`
    display: grid;
    grid-template-columns: 1fr;
  `,
  Title: styled.h1`
    font-size: ${({ theme }) => theme.font.size[32]};
    color: ${({ theme }) => theme.color.primary};
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `
}
