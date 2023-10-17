import { HTMLProps } from 'react'
import { WrapWidgetFormInput, inputValue } from './WrapWidgetFormInput'
import useConnectedAccount from '@/hooks/useConnectedAccount'
import Button from '@/components/shared/Button'
import styled from 'styled-components'
import { PiArrowLineRight, PiArrowLineLeft } from 'react-icons/pi'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import useWalletSidebarConnectWallet from '@/hooks/useWalletSidebarConnectWallet'
import { WrapWidgetToken } from './WrapWidget'
import { useReactiveVar } from '@apollo/client'
import { ethers } from 'ethers'

export type WrapWidgetFormProps = HTMLProps<HTMLDivElement> & {
  isUnwraping?: boolean
  tokens: WrapWidgetToken[]
}

export const WrapWidgetForm = ({ tokens, isUnwraping, ...props }: WrapWidgetFormProps) => {
  const { t } = useLocaleTranslation()
  const { setOpenSidebarConnectWallet, openSidebarConnectWallet } = useWalletSidebarConnectWallet()
  const { account } = useConnectedAccount()

  const [fromToken, toToken] = tokens

  const value = useReactiveVar(inputValue)
  const valueAsBigNumber = ethers.parseEther(value || '0')

  const insufficientFunds = valueAsBigNumber > fromToken.balance
  const insufficientMinDeposit = valueAsBigNumber <= 0 && value.length > 0
  const insufficientAllowance = valueAsBigNumber > fromToken.allowance

  const hasErrors = insufficientFunds || insufficientMinDeposit

  return (
    <Container {...props}>
      <WrapWidgetFormInput
        tokens={tokens}
        loading={fromToken.loading || toToken.loading}
        hasError={hasErrors}
        disabled={!account || fromToken.loading || toToken.loading}
      />
      {!account ? (
        <Button
          onClick={() => setOpenSidebarConnectWallet(true)}
          isLoading={fromToken.loading || toToken.loading || openSidebarConnectWallet}
          label={t('v2.header.enter')}
          icon={<ArrowRight />}
        />
      ) : (
        <Button
          isLoading={false}
          onClick={() => {}}
          icon={isUnwraping ? <ArrowLeft /> : <ArrowRight />}
          disabled={!value || hasErrors}
        >
          {hasErrors ? (
            <>
              {insufficientFunds && t('form.insufficientFunds')}
              {insufficientMinDeposit && t('form.insufficientMinDeposit')}
            </>
          ) : (
            <>{insufficientAllowance ? t('approve') : t(isUnwraping ? 'unwrap' : 'wrap')}</>
          )}
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
