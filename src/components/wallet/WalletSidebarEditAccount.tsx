import userKyc from '@/hooks/useKyc';
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import userPixKey from '@/hooks/usePixKey';
import { web3AuthInstanceVar } from '@/config/web3Auth'
import userProfile from '@/hooks/useProfile';
import userWalletAddress from '@/hooks/useWalletAddress';
import { FiTrash2 } from 'react-icons/fi'
import styled from 'styled-components'
import { useAccount } from 'wagmi';
import { cnpjMask, cpfMask, phoneMask } from '../shared/input-helper/mask'
import { truncateAddress } from '@/services/truncate';
import { useEffect, useState } from 'react';
import { PiArrowLeft } from 'react-icons/pi';
import { chainConfigByChainId } from '@/config/chain';
import etherscan from '@assets/icons/etherscan.svg'
import Image from 'next/image'
import ModalExportWallet from '../shared/ModalExportWallet';
import { useRouter } from 'next/router';
import { formatNumberByLocale } from '@/services/format';
import useCoinUsdToUserCurrency from '@/hooks/useCoinUsdToUserCurrency';

interface walletSidebarEditAccountProps {
  setWalletSidebar?: (value: boolean) => void
  walletAddress: `0x${string}`
}

export default function WalletSidebarEditAccount({ setWalletSidebar: setIsWalletSidebarActive, walletAddress }: walletSidebarEditAccountProps) {
  const [maskedPixKeys, setMaskedPixKeys] = useState<string[] | undefined>([])
  const [formatWalletAddress, setFormatWalletAddress] = useState<string[] | undefined>([])

  const [notifyModal, setNotifyModal] = useState(false)
  const { profile } = userProfile(walletAddress)
  const { kyc } = userKyc(profile ? profile.id : 0)
  const { pixKey } = userPixKey(profile ? profile.id : 0)
  const { wallets } = userWalletAddress(profile ? profile.id : 0)

  const { t } = useLocaleTranslation()
  const optimism = chainConfigByChainId(10)
  const ethereum = chainConfigByChainId(1)
  
  useEffect(() => {
    if (wallets && wallets.length > 0) {
      const formatedWallets = wallets.map((wallet) => {
        return truncateAddress(wallet.walletAddress)
      })
      setFormatWalletAddress(formatedWallets)
    } else {
      setFormatWalletAddress([])
    }
  }, [wallets])

  useEffect(() => {
    if (pixKey && pixKey.length > 0) {
      const maskedKeys = pixKey.map(pix => {
        switch (pix.type) {
          case 'cpfCnpj':
            return cpfMask(pix.pixKey);
          case 'phone_number':
            return phoneMask(pix.pixKey);
          default:
            return pix.pixKey;
        }
      });
      setMaskedPixKeys(maskedKeys);
    } else {
      setMaskedPixKeys([]);
    }
  }, [pixKey])


  return (
    <>
      <HeaderDrawer>
        <h2>{t('editAccount.editAccount')}</h2>
        <ButtonDrawer onClick={() => setIsWalletSidebarActive && setIsWalletSidebarActive(false)}>
          <CloseIcon />
        </ButtonDrawer>
      </HeaderDrawer>
      {profile && (
        <Container>
          <Section>
            <Header>
              <h3>{t('editAccount.profile')}</h3>
              <Button disabled>{t('soon')}</Button>
            </Header>
            <WrapperInfo>
              <span>{t('editAccount.userName')}</span>
              <Span>{kyc?.fullName}</Span>
            </WrapperInfo>
            <WrapperInfo>
              <span>{t('editAccount.email')}</span>
              <Span>{kyc?.email}</Span>
            </WrapperInfo>
          </Section>
          <Section>
            <Header>
              <h3>{t('editAccount.kyc.kyc')}</h3>
              <Button disabled>{t('soon')}</Button>
            </Header>
            <KYCard>
              <WrapperInfo>
                <span>{t('editAccount.kycLevel')}:</span>
                <span>0</span>
              </WrapperInfo>
              <WrapperInfo>
                <span>{t('editAccount.purchaseLimit')}:</span>
                <span>R$ {formatNumberByLocale("0", 'pt-BR')}</span>
              </WrapperInfo>
              <WrapperInfo>
                <span>{t('editAccount.limitUsed')}:</span>
                <span>R$ {formatNumberByLocale("0", 'pt-BR')}</span>
              </WrapperInfo>
            </KYCard>
          </Section>
          <Section>
            <Header>
              <h3>{t('editAccount.pixKey')}</h3>
              <Button disabled>{t('soon')}</Button>
            </Header>
            {maskedPixKeys?.map((pix) => (
              <Wrapper>
                <WrapperInfo>
                  <span >{t('editAccount.pixKey')}</span>
                  <span>{pix}</span>
                </WrapperInfo>
                <FiTrash2 size={24} />
              </Wrapper>
            ))}
          </Section>
          <Section>
            <Header>
              <h3>{t('editAccount.wallets')}</h3>
              <Button disabled>{t('soon')}</Button>
            </Header>

            {formatWalletAddress?.map(wallet => (
              <>
                <Wrapper>
                  <WrapperInfo>
                    <span >{t('wallet')}</span>
                    <span>{wallet}</span>
                  </WrapperInfo>
                  <ExportButton onClick={() => setNotifyModal(true)}>{t('editAccount.export')}</ExportButton>
                </Wrapper>
                <Wrapper>
                  <WrapperInfo>
                    <span >{t('wallet')}</span>
                    <span>{wallet}</span>
                  </WrapperInfo>
                  <FiTrash2 size={24} />
                </Wrapper>
              </>
            ))}
          </Section>
        </Container>
      )}
      <Container>
        <a className='copy' href={`${ethereum.blockExplorer.baseUrl}/address/${walletAddress}`} target='_blank'>
          <Card>
            <Image src={etherscan} alt='etherscan icon' width={16} height={16} />
            {t('editAccount.showEtherScan')}
          </Card>
        </a>
        <a className='copy' href={`${optimism.blockExplorer.baseUrl}/address/${walletAddress}`} target='_blank'>
          <Card>
            <Image src={etherscan} alt='etherscan icon' width={16} height={16} />
            {t('editAccount.showOptimismScan')}
          </Card>
        </a>
      </Container>
      {notifyModal && (
        <ModalExportWallet notifyModal={notifyModal} setNotifyModal={() => setNotifyModal(true)} onClose={() => setNotifyModal(false)}/>
      )}
    </>
  )
}

