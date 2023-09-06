import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

type NextAirdropCountdownProps = {
  timestamp: number
}

export default function NextAirdropCountdown({ timestamp }: NextAirdropCountdownProps) {
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(timestamp)

  const formatTime = (time: number) => (time < 10 ? `0${time}` : time)
  const { t } = useLocaleTranslation()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Date.now())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const date = new Date(currentTimestamp)
  const hours = formatTime(date.getHours())
  const minutes = formatTime(date.getMinutes())
  const day = formatTime(date.getDate())

  return (
    <AirdropCountdown>
      <div>
        <h2>{t('airdrop.countdown.next')}</h2>
      </div>
      <div>
        <Time>
          <div>
            <div>{String(day).charAt(0)}</div>
            <div>{String(day).charAt(1)}</div>
          </div>
        </Time>
        <div>
          <p>:</p>
        </div>
        <Time>
          <div>
            <div>{String(hours).charAt(0)}</div>
            <div>{String(hours).charAt(1)}</div>
          </div>
        </Time>
        <div>
          <p>:</p>
        </div>
        <Time>
          <div>
            <div>{String(minutes).charAt(0)}</div>
            <div>{String(minutes).charAt(1)}</div>
          </div>
        </Time>
      </div>
    </AirdropCountdown>
  )
}

const { AirdropCountdown, Time } = {
  AirdropCountdown: styled.section`
    padding: 16px ${({ theme }) => theme.size[24]};
    display: grid;
    grid-template-columns: auto auto;
    background-color: ${({ theme }) => theme.colorV2.white};
    border-radius: ${({ theme }) => theme.size[8]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    align-items: center;
    gap: 8px;

    > div:nth-child(1) {
      display: flex;
      gap: 8px;
      align-items: center;

      > h2 {
        height: 20px;
        font-size: 20px !important;
        font-weight: 400;
      }
    }

    > div:nth-child(2) {
      justify-content: flex-end;
      display: grid;
      grid-template-columns: 64px 4px 64px 4px 64px;
      gap: 8px;
      align-items: center;
    }

    > div p {
      font-size: 18px;
    }
  `,
  Time: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    justify-content: center;

    > div:nth-child(1) {
      gap: 4px;
      justify-content: center;
      display: grid;
      grid-template-columns: 1fr 1fr;

      > div {
        display: flex;
        flex-direction: row;
        width: 32px;

        gap: 8px;
        background: ${({ theme }) => theme.colorV2.gray[2]};
        border-radius: ${({ theme }) => theme.size[8]};
        box-shadow: ${({ theme }) => theme.shadow[100]};
        justify-content: center;

        font-size: 18px;
        padding: 12px 11px;

        color: ${({ theme }) => theme.colorV2.purple[1]};
      }
    }

    > div:nth-child(2) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0 12px;
      font-size: 13px;
      line-height: 13px;
      color: ${({ theme }) => theme.colorV2.purple[1]};
    }
  `
}
