import Link from 'next/link'
import styled from 'styled-components'

export default function LayoutFooter() {
  const date = new Date()
  return (
    <Container>
      <span>
        © {date.getFullYear()} Stake Together | Powered by
        <Link href='https://ssv.network/tech/#ssv-dvt-at-hight-level' target='_blank'>
          {`DVT on SSV.Network`}
        </Link>
      </span>
    </Container>
  )
}
const { Container } = {
  Container: styled.div`
    width: 100%;
    padding: 16px 32px;
    gap: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    a {
      color: ${({ theme }) => theme.color.secondary};
      margin-left: 3px;

      &:hover {
        opacity: 0.8;
      }
    }

    > span {
      font-size: ${({ theme }) => theme.font.size[14]};
      line-height: 22px;
      text-align: center;
      display: flex;
      align-items: center;
    }
  `
}
