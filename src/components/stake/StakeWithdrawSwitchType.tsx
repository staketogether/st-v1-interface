import styled from 'styled-components'

export default function StakeWithdrawSwitchType() {
  return (
    <Container>
      <Card>
        <header>
          <h4>Pool</h4>
        </header>
      </Card>
      <Card></Card>
      <Card></Card>
    </Container>
  )
}

const { Container, Card } = {
  Container: styled.div`
    display: flex;
    gap: 8px;
    padding: 8px;
  `,
  Card: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    border-radius: 16px;
    background: white;
    .active {
      border: 2px solid #7154b7;
    }
    > header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      > h4 {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
  `
}
