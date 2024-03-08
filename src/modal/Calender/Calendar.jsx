import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	CalBtn,
	CalBtnWrap,
	CalBtnWrapContainer,
	CalWrap,
	CloseBtnWrap,
	Dot,
	DotContainer,
	DotWrap,
	StyledCalendar,
	Today,
	TodayTxt,
	TodayWrap,
	Wrap,
} from './Calendar.Styled'
import { useAtom } from 'jotai'
import { calendarAtom } from '../../store/Layout/Layout'
import useReactQuery from '../../hooks/useReactQuery'
import { getAuction } from '../../api/auction/round'

const CalendarModal = () => {
	const [auctionData, setAuctionData] = useState([])
	const [calModal, setCalModal] = useAtom(calendarAtom)
	const navigate = useNavigate()
	const [mark, setMark] = useState(['2023-07-04', '2023-07-05', '2023-07-06'])
	const [value, onChange] = useState(new Date())

	const locale = 'ko'
	const weekStartsOn = 0 // 0은 일요일을 나타냅니다.
	const tileClassName = ({ date, view }) => {
		if (view === 'month' && date.getDay() === 6) {
			return 'saturday'
		}
		return null
	}
	const dotAm = '#ffc24d'
	const dotPm = '#2b74b8'
	const dotPlus = '#eda8ff'
	const dotMinus = '#b02525'

	const date = new Date()
	const month = date.getMonth() + 1 // 월은 0부터 시작하므로 1을 더해줍니다.
	const day = date.getDate()
	const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()]
	const formattedDate = `${month}/${day}(${dayOfWeek})`

	function CustomFormatDay(locale, date) {
		return date.getDate().toString()
	}

	const param = { pageNum: 1, pageSize: 5000 }

	const { isLoading, isError, data, isSuccess, refetch } = useReactQuery(param, 'auction', getAuction)

	const resData = data?.data?.data?.list

	const calAucNumber = resData?.map((x) => x.number)

	console.log('calAucNumber 캘린더', calAucNumber)

	const parseAuctionData = (auctionNumber) => {
		const datePart = auctionNumber.slice(0, 8) // 날짜 부분 추출
		const timePart = auctionNumber.slice(8) // 시간 부분 추출

		const year = datePart.slice(0, 4)
		const month = datePart.slice(4, 6)
		const day = datePart.slice(6)

		let period
		let time

		if (timePart === '01' || timePart === '11') {
			period = '오전 경매'
			// time = '01, 11'
		} else if (timePart === '02' || timePart === '12') {
			period = '오후 경매'
			// time = '02, 12'
		} else if (
			(parseInt(timePart) >= 3 && parseInt(timePart) <= 9) ||
			(parseInt(timePart) >= 13 && parseInt(timePart) <= 19)
		) {
			period = '추가 경매'
			// time = parseInt(timePart) >= 3 && parseInt(timePart) <= 9 ? '03 ~ 09' : '13 ~ 19'
		}

		return {
			date: `${year}-${month}-${day}`,
			period,
			// time,
		}
	}

	// 각 경매번호에 대해 파싱된 정보 출력
	useEffect(() => {
		const parsedAuctions = calAucNumber?.map((auctionNumber) => parseAuctionData(auctionNumber))
		setAuctionData(parsedAuctions)
	}, [resData])

	console.log('auctionData', auctionData)

	// function customTileContent({ date, view }) {
	// 	if (view === 'month' && date.toDateString() === new Date().toDateString()) {
	// 		return (
	// 			<>
	// 				{mark.find((x) => x === moment(date).format('YYYY-MM-DD')) ? (
	// 					<>
	// 						<Wrap></Wrap>
	// 						<Today>today</Today>
	// 						<DotContainer>
	// 							<DotWrap>
	// 								<Dot dotColor={dotAm}>
	// 									<p>오전 경매</p>
	// 								</Dot>
	// 							</DotWrap>
	// 							<DotWrap>
	// 								<Dot dotColor={dotPm}>
	// 									<p>오후 경매</p>
	// 								</Dot>
	// 							</DotWrap>
	// 							<DotWrap>
	// 								<Dot dotColor={dotPlus}>
	// 									<p>추가 경매</p>
	// 								</Dot>
	// 							</DotWrap>
	// 						</DotContainer>
	// 					</>
	// 				) : null}
	// 			</>
	// 		)
	// 	}

	// 	// 기존의 커스텀 콘텐츠 반환
	// 	if (mark.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
	// 		return (
	// 			<>
	// 				<Wrap></Wrap>
	// 				<DotContainer>
	// 					<DotWrap>
	// 						<Dot dotColor={dotAm}>
	// 							<p>오전 경매</p>
	// 						</Dot>
	// 					</DotWrap>
	// 					<DotWrap>
	// 						<Dot dotColor={dotPm}>
	// 							<p>오후 경매</p>
	// 						</Dot>
	// 					</DotWrap>
	// 					<DotWrap>
	// 						<Dot dotColor={dotPlus}>
	// 							<p>추가 경매</p>
	// 						</Dot>
	// 					</DotWrap>
	// 				</DotContainer>
	// 			</>
	// 		)
	// 	}

	// 	return null
	// }

	function customTileContent({ date, view }) {
		const formattedDate = moment(date).format('YYYY-MM-DD')
		const matchingAuctions = auctionData?.filter((auction) => auction.date === formattedDate)

		if (view === 'month' && matchingAuctions?.length > 0) {
			return (
				<>
					<Today>today</Today>
					<DotContainer>
						{matchingAuctions?.map((auction, index) => (
							<DotWrap key={index}>
								{auction?.period === '추가 경매' ? (
									<Dot dotColor={getDotColor('추가 경매')}>
										<p>추가 경매</p>
										{matchingAuctions.length > 1 && <span>({matchingAuctions.length})</span>}
									</Dot>
								) : (
									<Dot dotColor={getDotColor(auction?.period)}>
										<p>{auction?.period}</p>
									</Dot>
								)}
							</DotWrap>
						))}
					</DotContainer>
				</>
			)
		}

		return null
	}

	const getDotColor = (period) => {
		switch (period) {
			case '오전 경매':
				return dotAm
			case '오후 경매':
				return dotPm
			case '추가 경매':
				return dotPlus
			default:
				return null
		}
	}

	return (
		<CalWrap>
			<StyledCalendar
				calendarType="US"
				locale={'ko'}
				weekStartsOn={weekStartsOn}
				onChange={onChange}
				value={value}
				prevLabel="<"
				nextLabel=">"
				prev2Label={false}
				next2Label={false}
				tileClassName={tileClassName}
				tileContent={customTileContent}
				formatDay={CustomFormatDay}
			/>
			<CalBtnWrapContainer>
				<CalBtnWrap>
					<CalBtn
						type="button"
						onClick={() => {
							navigate('/auction/round')
							setCalModal(false)
						}}
					>
						일정 등록
					</CalBtn>
					<TodayWrap>
						<span>today</span> <span>{formattedDate}</span>
					</TodayWrap>
					<DotWrap>
						<Dot dotColor={dotPlus}>
							<TodayTxt>추가 경매</TodayTxt>
						</Dot>
					</DotWrap>
					<DotWrap>
						<Dot dotColor={dotAm}>
							<TodayTxt>추가 경매</TodayTxt>
						</Dot>
					</DotWrap>
				</CalBtnWrap>
				<CloseBtnWrap>
					<CalBtn
						onClick={() => {
							setCalModal(false)
						}}
					>
						닫기
					</CalBtn>
				</CloseBtnWrap>
			</CalBtnWrapContainer>
		</CalWrap>
	)
}

export default CalendarModal
