import useGiftHistory from '@/hooks/useGiftHistory'
import React from 'react'
import styled from 'styled-components'
import GiftHistoryCard from './GiftHistoryCard'

export default function GiftHistoryList() {
  const { giftHistory, loading } = useGiftHistory()
  console.log('giftHistory', giftHistory)
  return (
    <GiftCard>
      <h1>Gifts history</h1>
      {!loading && giftHistory.length && giftHistory.map(gift => <GiftHistoryCard key={gift.id} gift={gift} />)}
    </GiftCard>
  )
}

const { GiftCard } = {
  GiftCard: styled.section`
    display: flex;
    padding: ${({ theme }) => theme.size[24]} ${({ theme }) => theme.size[24]};
    flex-direction: column;
    gap: 12px;
    box-shadow: ${({ theme }) => theme.shadow[100]};

    border-radius: ${({ theme }) => theme.size[8]};
    background: ${({ theme }) => theme.color.white};
    h1 {
      font-size: 20px;
      font-weight: 400;
      color: ${({ theme }) => theme.colorV2.gray[1]};
      border: 0;
      padding: 0;
      margin: 0;
    }
  `
}
