import { ReactNode } from 'react'
import styled from 'styled-components'
import LayoutFooter from './LayoutFooter'
import Header from './LayoutHeader'

interface LayoutTemplateProps {
  children: ReactNode
}
export default function LayoutTemplate({ children }: LayoutTemplateProps) {
  return (
    <Container>
      <Wrapper>
        <Content>
          <Header />
          <Body>{children}</Body>
        </Content>
      </Wrapper>
      <LayoutFooter />
    </Container>
  )
}

const { Container, Wrapper, Content, Body } = {
  Container: styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 60px;
    gap: 24px;
    min-height: 100vh;
  `,
  Wrapper: styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: minmax(320px, 1280px);
    justify-content: center;
    place-items: start center;
  `,
  Content: styled.div`
    display: grid;
    grid-template-columns: minmax(320px, 1280px);
    padding: ${props => props.theme.size[24]};
    gap: 48px;
  `,
  Body: styled.div`
    display: grid;
    grid-template-columns: minmax(320px, 1280px);
    justify-content: center;
  `
}
