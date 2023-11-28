import useCountDown from '@/hooks/useCountDown'
import React from 'react'

type StakeWithdrawCounterProps = {
  withdrawTimeLeft: number
}

export default function StakeWithdrawCounter({ withdrawTimeLeft }: StakeWithdrawCounterProps) {
  const time = useCountDown(withdrawTimeLeft)

  if (time && (Number(time.daysTens) > 0 || Number(time.daysUnits) > 0)) {
    return <div>{withdrawTimeLeft > 0 && `${time.daysTens || '0'}${time.daysUnits || '0'}d`}</div>
  }
  if (time && (Number(time.hoursTens) > 0 || Number(time.hoursUnits) > 0)) {
    return <div>{withdrawTimeLeft > 0 && `${time.hoursTens || '0'}${time.hoursUnits || '0'}h`}</div>
  }
  if (time && (Number(time.minutesTens) > 0 || Number(time.minutesUnits) > 0)) {
    return <div>{withdrawTimeLeft > 0 && `${time.minutesTens || '0'}${time.minutesUnits || '0'}m`}</div>
  }
  if (time && (Number(time.secondsTens) > 0 || Number(time.secondsUnits) > 0)) {
    return <div>{withdrawTimeLeft > 0 && `${time.secondsTens || '0'}${time.secondsUnits || '0'}s`}</div>
  }

  return null
}
