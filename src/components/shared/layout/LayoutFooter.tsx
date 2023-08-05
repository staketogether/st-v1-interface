import styled from 'styled-components'
import packageData from '../../../../package.json'

export default function LayoutFooter() {
  const date = new Date()
  return (
    <Container>
      <span>{`Alpha v${packageData.version} | © ${date.getFullYear()} Stake Together`}</span>
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
