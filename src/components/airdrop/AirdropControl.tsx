import useConnectedAccount from '@/hooks/useConnectedAccount'
import useTranslation from '@/hooks/useTranslation'
import { Tooltip } from 'antd'
import React from 'react'
import { AiFillCheckCircle, AiOutlineClose, AiOutlineQuestionCircle } from 'react-icons/ai'
import { FiExternalLink } from 'react-icons/fi'
import styled from 'styled-components'
import WalletSidebarDisconnected from '../shared/wallet/WalletSidebarDisconnected'
import useWalletSidebarConnectWallet from '@/hooks/useWalletSidebarConnectWallet'
import stIcon from '@assets/icons/seth-icon.svg'
import Image from 'next/image'
import EnsName from '../shared/ens/EnsName'

export default function AirdropControl() {
  const { accountIsConnected, account } = useConnectedAccount()
  const { t } = useTranslation()
  const { setOpenSidebarConnectWallet } = useWalletSidebarConnectWallet()
  return (
    <>
      <Container>
        <AirdropContainer>
          <h1>{t('airdrop.title')}</h1>
          <p>{t('airdrop.description')}</p>
          {accountIsConnected && account && (
            <WalletConnectedContainer>
              <div>
                <EnsName large address={account} />
                <div>
                  <span>0</span>
                  <Image src={stIcon} width={24} height={24} alt='staked Icon' />
                </div>
              </div>
              <button>{t('airdrop.startClaimProcess')}</button>
            </WalletConnectedContainer>
          )}
          {!accountIsConnected && (
            <WalletDisconnectedContainer>
              <button
                onClick={() => {
                  setOpenSidebarConnectWallet(true)
                }}
              >
                {t('connectWalletSideBar.connectButton')}
              </button>
              <button className='ghost'>{t('airdrop.readAnnouncementButton')}</button>
            </WalletDisconnectedContainer>
          )}
          <DescribeContainer>
            <header>
              <h3>{t('airdrop.eligibilityCriteria')}</h3>
              <div>
                <span>{t('learnMore')}</span>
                <ExternalLink />
              </div>
            </header>
          </DescribeContainer>
          <EligibilityList>
            <Row>
              <div>
                <VerifiedIcon />
                {t('airdrop.pool')}
                <Tooltip title='Pools'>
                  <QuestionIcon />
                </Tooltip>
              </div>
              <span>{`0 ${t('lsd.symbol')}`}</span>
            </Row>
            <Row>
              <div>
                <ExcludeIcon />
                {t('airdrop.locks')}
                <Tooltip title='Pools'>
                  <QuestionIcon />
                </Tooltip>
              </div>
              <span>{`0 ${t('lsd.symbol')}`}</span>
            </Row>
          </EligibilityList>
        </AirdropContainer>
      </Container>
      <WalletSidebarDisconnected />
    </>
  )
}

const {
  Container,
  AirdropContainer,
  WalletDisconnectedContainer,
  DescribeContainer,
  ExternalLink,
  EligibilityList,
  Row,
  WalletConnectedContainer,
  VerifiedIcon,
  QuestionIcon,
  ExcludeIcon
} = {
  Container: styled.div`
    width: 100%;
    display: grid;
    justify-items: center;
    grid-template-columns: 1fr;
  `,
  AirdropContainer: styled.section`
    width: 100%;
    max-width: 720px;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
    text-align: center;
    align-items: center;

    background-color: ${({ theme }) => theme.color.whiteAlpha[600]};
    border: none;
    border-radius: ${({ theme }) => theme.size[16]};
    transition: background-color 0.2s ease;
    box-shadow: ${({ theme }) => theme.shadow[100]};
    padding: ${({ theme }) => theme.size[24]};

    > h1 {
      font-size: ${({ theme }) => theme.font.size[24]};
      color: ${({ theme }) => theme.color.primary};
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    > p {
      font-size: ${({ theme }) => theme.font.size[16]};
      color: ${({ theme }) => theme.color.primary};
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    h4 {
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.color.blackAlpha[700]};
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    span {
      font-size: ${({ theme }) => theme.font.size[16]};
      color: ${({ theme }) => theme.color.primary};
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    button {
      border-radius: ${props => props.theme.size[16]};
      transition: background-color 0.2s ease;
      height: 48px;

      font-size: ${({ theme }) => theme.font.size[14]};
      font-weight: 400;

      display: flex;
      align-items: center;
      justify-content: center;
      gap: ${({ theme }) => theme.size[8]};

      border: none;
      color: ${({ theme }) => theme.color.white};
      background: ${({ theme }) => theme.color.primary};
      padding: 0px ${({ theme }) => theme.size[12]};

      &:hover {
        background: ${({ theme }) => theme.color.blue[600]};
      }

      &.ghost {
        border: 1px solid ${({ theme }) => theme.color.primary};
        color: ${({ theme }) => theme.color.primary};
        background: transparent;

        &:hover {
          border: none;
          color: ${({ theme }) => theme.color.white};
          background: ${({ theme }) => theme.color.primary};
        }
      }
    }
  `,
  WalletConnectedContainer: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({ theme }) => theme.size[24]};
    border: 1px solid ${({ theme }) => theme.color.primary};
    border-radius: ${({ theme }) => theme.size[16]};

    > div {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[8]};
      > div {
        display: flex;
        gap: ${({ theme }) => theme.size[8]};
        align-items: center;
      }
    }
  `,
  WalletDisconnectedContainer: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[12]};
  `,
  DescribeContainer: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};

    > header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.color.primary};
      font-style: normal;
      line-height: normal;

      > h3 {
        font-weight: 500;
      }
      > div {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.size[4]};
        > span {
          font-weight: 400;
        }
      }
    }
  `,
  EligibilityList: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};
  `,
  Row: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-size: ${({ theme }) => theme.font.size[16]};
    color: ${({ theme }) => theme.color.primary};
    font-style: normal;
    line-height: normal;
    font-weight: 400;

    > div {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[8]};
    }
  `,
  ExternalLink: styled(FiExternalLink)`
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};
  `,
  VerifiedIcon: styled(AiFillCheckCircle)`
    font-size: ${({ theme }) => theme.font.size[16]};
    color: ${({ theme }) => theme.color.green[700]};
  `,
  QuestionIcon: styled(AiOutlineQuestionCircle)`
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.blackAlpha[500]};
    cursor: pointer;
  `,
  ExcludeIcon: styled(AiOutlineClose)`
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.blackAlpha[500]};
  `
}
