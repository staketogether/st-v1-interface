import { Tooltip } from 'antd'
import { ReactNode, useState } from 'react'
import styled, { useTheme } from 'styled-components'

export type ItemsKey = string

export interface TabsItems {
  key: ItemsKey
  label: string | ReactNode
  children: ReactNode
  icon?: ReactNode
  disabled?: boolean
  tooltip?: string
  tooltipOpen?: boolean
  color?: 'primary' | 'purple'
  onChange?: () => void
}

interface TabsProps {
  items: TabsItems[]
  defaultActiveKey?: ItemsKey
  onChangeActiveTab?: (value: string | number) => void
  gray?: boolean
}

export default function Tabs({ onChangeActiveTab, items, defaultActiveKey, gray }: TabsProps) {
  const [activeKey, setActiveKey] = useState<ItemsKey>(defaultActiveKey ? defaultActiveKey : items[0].key)

  const handleClickTab = (key: ItemsKey, disabled: boolean, callBack: (() => void) | undefined) => {
    if (!disabled) {
      setActiveKey(key)
      if (onChangeActiveTab) {
        onChangeActiveTab(key)
      }
      if (callBack) {
        callBack()
      }
    }
  }
  const activeChildren = items.find(item => item.key === activeKey)

  const theme = useTheme()
  return (
    <Container>
      <TabsContainer>
        {items.map(item => {
          if (item.tooltip) {
            return (
              <Tooltip
                title={<TooltipText>{item.tooltip}</TooltipText>}
                key={item.key}
                open={item.tooltipOpen ? true : undefined}
                color={theme.colorV2.blue[1]}
              >
                <TabItem
                  className={`
                  ${activeKey === item.key ? 'active' : ''}
                  ${item.disabled ? 'disabled' : ''}
                  ${gray ? 'gray' : ''}
                  `}
                  onClick={() => handleClickTab(item.key, !!item.disabled, item.onChange)}
                >
                  {item.icon}
                  {item.label}
                </TabItem>
              </Tooltip>
            )
          }
          return (
            <TabItem
              key={item.key}
              className={`
              ${activeKey === item.key ? 'active' : ''}
               ${item.disabled ? 'disabled' : ''}
               ${gray ? 'gray' : ''}
               `}
              onClick={() => handleClickTab(item.key, !!item.disabled, item.onChange)}
            >
              {item.icon}
              {item.label}
            </TabItem>
          )
        })}
      </TabsContainer>
      {activeChildren?.children}
    </Container>
  )
}

const { Container, TabItem, TabsContainer, TooltipText } = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
  `,
  TabsContainer: styled.div`
    width: 100%;
    box-shadow: ${({ theme }) => theme.shadow[100]};
    height: 48px;

    display: flex;
    align-items: center;
    border-radius: 8px 8px 0 0;

    overflow-y: auto;
    &::-webkit-scrollbar-thumb {
      background-color: transparent;
    }

    &::-webkit-scrollbar {
      display: none;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      > div:nth-child(1) {
        margin-left: -8px;
      }
    }
  `,
  TabItem: styled.div`
    cursor: pointer;
    height: 48px;
    display: flex;
    width: 100%;
    gap: ${({ theme }) => theme.size[8]};
    align-items: center;
    justify-content: center;

    font-weight: 400;
    color: ${({ theme }) => theme.colorV2.gray[1]};
    border-bottom: 1px solid ${({ theme }) => theme.color.transparent};

    &:last-of-type {
      padding-right: 16px;
    }

    &.active {
      &.primary {
        color: ${({ theme }) => theme.colorV2.purple[1]};
      }
      &.purple {
        color: ${({ theme }) => theme.colorV2.purple[1]};
      }
    }

    font-size: ${({ theme }) => theme.font.size[14]};
    &.active {
      color: ${({ theme }) => theme.colorV2.purple[1]};
      border-bottom: 1px solid ${({ theme }) => theme.colorV2.purple[1]};
    }

    &.disabled {
      cursor: not-allowed;
      &:hover {
        color: ${({ theme }) => theme.color.blackAlpha[500]};
      }
    }

    &:hover {
      color: ${({ theme }) => theme.color.secondary};
    }

    &.gray {
      color: ${({ theme }) => theme.colorV2.gray[1]};
      border-bottom: 1px solid ${({ theme }) => theme.color.transparent};
    }
  `,
  TooltipText: styled.span`
    display: flex;
    font-size: ${({ theme }) => theme.font.size[14]};
    text-align: center;
    font-weight: 500;
  `
}
