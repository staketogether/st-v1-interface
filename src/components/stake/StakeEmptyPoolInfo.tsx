import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import stIcon from '@assets/icons/empty-pool-info.svg'
import useTranslation from '@/hooks/useTranslation'

export default function StakeEmptyPoolInfo() {
  const { t } = useTranslation()
  return (
    <Container>
      <Image src={stIcon} width={120} height={120} alt='empty state' />
      <h4>{t('v2.stake.annualRewards')}</h4>
    </Container>
  )
}

const { Container } = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px 0px;
    gap: 16px;
    > h4 {
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  `
}
