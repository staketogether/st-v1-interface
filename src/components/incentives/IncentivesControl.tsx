import useConnectedAccount from '@/hooks/useConnectedAccount'
import useTranslation from '@/hooks/useTranslation'
import { Tooltip } from 'antd'
import React from 'react'
import { AiFillCheckCircle, AiOutlineClose, AiOutlineQuestionCircle } from 'react-icons/ai'
import { FiExternalLink } from 'react-icons/fi'
import styled from 'styled-components'
import WalletSidebarDisconnected from '@/components/wallet/WalletSidebarDisconnected'
import useWalletSidebarConnectWallet from '@/hooks/useWalletSidebarConnectWallet'
import stIcon from '@assets/icons/seth-icon.svg'
import Image from 'next/image'

export default function IncentivesControl() {
  const { accountIsConnected } = useConnectedAccount()
  const { t } = useTranslation()
  const { setOpenSidebarConnectWallet } = useWalletSidebarConnectWallet()
  return (
    <>
      <Container>
        <header>
          <h1>{t('airdrop.title')}</h1>
          <h2>{t('airdrop.description')}</h2>
        </header>
        <AirdropContainer>
          <WalletConnectedContainer>
            <AvailableToClaimContainer>
              <Image src={stIcon} width={32} height={32} alt='staked Icon' />
              <div>
                <h3>{t('airdrop.availableToClaim')}</h3>
                <span>
                  <span>1.05678</span>
                  <span className='purple'>{t('lsd.symbol')}</span>
                </span>
              </div>
            </AvailableToClaimContainer>
            {accountIsConnected ? (
              <button>{t('airdrop.startClaimProcess')}</button>
            ) : (
              <button onClick={() => setOpenSidebarConnectWallet(true)}>
                {t('connectWalletSideBar.connectButton')}
              </button>
            )}
          </WalletConnectedContainer>
          <DescribeContainer>
            <h3>{t('airdrop.eligibilityCriteria')}</h3>
            <div>
              <span>{t('learnMore')}</span>
              <ExternalLink />
            </div>
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
  DescribeContainer,
  ExternalLink,
  EligibilityList,
  Row,
  WalletConnectedContainer,
  VerifiedIcon,
  QuestionIcon,
  ExcludeIcon,
  AvailableToClaimContainer
} = {
  Container: styled.div`
    width: 100%;
    display: flex;
    justify-items: center;
    align-items: center;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[16]};
    > header {
      width: 100%;
      max-width: 720px;
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[8]};
      align-items: flex-start;
      h1 {
        font-size: ${({ theme }) => theme.font.size[32]};
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        color: ${({ theme }) => theme.color.primary};
      }
      h2 {
        font-size: ${({ theme }) => theme.font.size[14]};
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        color: ${({ theme }) => theme.color.blue[500]};
      }
    }
  `,
  AirdropContainer: styled.section`
    width: 100%;
    max-width: 720px;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
    text-align: center;
    align-items: center;

    background-color: ${({ theme }) => theme.color.whiteAlpha[500]};
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
    border-radius: ${({ theme }) => theme.size[16]};
    background: ${({ theme }) => theme.color.white};
  `,
  AvailableToClaimContainer: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
    > div {
      display: flex;
      flex-direction: column;

      > h3 {
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        color: ${({ theme }) => theme.color.blue[500]};
      }
      > span {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.size[8]};

        font-size: 22px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: ${({ theme }) => theme.color.primary};

        &.purple {
          color: ${({ theme }) => theme.color.secondary};
        }
      }
    }
  `,
  DescribeContainer: styled.div`
    width: 100%;
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
