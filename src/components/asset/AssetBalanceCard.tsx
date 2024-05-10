import { Asset } from '@/types/Asset'
import React from 'react'
import styled from 'styled-components'
import AssetIcon from '../shared/AssetIcon'
import useErc20BalanceOf from '@/hooks/contracts/useErc20BalanceOf'

interface AssetBalanceCardProps {
  asset: Asset
  accountAddress: string
}

export default function AssetBalanceCard({ asset }: AssetBalanceCardProps) {
  const {} = useErc20BalanceOf()
  return (
    <Container>
      <header>
        <span>Balance</span>
        <div>
          <AssetIcon image={asset.symbolImage} size={36} altName={asset.id} chain={asset.chains[0]} />
        </div>
      </header>
    </Container>
  )
}

const { Container } = {
  Container: styled.div`
    width: 100%;
    background: ${({ theme }) => theme.colorV2.white};

    padding: ${({ theme }) => theme.size[24]};

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.size[24]};

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: ${({ theme }) => theme.font.size[16]};
      font-weight: 500;
    }
  `
}
