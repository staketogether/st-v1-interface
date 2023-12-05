import useContentfulPoolsList from '@/hooks/contentful/useContentfulPoolsList'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { Delegation } from '@/types/Delegation'
import { Drawer, Progress, Slider } from 'antd'
import styled from 'styled-components'
import CommunityLogo from '../shared/community/CommunityLogo'
import CommunityName from '../shared/community/CommunityName'
import { PiArrowCounterClockwise, PiChartPieSlice } from 'react-icons/pi'
import { useState } from 'react'
import Button from '../shared/Button'
import { ethers } from 'ethers'
// import ConfirmTransaction from '../shared/transaction-loading/ConfirmTransaction'
// import useConfirmTransactionModal from '@/hooks/useConfirmTransactionModal'
import Card from '../shared/Card'
import { UpdateDelegationForm } from '@/types/UpdateDelegation'
import useUpdateDelegations, { PoolData } from '@/hooks/contracts/useUpdateDelegations'
import useWalletSidebarEditPortfolio from '@/hooks/useWalletSidebarEditPortfolio'

type WalletSidebarEditPortfolioProps = {
  accountDelegations: Delegation[]
  accountTotalShares: bigint
  userAccount: `0x${string}`
}

export default function WalletSidebarEditPortfolio({
  accountDelegations,
  accountTotalShares,
  userAccount
}: WalletSidebarEditPortfolioProps) {
  function handleFormValue(value: Delegation) {
    const address = value.delegated.address
    const poolBalanceDecimal = Number(value.delegationShares)
    const percentage = (poolBalanceDecimal / Number(accountTotalShares)) * 100
    const roundedPercentage = Math.round(percentage * 100) / 100

    return { poolBalanceDecimal, percentage: roundedPercentage, address }
  }

  const [delegationForm, setDelegationForm] = useState<UpdateDelegationForm[]>(
    accountDelegations.map(item => handleFormValue(item))
  )
  const [remainingValue, setRemainingValue] = useState(0)

  const { openSidebar, setOpenSidebar } = useWalletSidebarEditPortfolio()
  const { poolsList, isLoading } = useContentfulPoolsList()
  // const { setConfirmTransactionModal, isOpen: confirmTransactionIsOpen } = useConfirmTransactionModal()

  function percentageToWei(percentage: number) {
    if (isNaN(percentage)) {
      return 0n
    }
    return ethers.parseEther((percentage / 100).toFixed(2))
  }

  const updateDelegationsFormat = delegationForm.map(project => {
    return { pool: project.address, percentage: percentageToWei(project.percentage) }
  })

  function verifySumEth(array: PoolData[]) {
    const sum: bigint = array.reduce((accumulator, item) => {
      return accumulator + item.percentage
    }, BigInt(0))

    const oneEth: bigint = ethers.parseEther('1')
    return sum === oneEth
  }

  const isEnabled = verifySumEth(updateDelegationsFormat)
  const { updateDelegations, isLoading: updateDelegationsLoading } = useUpdateDelegations(
    isEnabled,
    updateDelegationsFormat,
    userAccount
  )

  const handleMetadataPools = (address: `0x${string}`) => {
    return poolsList.find(pool => pool.wallet.toLowerCase() === address.toLocaleLowerCase())
  }

  const { t } = useLocaleTranslation()
  function handleUpdateForm(delegation: UpdateDelegationForm, valuePercentage: number, valueDecimal: number) {
    const updateDelegation = delegationForm.map(delegationForm => {
      if (delegationForm.address === delegation.address) {
        return { ...delegationForm, percentage: valuePercentage, poolBalanceDecimal: valueDecimal }
      }
      return { ...delegationForm }
    })
    setDelegationForm(updateDelegation)
  }

  function handleSlideChange(delegation: UpdateDelegationForm, value: number) {
    const valuePercentage = (value / Number(accountTotalShares)) * 100
    const roundedPercentage = Math.round(valuePercentage * 100) / 100

    if (roundedPercentage < delegation.percentage) {
      setRemainingValue(remainingValue + (delegation.percentage - roundedPercentage))
      handleUpdateForm(delegation, roundedPercentage, value)
      return
    }
    const deferenceValue = roundedPercentage - delegation.percentage
    if (deferenceValue <= remainingValue) {
      setRemainingValue(remainingValue - deferenceValue)
      handleUpdateForm(delegation, roundedPercentage, value)
      return
    }
    if (remainingValue > 0) {
      const maxValue = delegation.percentage + remainingValue
      handleUpdateForm(delegation, maxValue, value)
      setRemainingValue(0)
    }
  }

  return (
    <>
      <DrawerContainer
        placement='right'
        size='default'
        onClose={() => setOpenSidebar(false)}
        mask={true}
        open={openSidebar}
      >
        <CardContainer title={t('portfolio')} icon={<PoolsIcon />}>
          <AvailableValueContainer>
            <span>Valor disponivel para distribuição</span>
            <div>
              <Progress percent={Number(remainingValue.toFixed(0))} style={{ margin: 0 }} />
              {/* <Button icon={<PiPlus />} block isLoading={false} onClick={() => {}} label={'add Project'} disabled={false} /> */}
            </div>
          </AvailableValueContainer>
          <CommunitiesContainer>
            {delegationForm.map((delegation, index) => {
              const poolMetadata = handleMetadataPools(delegation.address)
              return (
                <DelegatedPool key={index}>
                  <div>
                    <Project>
                      <CommunityLogo
                        size={24}
                        src={poolMetadata?.logo.url}
                        alt={poolMetadata?.logo.fileName || ''}
                        loading={isLoading}
                        listed={!!poolMetadata}
                      />
                      {poolMetadata && poolMetadata.name ? (
                        <CommunityName name={poolMetadata.name} loading={isLoading} />
                      ) : (
                        <CommunityName walletAddress={delegation.address} loading={isLoading} />
                      )}
                    </Project>
                  </div>
                  <div>
                    <Slider
                      value={Number(delegation.poolBalanceDecimal)}
                      max={Number(accountTotalShares)}
                      tooltip={{ formatter: () => `${delegation.percentage.toFixed(0)}%` }}
                      onChange={e => handleSlideChange(delegation, e)}
                    />
                    <span>{`${delegation.percentage.toFixed(0)}%`}</span>
                  </div>
                </DelegatedPool>
              )
            })}
          </CommunitiesContainer>

          <Button
            icon={<PiArrowCounterClockwise />}
            block
            isLoading={updateDelegationsLoading}
            onClick={() => true}
            label={'update delegation'}
            disabled={!isEnabled}
          />
        </CardContainer>
      </DrawerContainer>
      {/* {confirmTransactionIsOpen && (
        <ConfirmTransaction
          labelButton='confirm'
          titleModal='review update delegation'
          walletActionLoading={false}
          transactionLoading={false}
          transactionIsSuccess={false}
          handleConfirmTransaction={updateDelegations}
          handleCloseModal={() => setConfirmTransactionModal(false)}
        >
          <div>transaction</div>
        </ConfirmTransaction>
      )} */}
    </>
  )
}

