import { useEffect, useState } from 'react'

export default function useCountDown(durationInMilliseconds: number) {
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isCounting, setIsCounting] = useState(true)

  const formatTime = (time: number): [string, string] => {
    const str = time.toString().padStart(2, '0')
    const timeReturn = str.charAt(0).length - 1 > 1 ? str.charAt(0) : `0${str.charAt(0)}`
    return [timeReturn, str.charAt(1)]
  }

  useEffect(() => {
    const durationInMillisecondsInMs = new Date().getTime() + durationInMilliseconds

    const intervalId = setInterval(() => {
      const currentTimeMilliseconds = new Date().getTime()
      if (durationInMillisecondsInMs <= currentTimeMilliseconds) {
        clearInterval(intervalId)
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        setIsCounting(false)
      } else {
        const timeDifferenceMilliseconds = durationInMillisecondsInMs - currentTimeMilliseconds
        const secondsTotal = Math.floor(timeDifferenceMilliseconds / 1000)
        const days = Math.floor(secondsTotal / (60 * 60 * 24))
        const hours = Math.floor((secondsTotal % (60 * 60 * 24)) / (60 * 60))
        const minutes = Math.floor((secondsTotal % (60 * 60)) / 60)
        const seconds = secondsTotal % 60
        setTimeRemaining({ days, hours, minutes, seconds })
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [durationInMilliseconds, isCounting])

  const [daysTens, daysUnits] = formatTime(timeRemaining.days)
  const [hoursTens, hoursUnits] = formatTime(timeRemaining.hours)
  const [minutesTens, minutesUnits] = formatTime(timeRemaining.minutes)
  const [secondsTens, secondsUnits] = formatTime(timeRemaining.seconds)

  return { daysTens, daysUnits, hoursTens, hoursUnits, minutesTens, minutesUnits, secondsTens, secondsUnits }
}
