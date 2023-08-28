import { styled } from 'styled-components'

type LayoutTitleProps = {
  title: string
  description: string
}

export default function LayoutTitle({ title, description }: LayoutTitleProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Container>
  )
}

const Container = styled.header`
  display: grid;
  align-items: center;
  gap: ${({ theme }) => theme.size[8]};
  width: 100%;
  margin-bottom: ${({ theme }) => theme.size[32]};
`

const Title = styled.h1`
  color: ${({ theme }) => theme.colorV2.blue[1]};
  font-size: ${({ theme }) => theme.font.size[22]};
  font-weight: 500;
`

const Description = styled.p`
  color: ${({ theme }) => theme.colorV2.gray[1]};
  font-size: ${({ theme }) => theme.font.size[14]};
  font-weight: 400;
`
