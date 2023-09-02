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
    display: inline-flex;
    height: 13px;
    top: 3px;

    &:hover {
      color: ${({ theme }) => theme.colorV2.purple[1]};
    }
  `,
  Content: styled.div`
    position: absolute;
    display: flex;
    width: 240px;
    top: -4px;
    left: 20px;
    background: ${({ theme }) => theme.colorV2.white};
    color: ${({ theme }) => theme.colorV2.gray[1]};
    padding: ${({ theme }) => theme.size[12]} ${({ theme }) => theme.size[12]};
    box-shadow: ${({ theme }) => theme.shadow[300]};
    border-radius: ${({ theme }) => theme.size[8]};
    font-size: 13px;
    line-height: 15px;
    z-index: 1;
  `
}
