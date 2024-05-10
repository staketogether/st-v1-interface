import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import styled from 'styled-components'
import Button from '../shared/Button'
import { notification } from 'antd'
import QRCode from 'react-qr-code'
import { useAccount } from 'wagmi'
import { FiCopy } from 'react-icons/fi'

export function AssetsReceive() {
  const { t } = useLocaleTranslation()
  const account = useAccount()

  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(account?.address ?? '')
    notification.success({
      message: t('v2.ramp.copyCodeSuccess'),
      placement: 'topRight'
    })
  }
  return (
    <Container>
      <Code value={account?.address ?? ''} />
      <WalletContainer>
        <span>{account?.address ?? ''}</span>
      </WalletContainer>
      <Button label={t('copyWalletAddress')} icon={<FiCopy />} block onClick={handleCopyClipboard} />
    </Container>
  )
}

const { Container, Code, WalletContainer } = {
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
  `
}
