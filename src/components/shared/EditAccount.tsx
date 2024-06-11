import { FiTrash2 } from 'react-icons/fi'
import styled from 'styled-components'


export default function EditAccount() {

  return (
    <>
      <Container>
        <FormSection>
          <h3>Profile</h3>
          <div>
            <label htmlFor="">User Name</label>
            <Input type="text" placeholder="Samuel" />
          </div>
          <div>
            <label htmlFor="">E-mail</label>
            <Input type="text" placeholder="email@exemple.com" />
          </div>
          <Button>Edit</Button>
        </FormSection>
        <FormSection>
          <h3>KYC</h3>
          <KYCard>
            <div>
              <label htmlFor="">KYC Level:</label>
              <Input type="text" placeholder="0" />
            </div>
            <div>
              <label htmlFor="">Limite de compra:</label>
              <Input type="text" placeholder="R$ 0" />
            </div>
            <div>
              <label htmlFor="">Limite usado:</label>
              <Input type="text" placeholder="R$ 0" />
            </div>
          </KYCard>
          <Button>Atualizar KYC</Button>
        </FormSection>
        <FormSection>
          <h3>Chave PIX</h3>
          <Wrapper>
            <div>
              <label htmlFor="">Chave PIX</label>
              <Input type="text" placeholder="fulano@gmail.com" />
           </div>
            <FiTrash2 size={24}/>
          </Wrapper>
          <Button>Cadastrar nova chave</Button>
        </FormSection>
        <FormSection>
          <h3>Wallets</h3>
          <Wrapper>
            <div>
              <label htmlFor="">Address</label>
              <Input type="text" placeholder="0x4f...d862A" />
            </div>
            <FiTrash2 size={24}/>
          </Wrapper>
          <Button>Cadastrar nova chave</Button>
        </FormSection>
      </Container>
    </>
  )
}


export const { Container, FormSection, KYCard, Wrapper, Input, Button } = {
  Container: styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

`,
  FormSection: styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  h3 {
    font-size: ${({ theme }) => theme.font.size[15]};
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: ${({ theme }) => theme.colorV2.gray[1]};
  }

  div {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[4]};

    label {
    color: ${({ theme }) => theme.colorV2.gray[1]};
    }
  }
`,
  Input: styled.input`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colorV2.gray[6]};
  border-radius: ${({ theme }) => theme.size[8]};
  outline: 0;
  font-weight: 500;
  font-size: ${({ theme }) => theme.font.size[15]};
`,
  Button: styled.button`
  padding: 10px;
  background-color: #4a4aad;
  color: ${({ theme }) => theme.color.white};
  border: none;
  border-radius: ${({ theme }) => theme.size[8]};
  cursor: pointer;

  &:hover {
    background-color: #3939a2;
  }
  `,
  KYCard: styled.div`
  border: 1px solid ${({ theme }) => theme.colorV2.gray[6]};
  border-radius: ${({ theme }) => theme.size[4]};
  padding: ${({ theme }) => theme.size[8]};
  flex-direction: row !important;
  justify-content: space-between;
  border-radius: ${({ theme }) => theme.size[8]};

  div {
    width: 100%;
  }

  div:nth-child(3) {
    flex: 1;
    align-items: flex-end;

    label {
      white-space: nowrap;
    }
  }
 
  input {
    border: 0;
    padding: 0;
    width: 100%;
    color: ${({ theme }) => theme.colorV2.gray[1]};
    font-weight: bold;
    font-size: ${({ theme }) => theme.font.size[15]};
  }
  `,
  Wrapper: styled.div`
  border: 1px solid ${({ theme }) => theme.colorV2.gray[6]};
  border-radius: ${({ theme }) => theme.size[4]};
  padding: ${({ theme }) => theme.size[8]};
  flex-direction: row !important;
  justify-content: space-between;
  align-items: center;
  border-radius: ${({ theme }) => theme.size[8]};

 div {
  width :100%;
   label {
    color: ${({ theme }) => theme.color.gray[400]} !important;
  }

  input {
    border: 0;
    padding: 0;
    width: 100%;
  }
 }
  `
}