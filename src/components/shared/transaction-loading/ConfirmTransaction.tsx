import styled from 'styled-components'
import Modal from '../Modal'
import useConfirmTransactionModal from '@/hooks/useConfirmTransactionModal'
import { ReactNode } from 'react'
import TransactionLoading from './TransactionLoading'

type ConfirmTransactionProps = {
  labelButton: string
  titleModal: string
  walletActionLoading: boolean
  transactionLoading: boolean
  transactionIsSuccess: boolean
  children: ReactNode
  successMessage?: string
  txHash?: string | undefined
  componentSuccessResume?: ReactNode
  handleConfirmTransaction: () => void
  handleCloseModal: () => void
}

export default function ConfirmTransaction({
  labelButton,
  transactionLoading,
  walletActionLoading,
  transactionIsSuccess,
  titleModal,
  txHash = undefined,
  children,
  successMessage,
  componentSuccessResume,
  handleConfirmTransaction,
  handleCloseModal
}: ConfirmTransactionProps) {
  const { isOpen } = useConfirmTransactionModal()

  return (
    <Modal
      title={walletActionLoading ? undefined : <Header>{titleModal}</Header>}
      isOpen={isOpen}
      onClose={handleCloseModal}
      showCloseIcon={!(walletActionLoading || transactionLoading) || transactionIsSuccess}
    >
      {walletActionLoading || transactionLoading ? (
        <TransactionLoading
          walletActionLoading={walletActionLoading}
          transactionLoading={transactionLoading}
          transactionIsSuccess={transactionIsSuccess}
          txHash={txHash}
          componentSuccessResume={componentSuccessResume}
          successMessage={successMessage}
          titleModal={titleModal}
        />
      ) : (
        <>
          {children}
          <Button onClick={handleConfirmTransaction}>{labelButton}</Button>
        </>
      )}
    </Modal>
  )
}

const { Header, Button } = {
  Header: styled.div`
    display: grid;
    place-items: center;
    font-size: ${({ theme }) => theme.font.size[18]};
    font-weight: 500;
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
