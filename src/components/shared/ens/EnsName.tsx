import styled from 'styled-components'

import { useEffect, useState } from 'react'
import useEns from '../../../hooks/useEns'
import truncateAddress from '../../../services/truncateAddress'

type EnsNameProps = {
  address: `0x${string}`
}

export default function EnsName({ address }: EnsNameProps) {
  const { name } = useEns(address)

  const [nameEl, setNameEl] = useState(<Text>{truncateAddress(address)}</Text>)

  useEffect(() => {
    if (name) {
      setNameEl(<Text>{name}</Text>)
    } else {
      setNameEl(<Text>{truncateAddress(address)}</Text>)
    }
  }, [address, name])

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
  `
}
