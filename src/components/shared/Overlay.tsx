import { styled } from 'styled-components'

type OverlayProps = {
  onClick: () => void
}

export default function Overlay({ onClick }: OverlayProps) {
  return <Background onClick={onClick} />
}

const { Background } = {
  Background: styled.div`
    background: linear-gradient(180deg, rgba(143, 152, 214, 0.4) 0%, rgba(143, 152, 214, 0.8) 10%);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    transition: background-color 0.2s ease;
  `
}
