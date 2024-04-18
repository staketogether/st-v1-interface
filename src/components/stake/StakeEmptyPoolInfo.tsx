import styled from 'styled-components'

interface StakeEmptyPoolInfoProps {
  message: string
}

export default function StakeEmptyPoolInfo({ message }: StakeEmptyPoolInfoProps) {
  return (
    <Container>
      <h4>{message}</h4>
    </Container>
  )
}

const { Container } = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > h4 {
      font-size: 14px;
      line-height: 18px;
      font-weight: 400;
      color: ${({ theme }) => theme.colorV2.gray[1]};
    }
  `
}
