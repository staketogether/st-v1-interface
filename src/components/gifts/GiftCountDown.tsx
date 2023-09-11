import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

type GiftCountDownProps = {
  futureTimestamp: number
}

export default function GiftCountDown({ futureTimestamp }: GiftCountDownProps) {
  const { t } = useLocaleTranslation()
  const [timeRemaining, setTimeRemaining] = useState({ minutes: 0, seconds: 0 })

  useEffect(() => {
    if (futureTimestamp > 0) {
      const intervalId = setInterval(() => {
        const currentTime = new Date().getTime()
        const timeDifference = futureTimestamp - currentTime

        if (timeDifference <= 0) {
          clearInterval(intervalId)
          setTimeRemaining({ minutes: 0, seconds: 0 })
        } else {
          const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)
          setTimeRemaining({ minutes, seconds })
        }
      }, 1000)

      return () => clearInterval(intervalId)
    }
  }, [futureTimestamp])

  const { minutes, seconds } = timeRemaining

  return (
    <Countdown>
      <div>
        <h2>{t('v2.gifts.countdown')}</h2>
      </div>
      <div>
        <Time>
          <div>
            <div>{futureTimestamp > 0 ? String(minutes).charAt(0) : 0}</div>
            <div>{futureTimestamp > 0 ? String(minutes).charAt(1) : 0}</div>
          </div>
        </Time>
        <div>
          <p>:</p>
        </div>
        <Time>
          <div>
            <div>{futureTimestamp > 0 ? String(seconds).charAt(0) : 0}</div>
            <div>{futureTimestamp > 0 ? String(seconds).charAt(1) : 0}</div>
          </div>
        </Time>
      </div>
    </Countdown>
  )
}

const { Countdown, Time } = {
  Countdown: styled.section`
    padding: 16px ${({ theme }) => theme.size[24]};
    display: flex;
    flex-direction: row;
    background-color: ${({ theme }) => theme.colorV2.gray[2]};
    border-radius: ${({ theme }) => theme.size[8]};
    box-shadow: ${({ theme }) => theme.shadow[100]};
    align-items: center;
    gap: 8px;
    justify-content: space-between;

    > div:nth-child(1) {
      display: flex;
      gap: 8px;
      align-items: center;

      > h2 {
        font-size: 16px;
        font-weight: 400;
        color: ${({ theme }) => theme.colorV2.blue[1]};
      }
    }

    > div:nth-child(2) {
      justify-content: flex-end;
      display: grid;
      grid-template-columns: 64px 4px 64px;
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
        background: ${({ theme }) => theme.colorV2.white};

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
