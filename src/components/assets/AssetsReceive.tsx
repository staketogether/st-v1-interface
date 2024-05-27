import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import styled from 'styled-components'
import Button from '../shared/Button'
import NetworkIcons from '../shared/NetworkIcons'
import AlertMessageComponent from '../shared/AlertMessageComponent'
import { notification } from 'antd'
import QRCode from 'react-qr-code'
import { useAccount } from 'wagmi'
import { FiCopy } from 'react-icons/fi'
import useWalletSidebarConnectWallet from '@/hooks/useWalletSidebarConnectWallet'
import { PiArrowLineRight } from 'react-icons/pi'

export function AssetsReceive() {
  const { t } = useLocaleTranslation()
  const account = useAccount()
  const { setOpenSidebarConnectWallet } = useWalletSidebarConnectWallet()
  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(account?.address ?? '')
    notification.success({
      message: t('v2.ramp.copyCodeSuccess'),
      placement: 'topRight'
    })
  }
  return (
    <Container>
      {account.address && (
        <>
          <Code value={account?.address ?? ''} />
          <WalletContainer>
            <span>{account?.address ?? ''}</span>
          </WalletContainer>
        </>
      )}
      <AlertMessageComponent message={'Atenção! Confirme se o ativo que você vai receber é compatível com as redes Ethereum, Optimism, Arbitrum, Polygon e Chiliz. Ativos incompatíveis com seu endereço podem ser perdidos permanentemente.'}>
        <ChildHeader>
          <span>Compatível com as redes:</span>
          <div>
            <NetworkIcons network={'ethereum'} size={24}></NetworkIcons>
            <NetworkIcons network={'optimism'} size={24}></NetworkIcons>
            <NetworkIcons network={'arbitrum'} size={24}></NetworkIcons>
            <NetworkIcons network={'polygon'} size={24}></NetworkIcons>
            <NetworkIcons network={'chiliz'} size={24}></NetworkIcons>
          </div>
        </ChildHeader>
      </AlertMessageComponent>
      {account.address ? (
        <Button label={t('copyWalletAddress')} icon={<FiCopy />} block onClick={handleCopyClipboard} />
      ) : (
        <Button label={t('v2.header.enter')} icon={<ConnectWalletIcon />} block onClick={() => setOpenSidebarConnectWallet(true)} />
      )}
    </Container>
  )
}

const { Container, Code, WalletContainer, ConnectWalletIcon, ChildHeader } = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.size[32]};
  `,
  Code: styled(QRCode)`
    border: none;
    width: 160px !important;
    height: 160px !important;
  `,
  WalletContainer: styled.div`
    width: 100%;
    background: ${({ theme }) => theme.colorV2.foreground};
    border-radius: ${({ theme }) => theme.size[8]};
    padding: ${({ theme }) => theme.size[8]};

    span {
      width: 100%;
      text-align: center;
      font-size: ${({ theme }) => theme.font.size[20]};
      color: ${({ theme }) => theme.colorV2.blue[1]};
      word-break: break-all;
      display: flex;
      align-items: center;
    }
  `,
  ConnectWalletIcon: styled(PiArrowLineRight)`
    font-size: 16px;
  `,
  ChildHeader: styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  span {
    font-size: ${({ theme }) => theme.font.size[16]};
    color: ${({ theme }) => theme.color.gray[900]};
  }

>div {
    flex-direction: row;
    padding: ${({ theme }) => theme.size[8]};
    
    img {
      margin-right: ${({ theme }) => theme.size[8]};
      margin-bottom: ${({ theme }) => theme.size[8]};
    }
  }
  
  `
}
