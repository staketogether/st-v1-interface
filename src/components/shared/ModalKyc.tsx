import { AiOutlineClose } from "react-icons/ai";
import Modal from "./Modal";
import styled from "styled-components";
import useLocaleTranslation from "@/hooks/useLocaleTranslation";
import { useState } from "react";

interface EditKycInfoProps {
  isOpen: boolean,
  onClose: () => void
}

export default function ModalKyc({ isOpen, onClose }: EditKycInfoProps) {
  const [isChecked, setIsChecked] = useState("cpf")
  const { t } = useLocaleTranslation()

  return (
    <Modal showHeader={false} isOpen={isOpen} onClose={onClose}>
      <ContainerEdit>
        <ModalHeader>
          <span>{t('editAccount.kyc.updateKyc')}</span>
          <button onClick={onClose}>
            <AiOutlineClose/>
          </button>
        </ModalHeader>
        <span>{t('editAccount.kyc.updateKycMessage')}</span>
        <Wrapper>
          <label>{t('editAccount.kyc.accountType')}</label>
          <WrapperField>
            <div>
              <span>{t('editAccount.kyc.cpf')}</span>
              <input type="radio" checked={isChecked == 'cpf' && true} value="cpf" onChange={(e) => setIsChecked(e.target.value)}/>
            </div>
            <div>
              <span>{t('editAccount.cnpj')}</span>
              <input type="radio" value="cnpj" checked={isChecked == 'cnpj' && true} onChange={(e) => setIsChecked(e.target.value)} />
            </div>
          </WrapperField>
        </Wrapper>
        <Wrapper>
          <label>{t('editAccount.kyc.fullName')}</label>
          <WrapperField>
            <input type="text" placeholder="Insira seu nome igual ao do seu documento"/>
          </WrapperField>
        </Wrapper>
        <Wrapper>
          <label>{t('editAccount.email')}</label>
          <WrapperField>
            <input type="text" placeholder="Insira seu email para contato"/>
          </WrapperField>
        </Wrapper>
        <Wrapper>
          {isChecked == 'cpf' ?
            <>
              <label> {t('editAccount.kyc.cpf')}</label>
              <WrapperField>
                <input type="text" placeholder="000.000.000-00" />
              </WrapperField>
            </>
        :
            <>
              <label> {t('editAccount.cnpj')}</label>
              <WrapperField>
                <input type="text" placeholder="00.000.000/0001-00" />
              </WrapperField>
            </>
        }
        </Wrapper>
        <Wrapper>
          <label>{t('editAccount.kyc.birthday')}</label>
          <WrapperField>
            <input type="text" placeholder="00/00/00" />
          </WrapperField>
        </Wrapper>
        <button>{t('editAccount.kyc.updateKyc')}</button>
      </ContainerEdit>
    </Modal>
  )
}


const { WrapperField, ContainerEdit, Wrapper, ModalHeader } = {
  ModalHeader: styled.header`
  display: flex;
  justify-content: space-between;
  span {
    font-size: ${({ theme }) => theme.font.size[18]};
    font-weight: 500;
    color: ${({ theme }) => theme.colorV2.gray[1]};
  }

  button {
    gap: 10px;
    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.color.white} !important;
    box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.20);
      width: 32px !important;
      height: 32px !important;
     svg {
      flex-shrink: 0;
      color: ${({ theme }) => theme.colorV2.blue[3]};
      cursor: pointer;
      width: 16px;
      height: 16px;
  }
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
  `,
  WrapperField: styled.div`
  display: flex;
  height: 40px;
  padding: 0px ${({ theme }) => theme.size[16]};
  gap: ${({ theme }) => theme.size[24]};
  border-radius: ${({ theme }) => theme.size[8]};
  border: 0;
  outline: 0;
  background: ${({ theme }) => theme.colorV2.gray[2]};
  box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.20);
  align-items: center;

  div {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
  }
  input {
    width: 100%;
    height: 100%;
    border: 0;
    outline: 0;
    background: transparent;
  }
  `,
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[4]};

    span {
    color: ${({ theme }) => theme.colorV2.gray[1]};
    }
  `
}