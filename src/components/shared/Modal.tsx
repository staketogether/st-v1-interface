import { ReactNode } from 'react'
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
    z-index: 9999;

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
      background: ${({ theme }) => theme.colorV2.gray[2]};
    }
  `
}
