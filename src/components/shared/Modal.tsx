import { ReactNode, useEffect } from 'react'
import styled, { css } from 'styled-components'

type ModalProps = {
  isOpen: boolean
  children: ReactNode
  onClose: () => void
  showCloseIcon?: boolean
  width?: number | string
  title?: string | ReactNode
  showHeader?: boolean
  className?: string
  noPadding?: boolean
}

export default function Modal({
  showCloseIcon = true,
  isOpen,
  children,
  onClose,
  width = 418,
  title,
  showHeader = true,
  noPadding = false,
  className
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])
  if (!isOpen) {
    return null
  }
  return (
    <>
      <Overlay />
      <ModalWrapper width={width} className={`${className} ${noPadding && 'noPadding'}`}>
        {showHeader && (
          <header>
            {title && title}
            {showCloseIcon && (
              <CloseButton onClick={onClose}>
                <span>x</span>
              </CloseButton>
            )}
          </header>
        )}
        {children}
      </ModalWrapper>
    </>
  )
}

const { ModalWrapper, Overlay, CloseButton } = {
  ModalWrapper: styled.div<{ width: number | string }>`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;

    ${props =>
      Number.isInteger(props.width)
        ? css`
            width: ${props.width}px;
          `
        : css`
            width: ${props.width};
          `}
    background-color: ${({ theme }) => theme.colorV2.white};
    &.noPadding {
      padding: 0;
      > header {
        padding: 24px 24px 0 24px;
      }
    }
    padding: ${({ theme }) => theme.size[24]};
    border-radius: ${({ theme }) => theme.size[8]};
    box-shadow: ${({ theme }) => theme.shadow[300]};

    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[16]};

    > header {
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;

      font-size: ${({ theme }) => theme.font.size[16]};
      font-weight: 500;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      width: 100%;
      max-width: 95%;
    }
  `,
  Overlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.55);
    transition: background-color 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: start;
    z-index: 1001;
  `,
  CloseButton: styled.button`
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: ${({ theme }) => theme.size[8]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background: ${({ theme }) => theme.colorV2.gray[2]};
    transition: background 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.2);

    span {
      font-size: ${({ theme }) => theme.font.size[18]};
      color: ${({ theme }) => theme.color.blue[500]};
      margin-bottom: 3px;
      font-weight: 100;
    }

    &:hover {
      background: #e4e4e4;
    }
  `
}