export const { Container, Section, HeaderDrawer, Header, WrapperInfo, KYCard, Wrapper, ExportButton, Span, WrapperField, ButtonDrawer, Button, ModalHeader, ContainerEdit, CloseIcon, Card } = {
  HeaderDrawer: styled.div`
    min-height: 32px;
    width: 100%;
    display: flex;
    align-items: center;

    gap: ${({ theme }) => theme.size[16]};

    h2 {
      font-size: ${({ theme }) => theme.font.size[16]};
      font-weight: 400;
    }
  `,
  CloseIcon: styled(PiArrowLeft)`
    font-size: 18px;
    color: ${({ theme }) => theme.colorV2.blue[1]} !important;
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.colorV2.purple[1]} !important;
    }
  `,
  Container: styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.size[24]};
`,
  Section: styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.size[12]};

  h3 {
    font-size: ${({ theme }) => theme.font.size[15]};
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: ${({ theme }) => theme.colorV2.gray[1]};
  }
`,
  Header: styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  `,
  WrapperInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[4]};

    span {
    color: ${({ theme }) => theme.colorV2.gray[1]};
    }
  `,
  Span: styled.span`
  padding: 13px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colorV2.gray[6]};
  border-radius: ${({ theme }) => theme.size[8]};
  outline: 0;
  font-weight: 400;
  font-size: ${({ theme }) => theme.font.size[13]};
  color: ${({ theme }) => theme.colorV2.gray[1]};
  `,
  WrapperField: styled.div`
  display: flex;
  height: 40px;
  padding: 0px ${({ theme }) => theme.size[16]};
  gap: ${({ theme }) => theme.size[4]};
  border-radius: ${({ theme }) => theme.size[8]};
  border: 0;
  outline: 0;
  background: ${({ theme }) => theme.colorV2.gray[2]};
  box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.20);
  align-items: center;
  justify-content: space-between;

  select {
    width: 100%;
    height: 100%;
    background: transparent;
    border: 0;
    outline: 0;
  }

  input {
    width: 100%;
    height: 100%;
    border: 0;
    outline: 0;
    background: transparent;
  }
  `,
  ButtonDrawer: styled.button`
    display: grid;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: ${({ theme }) => theme.size[8]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    background: ${({ theme }) => theme.color.white};
    transition: background 0.2s ease;
    line-height: 36px;

    &:hover {
      background: ${({ theme }) => theme.color.whiteAlpha[600]};
    }

    &:first-of-type {
      margin-left: auto;
    }
  `,
  Button: styled.button`
    display: flex;
    height: 24px;
    padding: 0px ${({ theme }) => theme.size[16]};
    justify-content: center;
    align-items: center;
    border-radius: ${({ theme }) => theme.size[4]};
    border: 1px solid ${({ theme }) => theme.color.primary};
    background: transparent;
    outline: 0;
    color: ${({ theme }) => theme.color.primary};
    font-weight: 500;

    &:disabled {
      opacity: 0.4;
    }
  `,
  KYCard: styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colorV2.gray[6]};
  border-radius: ${({ theme }) => theme.size[4]};
  padding: ${({ theme }) => theme.size[8]};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: ${({ theme }) => theme.size[8]};
  align-items: center;
  align-self: stretch;

  div {
    width: auto;
    span {
      font-size: ${({ theme }) => theme.font.size[12]};
      font-weight: 400;
    }
    span:nth-child(2) {
      font-size: ${({ theme }) => theme.font.size[15]};
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      align-self: left;
    }

     @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      span {
            font-size: ${({ theme }) => theme.font.size[13]};
      }
     }
  }
  `,
  Wrapper: styled.div`
  border: 1px solid ${({ theme }) => theme.colorV2.gray[6]};
  border-radius: ${({ theme }) => theme.size[4]};
  padding: ${({ theme }) => theme.size[8]};
  display: flex;
  flex-direction: row !important;
  justify-content: space-between;
  align-items: center;
  border-radius: ${({ theme }) => theme.size[8]};

   span {
    color: ${({ theme }) => theme.color.gray[400]};
  }
  span:nth-child(2) {
    color: ${({ theme }) => theme.colorV2.gray[1]};
    font-weight: 500;
  }

 svg {
  cursor: pointer;
 }
  `,
  ExportButton: styled.div`
    cursor: pointer;
    color: ${({ theme }) => theme.color.primary};
    font-size: ${({ theme }) => theme.font.size[15]};
    font-weight: 400;
  `,
  ModalHeader: styled.header`
  display: flex;
  justify-content: space-between;
  span {
    font-size: ${({ theme }) => theme.font.size[18]};
    font-weight: 500;
    color: ${({ theme }) => theme.colorV2.gray[1]};
  }
  svg {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    color: ${({ theme }) => theme.colorV2.blue[3]};
    cursor: pointer;
  }
  `,
  ContainerEdit: styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.size[24]};

  button {
    display: flex;
    height: 40px;
    padding: 0px ${({ theme }) => theme.size[16]};
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.size[4]};
    align-self: stretch;
    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.white};
    border: 0;
    outline: 0;
    font-size: ${({ theme }) => theme.font.size[14]};
    font-weight: 500;
  }
  `,
  Card: styled.div`
    width: 100%;
    height: 42px;
    padding: 0px 16px;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[4]};
    justify-content: center;
    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.color.white};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    border: ${({ theme }) => theme.color.primary};

    font-size: ${({ theme }) => theme.font.size[15]};
    color: ${({ theme }) => theme.colorV2.gray[1]};
    font-weight: 400;
    border: 1px solid ${({ theme }) => theme.color.primary};

    cursor: pointer;
    &:hover {
      background: ${({ theme }) => theme.color.whiteAlpha[600]};
    }
  `,
}