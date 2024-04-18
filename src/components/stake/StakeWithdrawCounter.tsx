import useCountDown from '@/hooks/useCountDown'
import useLocaleTranslation from '@/hooks/useLocaleTranslation'
import React from 'react'

type StakeWithdrawCounterProps = {
  withdrawTimeLeft: number
}

export default function StakeWithdrawCounter({ withdrawTimeLeft }: StakeWithdrawCounterProps) {
  const time = useCountDown(withdrawTimeLeft)
  const { t } = useLocaleTranslation()

  if (time && (Number(time.daysTens) > 0 || Number(time.daysUnits) > 0)) {
    return (
      <div>
        {withdrawTimeLeft > 0 &&
          `${time.daysTens || '0'}${time.daysUnits || '0'}${Number(time.daysTens) > 1 ? t('time.days') : t('time.day')}`}
      </div>
    )
  }
  if (time && (Number(time.hoursTens) > 0 || Number(time.hoursUnits) > 0)) {
    return (
      <div>
        {withdrawTimeLeft > 0 &&
          `${time.hoursTens || '0'}${time.hoursUnits || '0'}${Number(time.hoursTens) > 1 ? t('time.hours') : t('time.hour')}`}
      </div>
    )
  }
  if (time && (Number(time.minutesTens) > 0 || Number(time.minutesUnits) > 0)) {
    return (
      <div>
        {withdrawTimeLeft > 0 &&
          `${time.minutesTens || '0'}${time.minutesUnits || '0'}${Number(time.minutesUnits) > 1 ? t('time.minutes') : t('time.minute')}`}
      </div>
    )
  }
  if (time && (Number(time.secondsTens) > 0 || Number(time.secondsUnits) > 0)) {
    return <div>{withdrawTimeLeft > 0 && `${time.secondsTens || '0'}${time.secondsUnits || '0'}${t('seconds')}`}</div>
  }

  return null
}
