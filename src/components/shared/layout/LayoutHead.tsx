import { styled } from 'styled-components'

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
  Head: styled.div`
    display: grid;
    grid-template-columns: 1fr;
  `,
  Title: styled.h1`
    font-size: ${({ theme }) => theme.font.size[22]};
    font-weight: 400;
    color: ${({ theme }) => theme.color.primary};
  `
}
