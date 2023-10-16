import { HTMLProps } from 'react'
import { WrapWidgetDetails, WrapWidgetDetailsProps } from './WrapWidgetDetails'
import { WrapWidgetForm } from './WrapWidgetForm'
import styled from 'styled-components'

export type WrapWidgetContainerProps = HTMLProps<HTMLDivElement> & {
  details: WrapWidgetDetailsProps
}

export const WrapWidgetContainer = ({ details, ...props }: WrapWidgetContainerProps) => {
  return (
    <Container {...props}>
      <WrapWidgetDetails {...details} />
      <WrapWidgetForm />
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
