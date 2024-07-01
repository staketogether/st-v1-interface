import { Select } from 'antd'
import styled from 'styled-components'
import NetworkIcon from '../../shared/NetworkIcon'
import { AssetNetwork } from '@/types/Asset'
import { handleNetworksList } from '@/services/format'

interface AssetNetworkSwitchProps {
  title: string
  networks: AssetNetwork[]
  chainId: number
  onChange?: (data: AssetNetwork) => void
}

export default function AssetNetworkSwitch({ title, networks, onChange, chainId: currentChainId }: AssetNetworkSwitchProps) {
  const uniqueBlockchains = handleNetworksList(networks)

  const optionsList = uniqueBlockchains.map(option => {
    return {
      value: option.chainId,
      key: option.chainId,
      label: (
        <NetWorkItem>
          <NetworkIcon chain={option.chainId} size={24} />
          <span>{option.name}</span>
        </NetWorkItem>
      )
    }
  })
  const handleChange = (chainId: number) => {
    const network = networks.find(n => n.chainId === chainId)
    if (network && onChange) {
      onChange(network)
    }
  }
  return (
    <Content>
      <span>{title}</span>
      <Select
        defaultValue={currentChainId}
        style={{ width: '100%', height: '56px', outline: 'none' }}
        onChange={handleChange}
        options={optionsList}
      />
    </Content>
  )
}

const { Content, NetWorkItem } = {
  Content: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[4]};
    font-size: ${({ theme }) => theme.font.size[13]};
    width: 100%;
    &.disabled {
      > span {
        opacity: 0.5;
      }
    }
  `,
  NetWorkItem: styled.div`
    width: inherit;
    display: flex;
    gap: ${({ theme }) => theme.size[4]};
    align-items: center;
    > span {
      font-size: 22px;
      font-weight: 400;
      line-height: 26px;
    }
  `
}
