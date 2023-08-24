import styled from 'styled-components'
import { Tooltip } from 'antd'
import { ReactNode, useState } from 'react'

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
  size: 'small' | 'middle' | 'large'
  onChangeActiveTab?: (value: string | number) => void
}

export default function Tabs({ onChangeActiveTab, items, defaultActiveKey, size }: TabsProps) {
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
      <TabsContainer className={`${size}`}>
        {items.map(item => {
          if (item.tooltip) {
            return (
              <Tooltip title={item.tooltip} key={item.key}>
                <TabItem
                  className={`
                  ${activeKey === item.key ? 'active' : ''} 
                  ${size} 
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
               ${size} 
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
    border-bottom: 1px solid ${({ theme }) => theme.color.blue[50]};

    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[24]};

    overflow-y: auto;
    &::-webkit-scrollbar-thumb {
      background-color: transparent;
    }

    &::-webkit-scrollbar {
      display: none;
    }

    &.middle {
      padding: 0px ${({ theme }) => theme.size[24]};
    }

    &.large {
      padding: 0px ${({ theme }) => theme.size[24]};
    }
  `,
  TabItem: styled.div`
    cursor: pointer;

    display: flex;
    width: 100%;
    gap: ${({ theme }) => theme.size[8]};
    align-items: center;
    justify-content: center;

    font-style: normal;
    font-weight: 400;
    color: ${({ theme }) => theme.color.primary};

    &.active {
      &.primary {
        color: ${({ theme }) => theme.color.secondary};
      }
      &.purple {
        color: ${({ theme }) => theme.color.secondary};
      }
    }

    &.small {
      padding: ${({ theme }) => theme.size[8]} 2px;
      font-size: ${({ theme }) => theme.font.size[14]};
      &.active {
        border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
      }
    }

    &.middle {
      padding: ${({ theme }) => theme.size[12]} 2px;
      font-size: ${({ theme }) => theme.font.size[14]};
      &.active {
        border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
      }
    }

    &.large {
      padding: ${({ theme }) => theme.size[12]} 2px;
      font-size: ${({ theme }) => theme.font.size[16]};
      &.active {
        border-bottom: 2px solid ${({ theme }) => theme.color.secondary};
      }
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
