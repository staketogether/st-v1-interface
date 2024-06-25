import styled from "styled-components"
import Modal from "./Modal"
import DefaultButton from '../shared/Button'
import useLocaleTranslation from "@/hooks/useLocaleTranslation"
import { useEffect, useState } from "react"
import { PiArrowRight, PiEye } from "react-icons/pi"
import { AiOutlineClose } from "react-icons/ai"
import { useReactiveVar } from "@apollo/client"
import { web3AuthInstanceVar } from '@/config/web3Auth'

interface walletExportProps {
  notifyModal: boolean,
  setNotifyModal: (value: boolean) => void,
  onClose: () => void
}

export default function ModalExportWallet({ notifyModal, setNotifyModal, onClose }: walletExportProps) {
  const [privateKey, setPrivateKey] = useState<string | null>('')

  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [showPrivateKeyContainer, setShowPrivateKeyContainer] = useState(false)

  const { t } = useLocaleTranslation()

  const web3AuthInstance = useReactiveVar(web3AuthInstanceVar)

  useEffect(() => {
    const getPrivateKey = async () => {
      const targetPrivateKey = await web3AuthInstance?.provider?.request({ method: 'eth_private_key' })
      setPrivateKey(targetPrivateKey as string)
    }
    getPrivateKey()
  }, [web3AuthInstance])

  return (
    <Modal title={t('web3AuthWalletSettings.modal.title')} isOpen={notifyModal} onClose={onClose} width={420}>
      {showPrivateKeyContainer ? (
        <PrivateKeyContainer>
          <h2>{t('web3AuthWalletSettings.privateKeyContainer.title')}</h2>
          <span>{t('web3AuthWalletSettings.privateKeyContainer.description')}</span>
          <ShowPrivateKeyContainer>
            <span className={(!showPrivateKey && 'blur') || ''}>{privateKey}</span>
            {!showPrivateKey && (
              <div>
                <DefaultButton
                  onClick={() => setShowPrivateKey(true)}
                  label={t('web3AuthWalletSettings.privateKeyContainer.showPrivateKey')}
                  block
                  small
                  color='red'
                  icon={<PiEye />}
                />
              </div>
            )}
          </ShowPrivateKeyContainer>
          <span>{t('web3AuthWalletSettings.privateKeyContainer.notify')}</span>
          <DefaultButton
            onClick={() => {
              setShowPrivateKeyContainer(false)
              setShowPrivateKey(false)
            }}
            label={t('close')}
            block
            small
            icon={<AiOutlineClose />}
          />
        </PrivateKeyContainer>
      ) :
        <AlertMessageContainer>
          <div>
            <span className='bold'>{t('web3AuthWalletSettings.modal.description')}</span>
            <span>{t('web3AuthWalletSettings.modal.role1')}</span>
            <span>{t('web3AuthWalletSettings.modal.role2')}</span>
            <span>{t('web3AuthWalletSettings.modal.role3')}</span>
            <span>{t('web3AuthWalletSettings.modal.role4')}</span>
          </div>
          <footer>
            <DefaultButton
              onClick={() => {
                setNotifyModal(false)
                setShowPrivateKeyContainer(true)
              }}
              label={t('next')}
              block
              ghost
              icon={<PiArrowRight />}
            />
            <DefaultButton onClick={onClose} label={t('cancel')} block icon={<AiOutlineClose />} />
          </footer>
        </AlertMessageContainer>
      }
    </Modal>
  )
}


const { AlertMessageContainer, PrivateKeyContainer, ShowPrivateKeyContainer } = {
  AlertMessageContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
    div {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[8]};
      span {
        color: ${({ theme }) => theme.colorV2.gray[1]};
        font-size: 13px;
        font-weight: 400;
        &.bold {
          font-weight: 500;
        }
      }
    }
    > footer {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[4]};
    }
  `,
  PrivateKeyContainer: styled.div`
    width: 100%;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};
    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.color.white};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    font-size: ${({ theme }) => theme.font.size[15]};
    color: ${({ theme }) => theme.colorV2.gray[1]};
    font-weight: 400;
    > h2 {
      font-size: ${({ theme }) => theme.font.size[15]};
      font-weight: 500;
      align-self: start;
    }
    > span {
      font-size: ${({ theme }) => theme.font.size[13]};
      font-weight: 400;
    }
  `,
  ShowPrivateKeyContainer: styled.div`
    width: 100%;
    padding: 12px 16px;
    border: 1px solid ${({ theme }) => theme.colorV2.gray[1]};
    border-radius: ${({ theme }) => theme.size[8]};
    text-align: center;
    position: relative;
    min-height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      display: block;
      max-width: 100%;
      overflow-wrap: break-word;
      &.blur {
        filter: blur(3px);
      }
    }
    > div {
      position: absolute;
    }
  `,
}