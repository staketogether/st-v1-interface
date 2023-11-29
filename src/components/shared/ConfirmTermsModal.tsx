import React from 'react'
import Modal from './Modal'
import useConfirmTermsModal from '@/hooks/useConfirmTermsModal'
import styled from 'styled-components'
import axios from 'axios'
import { ContentfulWithLocale } from '@/types/ContentfulPool'
import Button from './Button'

type ConfirmTermsModalProps = {
  poolDetail: ContentfulWithLocale
}

export default function ConfirmTermsModal({ poolDetail }: ConfirmTermsModalProps) {
  const { isOpen, setOpen } = useConfirmTermsModal()
  const linkTerms =
    'https://university.staketogether.org/en/articles/8646402-terms-and-conditions-for-onboarding-into-stake-together-liquid-staking-pool'

  const handleConfirmTerms = async () => {
    await axios.post('/api/project/setAgreeTermsOfUser', {
      projectId: poolDetail.sys.id
    })
    setOpen(false)
  }
  return (
    <Modal
      title={<h1 style={{ textAlign: 'center' }}>Terms of service</h1>}
      onClose={() => setOpen(false)}
      isOpen={isOpen}
      width={'auto'}
      showCloseIcon={false}
    >
      <Terms>
        <span>
          I agree to the{' '}
          <a href={linkTerms} target='_blank'>
            Terms of Service{' '}
          </a>{' '}
          of service for owning a project on the Stake Together platform.
        </span>

        <Button isLoading={false} onClick={handleConfirmTerms} label={'Accept Terms of Service'} />
      </Terms>
    </Modal>
  )
}
const { Terms } = {
  Terms: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.size[24]};

    padding: 12px ${({ theme }) => theme.size[24]};

    font-size: ${({ theme }) => theme.font.size[14]};

    a {
      color: ${({ theme }) => theme.colorV2.purple[1]};
      &:hover {
        color: ${({ theme }) => theme.colorV2.purple[2]};
      }
    }

    span {
      max-width: 350px;
      text-align: center;
    }

    > input {
      cursor: pointer;
    }
  `
}
