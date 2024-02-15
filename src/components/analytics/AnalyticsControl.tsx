import chainConfig from '@/config/chain'
import useEthBalanceOf from '@/hooks/contracts/useEthBalanceOf'
import useAnalyticsData from '@/hooks/subgraphs/analytics/useAnalyticsData'
import useCoinConversion from '@/hooks/useCoinConversion'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { formatNumberByLocale } from '@/services/format'
import { truncateDecimal, truncateWei } from '@/services/truncate'
import etherscan from '@assets/icons/etherscan.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import SkeletonLoading from '../shared/icons/SkeletonLoading'
import LayoutTitle from '../shared/layout/LayoutTitle'
import AnalyticsValidatorRow from './AnalyticsValidatorRow'

export default function AnalyticsControl() {
  const { t } = useLocaleTranslation()
  const { locale } = useRouter()
  const { isLoading, analytics, validators } = useAnalyticsData()
  const { contracts, blockExplorer } = chainConfig()

  const { price: eth, symbol } = useCoinConversion('1')
  const ethPrice = formatNumberByLocale(truncateDecimal(eth || '0', 2), locale)
  const tvl = formatNumberByLocale(truncateDecimal(String(analytics?.totalValueLocked) || '0', 2), locale)
  const { price: tvlUsdPrice } = useCoinConversion(tvl)

  const tvlUsdPriceFormatted = formatNumberByLocale(truncateDecimal(tvlUsdPrice || '0', 2), locale)
  const totalAccounts = analytics?.accountsCount
  const depositedCount = analytics?.depositsCount
  const withdrawalsCount = analytics?.withdrawalsCount

  const totalRewards = formatNumberByLocale(truncateDecimal(String(analytics?.totalRewards) || '0', 2), locale)
  const { price: totalRewardsUsdPrice } = useCoinConversion(totalRewards)
  const totalRewardsUsdPriceFormatted = formatNumberByLocale(
    truncateDecimal(totalRewardsUsdPrice || '0', 2),
    locale
  )

  const poolsCount = analytics?.poolsCount
  const totalPoolsRewards = formatNumberByLocale(
    truncateDecimal(String(analytics?.totalPoolRewards) || '0', 2),
    locale
  )
  const { price: totalPoolsRewardsUsdPrice } = useCoinConversion(totalPoolsRewards)
  const totalPoolsRewardsUsdPriceFormatted = formatNumberByLocale(
    truncateDecimal(totalPoolsRewardsUsdPrice || '0', 2),
    locale
  )

  const totalContractsBalance = formatNumberByLocale(
    truncateDecimal(String(analytics?.contractBalance) || '0', 2),
    locale
  )
  const { price: totalContractsBalanceUsd } = useCoinConversion(totalContractsBalance)
  const totalContractsBalanceUsdFormatted = formatNumberByLocale(
    truncateDecimal(totalContractsBalanceUsd || '0', 2),
    locale
  )
  const validatorsAmountTotal = formatNumberByLocale(
    truncateDecimal(String(analytics?.validatorsAmountTotal) || '0', 2),
    locale
  )
  const { price: validatorsAmountTotalUsd } = useCoinConversion(validatorsAmountTotal)
  const validatorsAmountTotalUsdFormatted = formatNumberByLocale(
    truncateDecimal(validatorsAmountTotalUsd || '0', 2),
    locale
  )

  const { balance: stakeTogetherContract, isLoading: stakeTogetherContractLoading } = useEthBalanceOf(
    contracts.StakeTogether
  )
  const stakeTogetherContractFormatted = formatNumberByLocale(truncateWei(stakeTogetherContract, 4), locale)
  const { balance: routerContract, isLoading: routerLoading } = useEthBalanceOf(contracts.Router)
  const routerBalanceFormatted = formatNumberByLocale(truncateWei(routerContract, 4), locale)
  const { balance: withdrawalsContract, isLoading: withdrawalsLoading } = useEthBalanceOf(contracts.Withdrawals)
  const withdrawalsFormatted = formatNumberByLocale(truncateWei(withdrawalsContract, 4), locale)

  const validatorsCount = analytics?.validatorsCount
  const validatorMeanPerformance = analytics?.validatorMeanPerformance

  return (
    <Container>
      <LayoutTitle title={t('v2.pages.analytics.title')} description={''} />
      <Content>
        <h2>{t('v2.analytics.general.title')}</h2>
        <div>
          <Card>
            <header>
              <span>{t('v2.analytics.general.EthereumPrice')}</span>
              {isLoading ? (
                <SkeletonLoading width={120} />
              ) : (
                <span className='blue'>{`${symbol()}${ethPrice}`}</span>
              )}
            </header>
          </Card>
          <Card>
            <header>
              <span>TVL</span>
              {isLoading ? (
                <SkeletonLoading width={120} />
              ) : (
                <>
                  <span className='purple'>{`${tvl} ${t('eth.symbol')}`}</span>
                  <span>{`${symbol()}${tvlUsdPriceFormatted}`}</span>
                </>
              )}
            </header>
          </Card>
          <Card>
            <header>
              <span>APR</span>
              <span className='green'>5.1%</span>
            </header>
          </Card>
          <Card>
            <header>
              <span>{t('v2.analytics.general.SingleWallets')}</span>
              {isLoading ? <SkeletonLoading width={120} /> : <span>{`${totalAccounts}`}</span>}
            </header>
          </Card>
          <Card>
            <header>
              <span>{t('v2.analytics.general.DepositNumbers')}</span>
              {isLoading ? <SkeletonLoading width={120} /> : <span>{`${depositedCount}`}</span>}
            </header>
          </Card>
          <Card>
            <header>
              <span>{t('v2.analytics.general.WithdrawalNumbers')}</span>
              {isLoading ? <SkeletonLoading width={120} /> : <span>{`${withdrawalsCount}`}</span>}
            </header>
          </Card>
        </div>
      </Content>
      <Content>
        <h2>{t('v2.analytics.rewards.title')}</h2>
        <div className='rewards'>
          <Card>
            <header>
              <span>{t('v2.analytics.rewards.ethereumStaking')}</span>
              {isLoading ? (
                <SkeletonLoading width={120} />
              ) : (
                <>
                  <span className='green'>{`${totalRewards} ${t('eth.symbol')}`}</span>
                  <span>{`${symbol()}${totalRewardsUsdPriceFormatted}`}</span>
                </>
              )}
            </header>
          </Card>
          <Card>
            <header>
              <span>{`${poolsCount} ${t('v2.analytics.rewards.projects')}`}</span>
              {isLoading ? (
                <SkeletonLoading width={120} />
              ) : (
                <>
                  <span className='purple'>{`${totalPoolsRewards} ${t('eth.symbol')}`}</span>
                  <span>{`${symbol()} ${totalPoolsRewardsUsdPriceFormatted}`}</span>
                </>
              )}
            </header>
          </Card>
        </div>
      </Content>
      <Content>
        <h2>{t('v2.analytics.proofOfReserves.title')}</h2>
        <div className='proofOfReserves'>
          <Card>
            <header>
              <span>{t('v2.analytics.proofOfReserves.contracts')}</span>
              {isLoading ? (
                <SkeletonLoading width={120} />
              ) : (
                <>
                  <span className='green'>{`${totalContractsBalance} ${t('eth.symbol')}`}</span>
                  <span>{`${symbol()}${totalContractsBalanceUsdFormatted}`}</span>
                </>
              )}
            </header>
          </Card>
          <Card>
            <header>
              <span>{t('v2.analytics.proofOfReserves.validators')}</span>
              {isLoading ? (
                <SkeletonLoading width={120} />
              ) : (
                <>
                  <span className='purple'>{`${validatorsAmountTotal} ${t('eth.symbol')}`}</span>
                  <span>{`${symbol()}${validatorsAmountTotalUsdFormatted}`}</span>
                </>
              )}
            </header>
          </Card>
        </div>
      </Content>
      <ContractContainer>
        <h2>{t('v2.analytics.contracts.title')}</h2>
        <ContractsTable>
          <header>
            <span>{t('v2.analytics.contracts.contract')}</span>
            <span>{t('v2.analytics.contracts.balance')}</span>
            <span>{t('v2.analytics.contracts.link')}</span>
          </header>
          <div>
            <ContractTableRow
              href={`${blockExplorer.baseUrl}/address/${contracts.StakeTogether}`}
              target='_blank'
            >
              <span>Stake Together</span>
              {stakeTogetherContractLoading ? (
                <SkeletonLoading width={120} />
              ) : (
                <span>{`${stakeTogetherContractFormatted} ${t('eth.symbol')}`}</span>
              )}
              <span>
                <Image src={etherscan} alt='etherscan icon' width={16} height={16} />
                {t('v2.analytics.contracts.viewInExecutionLayer')}
              </span>
            </ContractTableRow>
            <ContractTableRow href={`${blockExplorer.baseUrl}/address/${contracts.Router}`} target='_blank'>
              <span>Router</span>
              {routerLoading ? (
                <SkeletonLoading width={120} />
              ) : (
                <span>{`${routerBalanceFormatted} ${t('eth.symbol')}`}</span>
              )}
              <span>
                <Image src={etherscan} alt='etherscan icon' width={16} height={16} />
                {t('v2.analytics.contracts.viewInExecutionLayer')}
              </span>
            </ContractTableRow>
            <ContractTableRow
              href={`${blockExplorer.baseUrl}/address/${contracts.Withdrawals}`}
              target='_blank'
            >
              <span>Withdrawals</span>
              {withdrawalsLoading ? (
                <SkeletonLoading width={120} />
              ) : (
                <span>{`${withdrawalsFormatted} ${t('eth.symbol')}`}</span>
              )}
              <span>
                <Image src={etherscan} alt='etherscan icon' width={16} height={16} />
                {t('v2.analytics.contracts.viewInExecutionLayer')}
              </span>
            </ContractTableRow>
          </div>
        </ContractsTable>
      </ContractContainer>
      <Content>
        <h2>{t('v2.analytics.validators.title')}</h2>
        <div className='proofOfReserves'>
          <Card>
            <header>
              <span>{t('v2.analytics.validators.totalValidators')}</span>
              {isLoading ? (
                <SkeletonLoading width={120} />
              ) : (
                <>
                  <span className='purple'>{`${validatorsCount}`}</span>
                </>
              )}
            </header>
          </Card>
          <Card>
            <header>
              <span>{t('v2.analytics.validators.averageValidatorPerformance')}</span>
              {isLoading ? (
                <SkeletonLoading width={120} />
              ) : (
                <>
                  <span className='green'>{`${validatorMeanPerformance?.toFixed(2)}%`}</span>
                </>
              )}
            </header>
          </Card>
        </div>
        <ValidatorsTable>
          <header>
            <span>#</span>
            <span>{t('v2.analytics.validators.address')}</span>
            <span>{t('v2.analytics.validators.balance')}</span>
            <span>{t('v2.analytics.validators.performance')}</span>
            <span>{t('v2.analytics.validators.link')}</span>
          </header>
          <div>
            {!isLoading &&
              validators.length &&
              validators.map((validator, index) => (
                <AnalyticsValidatorRow index={index} validator={validator} key={validator.publicKey} />
              ))}
          </div>
        </ValidatorsTable>
      </Content>
    </Container>
  )
}

