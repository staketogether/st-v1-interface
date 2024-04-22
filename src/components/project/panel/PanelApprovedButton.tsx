import Button from '@/components/shared/Button'
import Loading from '@/components/shared/icons/Loading'
import useProjectDetailModal from '@/hooks/useProjectDetailModal'
import { ContentfulPool } from '@/types/ContentfulPool'
import { stakeTogetherAbi } from '@/types/Contracts'
import { useEffect } from 'react'
import { LuAlertTriangle } from 'react-icons/lu'
import { PiTrash } from 'react-icons/pi'
import styled from 'styled-components'
import { useReadContract } from 'wagmi'
import { getStakingById } from '@/config/product/staking'

interface PanelApprovedButtonProps {
  project: ContentfulPool
  projectSelected: `0x${string}` | undefined
  openModal: (isContractPublished: boolean) => void
}

export default function PanelApprovedButton({ project, projectSelected, openModal }: PanelApprovedButtonProps) {
  const { StakeTogether } = getStakingById('eth-staking').contracts

  const {
    data: isPoolRegistered,
    isFetching,
    refetch
  } = useReadContract({
    address: StakeTogether,
    args: [project.wallet],
    abi: stakeTogetherAbi,
    functionName: 'pools'
  })

  const { isOpenProjectDetailModal } = useProjectDetailModal()

  useEffect(() => {
    if (!isOpenProjectDetailModal && projectSelected?.toLocaleLowerCase() === project.wallet.toLocaleLowerCase()) {
      refetch()
    }
  }, [isOpenProjectDetailModal, project.wallet, projectSelected, refetch])

  return isFetching ? (
    <Loading size={18} />
  ) : (
    <>
      <Button
        onClick={() => openModal(!!isPoolRegistered)}
        icon={isPoolRegistered ? <TrashIcon /> : <AlertIcon />}
        label={''}
        color='gray'
        small
      />
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
