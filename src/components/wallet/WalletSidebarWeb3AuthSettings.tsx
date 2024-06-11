import { chainConfigByChainId } from '@/config/chain'
import { web3AuthInstanceVar } from '@/config/web3Auth'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { useReactiveVar } from '@apollo/client'
import etherscan from '@assets/icons/etherscan.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { PiArrowLeft, PiArrowRight, PiEye } from 'react-icons/pi'
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
  walletAddress
}: web3AuthWalletSettingsProps) {
  const [notifyModal, setNotifyModal] = useState(false)
  const [privateKey, setPrivateKey] = useState<string | null>('')
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [showPrivateKeyContainer, setShowPrivateKeyContainer] = useState(false)

  const { t } = useLocaleTranslation()
  const optimism = chainConfigByChainId(10)
  const ethereum = chainConfigByChainId(1)

  const web3AuthInstance = useReactiveVar(web3AuthInstanceVar)

  useEffect(() => {
    const getPrivateKey = async () => {
      const targetPrivateKey = await web3AuthInstance?.provider?.request({ method: 'eth_private_key' })
      setPrivateKey(targetPrivateKey as string)
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
                setShowPrivateKeyContainer(true)
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

const { Header, CloseIcon, Button, ShowPrivateKeyContainer, PrivateKeyContainer, AlertMessageContainer } = {
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
  CloseIcon: styled(PiArrowLeft)`
    font-size: 18px;
    color: ${({ theme }) => theme.colorV2.blue[1]} !important;
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.colorV2.purple[1]} !important;
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
