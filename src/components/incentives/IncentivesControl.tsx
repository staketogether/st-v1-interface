import { useClaimAirdrop } from '@/hooks/contracts/useClaimAirdrop'
import useConnectedAccount from '@/hooks/useConnectedAccount'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import useWalletSidebarConnectWallet from '@/hooks/useWalletSidebarConnectWallet'
import stSymbol from '@assets/st-symbol.svg'
import Image from 'next/image'
import Link from 'next/link'
import { PiArrowLineRight, PiCheckCircle, PiHandCoins, PiLink, PiQuestion, PiXCircle } from 'react-icons/pi'
import styled from 'styled-components'
import { useNetwork } from 'wagmi'
import chainConfig from '../../config/chain'
import useIncentives from '../../hooks/useIncentives'
import { truncateWei } from '../../services/truncate'
import Button from '../shared/Button'
import TooltipComponent from '../shared/TooltipComponent'
import LayoutTitle from '../shared/layout/LayoutTitle'
import NextAirdropCountdown from './NextAirdropCountdown'

export default function IncentivesControl() {
  const { account } = useConnectedAccount()
  const { incentives, amount } = useIncentives(account)
  const { t } = useLocaleTranslation()

  const { setOpenSidebarConnectWallet, openSidebarConnectWallet } = useWalletSidebarConnectWallet()

  const { claim } = useClaimAirdrop({
    epoch: 0n,
    index: 0n,
    accountAddress: account,
    sharesAmount: 0n
  })

  const chain = chainConfig()
  const { chain: walletChainId } = useNetwork()
  const isWrongNetwork = chain.chainId !== walletChainId?.id

  const handleLabelButton = () => {
    if (isWrongNetwork) {
      return `${t('switch')} ${chain.name.charAt(0).toUpperCase() + chain.name.slice(1)}`
    }
    const actionLabel = t('airdrop.claim')
    return actionLabel
  }

  return (
    <>
      <Container>
        <LayoutTitle
          title={t('v2.pages.incentives.title')}
          description={t('v2.pages.incentives.description')}
        />
        <NextAirdropCountdown />
        <AirdropContainer>
          <Available green={amount > 0n}>
            <Image src={stSymbol} width={48} height={48} alt='stpETH' />
            <div>
              <h3>{t('airdrop.available')}</h3>
              <div>
                <span>{amount > 0n ? truncateWei(amount) : '0'}</span>
                <span>{t('lsd.symbol')}</span>
              </div>
            </div>
            <div>
              {!account && (
                <Button
                  onClick={() => setOpenSidebarConnectWallet(true)}
                  label={t('v2.header.enter')}
                  isLoading={openSidebarConnectWallet}
                  icon={<ConnectWalletIcon />}
                />
              )}
              {account && (
                <Button
                  isLoading={false}
                  onClick={claim}
                  label={handleLabelButton()}
                  icon={<ClaimIcon />}
                  disabled={!amount}
                />
              )}
            </div>
          </Available>
          <Incentives>
            <Eligibility>
              <div>
                <span>{t('airdrop.eligibilityCriteria')}</span>
              </div>
              <div>
                <Link href='#' target='_blank'>
                  <LearnMoreIcon />
                  {t('airdrop.learnMore')}
                </Link>
              </div>
            </Eligibility>
            {incentives.map((incentive, index) => (
              <IncentiveRow key={index} green={incentive.amount > 0}>
                <div>
                  {account && <span>{incentive.amount > 0 ? <CheckIcon /> : <XIcon />}</span>}
                  <span>{incentive.name}</span>
                  <TooltipComponent text={incentive.description}>
                    <QuestionIcon />
                  </TooltipComponent>
                </div>
                <div>
                  <span>{truncateWei(incentive.amount)}</span>
                  <span>{t('lsd.symbol')}</span>
                </div>
              </IncentiveRow>
            ))}
            <hr />
            <IncentiveRow green={amount > 0}>
              <div>
                {account && <span>{amount > 0 ? <CheckIcon /> : <XIcon />}</span>}
                <span>{t('airdrop.total')}</span>
              </div>
              <div>
                <span>{truncateWei(amount)}</span>
                <span>{t('lsd.symbol')}</span>
              </div>
            </IncentiveRow>
          </Incentives>
        </AirdropContainer>
      </Container>
    </>
  )
}

