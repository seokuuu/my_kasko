import React from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'

import ko from 'date-fns/locale/ko' // 수정: ko로 변경합니다.
import 'react-datepicker/dist/react-datepicker.css'
import { styled } from 'styled-components'
import moment from 'moment'

registerLocale('ko', ko)

const DateGrid = ({ left, bgColor, fontSize, width, height, startDate, setStartDate, placeholder, isEnd = false }) => {
	const handleDateChange = (date) => {
		let newDate = moment(date).startOf('hour').format('YYYY-MM-DD HH:mm:ss')
		if (isEnd) {
			newDate = moment(date).endOf('day').format('YYYY-MM-DD HH:mm:ss')
		}
		setStartDate(newDate)
	}
	return (
		<>
			<label>
				<PickerWrap height={height} width={width} left={left} bgColor={bgColor}>
					<SDatePicker
						fontSize={fontSize}
						selected={startDate ? new Date(startDate) : ''}
						width={width}
						onChange={handleDateChange}
						placeholderText={placeholder}
						locale="ko" // 설정한 로케일을 사용합니다.
						dateFormat="yyyy-MM-dd"
					/>
					<PickerImg onChange={(date) => setStartDate(date)} src="/svg/Calender.svg" />
				</PickerWrap>
			</label>
		</>
	)
}

export default DateGrid

const PickerWrap = styled.div`
	display: flex;
	justify-content: space-between;
	position: relative;
	min-width: ${(props) => (props.width ? `${props.width}px` : '180px')};
	height: ${(props) => (props.height ? `${props.height}px` : '37px')};
	border: 1px solid #c8c8c8;
	left: ${(props) => props.left}px;
	background-color: ${(props) => (props.bgColor ? `${props.bgColor}` : 'white')};
	align-items: center;
`

const SDatePicker = styled(DatePicker)`
	width: ${(props) => (props.width ? `${props.width}px` : '140px')};
	height: 25px;
	align-items: center;
	position: relative;
	font-size: ${(props) => props.fontSize}px;
	outline: none;
	.react-datapicker-wrapper {
		display: flex;
	}
`

const PickerImg = styled.img`
	position: relative;
	width: 28px;
	right: 5px;
	cursor: pointer;
`
