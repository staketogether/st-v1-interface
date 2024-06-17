import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { useState } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { AiOutlineClose } from "react-icons/ai";
import Modal from './Modal'
import styled from 'styled-components'
import ModalProfile from './ModalProfile';
import { useAccount } from 'wagmi';
import userKyc from '@/hooks/useKyc';

export default function EditAccount() {
  const [isModalProfileOpen, setIsModalProfileOpen] = useState(false)
  const [isModalPixOpen, setIsModalPixOpen] = useState(false)

  const { address } = useAccount()
  
  const { data } = userKyc(address)
  
  const { t } = useLocaleTranslation()

  return (
    <>
      <Container>
        <Section>
          <Header>
            <h3>{t('web3AuthWalletSettings.profile')}</h3>
            <Button onClick={() => setIsModalProfileOpen(true)}>{t('soon')}</Button>
          </Header>
          <WrapperInfo>
            <span>{t('web3AuthWalletSettings.userName')}</span>
            <Span>Nome</Span>
          </WrapperInfo>
          <WrapperInfo>
            <span>{t('web3AuthWalletSettings.email')}</span>
            <Span>email@exemple.com</Span>
          </WrapperInfo>
        </Section>
        <Section>
          <Header>
            <h3>KYC</h3>
            <Button onClick={() => setIsModalPixOpen(true)}>{t('soon')}</Button>
          </Header>
          <KYCard>
            <WrapperInfo>
              <span>{t('web3AuthWalletSettings.kycLevel')}:</span>
              <span>0</span>
            </WrapperInfo>
            <WrapperInfo>
              <span>{t('web3AuthWalletSettings.purchaseLimit')}:</span>
              <span>R$ 0</span>
            </WrapperInfo>
            <WrapperInfo>
              <span>{t('web3AuthWalletSettings.limitUsed')}:</span>
              <span>R$ 0</span>
            </WrapperInfo>
          </KYCard>
        </Section>
        <Section>
          <Header>
            <h3>{t('web3AuthWalletSettings.pixKey')}</h3>
            <Button disabled>{t('soon')}</Button>
          </Header>
          <Wrapper>
            <WrapperInfo>
              <span >{t('web3AuthWalletSettings.pixKey')}</span>
              <span>email@exemple.com</span>
            </WrapperInfo>
            <FiTrash2 size={24} />
          </Wrapper>
        </Section>
        <Section>
          <Header>
            <h3>{t('web3AuthWalletSettings.wallets')}</h3>
            <Button disabled>{t('soon')}</Button>
          </Header>
          <Wrapper>
            <WrapperInfo>
              <span >{t('web3AuthWalletSettings.address')}</span>
              <span>0x41f45...d862A</span>
            </WrapperInfo>
            <FiTrash2 size={24} />
          </Wrapper>
        </Section>
      </Container>
      {isModalProfileOpen &&
        <ModalProfile isOpen={isModalProfileOpen} onClose={() => setIsModalProfileOpen(false)} />
      }
      {isModalPixOpen &&
        <Modal showHeader={false} isOpen={isModalPixOpen} onClose={() => setIsModalPixOpen(false)}>
          <ContainerEdit>
            <ModalHeader>
              <span>Add Pix Key</span>
              <AiOutlineClose onClick={() => setIsModalPixOpen(false)} />
            </ModalHeader>
            <WrapperInfo>
              <label>{t('v2.ramp.offRamp.pixKey')}</label>
              <WrapperField>
                <select>
                  <option value="celular">Celular</option>
                </select>
              </WrapperField>
            </WrapperInfo>
            <WrapperInfo>
              <label>Celular</label>
              <WrapperField>
                <input type="cel" placeholder='+55' />
              </WrapperField>
            </WrapperInfo>
            <button>Save</button>
          </ContainerEdit>
        </Modal>
      }
     
    </>
  )
}


