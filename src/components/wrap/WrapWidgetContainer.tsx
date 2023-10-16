import { HTMLProps } from 'react'
import { WrapWidgetDetails, WrapWidgetDetailsProps } from './WrapWidgetDetails'
import { WrapWidgetForm, WrapWidgetFormProps } from './WrapWidgetForm'
import styled from 'styled-components'

export type WrapWidgetContainerProps = HTMLProps<HTMLDivElement> & {
  detailsProps: WrapWidgetDetailsProps
  formProps: WrapWidgetFormProps
}

export const WrapWidgetContainer = ({ detailsProps, formProps, ...props }: WrapWidgetContainerProps) => {
  return (
    <Container {...props}>
      <WrapWidgetDetails {...detailsProps} />
      <WrapWidgetForm {...formProps} />
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
