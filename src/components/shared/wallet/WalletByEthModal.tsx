import useWalletByEthModal from '@/hooks/useWalletByEthModal'
import Modal from '../Modal'
import styled from 'styled-components'
import { useCallback, useEffect, useState } from 'react'
import useTranslation from '@/hooks/useTranslation'
import Image, { StaticImageData } from 'next/image'
import Loading from '../icons/Loading'
import useGetFaucet from '@/hooks/useGetFaucet'
import walletImage from '@assets/images/buy-eth-modal/walletImage.jpg'

type WalletByEthModalProps = {
  walletAddress: `0x${string}`
  onBuyEthIsSuccess?: () => void
}

export default function WalletByEthModal({ walletAddress, onBuyEthIsSuccess }: WalletByEthModalProps) {
  const [code, setCode] = useState('')
  const [image, setImage] = useState<string | StaticImageData>(walletImage)
  const [getFaucetError, setGetFaucetError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { openModal, setOpenModal } = useWalletByEthModal()
  const { t } = useTranslation()
  const ethGifSuccess = `/assets/gifs/getEth.gif`

  const handleSuccess = () => {
    onBuyEthIsSuccess && onBuyEthIsSuccess()
    setImage(ethGifSuccess)
    setIsSuccess(true)
  }

  const { getFaucet, isLoading, isError, errorMessage } = useGetFaucet(handleSuccess)

  useEffect(() => {
    setGetFaucetError(isError)
  }, [isError])

  const handleGetFaucet = () => {
    setIsSuccess(false)
    const params = {
      address: walletAddress,
      passcode: code
    }
    getFaucet(params)
  }

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
        <Header>
          <span>{t('BuyEth.modalTitle')}</span>
        </Header>
      }
      isOpen={openModal}
      onClose={() => setOpenModal(false)}
    >
      <Container>
        <Image src={image} alt={t('stakeTogether')} width={230} height={230} />
        <InputContainer className={`${getFaucetError ? 'error' : ''} ${isSuccess ? 'success' : ''}`}>
          <input
            type='text'
            onClick={() => (getFaucetError || isSuccess) && resetStates()}
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder={t('BuyEth.inputPlaceHolder')}
          />
          {getFaucetError && errorMessage && (
            <span className='error'>{t(`getFaucetErrorMessages.${errorMessage}`)}</span>
          )}
          {isSuccess && <span className='success'>{t(`notifications.depositSuccess`)}</span>}
        </InputContainer>
        <BuyCryptoButton onClick={handleGetFaucet} disabled={disabledButton}>
          {t('BuyEth.modalButton')}
          {isLoading && <Loading />}
        </BuyCryptoButton>
      </Container>
    </Modal>
  )
}

const { Container, Header, InputContainer, BuyCryptoButton } = {
  Container: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
  `,
  Header: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${({ theme }) => theme.font.size[18]};
  `,
  InputContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[4]};
    width: 100%;

    span {
      font-size: ${({ theme }) => theme.font.size[12]};
      text-align: center;
    }

    input {
      border: none;
      outline: none;
      background: ${({ theme }) => theme.color.whiteAlpha[800]};
      border-radius: ${({ theme }) => theme.size[16]};
      padding: ${({ theme }) => theme.size[12]} ${({ theme }) => theme.size[16]};
      text-align: center;
      color: ${({ theme }) => theme.color.black};
      font-size: ${({ theme }) => theme.font.size[16]};

      &::placeholder {
        text-align: center;
      }
    }

    &.error {
      color: ${({ theme }) => theme.color.red[300]};
      input {
        border: 1px solid ${({ theme }) => theme.color.red[300]};
        color: ${({ theme }) => theme.color.red[300]};
      }
    }

    &.success {
      color: ${({ theme }) => theme.color.green[600]};
      input {
        border: 1px solid ${({ theme }) => theme.color.green[600]};
        color: ${({ theme }) => theme.color.green[600]};
      }
    }
  `,
  BuyCryptoButton: styled.button`
    border: none;
    color: ${({ theme }) => theme.color.white};
    border-radius: ${props => props.theme.size[16]};
    background: ${({ theme }) => theme.color.blue[400]};
    transition: background-color 0.2s ease;
    height: 41px;
    width: 100%;

    font-size: ${({ theme }) => theme.font.size[14]};

    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.size[8]};

    &:hover {
      background: ${({ theme }) => theme.color.blue[600]};
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }
  `
}
