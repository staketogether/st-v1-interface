import { ReactNode, useState } from 'react'
import styled from 'styled-components'

interface TooltipProps {
  text: string
  children: ReactNode
}

export default function TooltipComponent({ text, children }: TooltipProps) {
  const [isTooltipVisible, setTooltipVisible] = useState(false)

  const handleMouseEnter = () => {
    setTooltipVisible(true)
  }

  const handleMouseLeave = () => {
    setTooltipVisible(false)
  }

  return (
    <Container onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {isTooltipVisible && <Content>{text}</Content>}
    </Container>
  )
}

const { Container, Content } = {
  Container: styled.div`
    position: relative;
    display: inline-block;
  `,
  Content: styled.div`
    position: absolute;
    top: -30px;
    left: 0;
    background: ${({ theme }) => theme.color.blackAlpha[800]};
    color: ${({ theme }) => theme.color.white};
    padding: ${({ theme }) => theme.size[4]} ${({ theme }) => theme.size[8]};
    border-radius: ${({ theme }) => theme.size[8]};
    z-index: 1;
  `
}
