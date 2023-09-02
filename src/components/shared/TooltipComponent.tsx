import { ReactNode, useState } from 'react'
import styled from 'styled-components'

interface TooltipProps {
  text: string
  children: ReactNode
  left?: number
  width?: number
}

export default function TooltipComponent({ text, children, left, width }: TooltipProps) {
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
      {isTooltipVisible && (
        <Content left={left} width={width}>
          {text}
        </Content>
      )}
    </Container>
  )
}

const { Container, Content } = {
  Container: styled.div`
    position: relative;
    display: inline-flex;
    height: 13px;
    top: 0px;

    &:hover {
      color: ${({ theme }) => theme.colorV2.purple[1]};
    }
  `,
  Content: styled.div<{ left?: number; width?: number }>`
    position: absolute;
    display: flex;
    width: ${({ width }) => (width ? `${width}px` : '240px')};
    top: -13px;
    left: ${({ left }) => (left ? `${left}px` : '20px')};
    background: ${({ theme }) => theme.colorV2.white};
    color: ${({ theme }) => theme.colorV2.gray[1]};
    padding: ${({ theme }) => theme.size[12]} ${({ theme }) => theme.size[12]};
    box-shadow: ${({ theme }) => theme.shadow[300]};
    border-radius: ${({ theme }) => theme.size[8]};
    font-size: 13px;
    line-height: 16px;

    z-index: 1;
  `
}
