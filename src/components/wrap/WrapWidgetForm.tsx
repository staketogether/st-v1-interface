import { HTMLProps } from 'react'
import { WrapWidgetFormInput, WrapWidgetFormInputProps } from './WrapWidgetFormInput'

export type WrapWidgetFormProps = HTMLProps<HTMLDivElement> & {
  inputProps: WrapWidgetFormInputProps
}

export const WrapWidgetForm = ({ inputProps, ...props }: WrapWidgetFormProps) => {
  return (
    <div {...props}>
      <WrapWidgetFormInput {...inputProps} />
    </div>
  )
}

export default WrapWidgetForm
