import useTranslation from '@/hooks/useTranslation'
import { Delegation } from '@/types/Delegation'
import React from 'react'
import styled from 'styled-components'
import WalletSentDelegation from './WalletSentDelegation'

type WalletSideBarPoolsDelegatedProps = {
  accountDelegations: Delegation[]
}

export default function WalletSideBarPoolsDelegated({ accountDelegations }: WalletSideBarPoolsDelegatedProps) {
  const { t } = useTranslation()
  return (
    <ContainerPoolsDelegated>
      {accountDelegations.length === 0 && (
        <div>
          <span>{t('noStake')}</span>
        </div>
      )}
      {accountDelegations.map((delegation, index) => (
        <WalletSentDelegation key={index} delegation={delegation} />
      ))}
    </ContainerPoolsDelegated>
  )
}

const { ContainerPoolsDelegated } = {
  ContainerPoolsDelegated: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[12]};
    padding-top: ${({ theme }) => theme.size[16]};

    > div:first-of-type {
      margin-bottom: ${({ theme }) => theme.size[8]};
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    div > span:nth-child(2) > span {
      color: ${({ theme }) => theme.color.secondary};
    }
  `
}
