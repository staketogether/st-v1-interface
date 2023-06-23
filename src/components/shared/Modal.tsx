import React, { ReactNode } from 'react'
import styled from 'styled-components'

type ModalProps = {
  isOpen: boolean
  children: ReactNode
  onClose: () => void
  showCloseIcon: boolean
  width?: number
  title: string | ReactNode
}

export default function Modal({
  showCloseIcon = true,
  isOpen,
  children,
  onClose,
  width = 418,
  title
}: ModalProps) {
  if (!isOpen) {
    return null
  }
  return (
    <ModalBackground>
      <ModalWrapper width={width}>
        {title && <header>{title}</header>}
        {showCloseIcon && (
          <CloseButton onClick={onClose}>
            <span>x</span>
          </CloseButton>
        )}
        {children}
      </ModalWrapper>
    </ModalBackground>
  )
}

const { ModalWrapper, ModalBackground, CloseButton } = {
  ModalWrapper: styled.div<{ width: number }>`
    width: ${props => `${props.width}px`};
    background-color: ${({ theme }) => theme.color.whiteAlpha[800]};
    padding: ${({ theme }) => theme.size[24]};
    border-radius: ${({ theme }) => theme.size[16]};
    position: relative;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
    margin-top: 158px;
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
    align-items: start;
  `,
  CloseButton: styled.button`
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: ${({ theme }) => theme.size[16]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background: ${({ theme }) => theme.color.whiteAlpha[700]};
    transition: background 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;

    position: absolute;
    left: 87%;
    top: 4%;

    span {
      font-size: ${({ theme }) => theme.font.size[18]};
      color: ${({ theme }) => theme.color.blue[500]};
      margin-bottom: 3px;
      font-weight: 100;
    }
  `
}
