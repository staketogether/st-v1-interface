import useConnectedAccount from '@/hooks/useConnectedAccount'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import useWalletSidebarConnectWallet from '@/hooks/useWalletSidebarConnectWallet'
import styled from 'styled-components'
import LayoutTitle from '../shared/layout/LayoutTitle'
import Image from 'next/image'
import ethIcon from '@assets/icons/currency-Eth.svg'
import useIncentivesPerAccount from '@/hooks/subgraphs/incentives/useIncentivesPerAccount'
import Button from '../shared/Button'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import IncentivesCard from './IncentivesCard'

export default function IncentivesControl() {
  const { t } = useLocaleTranslation()
  const { account } = useConnectedAccount()

  const { isLoading, incentivesPerAccount } = useIncentivesPerAccount(account)
  const { setOpenSidebarConnectWallet, openSidebarConnectWallet } = useWalletSidebarConnectWallet()

  return (
    <Container>
      <LayoutTitle title={t('v2.pages.incentives.title')} />
      <IncentivesContainer>
        <IncentivesDescriptions>
          <header>
            <span>{t('v2.incentives.incentivesAvailable')}</span>
          </header>
          <div>
            <div>
              <Image src={ethIcon} alt='eth icon' />
              <span>{t('v2.incentives.ownerPool')}</span>
            </div>
            <div>
              <Image src={ethIcon} alt='eth icon' />
              <span>{t('v2.incentives.earlyAdopters')}</span>
            </div>
            <div>
              <Image src={ethIcon} alt='eth icon' />
              <span>{t('v2.incentives.socialImpact')}</span>
            </div>
          </div>
        </IncentivesDescriptions>
        {account ? (
          <>
            <MyIncentivesContainer>
              <h3>{t('v2.incentives.myIncentives')}</h3>
              {!!(!isLoading && !incentivesPerAccount.length) && (
                <NoIncentivesAvailable>{t('v2.incentives.noDataMessage')}</NoIncentivesAvailable>
              )}
              <div>
                {isLoading && (
                  <>
                    <SkeletonLoading height={146} />
                    <SkeletonLoading height={146} />
                  </>
                )}
                {!isLoading &&
                  incentivesPerAccount.map((incentive, index) => (
                    <IncentivesCard key={incentive.id} reportIncentive={incentive} index={index} />
                  ))}
              </div>
            </MyIncentivesContainer>
          </>
        ) : (
          <DisconnectedContainer>
            <span>{t('v2.incentives.connectWalletMessage')}</span>
            <Button
              onClick={() => setOpenSidebarConnectWallet(!openSidebarConnectWallet)}
              label={t('connectWallet')}
              block
            />
          </DisconnectedContainer>
        )}
      </IncentivesContainer>
    </Container>
  )
}

const {
  Container,
  IncentivesContainer,
  NoIncentivesAvailable,
  DisconnectedContainer,
  IncentivesDescriptions,
  MyIncentivesContainer
} = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    max-width: 468px;
    gap: ${({ theme }) => theme.size[24]};
  `,
  IncentivesContainer: styled.div`
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: ${({ theme }) => theme.size[24]};

    border-radius: 8px;
    background: ${({ theme }) => theme.colorV2.white};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    h2 {
      text-align: center;
      font-size: ${({ theme }) => theme.font.size[15]};
      font-weight: 500;
      color: ${({ theme }) => theme.colorV2.gray[1]};
    }
  `,
  IncentivesDescriptions: styled.div`
    width: 100%;
    display: flex;
    padding: 12px;
    flex-direction: column;
    gap: 12px;

    border-radius: 8px;
    border: ${({ theme }) => theme.colorV2.gray[6]} 1px solid;

    font-size: ${({ theme }) => theme.font.size[15]};
    font-weight: 400;

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      a {
        font-size: ${({ theme }) => theme.font.size[13]};
      }
    }
    div {
      display: flex;
      align-items: center;
      gap: 12px;
      height: 90px;
      > div {
        width: 100%;
        border-radius: 8px;
        display: flex;
        padding: 12px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        gap: 10px;

        border-radius: 8px;
        background: ${({ theme }) => theme.colorV2.gray[2]};
      }
    }
  `,

  DisconnectedContainer: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};

    > span {
      color: ${({ theme }) => theme.colorV2.gray[1]};
      text-align: center;

      font-size: 13px;
      font-weight: 400;
    }
  `,
  MyIncentivesContainer: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};

    > h3 {
      color: ${({ theme }) => theme.colorV2.gray[1]};
      font-size: 13px;
      font-weight: 500;
    }

    > div {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: ${({ theme }) => theme.size[12]};
    }
  `,
  NoIncentivesAvailable: styled.span`
    color: ${({ theme }) => theme.colorV2.gray[1]};
    font-size: 12px;
    font-weight: 400;
    text-align: center;
  `
}
