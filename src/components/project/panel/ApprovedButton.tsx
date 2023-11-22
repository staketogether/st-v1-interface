import Loading from '@/components/shared/icons/Loading'
import chain from '@/config/chain'
import useRemovePool from '@/hooks/contracts/useRemovePool'
import { ContentfulPool } from '@/types/ContentfulPool'
import { useStakeTogetherPools } from '@/types/Contracts'
import React, { useEffect } from 'react'
import { LuAlertTriangle } from 'react-icons/lu'
import { PiTrash } from 'react-icons/pi'
import styled from 'styled-components'
import Button from '@/components/shared/Button'
import { useSignMessage } from 'wagmi'
import axios from 'axios'
import { notification } from 'antd'
import { contentfulClient } from '@/config/apollo'
import { queryContentfulPoolsListByStatus } from '@/queries/contentful/queryContentfulPoolsListByStatus'
import useProjectDetailModal from '@/hooks/useProjectDetailModal'

type ApprovedButtonProps = {
  project: ContentfulPool
  projectSelected: `0x${string}` | undefined
  openModal: (isContractPublished: boolean) => void
}

export default function ApprovedButton({ project, projectSelected, openModal }: ApprovedButtonProps) {
  const { contracts } = chain()
  const {
    data: isPoolRegistered,
    isFetching,
    refetch
  } = useStakeTogetherPools({
    address: contracts.StakeTogether,
    args: [project.wallet]
  })

  const { isOpenProjectDetailModal } = useProjectDetailModal()

  useEffect(() => {
    if (
      !isOpenProjectDetailModal &&
      projectSelected?.toLocaleLowerCase() === project.wallet.toLocaleLowerCase()
    ) {
      refetch()
    }
  }, [isOpenProjectDetailModal, project.wallet, projectSelected, refetch])

  const {
    isLoading: isLoadingTransaction,
    isSuccess,
    removePool,
    awaitWalletAction
  } = useRemovePool(project.wallet, isPoolRegistered)

  const rejectMessage = `Stake Together Rejected Project - ${project.wallet} `
  const { isLoading: rejectedIsLoading, signMessage: rejectedSignMessage } = useSignMessage({
    message: rejectMessage,
    onSuccess: async data => {
      const signatureMessage = { signature: data, message: rejectMessage }

      await axios.post('/api/project/status', {
        projectId: project.sys.id,
        status: 'rejected',
        signatureMessage
      })

      await refetch()
      await contentfulClient.refetchQueries({
        include: [queryContentfulPoolsListByStatus]
      })
    },
    onError: error => {
      const { cause } = error as { cause?: { message?: string } }
      notification.warning({
        message: `${cause?.message}`,
        placement: 'topRight'
      })
    }
  })

  useEffect(() => {
    const verifyIsSuccess = async () => {
      if (isSuccess) {
        rejectedSignMessage()
      }
    }
    verifyIsSuccess()
  }, [isSuccess, rejectedSignMessage])

  return isFetching ? (
    <Loading size={18} />
  ) : (
    <>
      {isPoolRegistered ? (
        <Button
          onClick={removePool}
          isLoading={isLoadingTransaction || awaitWalletAction || rejectedIsLoading}
          icon={<TrashIcon />}
          label={''}
          color='gray'
          small
        />
      ) : (
        <Button
          onClick={() => openModal(!!isPoolRegistered)}
          isLoading={isLoadingTransaction || awaitWalletAction}
          icon={<AlertIcon />}
          label={''}
          color='gray'
          small
        />
      )}
    </>
  )
}

const { AlertIcon, TrashIcon } = {
  AlertIcon: styled(LuAlertTriangle)`
    color: ${({ theme }) => theme.color.yellow[500]};
    font-size: 16px;
  `,
  TrashIcon: styled(PiTrash)`
    color: ${({ theme }) => theme.colorV2.gray[1]};
    font-size: 16px;
  `
}
