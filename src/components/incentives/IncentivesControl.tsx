import WalletSidebarDisconnected from '@/components/wallet/WalletSidebarDisconnected'
import { useClaimAirdrop } from '@/hooks/contracts/useClaimAirdrop'
import useConnectedAccount from '@/hooks/useConnectedAccount'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import useWalletSidebarConnectWallet from '@/hooks/useWalletSidebarConnectWallet'
import stSymbol from '@assets/st-symbol.svg'
import Image from 'next/image'
import Link from 'next/link'
import { PiArrowLineRight, PiHandCoins, PiLink } from 'react-icons/pi'
import styled from 'styled-components'
import { useNetwork } from 'wagmi'
import chainConfig from '../../config/chain'
import useIncentives from '../../hooks/useIncentives'
import { truncateWei } from '../../services/truncate'
import Button from '../shared/Button'
import LayoutTitle from '../shared/layout/LayoutTitle'

export default function IncentivesControl() {
  const { account } = useConnectedAccount()
  const { incentives, amount } = useIncentives(account)
  const { t } = useLocaleTranslation()

  const { setOpenSidebarConnectWallet, openSidebarConnectWallet } = useWalletSidebarConnectWallet()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        <AirdropContainer>
          <Available green={amount > 0n}>
            <Image src={stSymbol} width={48} height={48} alt='stpETH' />
            <div>
              <h3>{t('airdrop.available')}</h3>
              <div>
                <span>{truncateWei(amount)}</span>
                <span>{t('lsd.symbol')}</span>
              </div>
            </div>
            <div>
              {!account && (
                <Button
                  onClick={() => setOpenSidebarConnectWallet(true)}
                  label={t('connectWalletSideBar.connectButton')}
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
          <Eligibility>
            <div>
              <span>{t('airdrop.eligibilityCriteria')}</span>
            </div>
            <div>
              <Link href='#' target='_blank'>
                {t('airdrop.learnMore')} <LearnMoreIcon />
              </Link>
            </div>
          </Eligibility>
          <Incentives>
            {incentives.map((incentive, index) => (
              <div key={index}>
                <div>
                  <span>{incentive.amount > 0 ? <LearnMoreIcon /> : <LearnMoreIcon />}</span>
                  <span>{incentive.name}</span>
                </div>
                <div>
                  <span>
                    {truncateWei(incentive.amount)}
                    {t('lsd.symbol')}
                  </span>
                </div>
              </div>
            ))}
            <hr />
            <div>
              <div>
                <span>{amount > 0 ? <LearnMoreIcon /> : <LearnMoreIcon />}</span>
                <span>{t('airdrop.total')}</span>
              </div>

              <div>
                <span>
                  {truncateWei(amount)}
                  {t('lsd.symbol')}
                </span>
              </div>
            </div>
          </Incentives>
        </AirdropContainer>
      </Container>
      <WalletSidebarDisconnected />
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
  Incentives
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

    gap: ${({ theme }) => theme.size[24]};
    text-align: center;
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
  `,
  Incentives: styled.div`
    display: flex;
    flex-direction: column;

    gap: 8px;

    > div {
      display: flex;
      justify-content: space-between;
    }
  `,
  ConnectWalletIcon: styled(PiArrowLineRight)`
    font-size: 16px;
  `,
  LearnMoreIcon: styled(PiLink)`
    font-size: 16px;
  `,
  ClaimIcon: styled(PiHandCoins)`
    font-size: 18px;
  `
}
