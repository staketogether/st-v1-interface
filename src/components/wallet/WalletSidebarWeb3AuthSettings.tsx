import { web3AuthInstanceVar } from '@/config/web3Auth'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { useReactiveVar } from '@apollo/client'
import { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { PiArrowRight } from 'react-icons/pi'
import styled from 'styled-components'
import DefaultButton from '../shared/Button'
import Modal from '../shared/Modal'
import EditAccount from '../shared/EditAccount'

interface web3AuthWalletSettingsProps {
  setWeb3authWalletActive?: (value: boolean) => void
  walletAddress: `0x${string}`
}

export default function WalletSidebarWeb3AuthWalletSettings({
  setWeb3authWalletActive: setIsWalletSidebarWeb3AuthSettingsActive,
}: web3AuthWalletSettingsProps) {
  const [notifyModal, setNotifyModal] = useState(false)

  const { t } = useLocaleTranslation()

  const web3AuthInstance = useReactiveVar(web3AuthInstanceVar)

  useEffect(() => {
    const getPrivateKey = async () => {
    }
    getPrivateKey()
  }, [web3AuthInstance])

  return (
    <>
      <Header>
        <h2>Edit Account</h2>
        <Button onClick={() => setIsWalletSidebarWeb3AuthSettingsActive && setIsWalletSidebarWeb3AuthSettingsActive(false)}>
          <AiOutlineClose />
        </Button>
      </Header>
      <EditAccount />
      <Modal title={t('web3AuthWalletSettings.modal.title')} isOpen={notifyModal} onClose={() => setNotifyModal(false)} width={420}>
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
              }}
              label={t('next')}
              block
              ghost
              icon={<PiArrowRight />}
            />
            <DefaultButton onClick={() => setNotifyModal(false)} label={t('cancel')} block icon={<AiOutlineClose />} />
          </footer>
        </AlertMessageContainer>
      </Modal>
    </>
  )
}

const { Header, Button, AlertMessageContainer } = {
  Header: styled.div`
    min-height: 32px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;

    gap: ${({ theme }) => theme.size[16]};

    h2 {
      font-size: ${({ theme }) => theme.font.size[16]};
      font-weight: 400;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: ${({ theme }) => theme.font.size[18]};
      font-weight: 500;
    }
  `,
  Button: styled.button`
    display: grid;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 0;
    background: ${({ theme }) => theme.color.white};
    transition: background 0.2s ease;
    line-height: 36px;
    display: flex;
    gap: 10px;
    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.color.white};
    box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.20);
    
    &:hover {
      background: ${({ theme }) => theme.color.whiteAlpha[600]};
    }

    &:first-of-type {
      margin-left: auto;
    }

    svg {
      width: 9.894px;
      height: 10.188px;
      flex-shrink: 0;
      color: ${({ theme }) => theme.colorV2.blue[3]};
    }
  `,
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
  `
}