export const { Container, Section, Header, WrapperInfo, KYCard, Wrapper, Span, WrapperField, Button, ModalHeader, ContainerEdit } = {
  Container: styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.size[24]};
`,
  Section: styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.size[12]};

  h3 {
    font-size: ${({ theme }) => theme.font.size[15]};
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: ${({ theme }) => theme.colorV2.gray[1]};
  }
`,
  Header: styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  `,
  WrapperInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[4]};

    span {
    color: ${({ theme }) => theme.colorV2.gray[1]};
    }
  `,
  Span: styled.span`
  padding: 13px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colorV2.gray[6]};
  border-radius: ${({ theme }) => theme.size[8]};
  outline: 0;
  font-weight: 400;
  font-size: ${({ theme }) => theme.font.size[13]};
  color: ${({ theme }) => theme.colorV2.gray[1]};
  `,
  WrapperField: styled.div`
  display: flex;
  height: 40px;
  padding: 0px ${({ theme }) => theme.size[16]};
  gap: ${({ theme }) => theme.size[4]};
  border-radius: ${({ theme }) => theme.size[8]};
  border: 0;
  outline: 0;
  background: ${({ theme }) => theme.colorV2.gray[2]};
  box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.20);
  align-items: center;
  justify-content: space-between;

  select {
    width: 100%;
    height: 100%;
    background: transparent;
    border: 0;
    outline: 0;
  }

  input {
    width: 100%;
    height: 100%;
    border: 0;
    outline: 0;
    background: transparent;
  }
  `,
  Button: styled.button`
    display: flex;
    height: 24px;
    padding: 0px ${({ theme }) => theme.size[16]};
    justify-content: center;
    align-items: center;
    border-radius: ${({ theme }) => theme.size[4]};
    border: 1px solid ${({ theme }) => theme.color.primary};
    background: transparent;
    outline: 0;
    color: ${({ theme }) => theme.color.primary};
    font-weight: 500;

    &:disabled {
      opacity: 0.4;
    }
  `,
  KYCard: styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colorV2.gray[6]};
  border-radius: ${({ theme }) => theme.size[4]};
  padding: ${({ theme }) => theme.size[8]};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: ${({ theme }) => theme.size[8]};
  align-items: center;
  align-self: stretch;

  div {
    width: auto;
    span {
      font-size: ${({ theme }) => theme.font.size[12]};
      font-weight: 400;
    }
    span:nth-child(2) {
      font-size: ${({ theme }) => theme.font.size[15]};
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      align-self: left;
    }

     @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      span {
            font-size: ${({ theme }) => theme.font.size[13]};
      }
     }
  }
  `,
  Wrapper: styled.div`
  border: 1px solid ${({ theme }) => theme.colorV2.gray[6]};
  border-radius: ${({ theme }) => theme.size[4]};
  padding: ${({ theme }) => theme.size[8]};
  display: flex;
  flex-direction: row !important;
  justify-content: space-between;
  align-items: center;
  border-radius: ${({ theme }) => theme.size[8]};

   span {
    color: ${({ theme }) => theme.color.gray[400]};
  }
  span:nth-child(2) {
    color: ${({ theme }) => theme.colorV2.gray[1]};
    font-weight: 500;
  }

 svg {
  cursor: pointer;
 }
  `,
  ModalHeader: styled.header`
  display: flex;
  justify-content: space-between;
  span {
    font-size: ${({ theme }) => theme.font.size[18]};
    font-weight: 500;
    color: ${({ theme }) => theme.colorV2.gray[1]};
  }
  svg {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    color: ${({ theme }) => theme.colorV2.blue[3]};
    cursor: pointer;
  }
  `,
  ContainerEdit: styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.size[24]};

  button {
    display: flex;
    height: 40px;
    padding: 0px ${({ theme }) => theme.size[16]};
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.size[4]};
    align-self: stretch;
    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.white};
    border: 0;
    outline: 0;
    font-size: ${({ theme }) => theme.font.size[14]};
    font-weight: 500;
  }

  `
}