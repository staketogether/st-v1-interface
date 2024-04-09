import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PiArrowLeft, PiArrowRight, PiEye } from 'react-icons/pi'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import etherscan from '@assets/icons/etherscan.svg'
import Image from 'next/image'
import { chainConfigByChainId } from '@/config/chain'
import Modal from '../shared/Modal'
import DefaultButton from '../shared/Button'
import { AiOutlineClose } from 'react-icons/ai'
import { useReactiveVar } from '@apollo/client'
import { web3AuthInstanceVar } from '@/config/web3Auth'

type web3AuthWalletSettingsProps = {
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
      const privateKey = await web3AuthInstance?.provider?.request({ method: 'eth_private_key' })
      setPrivateKey(privateKey as string)
    }
    getPrivateKey()
  }, [web3AuthInstance])

  return (
    <>
      <Header>
        <Button
          onClick={() =>
            setIsWalletSidebarWeb3AuthSettingsActive && setIsWalletSidebarWeb3AuthSettingsActive(false)
          }
        >
          <CloseIcon />
        </Button>

        <h2>{t('wallet')}</h2>
      </Header>
      <Container>
        <a className='copy' href={`${ethereum.blockExplorer.baseUrl}/address/${walletAddress}`} target='_blank'>
          <Card>
            <Image src={etherscan} alt='etherscan icon' width={16} height={16} />
            {t('web3AuthWalletSettings.showEtherScan')}
          </Card>
        </a>
        <a className='copy' href={`${optimism.blockExplorer.baseUrl}/address/${walletAddress}`} target='_blank'>
          <Card>
            <Image src={etherscan} alt='etherscan icon' width={16} height={16} />
            {t('web3AuthWalletSettings.showOptimismScan')}
          </Card>
        </a>
        <Card onClick={() => setNotifyModal(true)}>{t('web3AuthWalletSettings.export')}</Card>
        {showPrivateKeyContainer && (
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
        )}
      </Container>

      <Modal
        title={t('web3AuthWalletSettings.modal.title')}
        isOpen={notifyModal}
        onClose={() => setNotifyModal(false)}
        width={420}
      >
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
            <DefaultButton
              onClick={() => setNotifyModal(false)}
              label={t('cancel')}
              block
              icon={<AiOutlineClose />}
            />
          </footer>
        </AlertMessageContainer>
      </Modal>
    </>
  )
}

const {
  Header,
  CloseIcon,
  Container,
  Button,
  Card,
  ShowPrivateKeyContainer,
  PrivateKeyContainer,
  AlertMessageContainer
} = {
  Header: styled.div`
    min-height: 32px;
    width: 100%;
    display: grid;
    grid-template-columns: 32px 1fr;
    align-items: center;

    gap: ${({ theme }) => theme.size[16]};

    h2 {
      font-size: ${({ theme }) => theme.font.size[16]};
      font-weight: 400;
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
    border-radius: ${({ theme }) => theme.size[8]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background: ${({ theme }) => theme.color.white};
    transition: background 0.2s ease;
    line-height: 36px;

    &:hover {
      background: ${({ theme }) => theme.color.whiteAlpha[600]};
    }

    &:first-of-type {
      margin-left: auto;
    }
  `,
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[16]};
  `,
  Card: styled.div`
    width: 100%;
    padding: 0px 16px;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[4]};

    height: 42px;
    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.color.white};
    box-shadow: ${({ theme }) => theme.shadow[100]};

    font-size: ${({ theme }) => theme.font.size[15]};
    color: ${({ theme }) => theme.colorV2.gray[1]};
    font-weight: 400;

    cursor: pointer;
    &:hover {
      background: ${({ theme }) => theme.color.whiteAlpha[600]};
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
