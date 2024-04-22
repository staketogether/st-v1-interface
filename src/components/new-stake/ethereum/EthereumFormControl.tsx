import Button from '@/components/shared/Button'
import useEthBalanceOf from '@/hooks/contracts/useEthBalanceOf'
import { openModal } from '@/hooks/ramp/useControlModal'
import useLsdBalance from '@/hooks/subgraphs/useLsdBalance'
import useConnectedAccount from '@/hooks/useConnectedAccount'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { notification } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import EthereumDeposit from './EthereumDeposit'
import EthereumWithdraw from './EthereumWithdraw'
import { Staking } from '@/types/Staking'

interface EthereumFormControlProps {
  type: 'deposit' | 'withdraw'
  product: Staking
  chainId: number
}
export default function EthereumFormControl({ type, product, chainId }: EthereumFormControlProps) {
  const { query } = useRouter()
  const { currency } = query as { currency: string }
  const { account } = useConnectedAccount()
  const { t } = useLocaleTranslation()

  const {
    balance: ethBalance,
    isLoading: ethBalanceLoading,
    refetch: ethBalanceRefetch
  } = useEthBalanceOf({ walletAddress: account, chainId })

  const { accountBalance: stpETHBalance, isLoading: stpETHBalanceLoading } = useLsdBalance({
    walletAddress: account,
    product: product,
    chainId: chainId
  })

  function handleRampButton() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    type === 'deposit'
      ? openModal(product.asset)
      : notification.info({
          message: `${t('offramp')}`,
          placement: 'topRight'
        })
  }

  return (
    <EthereumContainer>
      <header>
        <nav>
          <ul>
            <li className={`${type === 'deposit' && 'activated'}`}>
              <Link href={product.url.replace('currency', currency)}>{t('v2.ethereumStaking.actions.invest')}</Link>
            </li>
            <li className={`${type === 'withdraw' && 'activated'}`}>
              <Link href={`${product.url.replace('currency', currency)}/withdraw`}>{t('v2.ethereumStaking.actions.withdraw')}</Link>
            </li>
          </ul>
        </nav>
        {product.asset.ramp && (
          <Button
            label={`${type === 'deposit' ? t('buy') : t('sell')} ETH`}
            width={133}
            height={32}
            color={type === 'deposit' ? 'green' : 'red'}
            onClick={handleRampButton}
            small
          />
        )}
      </header>
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

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    nav {
      ul {
        display: flex;
        gap: ${({ theme }) => theme.size[24]};
        align-items: center;
        li {
          height: 24px;
          font-size: ${({ theme }) => theme.font.size[15]};
          font-weight: 400;
          cursor: pointer;

          position: relative;
          display: inline-block;
          text-decoration: none;
          overflow: hidden;

          &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 1px;
            bottom: 0;
            left: 0;
            background-color: ${({ theme }) => theme.colorV2.purple[1]};
            transform: scaleX(0);
            transform-origin: bottom left;
            transition: transform 0.3s ease-out;
          }
          &:hover {
            a {
              color: ${({ theme }) => theme.colorV2.purple[1]};
              opacity: 1;
            }
          }

          &:hover::after {
            transform: scaleX(1);
          }

          &.activated::after,
          &.activated:hover::after {
            transform: scaleX(0);
            transition: none;
          }

          &.activated {
            border-bottom: 1px solid ${({ theme }) => theme.colorV2.purple[1]};
            a {
              color: ${({ theme }) => theme.colorV2.purple[1]};
              opacity: 1;
            }
          }

          a {
            color: ${({ theme }) => theme.colorV2.gray[1]};
            opacity: 0.6;
          }
        }
      }
    }
  `
}
