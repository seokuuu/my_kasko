import React, { useEffect, useState } from 'react'
import DateGrid from '../../components/DateGrid/DateGrid'
import { GridWrap, PartWrap, Tilde } from '../../modal/External/ExternalFilter'

/**
 * TODO 날짜 검색 components
 * @param title 좌측 제목
 * @param startInitDate 시작일자
 * @param endInitDate 종료일자
 * @param startDateChange 시작일자 set event
 * @param endDateChange 종료일자 set event
 */
const DateSearchSelect = ({ title, startInitDate, endInitDate, startDateChange, endDateChange }) => {
	return (
		<PartWrap first>
			<h6>{title}</h6>
			<GridWrap>
				<DateGrid bgColor={'white'} fontSize={17} startDate={startInitDate} setStartDate={startDateChange} />
				<Tilde>~</Tilde>
				<DateGrid bgColor={'white'} fontSize={17} startDate={endInitDate} setStartDate={endDateChange} isEnd={true} />
			</GridWrap>
		</PartWrap>
	)
}

export default DateSearchSelect
