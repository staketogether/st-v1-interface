import { styled } from 'styled-components'
import packageData from '../../../../package.json'
import chainConfig from '@/config/chain'

export default function LayoutFooter() {
  const date = new Date()
  const { blockExplorer, contracts } = chainConfig()
  return (
    <Container>
      <span>{`© ${date.getFullYear()} Stake Together `}</span>
      <div>
        <a href={`${blockExplorer.baseUrl}/address/${contracts.StakeTogether}`} target='_blank'>
          Contract
        </a>
        <span>{`v${packageData.version}`}</span>
      </div>
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

    > div {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[16]};
      > span {
        &::before {
          content: '|';
          margin-right: ${({ theme }) => theme.size[16]};
        }
      }
    }

    span {
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.colorV2.white};
    }

    a {
      text-decoration: none;
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.colorV2.white};

      &:hover {
        color: ${({ theme }) => theme.colorV2.purple[2]};
      }
    }
  `
}
