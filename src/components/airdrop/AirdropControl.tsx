import useConnectedAccount from '@/hooks/useConnectedAccount'
import React from 'react'
import { FiExternalLink } from 'react-icons/fi'
import styled from 'styled-components'

export default function AirdropControl() {
  const { accountIsConnected } = useConnectedAccount()
  return (
    <Container>
      <AirdropContainer>
        <h1>welcome to StakeTogether </h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
          it to make a type specimen book.
        </p>
        {!accountIsConnected && (
          <WalletDisconnectedContainer>
            <button>Connect Wallet</button>
            <button className='ghost'>Read announcement</button>
          </WalletDisconnectedContainer>
        )}
        <DescribeContainer>
          <header>
            <h3>Criterios de Elegibilidade</h3>
            <div>
              <span>learn more</span>
              <ExternalLink />
            </div>
          </header>
        </DescribeContainer>
        <EligibilityList>
          <Row>
            <div>Pools</div>
            <span>100 SETH</span>
          </Row>
        </EligibilityList>
      </AirdropContainer>
    </Container>
  )
}

const {
  Container,
  AirdropContainer,
  WalletDisconnectedContainer,
  DescribeContainer,
  ExternalLink,
  EligibilityList,
  Row
} = {
  Container: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    justify-content: center;
  `,
  AirdropContainer: styled.section`
    width: 100%;
    max-width: 720px;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
    text-align: center;
    align-items: center;

    background-color: ${({ theme }) => theme.color.whiteAlpha[600]};
    border: none;
    border-radius: ${({ theme }) => theme.size[16]};
    transition: background-color 0.2s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};
    padding: ${({ theme }) => theme.size[24]};

    > h1 {
      font-size: ${({ theme }) => theme.font.size[24]};
      color: ${({ theme }) => theme.color.primary};
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    > p {
      font-size: ${({ theme }) => theme.font.size[16]};
      color: ${({ theme }) => theme.color.primary};
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  `,
  WalletDisconnectedContainer: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[12]};

    button {
      border-radius: ${props => props.theme.size[16]};
      transition: background-color 0.2s ease;
      height: 48px;

      font-size: ${({ theme }) => theme.font.size[14]};
      font-weight: 400;

      display: flex;
      align-items: center;
      justify-content: center;
      gap: ${({ theme }) => theme.size[8]};

      border: none;
      color: ${({ theme }) => theme.color.white};
      background: ${({ theme }) => theme.color.primary};
      padding: 0px ${({ theme }) => theme.size[12]};

      &:hover {
        background: ${({ theme }) => theme.color.blue[600]};
      }

      &.ghost {
        border: 1px solid ${({ theme }) => theme.color.primary};
        color: ${({ theme }) => theme.color.primary};
        background: transparent;

        &:hover {
          border: none;
          color: ${({ theme }) => theme.color.white};
          background: ${({ theme }) => theme.color.primary};
        }
      }
    }
  `,
  DescribeContainer: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};

    > header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.color.primary};
      font-style: normal;
      line-height: normal;

      > h3 {
        font-weight: 500;
      }
      > div {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.size[4]};
        > span {
          font-weight: 400;
        }
      }
    }
  `,
  EligibilityList: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};
  `,
  Row: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-size: ${({ theme }) => theme.font.size[16]};
    color: ${({ theme }) => theme.color.primary};
    font-style: normal;
    line-height: normal;
    font-weight: 400;

    > div {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[8]};
    }
  `,
  ExternalLink: styled(FiExternalLink)`
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
  `
}