const {
  DrawerContainer,
  CommunitiesContainer,
  DelegatedPool,
  Project,
  PoolsIcon,
  AvailableValueContainer,
  CardContainer
} = {
  DrawerContainer: styled(Drawer)`
    background-color: ${({ theme }) => theme.colorV2.foreground} !important;

    .ant-drawer-header.ant-drawer-header-close-only {
      display: none;
    }

    .ant-drawer-body {
      width: calc(100vw - 60px);
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.size[16]};
      padding: ${({ theme }) => theme.size[16]};
      @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        width: 380px;
      }
    }
  `,
  DelegatedPool: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    flex-direction: column;
    align-items: center;

    padding: 0px ${({ theme }) => theme.size[8]};
    border-radius: ${({ theme }) => theme.size[8]};
    transition: background-color 0.1s ease;

    > div {
      display: flex;
      color: ${({ theme }) => theme.colorV2.purple[1]};
      font-size: 13px;

      > div {
        display: flex;
        gap: ${({ theme }) => theme.size[8]};
      }

      > span {
        padding-left: 4px;
        color: ${({ theme }) => theme.colorV2.purple[1]};
      }
    }

    div {
      &:nth-child(2) {
        display: grid;
        grid-template-columns: 1fr 60px;
        align-items: center;
        gap: 8px;
        > span {
          text-align: end;
          padding: 0px;
        }
      }
    }

    > span {
      display: flex;
      gap: ${({ theme }) => theme.size[4]};
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.color.secondary};
    }
  `,
  CardContainer: styled(Card)`
    display: flex;
    flex-direction: column;
    gap: 12px;
  `,
  CommunitiesContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
  Project: styled.div`
    font-size: 13px;

    span {
      font-size: 13px;
    }
  `,
  AvailableValueContainer: styled.div`
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    > div {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `,
  PoolsIcon: styled(PiChartPieSlice)`
    font-size: 16px;
  `
}
