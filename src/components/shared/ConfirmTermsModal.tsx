import React, { useState } from 'react'
import Modal from './Modal'
import useConfirmTermsModal from '@/hooks/useConfirmTermsModal'
import styled from 'styled-components'
import axios from 'axios'
import { ContentfulWithLocale } from '@/types/ContentfulPool'
import Button from './Button'
import { globalConfig } from '@/config/global'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'

type ConfirmTermsModalProps = {
  poolDetail: ContentfulWithLocale
}

export default function ConfirmTermsModal({ poolDetail }: ConfirmTermsModalProps) {
  const [loading, setLoading] = useState(false)
  const { isOpen, setOpen } = useConfirmTermsModal()
  const linkTerms = globalConfig.createProjectTermsOfUse
  const { t } = useLocaleTranslation()

  const handleConfirmTerms = async () => {
    setLoading(true)
    await axios.post('/api/project/setAgreeTermsOfUser', {
      projectId: poolDetail.sys.id
    })
    setOpen(false)
    setLoading(false)
  }
  return (
    <Modal
      title={<h1 style={{ textAlign: 'center', marginTop: '12px' }}>Terms of service</h1>}
      onClose={() => setOpen(false)}
      isOpen={isOpen}
      width={'auto'}
      showCloseIcon={false}
    >
      <Terms>
        <span>
          {t('v2.termsOfService.agree')}{' '}
          <a href={linkTerms} target='_blank'>
            {t('v2.termsOfService.termsOfService')}{' '}
          </a>{' '}
          {t('v2.termsOfService.message')}
        </span>

        <Button isLoading={loading} onClick={handleConfirmTerms} label={'Accept Terms of Service'} />
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
