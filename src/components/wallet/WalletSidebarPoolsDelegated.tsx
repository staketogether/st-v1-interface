import useTranslation from '@/hooks/useTranslation'
import { Delegation } from '@/types/Delegation'
import React from 'react'
import styled from 'styled-components'
import Link from "next/link";
import EnsAvatar from "@/components/shared/ens/EnsAvatar";
import EnsName from "@/components/shared/ens/EnsName";
import { truncateWei } from "@/services/truncate";
import useWalletSidebar from "@/hooks/useWalletSidebar";

type WalletSideBarPoolsDelegatedProps = {
  accountDelegations: Delegation[]
}

export default function WalletSidebarPoolsDelegated({ accountDelegations }: WalletSideBarPoolsDelegatedProps) {
  const { t } = useTranslation()
  const { setOpenSidebar } = useWalletSidebar()

  return (
    <Container>
      {accountDelegations.length === 0 && (
        <div>
          <span>{t('noStake')}</span>
        </div>
      )}
      {accountDelegations.map((delegation, index) => (
        <DelegatedPool key={index} href={`/pools/deposit/${delegation.delegated.address}`}
                       onClick={() => setOpenSidebar(false)}>
          <div>
            <div>
              <EnsAvatar address={delegation.delegated.address}/>
              <EnsName address={delegation.delegated.address}/>
            </div>
          </div>
          <span>
        {truncateWei(delegation.delegationBalance, 6)}
            <span>{t('lsd.symbol')}</span>
      </span>
        </DelegatedPool>
      ))}
    </Container>
  )
}

const { Container, DelegatedPool } = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.size[4]};
    margin-top: ${({ theme }) => theme.size[16]};

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    div > span:nth-child(2) > span {
      color: ${({ theme }) => theme.color.secondary};
    }
  `,
  DelegatedPool: styled(Link)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    border-radius: ${({ theme }) => theme.size[16]};
    padding: ${({ theme }) => theme.size[8]};
    background-color: ${({ theme }) => theme.color.blackAlpha[50]};

    > div {
      display: flex;

      > div {
        display: flex;
        gap: ${({ theme }) => theme.size[8]};
      }

      > span {
        color: ${({ theme }) => theme.color.black};
      }
    }

    > span {
      display: flex;
      gap: ${({ theme }) => theme.size[4]};
      font-size: ${({ theme }) => theme.font.size[14]};
      color: ${({ theme }) => theme.color.primary};

      > span {
        color: ${({ theme }) => theme.color.secondary};
      }
    }
  `
}
