import { openModal } from '@/hooks/ramp/useControlModal';
import useLocaleTranslation from '@/hooks/useLocaleTranslation';
import { PiCheckCircleFill } from 'react-icons/pi';
import styled, { useTheme } from 'styled-components';
import Button from '../shared/Button';

export default function SuccessStep() {
    const theme = useTheme()
    const { t } = useLocaleTranslation()
    return (
        <Container>
            <PiCheckCircleFill size={80} color={theme.color.green[500]} />
            <DepositToken>
                <div>
                    <span>1.0 ETH</span>
                </div>
                <span>{t('v2.ramp.yourEths')}</span>
            </DepositToken>
            <DepositInfo>
                <Info>
                    <span>{t('v2.ramp.youReceived')}</span>
                    <span className='right secondary'>1.0 ETH</span>
                </Info>
                <Info>
                    <span>{t('v2.ramp.exchange')}</span>
                    <div className='right'>
                        <span className='green'>9.356,35</span>
                        <span>=</span>
                        <span className='secondary'>1stpETH</span>
                    </div>
                </Info>
                <Info>
                    <div>
                        <span className='green'>9.356,35</span>
                        <span>=</span>
                        <span className='secondary'>1stpETH</span>
                    </div>
                    <span className='right'>R$9117,67</span>
                </Info>
                <Info>
                    <span>{t('v2.ramp.networkFee')}</span>
                    <span className='right grayLight'>1.0 ETH</span>
                </Info>
                <Info>
                    <span className='bold'>Total</span>
                    <span className='right bold'>1.0 ETH</span>
                </Info>

            </DepositInfo>
            <Button type="button" label={t('next')} onClick={() => openModal(false)} />
        </Container>
    )

}

const { Container, DepositToken, DepositInfo, Info } = {
    Container: styled.div`
        width: 420px;
        display: flex;
        flex-direction: column;
        gap: ${({ theme: { size } }) => size[24]};
        > svg {
            margin: 0 auto;
        }
    
    `,
    DepositToken: styled.div`
        display: flex;
        flex-direction: column;
        padding: ${({ theme: { size } }) => size[24]};
        border-radius: ${({ theme: { size } }) => size[8]};
        border: 1px;
        gap: ${({ theme: { size } }) => size[8]};
        width: 100%;
        border: 1px solid ${({ theme }) => theme.colorV2.gray[6]};

        > div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            > span {
                
                font-size: ${({ theme }) => theme.font.size[22]};
                font-weight: 500;
                line-height: 27px;
                letter-spacing: 0em;
                text-align: center;

            }
        }
        > span {
            font-size: ${({ theme }) => theme.font.size[13]};
            font-weight: 400;
            line-height: 16px;
            letter-spacing: 0em;
            text-align: center;

        }

    `,
    DepositInfo: styled.div`
        //styleName: text 13;
        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.size[8]};
        font-size: ${({ theme }) => theme.font.size[13]};
        font-weight: 400;
        line-height: 16px;
        letter-spacing: 0em;
        

    
    `,
    Info: styled.div`
        display: grid;
        grid-template-columns: 1fr 1fr;

        > span, div  {
            &.right {
                margin: 0 0 0 auto;
            }
           
        }

        .secondary {
            color: ${({ theme: { color } }) => color.primary};
            font-weight: 500;
        }
        .green {
            color: ${({ theme: { color } }) => color.green[500]};
            font-weight: 500;
        }
        .bold {
            font-weight: 500;
        }
        
        
    `,

}