const { Container, Content, Card, ContractsTable, ContractContainer, ContractTableRow, ValidatorsTable } = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[32]};
  `,
  Content: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};

    > h2 {
      color: ${({ theme }) => theme.colorV2.gray[1]};
      font-size: 20px;
      font-weight: 400;
    }

    > div {
      display: grid;
      grid-template-columns: 1fr;
      gap: ${({ theme }) => theme.size[24]};

      &.rewards {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
      }

      &.proofOfReserves {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
      }
      @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: ${({ theme }) => theme.size[24]};

        &.rewards {
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr;
        }

        &.proofOfReserves {
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr;
        }
      }
    }
  `,
  Card: styled.article`
    padding: ${({ theme }) => theme.size[12]};
    width: 100%;

    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.colorV2.white};
    box-shadow: ${({ theme }) => theme.shadow[100]};

    display: flex;
    flex-direction: column;

    > header {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[4]};

      span {
        font-size: 15px;
        font-style: normal;
        color: ${({ theme }) => theme.colorV2.gray[1]};
        &:nth-child(2) {
          font-size: 22px;
        }
        &:nth-child(3) {
          font-size: 13px;
        }

        &.blue {
          color: ${({ theme }) => theme.colorV2.blue[3]};
        }

        &.green {
          color: ${({ theme }) => theme.color.green[500]};
        }

        &.purple {
          color: ${({ theme }) => theme.colorV2.purple[1]};
        }
      }
    }
  `,
  ContractContainer: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[24]};
    > h2 {
      color: ${({ theme }) => theme.colorV2.gray[1]};
      font-size: 20px;
      font-weight: 400;
    }
  `,
  ContractsTable: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};

    span {
      color: ${({ theme }) => theme.colorV2.gray[1]};
      font-size: ${({ theme }) => theme.font.size[13]};
      font-weight: 400;
    }
    header {
      display: none;
    }
    > div {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[12]};
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      header {
        padding: 0px 24px;
        display: grid;
        grid-template-columns: 264px auto 200px;
        gap: ${({ theme }) => theme.size[8]};
        span {
          font-weight: 500;
        }
      }
    }
  `,
  ContractTableRow: styled(Link)`
    padding: 12px;
    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.colorV2.white};
    box-shadow: ${({ theme }) => theme.shadow[100]};

    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};

    border: 1px solid ${({ theme }) => theme.colorV2.white};

    &:hover {
      border: 1px solid ${({ theme }) => theme.colorV2.purple[1]};

      * {
        color: ${({ theme }) => theme.colorV2.purple[1]};
      }
    }

    span {
      &:first-child {
        font-size: ${({ theme }) => theme.font.size[15]};
        font-weight: 400;
      }
      &:nth-child(2) {
        font-size: ${({ theme }) => theme.font.size[13]};
        font-weight: 500;
      }
      &:last-child {
        font-size: ${({ theme }) => theme.font.size[13]};
        color: ${({ theme }) => theme.colorV2.blue[3]};
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.size[8]};
      }
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      height: 42px;
      display: grid;
      padding: 0px 24px;
      grid-template-columns: 264px auto 200px;
      gap: ${({ theme }) => theme.size[8]};
      align-items: center;
    }
  `,
  ValidatorsTable: styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};

    span {
      color: ${({ theme }) => theme.colorV2.gray[1]};
      font-size: ${({ theme }) => theme.font.size[13]};
      font-weight: 500;
    }
    > div {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[12]};
    }
    header {
      display: none;
    }
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      header {
        padding: 0px 24px;
        display: grid;
        grid-template-columns: 40px 1fr 1fr 1fr 1fr;
        gap: ${({ theme }) => theme.size[12]};
      }
    }
  `
}
