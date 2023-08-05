import { ReactNode } from 'react'
import styled from 'styled-components'
import LayoutFooter from './LayoutFooter'
import LayoutHeaderDesktop from './LayoutHeaderDesktop'
import LayoutHeaderMobile from './LayoutHeaderMobile'
import LayoutMenuMobile from './LayoutMenuMobile'

interface LayoutTemplateProps {
  children: ReactNode
}
export default function LayoutTemplate({ children }: LayoutTemplateProps) {
  return (
    <>
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
    </>
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
    background: linear-gradient(180deg, rgba(160, 169, 228, 0.2) 0%, #97a3eb 40%);
    background-attachment: fixed;
  `,
  Wrapper: styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: minmax(320px, ${({ theme }) => theme.breakpoints.lg});
    justify-content: center;
    place-items: start center;
  `,
  Content: styled.div`
    display: grid;
    grid-template-columns: minmax(320px, ${({ theme }) => theme.breakpoints.lg});
    padding: ${props => props.theme.size[24]};
    gap: 48px;
  `,
  Body: styled.div`
    display: grid;
    grid-template-columns: minmax(320px, ${({ theme }) => theme.breakpoints.lg});
    gap: ${props => props.theme.size[32]};
    justify-content: center;
    place-items: center;
  `
}
