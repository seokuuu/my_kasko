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

	const parseAuctionData = (auctionNumber) => {
		const datePart = auctionNumber.slice(0, 8) // 날짜 부분 추출
		const timePart = auctionNumber.slice(8) // 시간 부분 추출

		const year = datePart.slice(0, 4)
		const month = datePart.slice(4, 6)
		const day = datePart.slice(6)

		let period

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
		}
	}

	// 각 경매번호에 대해 파싱된 정보 출력
	useEffect(() => {
		const parsedAuctions = calAucNumber?.map((auctionNumber) => parseAuctionData(auctionNumber))
		setAuctionData(parsedAuctions)
	}, [resData])

	const todayDate = moment().format('YYYY-MM-DD')
	const todayPeriods = auctionData && auctionData?.filter((item) => item.date === todayDate)

	// 오늘의 일정
	const renderPeriods = () => {
		const sortedPeriods = ['오전 경매', '오후 경매', '추가 경매']
		const renderedPeriods = sortedPeriods.map((period) => {
			const matchingAuctions = todayPeriods?.filter((item) => item.period === period)
			if (matchingAuctions?.length > 0) {
				return (
					<DotWrap style={{ marginTop: '5px' }} key={period}>
						<Dot dotColor={getDotColor(period)} />
						<p style={{ marginLeft: '5px', fontWeight: 'bolder', fontFamily: 'SUIT', fontSize: '18px' }}>
							{period}
							{period === '추가 경매' && ` + ${matchingAuctions?.length}`}
						</p>
					</DotWrap>
				)
			}
			return null
		})

		return renderedPeriods.filter((period) => period !== null) // null 값 제거
	}

	function customTileContent({ date, view }) {
		const formattedDate = moment(date).format('YYYY-MM-DD')

		const matchingAuctions = auctionData?.filter((auction) => auction.date === formattedDate)

		console.log('matchingAuctions', matchingAuctions)

		// "추가 경매" 항목 개수 확인
		const additionalAuctionCount = matchingAuctions?.filter((auction) => auction.period === '추가 경매').length

		let filteredAuctions = []

		// 추가 경매가 있는 경우
		if (additionalAuctionCount > 0) {
			// 추가 경매 항목들의 개수를 합쳐서 표시
			const additionalAuctionString = `추가 경매 + ${additionalAuctionCount}`

			// 추가 경매 항목이 있는 경우, 해당 항목을 제외한 나머지 경매 항목 필터링
			filteredAuctions = matchingAuctions.filter((auction) => auction.period !== '추가 경매')

			// 새로운 "추가 경매" 항목 추가
			filteredAuctions.push({
				date: matchingAuctions[0].date, // 첫 번째 항목의 날짜 사용
				period: additionalAuctionString,
			})
		} else {
			// 추가 경매가 없는 경우, 기존의 경매 항목을 그대로 유지
			filteredAuctions = matchingAuctions
		}

		if (view === 'month' && matchingAuctions?.length > 0) {
			return (
				<>
					<DotContainer>
						{filteredAuctions
							.sort((a, b) => {
								const order = { '오전 경매': 1, '오후 경매': 2, '추가 경매': 3 }
								return order[a.period] - order[b.period]
							})
							.map((auction, index) => (
								<DotWrap key={index}>
									<>
										{auction?.period === '추가 경매' && index === 1 ? (
											<>
												<Dot dotColor={getDotColor(auction?.period)}></Dot>
												<p style={{ marginLeft: '5px', fontWeight: 'bolder', fontFamily: 'SUIT', fontSize: '17px' }}>
													{auction?.period} +{filteredAuctions?.filter((item) => item.period === '추가 경매').length}
												</p>
											</>
										) : auction?.period !== '추가 경매' ? (
											<>
												<Dot dotColor={getDotColor(auction?.period)}></Dot>
												<p style={{ marginLeft: '5px', fontWeight: 'bolder', fontFamily: 'SUIT', fontSize: '17px' }}>
													{auction?.period}
												</p>
											</>
										) : auction?.period === '추가 경매' && index !== 0 && index === 2 ? (
											<>
												<Dot dotColor={getDotColor(auction?.period)}></Dot>
												<p style={{ marginLeft: '5px', fontWeight: 'bolder', fontFamily: 'SUIT', fontSize: '17px' }}>
													{auction?.period} +{filteredAuctions?.filter((item) => item.period === '추가 경매').length}
												</p>
											</>
										) : null}
									</>
								</DotWrap>
							))}
					</DotContainer>
				</>
			)
		}

		return null
	}

	const getDotColor = (period) => {
		if (period.includes('추가 경매')) {
			return dotPlus
		}
		switch (period) {
			case '오전 경매':
				return dotAm
			case '오후 경매':
				return dotPm
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
					{/* 오늘의 일정 */}
					<div>{renderPeriods()}</div>
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
