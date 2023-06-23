import Image from 'next/image'
import useTranslation from '@/hooks/useTranslation'
import styled from 'styled-components'
import Loading from '../shared/icons/Loading'
import ethIcon from '@assets/icons/eth-icon.svg'
import sethIcon from '@assets/icons/seth-icon.svg'
import { AiFillCheckCircle, AiOutlineArrowRight } from 'react-icons/ai'
import chainConfig from '@/config/chain'
import useAddSethToWallet from '@/hooks/useAddSethToWallet'

type StakeTransactionLoadingProps = {
  walletActionLoading: boolean
  transactionLoading: boolean
  amount: string
  transactionIsSuccess: boolean
  txHash: string | undefined
  type: 'deposit' | 'withdraw'
}

export default function StakeTransactionLoading({
  walletActionLoading,
  transactionLoading,
  amount,
  transactionIsSuccess,
  txHash,
  type
}: StakeTransactionLoadingProps) {
  const { t } = useTranslation()
  const chain = chainConfig()
  const isWithdraw = type === 'withdraw'
  const { addToWalletAction } = useAddSethToWallet()
  return (
    <Container>
      {transactionIsSuccess ? <SuccessIcon size={47} /> : <LoadingIcon size={36} />}
      <div>
        {walletActionLoading && !transactionLoading && !transactionIsSuccess && (
          <TitleModal>
            {isWithdraw ? t('confirmStakeModal.confirmWithdraw') : t('confirmStakeModal.confirmDeposit')}
          </TitleModal>
        )}
        {transactionLoading && !transactionIsSuccess && (
          <TitleModal>{t('confirmStakeModal.transactionSubmitted')}</TitleModal>
        )}
        {transactionIsSuccess && (
          <TitleModal>
            {isWithdraw
              ? t('confirmStakeModal.withdrawSuccessful')
              : t('confirmStakeModal.depositSuccessful')}
          </TitleModal>
        )}
        <ResumeStake>
          {isWithdraw ? (
            <>
              <div>
                <Image src={sethIcon} alt={t('stakeTogether')} width={18} height={18} />
                <span>{`${amount}`}</span>
                <span className={'purple'}>{t('lsd.symbol')}</span>
              </div>
              <AiOutlineArrowRight />
              <div>
                <Image src={ethIcon} alt={t('stakeTogether')} width={18} height={18} />
                <span>{`${amount}`}</span>
                <span className={'purple'}> ETH</span>
              </div>
            </>
          ) : (
            <>
              <div>
                <Image src={ethIcon} alt={t('stakeTogether')} width={18} height={18} />
                <span>{`${amount}`}</span>
                <span className={'purple'}> ETH</span>
              </div>
              <AiOutlineArrowRight />
              <div>
                <Image src={sethIcon} alt={t('stakeTogether')} width={18} height={18} />
                <span>{`${amount}`}</span>
                <span className={'purple'}> {t('lsd.symbol')}</span>
              </div>
            </>
          )}
        </ResumeStake>
      </div>
      {!isWithdraw && transactionIsSuccess && (
        <AddAssetInWalletButton onClick={addToWalletAction}>
          <span>{t('addSethToWallet.add')} </span>
          <Image src={sethIcon} alt={t('stakeTogether')} width={18} height={18} />
          <span>{t('addSethToWallet.yourWallet')}</span>
        </AddAssetInWalletButton>
      )}
      <DescriptionAction>
        {walletActionLoading && !transactionIsSuccess && !transactionLoading && (
          <span>{t('confirmStakeModal.proceedInYourWallet')}</span>
        )}
        {transactionIsSuccess && (
          <a
            href={`${chain.blockExplorer.baseUrl}/tx/${txHash}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <span>{t('confirmStakeModal.viewOnExplorer')}</span>
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
      gap: ${({ theme }) => theme.size[12]};
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
        font-size: ${({ theme }) => theme.font.size[16]};
      }
    }
  `,
  DescriptionAction: styled.span`
    font-size: ${({ theme }) => theme.font.size[12]};
    color: ${({ theme }) => theme.color.blue[500]};
    a {
      text-decoration: none;
      color: ${({ theme }) => theme.color.blue[500]};
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
    border-radius: ${props => props.theme.size[16]};
    background: ${({ theme }) => theme.color.blue[400]};
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
