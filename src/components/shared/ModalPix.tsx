import Modal from "./Modal";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import { WrapperInfo } from "./EditAccount";
import useLocaleTranslation from "@/hooks/useLocaleTranslation";

interface EditPixInfoProps {
  isOpen: boolean,
  onClose: () => void
}


export default function ModalPix({ isOpen, onClose }: EditPixInfoProps) {
  const { t } = useLocaleTranslation()

  return (
    <Modal showHeader={false} isOpen={isOpen} onClose={onClose}>
      <ContainerEdit>
        <ModalHeader>
          <span>Add Pix Key</span>
          <AiOutlineClose onClick={onClose} />
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
  `,
}