import chainConfig from '@/config/chain'
import { globalConfig } from '@/config/global'
import useGetFaucet from '@/hooks/useGetFaucet'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'

import useEthBalanceOf from '@/hooks/contracts/useEthBalanceOf'
import dollar from '@assets/icons/dollar.png'
import ethIcon from '@assets/icons/eth-icon.svg'
import { ethers } from 'ethers'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ReCAPTCHA } from 'react-google-recaptcha'
import { PiArrowLineRight, PiArrowRight, PiArrowsLeftRight } from 'react-icons/pi'
import styled from 'styled-components'
import useCoinConversion from '../../hooks/useCoinConversion'
import useWalletSidebarConnectWallet from '../../hooks/useWalletSidebarConnectWallet'
import { truncateWei } from '../../services/truncate'
import Button from '../shared/Button'
import useActiveChain from "@/hooks/useActiveChain";

type StakeExchangeProps = {
  walletAddress?: `0x${string}`
  onBuyEthIsSuccess?: () => void
}

export default function StakeExchange({ walletAddress, onBuyEthIsSuccess }: StakeExchangeProps) {
  const [getFaucetError, setGetFaucetError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { t } = useLocaleTranslation()
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const { recaptchakey } = globalConfig
  const handleSuccess = () => {
    onBuyEthIsSuccess && onBuyEthIsSuccess()
    setIsSuccess(true)
  }
  const { config: chain } = useActiveChain()
  const { getFaucet, txHash, isLoading, isError, errorMessage, amount } = useGetFaucet(handleSuccess)
  const { setOpenSidebarConnectWallet, openSidebarConnectWallet } = useWalletSidebarConnectWallet()

  const ethersFaucet = ethers.parseEther('0.005')
  const { price, symbol } = useCoinConversion(ethersFaucet.toString() || '0')

  const { balance: faucetBalance, isLoading: balanceLoading } = useEthBalanceOf(
    '0x6B70de928a055FC38c70D5EC46861676F22E4Ae6'
  )

  useEffect(() => {
    setGetFaucetError(isError)
  }, [isError])

  const handleAction = () => {
    setIsSuccess(false)
    const params = {
      address: walletAddress || '0x',
      passcode: 'STAKETOGETHER'
    }
    getFaucet(params)
  }

  const resetStates = () => {
    setGetFaucetError(false)
    setIsSuccess(false)
  }

  const hasFaucet = faucetBalance >= ethers.parseUnits('0.005', 18)
  const disabledButton = isLoading || balanceLoading || !hasFaucet

  return (
    <Container>
      <CardInfoContainer>
        <CardInfo>
          <div>
            <Image src={dollar} width={30} height={30} alt='fiat' />
          </div>
          <CardInfoData>
            <header>
              <h4>{t('available')}</h4>
            </header>
            <div>
              <span className='green'>{symbol()}</span>
              <span className='green'>{truncateWei(BigInt(price || '0'), 2)}</span>
            </div>
          </CardInfoData>
        </CardInfo>
        <SwapArea>
          <SwapIcon />
        </SwapArea>
        <CardInfo>
          <CardInfoData>
            <header>
              <h4>{t('receive')}</h4>
            </header>
            <div>
              <span className='primary'>{truncateWei(ethersFaucet, 6)}</span>
              <span className='primary'>{t('eth.symbol')}</span>
            </div>
          </CardInfoData>
          <div>
            <Image src={ethIcon} width={30} height={30} alt='stpEth' />
          </div>
        </CardInfo>
      </CardInfoContainer>
      {!isSuccess && !getFaucetError ? (
        <div style={{ width: '100%' }}>
          <InputContainer className={`${getFaucetError ? 'error' : ''} ${isSuccess ? 'success' : ''}`}>
            {walletAddress && (
              <Button
                onClick={handleAction}
                disabled={disabledButton}
                label={hasFaucet ? t('getEthFaucet') : t('getFaucetErrorMessages.faucetIsEmpty')}
                isLoading={isLoading}
                icon={<DexIcon />}
              />
            )}
            {!walletAddress && (
              <Button
                onClick={() => setOpenSidebarConnectWallet(true)}
                label={t('v2.header.enter')}
                isLoading={openSidebarConnectWallet}
                icon={<ConnectWalletIcon />}
              />
            )}
          </InputContainer>
          <ReCAPTCHA sitekey={recaptchakey} size='invisible' ref={recaptchaRef} />
        </div>
      ) : (
        <>
          {isSuccess && (
            <Message>
              {`${t('buyEth.successMessage')}`} <span className='secondary'> {`${amount} ETH `}</span>
              Goerli!
            </Message>
          )}
          {getFaucetError && errorMessage && <Message>{t(`${errorMessage}`)}</Message>}
        </>
      )}
      <>
        {isSuccess && (
          <FeedBackActionButton
            onClick={() => window.open(`${chain.blockExplorer.baseUrl}/tx/${txHash}`, '_blank')}
          >
            {t('viewOnExplorer')}
          </FeedBackActionButton>
        )}
        {getFaucetError && (
          <FeedBackActionButton onClick={() => resetStates()}>{t('try')}</FeedBackActionButton>
        )}
      </>
    </Container>
  )
}

const {
  Container,
  InputContainer,
  Message,
  FeedBackActionButton,
  ConnectWalletIcon,
  DexIcon,
  CardInfoContainer,
  CardInfo,
  CardInfoData,
  SwapIcon,
  SwapArea
} = {
  Container: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[16]};
  `,
  InputContainer: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.size[16]};

    button {
      width: 100%;
    }

    input {
      width: 100%;
      border: none;
      outline: none;
      background: ${({ theme }) => theme.colorV2.gray[2]};
      border-radius: ${({ theme }) => theme.size[8]};
      padding: ${({ theme }) => theme.size[12]} ${({ theme }) => theme.size[16]};
      text-align: center;
      color: ${({ theme }) => theme.colorV2.blue[1]};
      font-size: 2.4rem;
      line-height: 24px;
      box-shadow: ${({ theme }) => theme.shadow[300]};

      &::placeholder {
        text-align: center;

        color: ${({ theme }) => theme.color.blackAlpha[500]};
      }
    }
  `,
  Message: styled.span`
    color: ${({ theme }) => theme.color.blackAlpha[500]};
    font-size: ${({ theme }) => theme.font.size[16]};
    font-weight: 500;
    span {
      &.secondary {
        color: ${({ theme }) => theme.color.secondary};
      }
    }
  `,
  FeedBackActionButton: styled.div`
    color: ${({ theme }) => theme.color.secondary};
    font-size: ${({ theme }) => theme.font.size[16]};
    font-weight: 500;
    cursor: pointer;
  `,
  SwapArea: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    span {
      color: ${({ theme }) => theme.color.green[500]};
      font-size: ${({ theme }) => theme.font.size[14]};
    }
  `,
  ConnectWalletIcon: styled(PiArrowLineRight)`
    font-size: 16px;
  `,
  DexIcon: styled(PiArrowsLeftRight)`
    font-size: 16px;
  `,
  SwapIcon: styled(PiArrowRight)`
    font-size: 18px;
    color: ${({ theme }) => theme.color.green[500]};
  `,

  CardInfoContainer: styled.div`
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    width: 100%;

    border-radius: 8px;
    gap: ${({ theme }) => theme.size[16]};
    padding-bottom: 8px;

    > div:nth-child(3) {
      justify-content: flex-end;
      header {
        justify-content: flex-end;
      }
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      gap: ${({ theme }) => theme.size[24]};
    }
  `,
  CardInfo: styled.div`
    display: flex;
    align-items: center;

    gap: ${({ theme }) => theme.size[16]};
    height: 32px;

    img {
      box-shadow: ${({ theme }) => theme.shadow[300]};
      border-radius: 100%;
    }

    > div {
      display: grid;
      align-items: center;
      justify-content: flex-start;
      height: 32px;

      > div {
        display: flex;
        justify-content: flex-start;
        align-self: flex-start;
      }
    }
  `,
  CardInfoData: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${({ theme }) => theme.size[4]};

    > header {
      display: flex;

      gap: ${({ theme }) => theme.size[4]};
      > h4 {
        font-size: ${({ theme }) => theme.font.size[12]};
        font-weight: 400;
        color: ${({ theme }) => theme.colorV2.gray[1]};
      }
    }
    > div {
      display: flex;
      gap: ${({ theme }) => theme.size[4]};
      span {
        font-size: ${({ theme }) => theme.font.size[14]};

        font-weight: 500;
        color: ${({ theme }) => theme.colorV2.gray[1]};

        &.primary {
          color: ${({ theme }) => theme.colorV2.blue[3]};
        }

        &.purple {
          color: ${({ theme }) => theme.colorV2.purple[1]};
        }

        &.green {
          color: ${({ theme }) => theme.color.green[500]};
        }

        &.negative {
          color: ${({ theme }) => theme.color.red[500]};
        }

        &.positive {
          color: ${({ theme }) => theme.color.green[500]};
        }
      }
    }
  `
}
