import { AssetActionType } from '@/types/AssetActionType'
import { Tooltip } from 'antd'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

export interface ActionItem {
  type: string
  label: string
  url: string
  disabled: boolean
  icon: React.JSX.Element
  tooltipLabel: string
}

interface MenuActionsProps {
  typeActive: AssetActionType
  navActionsList: ActionItem[]
}

export default function NavActions({ typeActive, navActionsList }: MenuActionsProps) {
  function handleItemList(action: ActionItem) {
    return (
      <Link href={action.url}>
        <IconContainer>{action.icon}</IconContainer>
        <span>{action.label}</span>
      </Link>
    )
  }

  return (
    <header>
      <Nav>
        <ul>
          {navActionsList.map((action, index) => (
            <>
              {action.tooltipLabel && (
                <li className={`${typeActive === action.type && 'activated'} ${action.disabled && 'disabled'}`} key={`nav-row-${index}`}>
                  <Tooltip title={action.tooltipLabel}>{handleItemList(action)}</Tooltip>
                </li>
              )}
              {!action.tooltipLabel && (
                <li className={`${typeActive === action.type && 'activated'} ${action.disabled && 'disabled'}`} key={`nav-row-${index}`}>
                  {handleItemList(action)}
                </li>
              )}
            </>
          ))}
        </ul>
      </Nav>
    </header>
  )
}

const { Nav, IconContainer } = {
  Nav: styled.nav`
    width: 100%;
    ul {
      display: flex;
      gap: ${({ theme }) => theme.size[4]};
      align-items: center;

      li {
        flex: 1;
        width: 100%;
        a {
          background: ${({ theme }) => theme.colorV2.foreground};

          filter: grayscale(100%);
          opacity: 0.4;

          transition: grayscale 0ms.3 ease-out;

          border-radius: ${({ theme }) => theme.size[8]};
          padding: 8px 0px;
          gap: ${({ theme }) => theme.size[8]};
          cursor: pointer;

          display: flex;
          align-items: center;
          flex-direction: column;
          font-size: ${({ theme }) => theme.font.size[13]};
          color: ${({ theme }) => theme.colorV2.blue[1]};
        }

        span {
          display: flex;
          justify-content: center;
          font-weight: 500;
        }

        &:hover,
        &.activated {
          a {
            opacity: 1;
            filter: none;
          }
        }

        &.disabled {
          cursor: not-allowed;
          a {
            pointer-events: none;
            cursor: not-allowed;
          }
        }
      }
    }
  `,
  IconContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    svg {
      padding: 3px;
      font-size: 26px;
      color: ${({ theme }) => theme.colorV2.white};
      background-color: ${({ theme }) => theme.colorV2.blue[1]};
      border-radius: 99px;
    }
  `
}
