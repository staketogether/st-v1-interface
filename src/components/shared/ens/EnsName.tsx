import styled from 'styled-components'

import { useEffect, useState } from 'react'
import useEns from '../../../hooks/useEns'
import truncateAddress from '../../../services/truncateAddress'
import truncateText from '../../../services/truncateText'
import SkeletonLoading from '../icons/SkeletonLoading'

type EnsNameProps = {
  address: `0x${string}`
  large?: boolean
  slice?: number
}

export default function EnsName({ address, large, slice }: EnsNameProps) {
  const { name, nameLoading } = useEns(address)

  const text = <Text className={large ? 'large' : ''}>{truncateAddress(address)}</Text>

  const [nameEl, setNameEl] = useState(text)

  useEffect(() => {
    if (nameLoading) {
      setNameEl(<SkeletonLoading width={140} height={large ? 15 : 14} />)
    } else if (name) {
      setNameEl(<Text className={large ? 'large' : ''}>{slice ? truncateText(name, slice) : name}</Text>)
    } else {
      setNameEl(<Text className={large ? 'large' : ''}>{truncateAddress(address)}</Text>)
    }
  }, [address, large, name, nameLoading, slice])

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
