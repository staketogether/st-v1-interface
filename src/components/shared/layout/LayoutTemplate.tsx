import { ReactNode } from 'react'
import { styled } from 'styled-components'
import LayoutFooter from './LayoutFooter'
import LayoutHeaderDesktop from './LayoutHeaderDesktop'
import LayoutHeaderMobile from './LayoutHeaderMobile'
import LayoutMenuMobile from './LayoutMenuMobile'

interface LayoutTemplateProps {
  children: ReactNode
}
export default function LayoutTemplate({ children }: LayoutTemplateProps) {
  return (
    <Container>
      <Wrapper>
        <Content>
          <LayoutHeaderDesktop />
          <LayoutHeaderMobile />
          <Body>{children}</Body>
        </Content>
      </Wrapper>
      <LayoutMenuMobile />
      <LayoutFooter />
    </Container>
  )
}

const { Container, Wrapper, Content, Body } = {
  Container: styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 48px;
    gap: 24px;
    min-height: 100vh;
    background: ${({ theme }) => theme.colorV2.background};
  `,
  Wrapper: styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: minmax(320px, ${({ theme }) => theme.breakpoints.xxl});
    grid-template-columns: 1fr;
    justify-content: center;
    place-items: start center;
  `,
  Content: styled.div`
    display: grid;
    width: 100%;
    gap: 24px;
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      gap: 64px;
    }
  `,
  Body: styled.div`
    display: grid;
    grid-template-columns: minmax(320px, ${({ theme }) => theme.breakpoints.md});
    gap: ${props => props.theme.size[32]};
    justify-content: center;
    place-items: center;
  `
}
