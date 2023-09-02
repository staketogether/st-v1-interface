import chainConfig from '@/config/chain'
import styled from 'styled-components'
import packageData from '../../../../package.json'
import { globalConfig } from '../../../config/global'

export default function LayoutFooter() {
  const date = new Date()
  const { blockExplorer, contracts } = chainConfig()
  const { websiteUrl } = globalConfig
  return (
    <Container>
      <div>
        <div>
          <span>{`v${packageData.version}`}</span>
        </div>
        <span>
          <a href={`${blockExplorer.baseUrl}/address/${contracts.StakeTogether}`} target='_blank'>
            Smart Contract
          </a>
        </span>
      </div>
      <div>
        <a href={`${websiteUrl}`} target='_blank'>
          Website
        </a>
        <span>{`© ${date.getFullYear()} Stake Together `}</span>
      </div>
    </Container>
  )
}
const { Container } = {
  Container: styled.div`
    width: 100%;
    gap: ${({ theme }) => theme.size[8]};
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${({ theme }) => theme.colorV2.blue[2]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    padding: 16px 24px;
    flex-direction: column;

    > div:nth-child(2) {
      display: none;
    }

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

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      flex-direction: row;
      gap: ${({ theme }) => theme.size[16]};

      > div:nth-child(2) {
        display: block;
      }
    }
  `
}
