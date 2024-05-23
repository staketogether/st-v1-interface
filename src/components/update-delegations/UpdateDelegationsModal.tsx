import { chainConfigByChainId } from '@/config/chain'
import useContentfulPoolsList from '@/hooks/contentful/useContentfulPoolsList'
import useUpdateDelegations, { PoolData } from '@/hooks/contracts/useUpdateDelegations'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import useWalletSidebarEditPortfolio from '@/hooks/useWalletSidebarEditPortfolio'
import { Delegation } from '@/types/Delegation'
import { UpdateDelegationForm } from '@/types/UpdateDelegation'
import { Progress, Slider } from 'antd'
import { useEffect, useState } from 'react'
import { PiArrowCounterClockwise, PiPlusBold, PiQuestion } from 'react-icons/pi'
import styled, { useTheme } from 'styled-components'
import { useAccount, useSwitchChain } from 'wagmi'
import Button from '../shared/Button'
import GenericTransactionLoading from '../shared/GenericTransactionLoading'
import Modal from '../shared/Modal'
import TooltipComponent from '../shared/TooltipComponent'
import CommunityLogo from '../shared/community/CommunityLogo'
import CommunityName from '../shared/community/CommunityName'
import ListProjectModal from './ListProjectModal'
import ReviewUpdateDelegationsRequest from './ReviewUpdateDelegationsRequest'
import { getStakingById } from '@/config/product/staking'
import { ethers } from 'ethers'
import { capitalize } from '@/services/truncate'

