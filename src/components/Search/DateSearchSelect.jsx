import React, { useEffect, useState } from 'react'
import DateGrid from '../../components/DateGrid/DateGrid'
import { GridWrap, Tilde } from '../../modal/External/ExternalFilter'

// TODO 날짜 검색 components
const DateSearchSelect = ({ startInitDate, endInitDate, setDate }) => {
  const [startDate, setStartDate] = useState(startInitDate)
  const [endDate, setEndDate] = useState(endInitDate)

  useEffect(() => {
    setDate('startDate', startDate)
  }, [startDate])

  useEffect(() => {
    setDate('endDate', startDate)
  }, [endDate])

  return (
    <GridWrap>
      <DateGrid bgColor={'white'} fontSize={17} startDate={startDate} setStartDate={setStartDate} />
      <Tilde>~</Tilde>
      <DateGrid bgColor={'white'} fontSize={17} startDate={endDate} setStartDate={setEndDate} />
    </GridWrap>
  )
}

export default React.memo(DateSearchSelect)
