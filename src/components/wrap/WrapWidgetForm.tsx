import { HTMLProps } from 'react'
import { WrapWidgetFormInput } from './WrapWidgetFormInput'
import useConnectedAccount from '@/hooks/useConnectedAccount'
import Button from '@/components/shared/Button'
import styled from 'styled-components'
import { PiArrowLineRight, PiArrowLineLeft } from 'react-icons/pi'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import useWalletSidebarConnectWallet from '@/hooks/useWalletSidebarConnectWallet'
import { WrapWidgetToken } from './WrapWidgetDetails'

export type WrapWidgetFormProps = HTMLProps<HTMLDivElement> & {
  isUnwraping?: boolean
  tokens: WrapWidgetToken[]
}

export const WrapWidgetForm = ({ tokens, isUnwraping, ...props }: WrapWidgetFormProps) => {
  const { t } = useLocaleTranslation()
  const { account } = useConnectedAccount()
  const { setOpenSidebarConnectWallet, openSidebarConnectWallet } = useWalletSidebarConnectWallet()

  return (
    <Container {...props}>
      <WrapWidgetFormInput tokens={tokens} />
      {!account ? (
        <Button
          onClick={() => setOpenSidebarConnectWallet(true)}
          isLoading={openSidebarConnectWallet}
          label={t('v2.header.enter')}
          icon={<ArrowRight />}
        />
      ) : (
        <Button
          isLoading={false}
          onClick={() => {}}
          label={t(isUnwraping ? 'unwrap' : 'wrap')}
          icon={isUnwraping ? <ArrowLeft /> : <ArrowRight />}
        />
      )}
    </Container>
  )
}

const { Container, ArrowRight, ArrowLeft } = {
  Container: styled.div`
    display: grid;
    gap: ${({ theme }) => theme.size[24]};
  `,
  ArrowRight: styled(PiArrowLineRight)`
    font-size: 16px;
  `,
  ArrowLeft: styled(PiArrowLineLeft)`
    font-size: 16px;
  `
}

export default WrapWidgetForm
