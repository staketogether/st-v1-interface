import { chainConfigByChainId } from '@/config/chain'
import styled from 'styled-components'
import { useAccount } from 'wagmi'
import NetworkIcon from '../NetworkIcon'
import { capitalize } from '@/config/utils'

interface LayoutNetworkDropdownProps {
  mobile?: boolean
}

export default function LayoutNetworkDropdown({ mobile }: LayoutNetworkDropdownProps) {
  const { chain } = useAccount()

  if (!chain) {
    return null
  }

  const chainConfig = chainConfigByChainId(chain?.id)

  return (
    <Container>
      <NetworkIcon chain={chain?.id} size={24} />
      {!mobile && <CurrentNetwork>{capitalize(chainConfig.name.replaceAll('-', ' '))}</CurrentNetwork>}
    </Container>
  )
}

const { Container, CurrentNetwork } = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    height: 32px;
    background: ${({ theme }) => theme.colorV2.gray[2]};
    border-radius: 8px;
    padding: 0px 10px;
    transition: background-color 0.1s ease;
    box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.3);
    font-size: 14px;
    cursor: pointer;

    &:hover {
      background: ${({ theme }) => theme.colorV2.purple[1]};

      div {
        color: ${({ theme }) => theme.color.white};
      }
    }
  `,
  CurrentNetwork: styled.div`
    color: ${({ theme }) => theme.colorV2.gray[1]};
  `
}
