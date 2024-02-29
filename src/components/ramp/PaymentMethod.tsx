import { BrlaBuyEthStep, stepsControlBuyCrypto } from '@/hooks/ramp/useControlModal';
import CreditCard from '@assets/images/master-visa.svg';
import Pix from '@assets/images/pix-full.svg';
import Image from 'next/image';
import styled from "styled-components";
import Button from '../shared/Button';

export default function PaymentMethod() {


    const handlePix = () => {
        stepsControlBuyCrypto(BrlaBuyEthStep.Quotation)
    }
    const handleCreditCard = () => {
        stepsControlBuyCrypto(BrlaBuyEthStep.MethodPayment)
    }
    return (
        <Container>
            <Button title='Pix'
                height={56}
                padding='12px'
                type="button"
                onClick={handlePix}
                label='Pix' iconLeft block
                className="outline eachSide" color="gray"
                icon={<Image src={Pix} width={90} height={32} alt='' />}
            />
            <Button title='Cartão Crédito'
                height={56}
                padding='12px'
                onClick={() => console.log('')}
                label='Cartão Crédito' iconLeft block
                className="outline eachSide"
                color="gray"
                icon={<Image src={CreditCard} height={32} alt='' />}
            />

        </Container>
    )
}

const { Container, } = {
    Container: styled.div`
    min-width: 420px;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
  `
}
