import styled from 'styled-components'
import packageData from '../../../../package.json'

export default function LayoutFooter() {
  const date = new Date()
  return (
    <Container>
      <span>{`© ${date.getFullYear()} Stake Together `}</span>
      <span>{`v${packageData.version}`}</span>
    </Container>
  )
}
const { Container } = {
  Container: styled.div`
    width: 100%;
    gap: ${({ theme }) => theme.size[16]};
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${({ theme }) => theme.colorV2.blue[2]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    padding: 16px 24px;

    a {
      margin-left: 3px;

      &:hover {
        opacity: 0.8;
      }
    }

    > span {
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.colorV2.white};

      text-align: center;
      display: flex;
      align-items: center;
    }

    > span:nth-child(2) {
      color: ${({ theme }) => theme.colorV2.purple[2]};
    }
  `
}
