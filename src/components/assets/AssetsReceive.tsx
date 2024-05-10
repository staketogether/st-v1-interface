import useLocaleTranslation from "@/hooks/useLocaleTranslation"
import { PiArrowRight } from "react-icons/pi"
import styled from "styled-components"
import Button from "../shared/Button"


import { Asset } from "@/types/Asset"
import { notification } from "antd"
import QRCode from "react-qr-code"
import { useAccount } from "wagmi"

interface AssetSendProps {
    walletTo: string
    amountToken: string
}

export function AssetsReceive({ asset }: { asset: Asset }) {
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
        <FormContainer >
            <Code value={account?.address ?? ''} />
            <span>{account?.address ?? ''}</span>
            <Button form='assetSendForm' label={t('next')} icon={<PiArrowRight />} onClick={handleCopyClipboard} />
        </FormContainer>
    )
}

const { FormContainer, Code } = {
    FormContainer: styled.div`
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[8]};
      max-height: 450px;
      max-width: 420px;
    `,
    Code: styled(QRCode)`
     border: none;
     width: 160px !important;
     height: 160px !important;
   `,
}