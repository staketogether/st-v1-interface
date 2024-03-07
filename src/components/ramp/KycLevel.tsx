import useLocaleTranslation from "@/hooks/useLocaleTranslation";
import { useReactiveVar } from "@apollo/client";
import { PiInfoThin } from "react-icons/pi";
import styled from "styled-components";
import { kycLevelVar } from '../../hooks/ramp/useControlModal';


export function KycLevel({ amountValue }: { amountValue: number }) {
    const { t } = useLocaleTranslation()
    const kycLevel = useReactiveVar(kycLevelVar)
    const handleFormat = (value: number) => {
        if (value > 0) {
            return (value / 100).toLocaleString('pt-BR')
        }
        return 0
    }

    const limitUsed = (kycLevel?.limits.limitSwapBuy ?? 0) - amountValue * 100
    const limitExceeded = limitUsed <= 0
    return (
        <Container>
            <KycInfo>
                <div>
                    <div>{t('v2.ramp.kyc.level')}</div>
                    <div>{kycLevel?.level ?? 1}</div>
                </div>
                <div>
                    <div>{t('v2.ramp.kyc.limit')}</div>
                    <div>R$ {handleFormat(kycLevel?.limits.limitMint ?? 1000000)}</div>
                </div>
                {
                    kycLevel?.limits.limitSwapBuy &&
                    <div>
                        <div>{t('v2.ramp.kyc.availableLimit')}</div>
                        <div>R$ {handleFormat(limitUsed > 0 ? limitUsed : 0)}</div>
                    </div>
                }
            </KycInfo>

            {!kycLevel?.level || limitExceeded && <div>
                <PiInfoThin />
                {!kycLevel?.level && <span> {t('v2.ramp.quote.requiredKyc')} </span>}
                {limitExceeded && <span> {t('v2.ramp.quote.requiredUpdateKyc')}</span>}
            </div>}
        </Container>
    )
}

const { Container, KycInfo } = {
    Container: styled.div`
        display: flex;
        flex-direction: column;
        gap: 4px;
        > div:nth-child(2) { 

            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 2px;
            font-size: 13px;
            font-weight: 400;
            line-height: 16px;
            letter-spacing: 0em;
            text-align: left;

            span {
            }

        }
    `,
    KycInfo: styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;

        gap: ${({ theme }) => theme.size[8]};
        padding: ${({ theme }) => theme.size[8]};
        border-radius: ${({ theme }) => theme.size[8]};
        border: 1px solid ${({ theme }) => theme.colorV2.gray[6]};

        div {
            display: flex;
            flex-direction: column;
            gap: ${({ theme }) => theme.size[4]};
            &:first-child {
                font-size: 13px;
                font-weight: 400;
            }
            &:last-child {
                font-size: ${({ theme }) => theme.font.size[15]};
                font-weight: 500;
            }
        }
  `,
}