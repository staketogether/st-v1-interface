import { chainConfigByChainId } from '@/config/chain'
import useAddTokenToWallet from '@/hooks/useAddTokenToWallet'
import useAddStwEthToWallet from '@/hooks/useAddStwEthToWallet'
import { useFacebookPixel } from '@/hooks/useFacebookPixel'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { truncateWei } from '@/services/truncate'
import { WithdrawType } from '@/types/Withdraw'
import loadingAnimation from '@assets/animations/loading-animation.json'
import ethIcon from '@assets/icons/eth-icon.svg'
import etherscan from '@assets/icons/etherscan.svg'
import Image from 'next/image'
import { PiArrowRight, PiCheckCircle } from 'react-icons/pi'
import styled from 'styled-components'
import AssetIcon from '../shared/AssetIcon'
import LottieAnimation from '../shared/LottieAnimation'
import TokensSymbolIcons from '../shared/TokensSymbolIcons'
import { Staking } from '@/types/Staking'

interface StakeTransactionLoadingProps {
  walletActionLoading: boolean
  transactionLoading: boolean
  amount: string
  youReceive: bigint
  transactionIsSuccess: boolean
  txHash: string | undefined
  type: 'deposit' | 'withdraw'
  withdrawTypeSelected: WithdrawType
  staking: Staking
  chainId: number
}

export default function StakeTransactionLoading({
  walletActionLoading,
  transactionLoading,
  amount,
  youReceive,
  transactionIsSuccess,
  txHash,
  type,
  withdrawTypeSelected,
  staking,
  chainId
}: StakeTransactionLoadingProps) {
  const { t } = useLocaleTranslation()
  const isWithdraw = type === 'withdraw'

  const { blockExplorer } = chainConfigByChainId(chainId)
  const stakeTogetherContractAddress = staking.contracts.StakeTogether

  const { addToWalletAction } = useAddTokenToWallet()
  const { addToWalletAction: addStwEthToWalletAction } = useAddStwEthToWallet()

  useFacebookPixel(
    `deposit-confirmation:${staking.id}`,
    walletActionLoading && !transactionLoading && !transactionIsSuccess && !isWithdraw,
    {
      value: parseFloat(truncateWei(youReceive, 6)),
      stakingId: staking.id
    }
  )

  useFacebookPixel(`deposit-success:${staking.id}`, transactionIsSuccess && !isWithdraw, {
    value: parseFloat(truncateWei(youReceive, 6)),
    stakingId: staking.id,
    txHash: String(txHash)
  })

  return (
    <Container>
      {transactionIsSuccess ? <SuccessIcon size={60} /> : <LottieAnimation animationData={loadingAnimation} height={60} loop />}
      <div>
        {walletActionLoading && !transactionLoading && !transactionIsSuccess && (
          <>
            <TitleModal>{isWithdraw ? t('v2.stake.confirmModal.confirmWithdraw') : t('v2.stake.confirmModal.confirmDeposit')}</TitleModal>
          </>
        )}
        {transactionLoading && !transactionIsSuccess && <TitleModal>{t('v2.stake.confirmModal.transactionSubmitted')}</TitleModal>}
        {transactionIsSuccess && (
          <>
            <TitleModal>
              {isWithdraw ? t('v2.stake.confirmModal.withdrawSuccessful') : t('v2.stake.confirmModal.depositSuccessful')}
            </TitleModal>
          </>
        )}
        <ResumeStake>
          {isWithdraw ? (
            <>
              <div>
                <TokensSymbolIcons image={staking.symbolImage} altName={staking.symbol} size={32} />
                <span className={'purple'}>{`${amount}`}</span>
                <span className={'purple'}>{staking.symbol}</span>
              </div>
              <ArrowIcon fontSize={18} />
              <div>
                <AssetIcon altName={staking.id} chain={staking.asset.chains[0]} size={32} image={staking.symbolImage} />
                <span>{`${truncateWei(youReceive, 6)}`}</span>
                <span>{` ${withdrawTypeSelected === WithdrawType.POOL ? staking.asset.symbol : t('wse.symbol')}`}</span>
              </div>
            </>
          ) : (
            <>
              <div>
                <AssetIcon image={staking.symbolImage} altName={staking.id} chain={staking.asset.chains[0]} size={32} />
                <span>{`${amount}`}</span>
                <span> {staking.asset.symbol}</span>
              </div>
              <ArrowIcon fontSize={18} />
              <div>
                <TokensSymbolIcons image={staking.symbolImage} altName={staking.symbol} size={32} />
                <span className={'purple'}>{`${truncateWei(youReceive, 6)}`}</span>
                <span className={'purple'}> {staking.symbol}</span>
              </div>
            </>
          )}
        </ResumeStake>
      </div>
      {!isWithdraw && transactionIsSuccess && (
        <AddAssetInWalletButton
          onClick={() =>
            addToWalletAction({
              contractAddress: stakeTogetherContractAddress,
              symbol: staking.symbol,
              decimals: 18,
              image: staking.symbolImage
            })
          }
        >
          <span>{t('addSethToWallet.add')} </span>
          <TokensSymbolIcons image={staking.symbolImage} altName={staking.symbol} size={23} />
          <span>{t('addSethToWallet.yourWallet')}</span>
        </AddAssetInWalletButton>
      )}
      {isWithdraw && transactionIsSuccess && withdrawTypeSelected === WithdrawType.VALIDATOR && (
        <AddAssetInWalletButton onClick={addStwEthToWalletAction}>
          <span>{t('addSethToWallet.add')} </span>
          <Image src={ethIcon} alt={t('stakeTogether')} width={32} height={32} />
          <span>{t('addSethToWallet.yourWallet')}</span>
        </AddAssetInWalletButton>
      )}

      {walletActionLoading && !transactionIsSuccess && !transactionLoading && (
        <DescriptionAction>{t('v2.stake.confirmModal.proceedInYourWallet')}</DescriptionAction>
      )}
      {transactionIsSuccess && (
        <a href={`${blockExplorer.baseUrl}/tx/${txHash}`} target='_blank' rel='noopener noreferrer'>
          <Image src={etherscan} alt='etherscan icon' width={20} height={20} />
          <DescriptionAction>{t('viewOnExplorer')}</DescriptionAction>
        </a>
      )}
    </Container>
  )
}

const { Container, DescriptionAction, ResumeStake, TitleModal, SuccessIcon, ArrowIcon, AddAssetInWalletButton } = {
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
  ArrowIcon: styled(PiArrowRight)`
    color: ${({ theme }) => theme.color.secondary};
  `,
  DescriptionAction: styled.span`
    font-size: ${({ theme }) => theme.font.size[14]};
    color: ${({ theme }) => theme.color.primary};

    font-weight: 500;
  `,
  SuccessIcon: styled(PiCheckCircle)`
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
