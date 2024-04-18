import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import stLogoDesktop from '../../../../public/assets/stake-together-desk.svg'

export default function LayoutHeaderClean() {
  const { query } = useRouter()
  const { currency, network } = query

  return (
    <Container>
      <Link href={`/${network}/${currency}/product`}>
        <Image src={stLogoDesktop} alt={'stakeTogether'} width={162} height={27} />
      </Link>
    </Container>
  )
}

const { Container } = {
  Container: styled.header`
    width: 100%;
    display: grid;
    justify-content: center;
    align-items: center;
    height: 80px;
  `
}
