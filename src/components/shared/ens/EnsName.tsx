import styled from 'styled-components'

import { useEffect, useState } from 'react'
import useEns from '../../../hooks/useEns'
import truncateAddress from '../../../services/truncateAddress'
import truncateText from '../../../services/truncateText'

type EnsNameProps = {
  address: `0x${string}`
  large?: boolean
  slice?: number
}

export default function EnsName({ address, large }: EnsNameProps) {
  const { name } = useEns(address)

  const text = <Text className={large ? 'large' : ''}>{truncateAddress(address)}</Text>

  const [nameEl, setNameEl] = useState(text)

  useEffect(() => {
    if (name) {
      setNameEl(<Text className={large ? 'large' : ''}>{truncateText(name)}</Text>)
    } else {
      setNameEl(<Text className={large ? 'large' : ''}>{truncateAddress(address)}</Text>)
    }
  }, [address, large, name])

  return nameEl
}

const { Text } = {
  Text: styled.span`
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.black};
    border: 0;
    padding: 0;
    margin: 0;
    display: grid;
    align-items: center;

    &.large {
      font-size: ${({ theme }) => theme.font.size[15]};
    }
  `
}
