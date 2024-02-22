import React from 'react'
import styled from 'styled-components'
import EthereumDeposit from './EthereumDeposit'
import { useRouter } from 'next/router'
import Link from 'next/link'
import EthereumWithdraw from './EthereumWithdraw'

type EthereumFormControlProps = {
  type: 'deposit' | 'withdraw'
}
export default function EthereumFormControl({ type }: EthereumFormControlProps) {
  const { query } = useRouter()
  const { currency, network } = query

  return (
    <EthereumContainer>
      <header>
        <nav>
          <ul>
            <li className={`${type === 'deposit' && 'activated'}`}>
              <Link href={`/${network}/${currency}/`}>Investir</Link>
            </li>
            <li className={`${type === 'withdraw' && 'activated'}`}>
              <Link href={`/${network}/${currency}/withdraw`}>Resgatar</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div>{type === 'deposit' ? <EthereumDeposit type={type} /> : <EthereumWithdraw type={type} />}</div>
    </EthereumContainer>
  )
}

const { EthereumContainer } = {
  EthereumContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    nav {
      ul {
        display: flex;
        gap: ${({ theme }) => theme.size[24]};
        align-items: center;
        li {
          height: 24px;
          font-size: ${({ theme }) => theme.font.size[15]};
          font-weight: 400;
          cursor: pointer;

          position: relative;
          display: inline-block;
          text-decoration: none;
          overflow: hidden;

          &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 1px;
            bottom: 0;
            left: 0;
            background-color: ${({ theme }) => theme.colorV2.purple[1]};
            transform: scaleX(0);
            transform-origin: bottom left;
            transition: transform 0.3s ease-out;
          }
          &:hover {
            a {
              color: ${({ theme }) => theme.colorV2.purple[1]};
              opacity: 1;
            }
          }

          &:hover::after {
            transform: scaleX(1);
          }

          &.activated::after,
          &.activated:hover::after {
            transform: scaleX(0);
            transition: none;
          }

          &.activated {
            border-bottom: 1px solid ${({ theme }) => theme.colorV2.purple[1]};
            a {
              color: ${({ theme }) => theme.colorV2.purple[1]};
              opacity: 1;
            }
          }

          a {
            color: ${({ theme }) => theme.colorV2.gray[1]};
            opacity: 0.6;
          }
        }
      }
    }
  `
}
