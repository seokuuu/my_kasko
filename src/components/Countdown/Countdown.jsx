// src/CountdownTimer.js
import React, { useState, useEffect } from 'react'
import moment from 'moment-timezone'
import styled from 'styled-components'
function Countdown() {
  const [timeLeft, setTimeLeft] = useState(null)

  useEffect(() => {
    // Target future date/24 hour time/Timezone
    const targetDate = moment.tz('2023-10-30 23:59', 'Australia/Sydney')

    const intervalId = setInterval(() => {
      const currentDate = moment()
      const diff = targetDate.diff(currentDate)

      if (diff <= 0) {
        clearInterval(intervalId)
        setTimeLeft(0)
        console.log('Date has already passed!')
      } else {
        setTimeLeft(diff)
      }
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const formatTime = (milliseconds) => {
    const duration = moment.duration(milliseconds)
    return `${duration.days()} days ${duration.hours()} hours ${duration.minutes()} minutes ${duration.seconds()} seconds`
  }

  return (
    <ClockContainer>
      {/* styled-components로 정의한 스타일 적용 */}
      {timeLeft !== null && (
        <div>{timeLeft > 0 ? <p>Countdown Timer: {formatTime(timeLeft)}</p> : <p>Timer has ended!</p>}</div>
      )}
    </ClockContainer>
  )
}

export default Countdown

const ClockContainer = styled.div`
  width: 650px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`
