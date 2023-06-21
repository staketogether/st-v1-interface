import React, { ReactNode } from 'react'
import styled from 'styled-components'

type GenericModal = {
  isOpen: boolean
  children: ReactNode
  onClose: () => void
  showCloseIcon: boolean
  width?: number
  title: string | ReactNode
}

export default function GenericModal({
  showCloseIcon = true,
  isOpen,
  children,
  onClose,
  width = 418,
  title
}: GenericModal) {
  if (!isOpen) {
    return null
  }
  return (
    <ModalBackground>
      <ModalWrapper width={width}>
        <header>
          {title}
          {showCloseIcon && <CloseModalButton onClick={onClose}>X</CloseModalButton>}
        </header>
        {children}
      </ModalWrapper>
    </ModalBackground>
  )
}

const { CloseModalButton, ModalWrapper, ModalBackground } = {
  CloseModalButton: styled.span`
    margin-left: auto;
    font-size: ${({ theme }) => theme.font.size[18]};
    font-weight: 100;
    cursor: pointer;
  `,
  ModalWrapper: styled.div<{ width: number }>`
    width: ${props => `${props.width}px`};
    background-color: ${({ theme }) => theme.color.white};
    padding: ${({ theme }) => theme.size[24]};
    border-radius: ${({ theme }) => theme.size[16]};
    position: relative;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
    header {
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;

      font-size: ${({ theme }) => theme.font.size[16]};
      font-weight: 500;
    }
  `,
  ModalBackground: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(143, 152, 214, 0.4) 0%, rgba(143, 152, 214, 0.8) 10%);
    transition: background-color 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;
  `
}
