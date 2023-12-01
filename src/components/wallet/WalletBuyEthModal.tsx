import chainConfig from '@/config/chain'
import { globalConfig } from '@/config/global'
import useGetFaucet from '@/hooks/useGetFaucet'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import useWalletByEthModal from '@/hooks/useWalletByEthModal'
import walletImage from '@assets/images/buy-eth-modal/walletImage.jpg'
import Image, { StaticImageData } from 'next/legacy/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ReCAPTCHA } from 'react-google-recaptcha'
import styled from 'styled-components'
import Modal from '../shared/Modal'
import Loading from '../shared/icons/Loading'
import { PiXCircle } from 'react-icons/pi'

type WalletBuyEthModalProps = {
  walletAddress: `0x${string}`
  onBuyEthIsSuccess?: () => void
}

export default function WalletBuyEthModal({ walletAddress, onBuyEthIsSuccess }: WalletBuyEthModalProps) {
  const [code, setCode] = useState('')
  const [image, setImage] = useState<string | StaticImageData>(walletImage)
  const [getFaucetError, setGetFaucetError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { openModal, setOpenModal } = useWalletByEthModal()
  const { t } = useLocaleTranslation()
  const ethGifSuccess = `/assets/gifs/getEth.gif`
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const { recaptchakey } = globalConfig
  const handleSuccess = () => {
    onBuyEthIsSuccess && onBuyEthIsSuccess()
    setImage(ethGifSuccess)
    setIsSuccess(true)
  }
  const chain = chainConfig()
  const { getFaucet, txHash, isLoading, isError, errorMessage, amount } = useGetFaucet(handleSuccess)

  useEffect(() => {
    setGetFaucetError(isError)
  }, [isError])

  const handleGetFaucet = useCallback(async () => {
    if (recaptchaRef) {
      const token = await recaptchaRef?.current?.executeAsync()
      if (token) {
        setIsSuccess(false)
        const params = {
          address: walletAddress,
          passcode: code
        }
        getFaucet(params)
      }
    }
  }, [code, getFaucet, walletAddress])

  const resetStates = useCallback(() => {
    setImage(walletImage)
    setGetFaucetError(false)
    setIsSuccess(false)
    setCode('')
  }, [])

  useEffect(() => {
    resetStates()
  }, [resetStates, walletAddress])

  useEffect(() => {
    if (!openModal) {
      resetStates()
    }
  }, [openModal, resetStates])

  const disabledButton = !code || isLoading

  return (
    <Modal
      title={
        <>
          {!isSuccess && !getFaucetError && (
            <Header>
              <span>{t('buyEth.modalTitle')}</span>
            </Header>
          )}
        </>
      }
      isOpen={openModal}
      onClose={() => setOpenModal(false)}
    >
      <Container>
        {getFaucetError ? (
          <ErrorIcon />
        ) : (
          <>
            {!isSuccess && (
              <MessageTitle>
                {t('buyEth.messageTitleInit')} <span className='green'>{`${t('buyEth.free')} `}</span>
                {t('buyEth.messageTitleFinish')}
              </MessageTitle>
            )}
            <Image src={image} alt={t('buyEth.altImage')} width={280} height={280} />
          </>
        )}
        {!isSuccess && !getFaucetError ? (
          <div style={{ width: '100%' }}>
            <InputContainer className={`${getFaucetError ? 'error' : ''} ${isSuccess ? 'success' : ''}`}>
              <input
                type='text'
                onClick={() => (getFaucetError || isSuccess) && resetStates()}
                value={code}
                onChange={e => setCode(e.target.value.toLocaleUpperCase())}
                placeholder={t('buyEth.inputPlaceHolder')}
              />
            </InputContainer>
            <ReCAPTCHA
              sitekey={recaptchakey}
              size='invisible'
              ref={recaptchaRef}
              style={{ display: 'inline-block' }}
            />
            <BuyCryptoButton onClick={handleGetFaucet} disabled={disabledButton}>
              {t('buyEth.modalButton')}
              {isLoading && <Loading />}
            </BuyCryptoButton>
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
    </Modal>
  )
}

const {
  Container,
  Header,
  InputContainer,
  BuyCryptoButton,
  ErrorIcon,
  Message,
  FeedBackActionButton,
  MessageTitle
} = {
  Container: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[16]};
  `,
  MessageTitle: styled.span`
    font-size: ${({ theme }) => theme.font.size[16]};
    color: ${({ theme }) => theme.color.blackAlpha[600]};
    font-weight: 400;
    text-align: center;
    line-height: 22px;
    span {
      &.green {
        color: ${({ theme }) => theme.color.green[600]};
      }
    }
  `,
  Header: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${({ theme }) => theme.font.size[22]};
    color: ${({ theme }) => theme.color.primary};
  `,
  InputContainer: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
    margin-bottom: ${({ theme }) => theme.size[16]};

    input {
      width: 100%;
      border: none;
      outline: none;
      background: ${({ theme }) => theme.colorV2.gray[2]};
      border-radius: ${({ theme }) => theme.size[8]};
      padding: ${({ theme }) => theme.size[12]} ${({ theme }) => theme.size[16]};
      text-align: center;
      color: ${({ theme }) => theme.colorV2.blue[1]};
      font-size: ${({ theme }) => theme.font.size[16]};
      font-weight: 500;
      box-shadow: ${({ theme }) => theme.shadow[300]};

      &::placeholder {
        text-align: center;
        font-size: ${({ theme }) => theme.font.size[16]};
        color: ${({ theme }) => theme.color.blackAlpha[500]};
        font-weight: 500;
      }
    }
  `,
  BuyCryptoButton: styled.button`
    border: none;
    color: ${({ theme }) => theme.color.white};
    border-radius: ${props => props.theme.size[8]};
    background: ${({ theme }) => theme.colorV2.blue[1]};
    transition: background-color 0.2s ease;
    height: 48px;
    width: 100%;
    box-shadow: ${({ theme }) => theme.shadow[300]};

    font-size: ${({ theme }) => theme.font.size[16]};
    font-weight: 500;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.size[8]};

    &:hover {
      background: ${({ theme }) => theme.colorV2.purple[1]};
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
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
  ErrorIcon: styled(PiXCircle)`
    width: 48px;
    height: 48px;
  `,
  FeedBackActionButton: styled.div`
    color: ${({ theme }) => theme.color.secondary};
    font-size: ${({ theme }) => theme.font.size[16]};
    font-weight: 500;
    cursor: pointer;
  `
}
