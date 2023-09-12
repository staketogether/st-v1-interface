import { ReactNode } from 'react'
import styled from 'styled-components'

type ModalProps = {
  isOpen: boolean
  children: ReactNode
  onClose: () => void
  showCloseIcon?: boolean
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
    <>
      <Overlay />
      <ModalWrapper width={width}>
        <header>
          {title && title}
          {showCloseIcon && (
            <CloseButton onClick={onClose}>
              <span>x</span>
            </CloseButton>
          )}
        </header>
        {children}
      </ModalWrapper>
    </>
  )
}

const { ModalWrapper, Overlay, CloseButton } = {
  ModalWrapper: styled.div<{ width: number }>`
    position: fixed;
    top: 42%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;

    width: ${props => `${props.width}px`};
    background-color: ${({ theme }) => theme.colorV2.white};
    padding: ${({ theme }) => theme.size[24]};
    border-radius: ${({ theme }) => theme.size[8]};
    box-shadow: ${({ theme }) => theme.shadow[300]};

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

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      width: 340px;
      max-width: 90%;
    }
  `,
  Overlay: styled.div`
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
    z-index: 9998;
  `,
  CloseButton: styled.button`
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: ${({ theme }) => theme.size[8]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background: ${({ theme }) => theme.color.whiteAlpha[600]};
    transition: background 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;

    span {
      font-size: ${({ theme }) => theme.font.size[18]};
      color: ${({ theme }) => theme.color.blue[500]};
      margin-bottom: 3px;
      font-weight: 100;
    }

    &:hover {
      background: ${({ theme }) => theme.color.whiteAlpha[800]};
    }
  `
}
