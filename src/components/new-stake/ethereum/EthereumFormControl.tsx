import useEthBalanceOf from '@/hooks/contracts/useEthBalanceOf'
import useConnectedAccount from '@/hooks/useConnectedAccount'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import EthereumDeposit from './EthereumDeposit'
import EthereumWithdraw from './EthereumWithdraw'
import { Staking } from '@/types/Staking'
import { PiTrendUp, PiUploadSimple } from 'react-icons/pi'
import NavActions from '@/components/shared/NavActions'

interface EthereumFormControlProps {
  type: 'deposit' | 'withdraw'
  product: Staking
  stpETHBalance: bigint
  stpETHBalanceLoading: boolean
  chainId: number
}
export default function EthereumFormControl({ type, product, chainId, stpETHBalance, stpETHBalanceLoading }: EthereumFormControlProps) {
  const { query } = useRouter()
  const { currency } = query as { currency: string }
  const { account } = useConnectedAccount()
  const { t } = useLocaleTranslation()

  const {
    balance: ethBalance,
    isLoading: ethBalanceLoading,
    refetch: ethBalanceRefetch
  } = useEthBalanceOf({ walletAddress: account, chainId })

  const navActionsList = [
    {
      type: 'deposit',
      label: t('v2.ethereumStaking.actions.invest'),
      url: `${product.url.replace('currency', currency)}`,
      disabled: false,
      icon: <PiTrendUp />,
      tooltipLabel: ''
    },
    {
      type: 'withdraw',
      label: t('swap'),
      url: `${product.url.replace('currency', currency)}/withdraw`,
      disabled: false,
      icon: <PiUploadSimple />,
      tooltipLabel: ''
    }
  ]

  return (
    <EthereumContainer>
      <NavActions typeActive={type} navActionsList={navActionsList} />
      <div>
        {type === 'deposit' ? (
          <EthereumDeposit
            type={type}
            ethBalance={ethBalance}
            ethBalanceLoading={ethBalanceLoading}
            ethBalanceRefetch={ethBalanceRefetch}
            stpETHBalance={stpETHBalance}
            stpETHBalanceLoading={stpETHBalanceLoading}
            account={account}
            product={product}
            chainId={chainId}
          />
        ) : (
          <EthereumWithdraw
            type={type}
            ethBalance={ethBalance}
            ethBalanceLoading={ethBalanceLoading}
            ethBalanceRefetch={ethBalanceRefetch}
            stpETHBalance={stpETHBalance}
            stpETHBalanceLoading={stpETHBalanceLoading}
            account={account}
            product={product}
            chainId={chainId}
          />
        )}
      </div>
    </EthereumContainer>
  )
}

const { EthereumContainer } = {
  EthereumContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
  `
}
