import moment from 'moment'
import React, { useEffect, useState } from 'react'
import DateGrid from '../../../../../components/DateGrid/DateGrid'
import {
	AutionInput,
	BottomInnerContentsContainer,
	FieldContainer,
	InputContainer,
	TimeInputContainer,
} from '../styles/StyledAutcion'

/**
 * @description
 * 경매 시간 섹션
 * @param type morning || afternoon(오전,오후)
 * @param data 상세 데이터
 * @param getValue 상태값을 상위 컴포넌트로 전달
 */
const AuctionTimeSection = ({ type, data, getValue }) => {
	const [auctionTime, setAuctionTime] = useState({
		startHour: 0,
		startMinute: 0,
		endHour: 0,
		endMinute: 0,
		effectDate: '',
	})

	// 시 & 분 핸들러
	function commonTimeHandler(e) {
		const { name, value } = e.target
		setAuctionTime((p) => ({ ...p, [name]: value }))
	}

	// 적용 일자 핸들러
	function dateHandler(date) {
		setAuctionTime((p) => ({ ...p, effectDate: date }))
	}

	// 데이터 초깃값 바인딩
	useEffect(() => {
		if (type === 'morning' && data) {
			const startTime = moment(data.amStartTime, 'HH:mm:ss')
			const endTime = moment(data.amEndTime, 'HH:mm:ss')

			setAuctionTime({
				startHour: startTime.hour(),
				startMinute: startTime.minute(),
				endHour: endTime.hour(),
				endMinute: endTime.minute(),
				effectDate: moment(data.amEffectDate).toDate(),
			})
		}

		if (type === 'afternoon' && data) {
			const startTime = moment(data.pmStartTime, 'HH:mm:ss')
			const endTime = moment(data.pmEndTime, 'HH:mm:ss')
			setAuctionTime({
				startHour: startTime.hour(),
				startMinute: startTime.minute(),
				endHour: endTime.hour(),
				endMinute: endTime.minute(),
				effectDate: moment(data.pmEffectDate).toDate(),
			})
		}
	}, [data, type])

	useEffect(() => {
		getValue(auctionTime)
	}, [auctionTime])
	return (
		<BottomInnerContentsContainer>
			{/* 경매 시간 */}
			<FieldContainer>
				<h2>{type === 'morning' ? '오전' : '오후'} 경매 시간</h2>
				{/* 시작 */}
				<TimeInputContainer>
					<InputContainer>
						<AutionInput
							type="number"
							min={0}
							max={24}
							width={120}
							name="startHour"
							value={auctionTime.startHour}
							onChange={commonTimeHandler}
						/>
						<span>시</span>
					</InputContainer>
					<span>~</span>
					<InputContainer>
						<AutionInput
							type="number"
							min={0}
							max={60}
							width={120}
							name="startMinute"
							value={auctionTime.startMinute}
							onChange={commonTimeHandler}
						/>
						<span>분</span>
					</InputContainer>
				</TimeInputContainer>
				{/* 종료 */}
				<TimeInputContainer>
					<InputContainer>
						<AutionInput
							type="number"
							min={0}
							max={24}
							width={120}
							name="endHour"
							value={auctionTime.endHour}
							onChange={commonTimeHandler}
						/>
						<span>시</span>
					</InputContainer>
					<span>~</span>
					<InputContainer>
						<AutionInput
							type="number"
							min={0}
							max={60}
							width={120}
							name="endMinute"
							value={auctionTime.endMinute}
							onChange={commonTimeHandler}
						/>
						<span>분</span>
					</InputContainer>
				</TimeInputContainer>
			</FieldContainer>
			{/* 적용 일자 */}
			<FieldContainer>
				<h2>적용 일자</h2>
				<InputContainer>
					<DateGrid width={260} setStartDate={dateHandler} startDate={auctionTime.effectDate} />
				</InputContainer>
			</FieldContainer>
		</BottomInnerContentsContainer>
	)
}

export default AuctionTimeSection
