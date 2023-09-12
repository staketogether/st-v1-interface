import chainConfig from '@/config/chain'
import useAddSethToWallet from '@/hooks/useAddSethToWallet'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { truncateWei } from '@/services/truncate'
import ethIcon from '@assets/icons/eth-icon.svg'
import etherscan from '@assets/icons/etherscan.svg'
import sethIcon from '@assets/icons/seth-icon.svg'
import Image from 'next/image'
import { AiFillCheckCircle, AiOutlineArrowRight } from 'react-icons/ai'
import styled from 'styled-components'
import Loading from '../shared/icons/Loading'

type StakeTransactionLoadingProps = {
  walletActionLoading: boolean
  transactionLoading: boolean
  amount: string
  youReceive: bigint
  transactionIsSuccess: boolean
  txHash: string | undefined
  type: 'deposit' | 'withdraw'
}

export default function StakeTransactionLoading({
  walletActionLoading,
  transactionLoading,
  amount,
  youReceive,
  transactionIsSuccess,
  txHash,
  type
}: StakeTransactionLoadingProps) {
  const { t } = useLocaleTranslation()
  const chain = chainConfig()
  const isWithdraw = type === 'withdraw'
  const { addToWalletAction } = useAddSethToWallet()
  return (
    <Container>
      {transactionIsSuccess ? <SuccessIcon size={60} /> : <LoadingIcon size={60} />}
      <div>
        {walletActionLoading && !transactionLoading && !transactionIsSuccess && (
          <TitleModal>
            {isWithdraw
              ? t('v2.stake.confirmModal.confirmWithdraw')
              : t('v2.stake.confirmModal.confirmDeposit')}
          </TitleModal>
        )}
        {transactionLoading && !transactionIsSuccess && (
          <TitleModal>{t('v2.stake.confirmModal.transactionSubmitted')}</TitleModal>
        )}
        {transactionIsSuccess && (
          <TitleModal>
            {isWithdraw
              ? t('v2.stake.confirmModal.withdrawSuccessful')
              : t('v2.stake.confirmModal.depositSuccessful')}
          </TitleModal>
        )}
        <ResumeStake>
          {isWithdraw ? (
            <>
              <div>
                <Image src={sethIcon} alt={t('stakeTogether')} width={32} height={32} />
                <span className={'purple'}>{`${amount}`}</span>
                <span className={'purple'}>{t('lsd.symbol')}</span>
              </div>
              <ArrowIcon fontSize={18} />
              <div>
                <Image src={ethIcon} alt={t('stakeTogether')} width={32} height={32} />
                <span>{`${truncateWei(youReceive, 6)}`}</span>
                <span> {t('eth.symbol')}</span>
              </div>
            </>
          ) : (
            <>
              <div>
                <Image src={ethIcon} alt={t('stakeTogether')} width={32} height={32} />
                <span>{`${amount}`}</span>
                <span> {t('eth.symbol')}</span>
              </div>
              <ArrowIcon fontSize={18} />
              <div>
                <Image src={sethIcon} alt={t('stakeTogether')} width={32} height={32} />
                <span className={'purple'}>{`${truncateWei(youReceive, 6)}`}</span>
                <span className={'purple'}> {t('lsd.symbol')}</span>
              </div>
            </>
          )}
        </ResumeStake>
      </div>
      {!isWithdraw && transactionIsSuccess && (
        <AddAssetInWalletButton onClick={addToWalletAction}>
          <span>{t('addSethToWallet.add')} </span>
          <Image src={sethIcon} alt={t('stakeTogether')} width={32} height={32} />
          <span>{t('addSethToWallet.yourWallet')}</span>
        </AddAssetInWalletButton>
      )}
      <DescriptionAction>
        {walletActionLoading && !transactionIsSuccess && !transactionLoading && (
          <span>{t('v2.stake.confirmModal.proceedInYourWallet')}</span>
        )}
        {transactionIsSuccess && (
          <a href={`${chain.blockExplorer.baseUrl}/tx/${txHash}`} target='_blank' rel='noopener noreferrer'>
            <Image src={etherscan} alt='etherscan icon' width={20} height={20} />
            <span>{t('viewOnExplorer')}</span>
          </a>
        )}
      </DescriptionAction>
    </Container>
  )
}

const {
  Container,
  DescriptionAction,
  ResumeStake,
  TitleModal,
  LoadingIcon,
  SuccessIcon,
  ArrowIcon,
  AddAssetInWalletButton
} = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.size[24]};
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: ${({ theme }) => theme.size[16]};
    }
    span {
      &.purple {
        color: ${({ theme }) => theme.color.secondary};
      }
    }
  `,
  TitleModal: styled.h1`
    font-size: ${({ theme }) => theme.font.size[18]};
    color: ${({ theme }) => theme.color.primary};
    font-weight: 500;
  `,
  ResumeStake: styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};
    padding: ${({ theme }) => theme.size[16]} ${({ theme }) => theme.size[16]};
    border-radius: ${({ theme }) => theme.font.size[16]};
    background: ${({ theme }) => theme.color.blackAlpha[100]};
    div {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[4]};
      > span {
        font-size: ${({ theme }) => theme.font.size[18]};
      }
      span:last-child {
        font-size: ${({ theme }) => theme.font.size[14]};
      }
    }
  `,
  ArrowIcon: styled(AiOutlineArrowRight)`
    color: ${({ theme }) => theme.color.secondary};
  `,
  DescriptionAction: styled.span`
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};

    font-weight: 500;
    a {
      text-decoration: none;
      color: ${({ theme }) => theme.color.primary};

      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.size[4]};

      &:hover {
        color: ${({ theme }) => theme.color.secondary};
      }
    }
  `,
  LoadingIcon: styled(Loading)`
    color: ${({ theme }) => theme.color.secondary};
  `,
  SuccessIcon: styled(AiFillCheckCircle)`
    color: ${({ theme }) => theme.color.green[300]};
  `,
  AddAssetInWalletButton: styled.button`
    border: none;
    color: ${({ theme }) => theme.color.white};
    border-radius: ${props => props.theme.size[8]};
    background: ${({ theme }) => theme.color.blue[600]};
    transition: background-color 0.2s ease;
    height: 48px;
    padding: 0px ${({ theme }) => theme.size[16]};

    font-size: ${({ theme }) => theme.font.size[16]};

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
