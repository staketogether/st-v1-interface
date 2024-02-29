import React from 'react'
import Modal from '../shared/Modal'
import styled from 'styled-components'

type IncentiveConfirmTransactionModalProps = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export default function EarlyAdopterFormModal({ isOpen, setIsOpen }: IncentiveConfirmTransactionModalProps) {
  return (
    <Modal
      title={
        'Estamos muito felizes em te-lo, para concluir seu acesso ao Early Adopter Stake Together, complete as informações abaixo!'
      }
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <Container></Container>
    </Modal>
  )
}
const { Container } = {
  Container: styled.div``
}
