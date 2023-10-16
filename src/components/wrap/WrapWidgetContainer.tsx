import { HTMLProps } from 'react'
import { WrapWidgetDetails, WrapWidgetToken } from './WrapWidgetDetails'
import { WrapWidgetForm } from './WrapWidgetForm'
import styled from 'styled-components'
import { WrapWidgetSubtotal } from './WrapWidgetSubtotal'

export type WrapWidgetContainerProps = HTMLProps<HTMLDivElement> & {
  tokens: WrapWidgetToken[]
  isUnwraping: boolean
}

export const WrapWidgetContainer = ({ tokens, isUnwraping, ...props }: WrapWidgetContainerProps) => {
  return (
    <Container {...props}>
      <WrapWidgetDetails tokens={tokens} isUnwraping={isUnwraping} />
      <WrapWidgetForm tokens={tokens} isUnwraping={isUnwraping} />
      <WrapWidgetSubtotal tokens={tokens} />
    </Container>
  )
}

const { Container } = {
  Container: styled.div`
    display: grid;
    gap: ${({ theme }) => theme.size[24]};
    padding: ${({ theme }) => theme.size[24]} ${({ theme }) => theme.size[24]};
  `
}

export default WrapWidgetContainer
