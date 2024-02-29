import React from 'react'
import styled from 'styled-components'
import Button from '../shared/Button'
import nftEarlyAdopter from '@assets/images/nft-early-adopter.png'
import Image from 'next/image'
export default function EarlyAdopterControl() {
  const [openModal, setOpenModal] = React.useState(false)
  return (
    <Container>
      <MessageContainer>
        <header>
          <h1 className='purple'>Early Adopter</h1>
          <h1>Stake Together</h1>
        </header>
        <p>
          Faça parte da comunidade de Early Adopters Stake Together, ganhe um NFT exclusivo e tenha acesso ao
          nosso programa de Incentivos e Airdrops.
        </p>
        <span>1x NFT por carteira, Ends March 31 at XX time</span>
        <Button label={'Participar'} onClick={() => setOpenModal(true)} />
      </MessageContainer>
      <ImageContainer>
        <NftCard>
          <Image src={nftEarlyAdopter} alt='gifts' />
          <div>
            <span>Stake Together Early Adopters </span>
          </div>
          <div>
            <span className='small'>0% minted</span>
            <span className='small'>0/1000</span>
          </div>
        </NftCard>
      </ImageContainer>
    </Container>
  )
}
const { Container, MessageContainer, ImageContainer, NftCard } = {
  Container: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.size[24]};
    align-items: flex-start;
    padding-top: 60px;
  `,
  MessageContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
    align-items: flex-start;
    header {
      display: flex;
      flex-direction: column;

      gap: ${({ theme }) => theme.size[4]};
      h1 {
        font-size: 48px;
        font-weight: 600;
        color: ${({ theme }) => theme.colorV2.blue[1]};
        &.purple {
          color: ${({ theme }) => theme.colorV2.purple[1]};
        }
      }
    }

    > p {
      font-size: 20px;
      color: ${({ theme }) => theme.colorV2.gray[1]};
      opacity: 0.8;
      line-height: 28px;
    }

    > span {
      width: 100%;
      height: 42px;

      display: flex;
      align-items: center;

      padding: 0px 12px;
      background: ${({ theme }) => theme.colorV2.white};
      border-radius: 8px;

      color: ${({ theme }) => theme.colorV2.blue[1]};
      font-size: 15px;
      font-weight: 500;
    }
  `,
  ImageContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  NftCard: styled.div`
    padding: ${({ theme }) => theme.size[16]};
    background: ${({ theme }) => theme.colorV2.white};
    border-radius: ${({ theme }) => theme.size[8]};
    box-shadow: ${({ theme }) => theme.shadow[100]};

    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};

    img {
      width: 320px;
      height: 320px;
    }

    div {
      display: flex;
      gap: ${({ theme }) => theme.size[8]};
      align-items: center;
      justify-content: space-between;
      span {
        font-size: ${({ theme }) => theme.font.size[15]};
        color: ${({ theme }) => theme.colorV2.blue[1]};
        font-weight: 500;
        &.small {
          font-size: ${({ theme }) => theme.font.size[13]};
          color: ${({ theme }) => theme.colorV2.blue[1]};
          font-weight: 400;
        }
      }
    }
  `
}
