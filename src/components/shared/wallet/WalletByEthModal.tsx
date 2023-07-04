import useWalletByEthModal from '@/hooks/useWalletByEthModal'
import Modal from '../Modal'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
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
  const { openModal, setOpenModal } = useWalletByEthModal()
  const { t } = useTranslation()
  const ethGifSuccess = `/assets/gifs/getEth.gif`

  const handleSuccess = () => {
    onBuyEthIsSuccess && onBuyEthIsSuccess()
    setImage(ethGifSuccess)
    setCode('')
  }

  const handleError = () => {
    setCode('')
  }
  const { getFaucet, isLoading } = useGetFaucet(handleSuccess, handleError)
  const handleGetFaucet = () => {
    const params = {
      address: walletAddress,
      passcode: code
    }
    getFaucet(params)
  }

  useEffect(() => {
    setImage(walletImage)
  }, [walletAddress])

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
        <Image src={image} alt={t('stakeTogether')} width={250} height={250} />
        <InputContainer
          type='text'
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder={t('BuyEth.inputPlaceHolder')}
        />
        <BuyCryptoButton onClick={handleGetFaucet} disabled={isLoading}>
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
  InputContainer: styled.input`
    display: flex;
    width: 100%;
    border: none;
    outline: none;
    background: ${({ theme }) => theme.color.whiteAlpha[800]};
    border-radius: ${({ theme }) => theme.size[16]};
    padding: ${({ theme }) => theme.size[12]} ${({ theme }) => theme.size[16]};
    text-align: center;
    color: ${({ theme }) => theme.color.black};
    font-size: ${({ theme }) => theme.font.size[16]};

    &.error {
      color: ${({ theme }) => theme.color.red[300]};
    }

    &::placeholder {
      text-align: center;
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
