import { useState } from 'react'
import { PiMinusCircle, PiPlusCircle } from 'react-icons/pi'
import styled from 'styled-components'

interface CollapseProps {
  question: string
  answer: string
}

export default function Collapse({ question, answer }: CollapseProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleCollapse = () => setIsOpen(!isOpen)

  return (
    <Container>
      <Header onClick={toggleCollapse}>
        {question}
        {isOpen ? <ClosedIcon /> : <OpenedIcon />}
      </Header>
      <div
        style={{
          display: isOpen ? 'block' : 'none',
          overflow: 'hidden',
          transition: 'display 0.5s ease-in-out'
        }}
      >
        {isOpen && <Description>{answer}</Description>}
      </div>
    </Container>
  )
}

const { Container, Header, Description, ClosedIcon, OpenedIcon } = {
  Container: styled.div`
    min-height: 56px;
    width: 100%;
    padding: 16px 24px;
    background: ${({ theme }) => theme.colorV2.white};
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${({ theme }) => theme.size[12]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
  `,
  Header: styled.header`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    font-size: 13px;
    font-weight: 500;

    color: ${({ theme }) => theme.colorV2.blue[1]};
  `,
  Description: styled.p`
    max-width: 100%;
    font-size: ${({ theme }) => theme.font.size[13]};

    color: ${({ theme }) => theme.colorV2.gray[1]};
    line-height: ${({ theme }) => theme.font.size[16]};

    word-break: break-word;
    white-space: pre-wrap;
  `,
  ClosedIcon: styled(PiMinusCircle)`
    font-size: ${({ theme }) => theme.font.size[16]};
  `,
  OpenedIcon: styled(PiPlusCircle)`
    font-size: ${({ theme }) => theme.font.size[16]};
  `
}
