import userKyc from '@/hooks/useKyc';
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import userPixKey from '@/hooks/usePixKey';
import userProfile from '@/hooks/useProfile';
import userWalletAddress from '@/hooks/useWalletAddress';
import { FiTrash2 } from 'react-icons/fi'
import styled from 'styled-components'
import { useAccount } from 'wagmi';
import { cnpjMask, cpfMask, phoneMask } from '../shared/input-helper/mask'
import { truncateAddress } from '@/services/truncate';
import { useEffect, useState } from 'react';

export default function EditAccount() {
  const [maskedPixKeys, setMaskedPixKeys] = useState<string[] | undefined>([])
  const [formatWalletAddress, setFormatWalletAddress] = useState<string[] | undefined>([])
  const { address } = useAccount()

  const { profile } = userProfile("0xae5462E47577bcde3663F2A748fE8019372Fe1C7")
  const { kyc } = userKyc(profile ? profile.id : 0)
  const { pixKey } = userPixKey(profile ? profile.id : 0)
  const { wallets } = userWalletAddress(profile ? profile.id : 0)


  useEffect(() => {
    if (wallets && wallets.length > 0) {
      const formatedWallets = wallets.map(wallet => {
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
            return cnpjMask(pix.pixKey);
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
  
  const { t } = useLocaleTranslation()

  return (
    <>
      <Container>
        <Section>
          <Header>
            <h3>{t('web3AuthWalletSettings.profile')}</h3>
            <Button disabled>{t('soon')}</Button>
          </Header>
          <WrapperInfo>
            <span>{t('web3AuthWalletSettings.userName')}</span>
            <Span>{kyc?.fullName}</Span>
          </WrapperInfo>
          <WrapperInfo>
            <span>{t('web3AuthWalletSettings.email')}</span>
            <Span>{kyc?.email}</Span>
          </WrapperInfo>
        </Section>
        <Section>
          <Header>
            <h3>KYC</h3>
            <Button disabled>{t('soon')}</Button>
          </Header>
          <KYCard>
            <WrapperInfo>
              <span>{t('web3AuthWalletSettings.kycLevel')}:</span>
              <span>0</span>
            </WrapperInfo>
            <WrapperInfo>
              <span>{t('web3AuthWalletSettings.purchaseLimit')}:</span>
              <span>R$ 0</span>
            </WrapperInfo>
            <WrapperInfo>
              <span>{t('web3AuthWalletSettings.limitUsed')}:</span>
              <span>R$ 0</span>
            </WrapperInfo>
          </KYCard>
        </Section>
        <Section>
          <Header>
            <h3>{t('web3AuthWalletSettings.pixKey')}</h3>
            <Button disabled>{t('soon')}</Button>
          </Header>
          {maskedPixKeys?.map((pix) => (
            <Wrapper>
              <WrapperInfo>
                <span >{t('web3AuthWalletSettings.pixKey')}</span>
                <span>{pix}</span>
              </WrapperInfo>
              <FiTrash2 size={24} />
            </Wrapper>
          ))}
        </Section>
        <Section>
          <Header>
            <h3>{t('web3AuthWalletSettings.wallets')}</h3>
            <Button disabled>{t('soon')}</Button>
          </Header>
          {formatWalletAddress?.map(wallet => (
            <Wrapper>
              <WrapperInfo>
                <span >{t('web3AuthWalletSettings.address')}</span>
                <span>{wallet}</span>
              </WrapperInfo>
              <FiTrash2 size={24} />
            </Wrapper>
          ))}
        </Section>
      </Container>    
    </>
  )
}


export const { Container, Section, Header, WrapperInfo, KYCard, Wrapper, Span, WrapperField, Button, ModalHeader, ContainerEdit } = {
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

  `
}