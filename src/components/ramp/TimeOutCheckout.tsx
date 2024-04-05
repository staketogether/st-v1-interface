import { openQuoteEthModal } from "@/hooks/ramp/useControlModal";
import { StakingProduct } from "@/types/Product";
import { useTranslation } from "react-i18next";
import GenericErrorComponent from "./GenericErrorComponent";

export function TimeOutCheckout({ stakingProduct }: { stakingProduct: StakingProduct }) {
    const { t } = useTranslation()
    return <GenericErrorComponent message={t('v2.ramp.checkout.timeOut')} subTitle={t('try')} onClose={() => openQuoteEthModal(stakingProduct)} />
}