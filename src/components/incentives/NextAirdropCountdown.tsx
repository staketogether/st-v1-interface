import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

export default function NextAirdropCountdown() {
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const { t } = useLocaleTranslation()

  const formatTime = (time: number): [string, string] => {
    const str = time.toString().padStart(2, '0')
    return [str.charAt(0), str.charAt(1)]
  }

  useEffect(() => {
    const getNextFriday = () => {
      const dateInBrasilia = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }))
      const nextFriday = new Date(dateInBrasilia)

      if (dateInBrasilia.getDay() !== 5 || (dateInBrasilia.getDay() === 5 && dateInBrasilia.getHours() >= 14)) {
        nextFriday.setDate(dateInBrasilia.getDate() + ((5 + 7 - dateInBrasilia.getDay()) % 7))
      }
      nextFriday.setHours(14, 0, 0, 0)
      return nextFriday
    }

    const updateCountdown = () => {
      const nowInBrasilia = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }))
      const diff = getNextFriday().getTime() - nowInBrasilia.getTime()
      setTimeLeft(diff)
    }

    updateCountdown()

    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
  const [daysTens, daysUnits] = formatTime(days)
  const [hoursTens, hoursUnits] = formatTime(Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
  const [minutesTens, minutesUnits] = formatTime(Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)))

  return (
    <AirdropCountdown>
      <div>
        <h2>{t('airdrop.countdown.next')}</h2>
      </div>
      <div>
        <Time>
          <div>
            <div>{daysTens}</div>
            <div>{daysUnits}</div>
          </div>
          <div>{t('airdrop.countdown.days')}</div>
        </Time>
        <div>
          <p>:</p>
        </div>
        <Time>
          <div>
            <div>{hoursTens}</div>
            <div>{hoursUnits}</div>
          </div>
          <div>{t('airdrop.countdown.hours')}</div>
        </Time>
        <div>
          <p>:</p>
        </div>
        <Time>
          <div>
            <div>{minutesTens}</div>
            <div>{minutesUnits}</div>
          </div>
          <div>{t('airdrop.countdown.minutes')}</div>
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
      align-items: flex-start;
      justify-content: flex-start;

      > h2 {
        font-size: 18px !important;
        font-weight: 400;
        margin-top: -18px;
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
        padding: 10px 11px;
        min-height: 38px;

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
