import stIcon from '@assets/icons/empty-pool-info.svg'
import Image from 'next/image'
import { styled } from 'styled-components'

type StakeEmptyPoolInfoProps = {
  message: string
}

export default function StakeEmptyPoolInfo({ message }: StakeEmptyPoolInfoProps) {
  return (
    <Container>
      <Image src={stIcon} width={120} height={120} alt='empty state' />
      <h4>{message}</h4>
    </Container>
  )
}

const { Container } = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px 0px;
    gap: 16px;
    > h4 {
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
    }
  `
}
