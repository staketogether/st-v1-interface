import Modal from "./Modal";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import useLocaleTranslation from "@/hooks/useLocaleTranslation";
import { useState } from "react";

interface EditPixInfoProps {
  isOpen: boolean,
  onClose: () => void
}

export default function ModalPix({ isOpen, onClose }: EditPixInfoProps) {
  const [pixkeyType, setPixKeyType] = useState("celular")
  const { t } = useLocaleTranslation()

  function handlePixKeyType() {
    if (pixkeyType === 'celular') {
      return (
        <>
        <label> {t('editAccount.mobilePhone')}</label>
        <WrapperField>
          <input type="cel" placeholder='+55' />
        </WrapperField>
        </>
      )
    } else if (pixkeyType === 'cpf') {
      return (
        <>
          <label> {t('editAccount.kyc.cpf')}</label>
          <WrapperField>
            <input type="text" placeholder='000.000.000-00' />
          </WrapperField>
        </>
      )
    } else if (pixkeyType === 'cnpj') {
      return (
        <>
          <label> {t('editAccount.cnpj')}</label>
          <WrapperField>
            <input type="text" placeholder='00.000.000/0001-00' />
          </WrapperField>
        </>
      )
    }
  }

  return (
    <Modal showHeader={false} isOpen={isOpen} onClose={onClose}>
      <ContainerEdit>
        <ModalHeader>
          <span>{t('editAccount.addPixKey')}</span>
          <button onClick={onClose}>
            <AiOutlineClose onClick={onClose} />
          </button>
        </ModalHeader>
        <Wrapper>
          <label>{t('v2.ramp.offRamp.pixKey')}</label>
          <WrapperField>
            <select onChange={(e) => setPixKeyType(e.target.value)}>
              <option value="celular">{t('editAccount.mobilePhone')}</option>
              <option value="cpf">{t('editAccount.kyc.cpf')}</option>
              <option value="cnpj">{t('editAccount.cnpj')}</option>
            </select>
          </WrapperField>
        </Wrapper>
        <Wrapper>
          {handlePixKeyType()}
        </Wrapper>
        <button>{t('editAccount.registerNewPixKey')}</button>
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
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[4]};

    span {
    color: ${({ theme }) => theme.colorV2.gray[1]};
    }
  `
}