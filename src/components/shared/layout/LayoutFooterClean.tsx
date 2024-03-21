import styled from 'styled-components'

export default function LayoutFooterClean() {
  const date = new Date()



  return (
    <Container>
      <span>{`© ${date.getFullYear()} Stake Together `}</span>
    </Container>
  )
}
const { Container } = {
  Container: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: ${({ theme }) => theme.shadow[100]};
    
    

    span {
      font-size: ${({ theme }) => theme.font.size[13]};
      color: ${({ theme }) => theme.colorV2.blue[1]};
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
      font-weight: 500;
      line-height: 16px;
      letter-spacing: 0em;
      text-align: center;
    }

  
  `
}
