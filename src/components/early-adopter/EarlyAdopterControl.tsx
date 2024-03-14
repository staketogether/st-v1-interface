import React from 'react'
import styled from 'styled-components'
import Button from '../shared/Button'
import nftEarlyAdopter from '@assets/images/nft-early-adopter.png'
import Image from 'next/image'
import EarlyAdopterFormModal from './EarlyAdopterForm'
import { useAccount } from 'wagmi'
export default function EarlyAdopterControl() {
  const [openModal, setOpenModal] = React.useState(false)
  const { address } = useAccount()
  return (
    <>
      <Container>
        <MessageContainer>
          <header>
            <h1 className='purple'>Early Adopter</h1>
            <h1>Stake Together</h1>
          </header>
          <p>
            Join the Early Adopters Stake Together community, earn an exclusive NFT, and gain access to our
            Incentives and Airdrops program
          </p>
          <span>1x NFT by wallet, ends march 31 at 11PM time</span>
          <Button label={'Participate'} onClick={() => setOpenModal(true)} />
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
      <EarlyAdopterFormModal isOpen={openModal} setIsOpen={setOpenModal} walletAddress={address} />
    </>
  )
}
const { Container, MessageContainer, ImageContainer, NftCard } = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: ${({ theme }) => theme.size[24]};
      align-items: flex-start;
      padding-top: 60px;
    }
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
        font-size: 44px;
        font-weight: 500;
        color: ${({ theme }) => theme.colorV2.blue[1]};
        &.purple {
          color: ${({ theme }) => theme.colorV2.purple[1]};
        }
      }
      @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
        h1 {
          font-size: 48px;
        }
      }
    }

    > p {
      font-size: 18px;
      color: ${({ theme }) => theme.colorV2.gray[1]};
      opacity: 0.8;
      line-height: 28px;
    }
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      p {
        font-size: 20px;
      }
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
      font-size: 13px;
      font-weight: 500;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      span {
        font-size: 15px;
        text-align: start;
      }
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
