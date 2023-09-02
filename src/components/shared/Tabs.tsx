import { Tooltip } from 'antd'
import { ReactNode, useState } from 'react'
import styled from 'styled-components'

export type ItemsKey = number | string

export type TabsItems = {
  key: ItemsKey
  label: string
  children: ReactNode
  icon?: ReactNode
  disabled?: boolean
  tooltip?: string
  color?: 'primary' | 'purple'
  onChange?: () => void
}

interface TabsProps {
  items: TabsItems[]
  defaultActiveKey?: ItemsKey
  onChangeActiveTab?: (value: string | number) => void
}

export default function Tabs({ onChangeActiveTab, items, defaultActiveKey }: TabsProps) {
  const [activeKey, setActiveKey] = useState<ItemsKey>(defaultActiveKey ? defaultActiveKey : items[0].key)

  const handleClickTab = (key: ItemsKey, disabled: boolean, callBack: (() => void) | undefined) => {
    if (!disabled) {
      setActiveKey(key)
      onChangeActiveTab && onChangeActiveTab(key)
      callBack && callBack()
    }
  }

  const activeChildren = items.find(item => item.key === activeKey)

  return (
    <Container>
      <TabsContainer>
        {items.map(item => {
          if (item.tooltip) {
            return (
              <Tooltip title={item.tooltip} key={item.key}>
                <TabItem
                  className={`
           
                  ${item.disabled && 'disabled'}
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
               ${item.disabled && 'disabled'}
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

const { Container, TabItem, TabsContainer } = {
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

    overflow-y: auto;
    &::-webkit-scrollbar-thumb {
      background-color: transparent;
    }

    &::-webkit-scrollbar {
      display: none;
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

    font-weight: 500;
    color: ${({ theme }) => theme.colorV2.gray[1]};
    border-bottom: 1px solid ${({ theme }) => theme.color.transparent};

    &.active {
      &.primary {
        color: ${({ theme }) => theme.color.secondary};
      }
      &.purple {
        color: ${({ theme }) => theme.color.secondary};
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
  `
}
