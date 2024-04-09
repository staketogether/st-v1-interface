import React from 'react'
import styled from 'styled-components'
import { PiArrowLeft } from 'react-icons/pi'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import etherscan from '@assets/icons/etherscan.svg'
import Image from 'next/image'

type web3AuthWalletSettingsProps = {
  setWeb3authWalletActive?: (value: boolean) => void
}

export default function WalletSidebarWeb3AuthWalletSettings({
  setWeb3authWalletActive: setIsWalletSidebarWeb3AuthSettingsActive
}: web3AuthWalletSettingsProps) {
  const { t } = useLocaleTranslation()

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
        <Card>
          <Image src={etherscan} alt='etherscan icon' width={16} height={16} />
          Ver na Etherscan
        </Card>
        <Card>
          <Image src={etherscan} alt='etherscan icon' width={16} height={16} />
          Ver na Optmism Etherscan
        </Card>
        <Card>Exportar</Card>
      </Container>
    </>
  )
}

const { Header, CloseIcon, Button, Container, Card } = {
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
  `
}