interface UpdateDelegationsModalProps {
  accountDelegations: Delegation[]
  accountTotalShares: bigint
  userAccount: `0x${string}`
  productSelected: string
}
export default function UpdateDelegationsModal({
  accountDelegations,
  accountTotalShares,
  userAccount,
  productSelected
}: UpdateDelegationsModalProps) {
  const [delegationForm, setDelegationForm] = useState<UpdateDelegationForm[]>([])
  const theme = useTheme()
  const staking = getStakingById(productSelected)

  const { chain: walletChainId } = useAccount()
  const isWrongNetwork = !staking.asset.chains.includes(walletChainId?.id ?? 0)

  useEffect(() => {
    function handleFormValue(value: Delegation) {
      const address = value.delegated.address
      const poolBalanceDecimal = Number(value.delegationShares)
      const percentage = (poolBalanceDecimal / Number(accountTotalShares)) * 100
      const roundedPercentage = Math.round(percentage * 100) / 100
      return { poolBalanceDecimal, percentage: roundedPercentage, address }
    }

    const newAccountDelegations = accountDelegations.map(item => handleFormValue(item))
    setDelegationForm(newAccountDelegations)
  }, [accountDelegations, accountTotalShares])

  const [remainingValue, setRemainingValue] = useState(0)
  const [addProjectModal, setAddProjectModal] = useState(false)

  const { poolsList, isLoading } = useContentfulPoolsList()

  const { openSidebar, setOpenSidebar } = useWalletSidebarEditPortfolio()
  const { t } = useLocaleTranslation()

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

  const {
    updateDelegations,
    isLoading: updateDelegationsLoading,
    isSuccess,
    txHash,
    awaitWalletAction,
    resetState,
    prepareTransactionIsError,
    prepareTransactionErrorMessage
  } = useUpdateDelegations(
    isEnabled,
    updateDelegationsFormat.filter(pool => pool.percentage > 0n),
    staking,
    staking.asset.chains[0],
    userAccount
  )

  const handleMetadataPools = (address: `0x${string}`) => {
    return poolsList.find(pool => pool.wallet.toLowerCase() === address.toLocaleLowerCase())
  }

  function handleUpdateForm(delegation: UpdateDelegationForm, valuePercentage: number, valueDecimal: number, removeProject?: boolean) {
    const updateDelegation = delegationForm.map(dF => {
      if (dF.address === delegation.address) {
        return { ...dF, percentage: valuePercentage, poolBalanceDecimal: valueDecimal }
      }
      return { ...dF }
    })
    const delegationFilter = removeProject
      ? updateDelegation.filter(pool => {
          return pool.address.toLocaleLowerCase() !== delegation.address.toLocaleLowerCase()
        })
      : updateDelegation
    setDelegationForm(delegationFilter)
  }

  function handleSlideChange(delegation: UpdateDelegationForm, value: number, removeProject?: boolean) {
    const valuePercentage = (value / Number(accountTotalShares)) * 100
    const roundedPercentage = Math.round(valuePercentage * 100) / 100

    if (roundedPercentage < delegation.percentage) {
      setRemainingValue(remainingValue + (delegation.percentage - roundedPercentage))
      handleUpdateForm(delegation, roundedPercentage, value, removeProject)
      return
    }
    const deferenceValue = roundedPercentage - delegation.percentage
    if (deferenceValue <= remainingValue) {
      setRemainingValue(remainingValue - deferenceValue)
      handleUpdateForm(delegation, roundedPercentage, value, removeProject)
      return
    }
    if (remainingValue > 0) {
      const maxValue = delegation.percentage + remainingValue
      handleUpdateForm(delegation, maxValue, value, removeProject)
      setRemainingValue(0)
    }
  }

  function handleAddNewProject(walletAddress: `0x${string}`) {
    const newProject: UpdateDelegationForm = {
      address: walletAddress,
      poolBalanceDecimal: 0,
      percentage: 0
    }
    setDelegationForm([...delegationForm, newProject])
  }
  const isLoadingTransaction = isLoading || awaitWalletAction

  const handleCloseModal = () => {
    setOpenSidebar(false)
    resetState()
  }

  const disabledButton = prepareTransactionIsError || !isEnabled

  const { name } = chainConfigByChainId(staking.asset.chains[0])
  const handleLabelButton = () => {
    if (isWrongNetwork) {
      return `${t('switch')} ${capitalize(name.toLowerCase().replaceAll('-', ' '))}`
    }
    if (prepareTransactionIsError) {
      return prepareTransactionErrorMessage
    }
    return t('v2.updateDelegations.labelButton')
  }

  const { switchChain } = useSwitchChain()
  const handleUpdateDelegationButton = () => {
    if (isWrongNetwork && switchChain) {
      switchChain({ chainId: staking.asset.chains[0] })
      return
    }
    updateDelegations()
  }

  return (
    <>
      <Modal
        title={<Title>{t('v2.updateDelegations.modalTitle')}</Title>}
        showHeader={isSuccess || isLoadingTransaction ? false : true}
        showCloseIcon={isSuccess || isLoadingTransaction ? false : true}
        isOpen={openSidebar}
        noPadding
        onClose={handleCloseModal}
      >
        {isSuccess || isLoadingTransaction ? (
          <GenericTransactionLoading
            title={
              (isSuccess && `${t('v2.updateDelegations.transactionMessages.successful')}`) ||
              `${t('v2.updateDelegations.transactionMessages.transactionLoading')}`
            }
            chainId={staking.asset.chains[0]}
            isLoading={isLoadingTransaction}
            isSuccess={isSuccess}
            txHash={txHash}
            noModalPadding
            successButtonLabel={t('close')}
            bodyComponent={
              <ReviewUpdateDelegationsRequest poolsList={poolsList} delegationForm={delegationForm.filter(pool => pool.percentage > 0n)} />
            }
            onSuccessAction={handleCloseModal}
          />
        ) : (
          <CardContainer>
            <AvailableValueContainer>
              <span>
                {t('v2.updateDelegations.availableForDistribution')}{' '}
                <TooltipComponent text={t('v2.updateDelegations.availableForDistributionTooltip')}>
                  <QuestionIcon />
                </TooltipComponent>
              </span>
              <div>
                <Progress percent={Number(remainingValue.toFixed(0))} style={{ margin: 0 }} strokeColor={theme.colorV2.blue[1]} />
                <Button
                  small
                  icon={<PiPlusBold style={{ fontSize: '12px' }} />}
                  isLoading={false}
                  onClick={() => setAddProjectModal(true)}
                  label={'Add'}
                  disabled={false}
                />
              </div>
            </AvailableValueContainer>
            <Divider />
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
                          alt={poolMetadata?.logo.fileName ?? ''}
                          loading={isLoading}
                          listed={!!poolMetadata}
                        />
                        {poolMetadata?.name ? (
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
                        style={{ margin: 0 }}
                      />
                      <span>{`${delegation.percentage.toFixed(0)}%`}</span>
                      <Button small isLoading={false} onClick={() => handleSlideChange(delegation, 0, true)} label={'x'} disabled={false} />
                    </div>
                  </DelegatedPool>
                )
              })}
            </CommunitiesContainer>
            <Divider />
            <ActionContainer>
              <Button
                icon={<PiArrowCounterClockwise />}
                block
                isLoading={updateDelegationsLoading || awaitWalletAction}
                onClick={handleUpdateDelegationButton}
                label={handleLabelButton()}
                disabled={disabledButton}
              />
            </ActionContainer>
          </CardContainer>
        )}
      </Modal>

      {
        <ListProjectModal
          isOpen={addProjectModal}
          handleCloseModal={() => setAddProjectModal(false)}
          handleAddNewProject={handleAddNewProject}
          delegationAddress={delegationForm.map(pool => pool.address)}
        />
      }
    </>
  )
}

const {
  Title,
  CommunitiesContainer,
  DelegatedPool,
  Project,
  ActionContainer,
  AvailableValueContainer,
  CardContainer,
  QuestionIcon,
  Divider
} = {
  Title: styled.header`
    width: 100%;
  `,
  DelegatedPool: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.size[8]};

    padding: 0px 20px 0px 24px;
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
        grid-template-columns: 1fr 60px 32px;
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
  CardContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,
  CommunitiesContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-height: 500px;
    overflow-y: auto;
    margin-right: 4px;
  `,
  Project: styled.div`
    font-size: 13px;

    span {
      font-size: 13px;
    }
  `,
  Divider: styled.div`
    width: 100%;
    height: 1px;
    border-bottom: 1px solid var(--border, rgba(0, 0, 0, 0.2));
  `,
  ActionContainer: styled.div`
    padding: 0px 24px 24px 24px;
  `,
  AvailableValueContainer: styled.div`
    padding: 8px 24px 0px 24px;
    display: flex;
    flex-direction: column;

    > div {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 8px;
      align-items: center;
    }
    > span {
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.colorV2.gray[1]};
      display: flex;
      align-items: center;
      gap: 4px;
    }
  `,
  QuestionIcon: styled(PiQuestion)`
    width: 14px;
    height: 14px;
    color: ${({ theme }) => theme.colorV2.gray[1]};
    margin-left: 3px;
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.color.secondary};
    }
  `
}
