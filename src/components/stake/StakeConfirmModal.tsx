import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import useStakeConfirmModal from '@/hooks/useStakeConfirmModal'
import { truncateDecimal, truncateWei } from '@/services/truncate'
import { WithdrawType } from '@/types/Withdraw'
import styled from 'styled-components'
import AssetIcon from '../shared/AssetIcon'
import Modal from '../shared/Modal'
import TokensSymbolIcons from '../asset/TokensSymbolIcons'
import StakeDescriptionCheckout from './StakeDescriptionCheckout'
import StakeTransactionLoading from './StakeTransactionLoading'
import { Staking } from '@/types/Staking'

interface StakeConfirmModalProps {
  amount: string
  youReceive: bigint
  type: 'deposit' | 'withdraw'
  labelButton: string
  walletActionLoading: boolean
  transactionLoading: boolean
  transactionIsSuccess: boolean
  txHash: string | undefined
  onClick: () => void
  onClose: () => void
  withdrawTypeSelected: WithdrawType
  product: Staking
  chainId: number
}

export default function StakeConfirmModal({
  amount,
  type,
  labelButton,
  transactionLoading,
  walletActionLoading,
  transactionIsSuccess,
  youReceive,
  txHash,
  withdrawTypeSelected,
  product,
  chainId,
  onClick,
  onClose
}: StakeConfirmModalProps) {
  const { isOpen } = useStakeConfirmModal()
  const { t } = useLocaleTranslation()
  const isWithdraw = type === 'withdraw'
  const titleModal = isWithdraw ? t('v2.stake.confirmModal.withdrawTitle') : t('v2.stake.confirmModal.depositTitle')

  return (
    <Modal
      title={walletActionLoading ? undefined : <Header>{titleModal}</Header>}
      isOpen={isOpen}
      onClose={onClose}
      showHeader={transactionIsSuccess || !(walletActionLoading || transactionLoading) ? true : false}
      showCloseIcon={!(walletActionLoading || transactionLoading) || transactionIsSuccess}
    >
      {walletActionLoading || transactionLoading || transactionIsSuccess ? (
        <StakeTransactionLoading
          walletActionLoading={walletActionLoading}
          transactionLoading={transactionLoading}
          amount={truncateDecimal(amount, 6)}
          youReceive={youReceive}
          chainId={chainId}
          withdrawTypeSelected={withdrawTypeSelected}
          transactionIsSuccess={transactionIsSuccess}
          type={type}
          product={product}
          txHash={txHash}
        />
      ) : (
        <>
          {isWithdraw ? (
            <>
              <ContainerPayment>
                <span>{t('v2.stake.confirmModal.withdrawing')}</span>
                <div>
                  <span>
                    <span className={'purple'}>{truncateDecimal(amount, 6)}</span> <span className={'purple'}>{product.symbol}</span>
                  </span>
                  <TokensSymbolIcons productSymbol={product.symbol} size={32} />
                </div>
              </ContainerPayment>
              <ContainerPayment>
                <span>{t('v2.stake.confirmModal.youWillReceive')}</span>
                <div>
                  <span>
                    <span>{truncateWei(youReceive, 6)}</span>
                    <span>{` ${withdrawTypeSelected === WithdrawType.POOL ? t('eth.symbol') : t('wse.symbol')}`}</span>{' '}
                  </span>
                  <AssetIcon size={32} altName={product.symbol} chain={product.asset.chains[0]} image={product.symbolImage} />
                </div>
              </ContainerPayment>
            </>
          ) : (
            <>
              <ContainerPayment>
                <span>{t('v2.stake.confirmModal.deposit')}</span>
                <div>
                  <span>
                    <span>{truncateDecimal(amount, 6)}</span> <span>{t('eth.symbol')}</span>
                  </span>
                  <AssetIcon size={32} altName={product.symbol} chain={product.asset.chains[0]} image={product.symbolImage} />
                </div>
              </ContainerPayment>
              <ContainerPayment>
                <span>{t('v2.stake.confirmModal.youWillReceive')}</span>
                <div>
                  <span>
                    <span className={'purple'}>{truncateWei(youReceive, 6)}</span>
                    <span className={'purple'}> {product.symbol}</span>
                  </span>
                  <TokensSymbolIcons productSymbol={product.symbol} size={32} />
                </div>
              </ContainerPayment>
            </>
          )}
          <Divider />
          <StakeDescriptionCheckout
            amount={amount}
            type={type}
            product={product}
            chainId={chainId}
            youReceiveDeposit={youReceive}
            withdrawTypeSelected={withdrawTypeSelected}
          />
          <Button onClick={onClick}>{labelButton}</Button>
        </>
      )}
    </Modal>
  )
}

const { ContainerPayment, Header, Divider, Button } = {
  Header: styled.div`
    display: grid;
    place-items: center;
    font-size: ${({ theme }) => theme.font.size[18]};
    font-weight: 500;
  `,
  ContainerPayment: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[4]};

    span {
      &.purple {
        color: ${({ theme }) => theme.color.secondary};
      }
    }
    > span {
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.color.blue[500]};
    }
    > div {
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;
      > span {
        font-size: ${({ theme }) => theme.font.size[24]};
        color: ${({ theme }) => theme.color.primary};
        > span {
          color: ${({ theme }) => theme.color.primary};
        }
      }
    }
  `,
  Divider: styled.div`
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.color.blue[100]};
    border-radius: 12px;
  `,
  Button: styled.button`
    border: none;
    color: ${({ theme }) => theme.color.white};
    border-radius: ${props => props.theme.size[8]};
    background: ${({ theme }) => theme.color.primary};
    transition: background-color 0.2s ease;
    height: 48px;

    font-size: ${({ theme }) => theme.font.size[16]};

    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.size[8]};

    &:hover {
      background: ${({ theme }) => theme.color.secondary};
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }
  `
}
