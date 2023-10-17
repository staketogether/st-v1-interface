import { HTMLProps } from 'react'
import { WrapWidgetFormInput, inputValue } from './WrapWidgetFormInput'
import useConnectedAccount from '@/hooks/useConnectedAccount'
import Button from '@/components/shared/Button'
import styled from 'styled-components'
import { PiArrowLineRight, PiArrowLineLeft } from 'react-icons/pi'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import useWalletSidebarConnectWallet from '@/hooks/useWalletSidebarConnectWallet'
import { WrapWidgetToken } from './WrapWidgetDetails'
import { useReactiveVar } from '@apollo/client'
import { ethers } from 'ethers'

export type WrapWidgetFormProps = HTMLProps<HTMLDivElement> & {
  isUnwraping?: boolean
  tokens: WrapWidgetToken[]
  loading?: boolean
}

export const WrapWidgetForm = ({ tokens, loading, isUnwraping, ...props }: WrapWidgetFormProps) => {
  const value = useReactiveVar(inputValue)
  const [fromToken] = tokens
  const { t } = useLocaleTranslation()
  const { account } = useConnectedAccount()
  const { setOpenSidebarConnectWallet, openSidebarConnectWallet } = useWalletSidebarConnectWallet()

  const insufficientFunds = ethers.parseEther(value || '0') > fromToken.balance
  const hasErrors = insufficientFunds

  return (
    <Container {...props}>
      <WrapWidgetFormInput tokens={tokens} loading={loading} hasError={hasErrors} />
      {!account ? (
        <Button
          onClick={() => setOpenSidebarConnectWallet(true)}
          isLoading={loading || openSidebarConnectWallet}
          label={t('v2.header.enter')}
          icon={<ArrowRight />}
        />
      ) : (
        <Button
          isLoading={false}
          onClick={() => {}}
          icon={isUnwraping ? <ArrowLeft /> : <ArrowRight />}
          disabled={hasErrors}
        >
          {insufficientFunds && t('form.insufficientFunds')}
          {!hasErrors && t(isUnwraping ? 'unwrap' : 'wrap')}
        </Button>
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