const {
  Container,
  AirdropContainer,
  Available,
  ConnectWalletIcon,
  Eligibility,
  LearnMoreIcon,
  ClaimIcon,
  Incentives,
  IncentiveRow,
  XIcon,
  CheckIcon,
  QuestionIcon
} = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    max-width: 468px;
    gap: ${({ theme }) => theme.size[16]};
  `,
  AirdropContainer: styled.section`
    width: 100%;
    display: grid;

    gap: 24px;
    align-items: center;
    background-color: ${({ theme }) => theme.colorV2.white};
    border-radius: ${({ theme }) => theme.size[8]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    padding: ${({ theme }) => theme.size[24]};
  `,
  Available: styled.div<{ green: boolean }>`
    display: grid;
    grid-template-columns: 48px auto 160px;
    gap: ${({ theme }) => theme.size[16]};
    align-items: center;

    > img {
      box-shadow: ${({ theme }) => theme.shadow[300]};
      border-radius: 100%;
    }

    > div h3 {
      font-size: 14px;
      line-height: 18px;
      font-weight: 400;
    }

    > div span {
      font-size: 18px;
      color: ${({ green, theme }) => (green ? theme.color.green[500] : theme.colorV2.purple[1])};
    }

    > div:nth-child(2) {
      display: flex;
      flex-direction: column;
      gap: 4px;
      justify-content: flex-start;
      align-items: flex-start;

      > div {
        display: flex;
        gap: 4px;
      }
    }

    > div:nth-child(3) {
      display: grid;
    }
  `,
  Eligibility: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({ theme }) => theme.colorV2.gray[2]};
    padding: ${({ theme }) => theme.size[16]};
    border-radius: ${({ theme }) => theme.size[8]};
    box-shadow: ${({ theme }) => theme.shadow[100]};

    font-size: 14px;
    line-height: 16px;
    margin-bottom: 12px;

    > div:nth-child(2) {
      display: flex;
      align-items: center;

      > a {
        display: flex;
        align-items: center;
        gap: 4px;
        cursor: pointer;
        color: ${({ theme }) => theme.colorV2.blue[1]};

        &:hover {
          color: ${({ theme }) => theme.colorV2.purple[1]};
        }
      }
    }
  `,
  Incentives: styled.div`
    display: flex;
    flex-direction: column;

    gap: 16px;

    hr {
      border: 1px solid transparent;
      box-shadow: ${({ theme }) => theme.shadow[100]};
      position: relative;
      top: -1px;
    }

    > div {
      display: flex;
      justify-content: space-between;
    }
  `,
  IncentiveRow: styled.div<{ green: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    line-height: 18px;

    color: ${({ green, theme }) => (green ? theme.color.green[500] : theme.colorV2.gray[1])};

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      line-height: 16px;

      > span {
        display: flex;
      }
    }
  `,
  ConnectWalletIcon: styled(PiArrowLineRight)`
    font-size: 16px;
  `,
  LearnMoreIcon: styled(PiLink)`
    font-size: 14px;
  `,
  ClaimIcon: styled(PiHandCoins)`
    font-size: 18px;
  `,
  XIcon: styled(PiXCircle)`
    font-size: 18px;
  `,
  CheckIcon: styled(PiCheckCircle)`
    font-size: 18px;
  `,

  QuestionIcon: styled(PiQuestion)`
    width: 16px;
    height: 16px;
    color: ${({ theme }) => theme.colorV2.gray[1]};
    margin-left: 2px;
    display: flex;
    align-items: center;

    color: ${({ theme }) => theme.colorV2.gray[1]};
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.colorV2.purple[1]};
    }
  `
}
