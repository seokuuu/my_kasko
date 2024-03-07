import moment from 'moment/moment'
import React, { useState } from 'react'
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

const CalendarModal = () => {
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

	// const { isLoading, isError, data, isSuccess, refetch } = useReactQuery(param, 'auction', getAuction)

	function customTileContent({ date, view }) {
		if (view === 'month' && date.toDateString() === new Date().toDateString()) {
			return (
				<>
					{mark.find((x) => x === moment(date).format('YYYY-MM-DD')) ? (
						<>
							<Wrap></Wrap>
							<Today>today</Today>
							<DotContainer>
								<DotWrap>
									<Dot dotColor={dotAm}>
										<p>오전 경매</p>
									</Dot>
								</DotWrap>
								<DotWrap>
									<Dot dotColor={dotPm}>
										<p>오후 경매</p>
									</Dot>
								</DotWrap>
								<DotWrap>
									<Dot dotColor={dotPlus}>
										<p>추가 경매</p>
									</Dot>
								</DotWrap>
							</DotContainer>
						</>
					) : null}
				</>
			)
		}

		// 기존의 커스텀 콘텐츠 반환
		if (mark.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
			return (
				<>
					<Wrap></Wrap>
					<DotContainer>
						<DotWrap>
							<Dot dotColor={dotAm}>
								<p>오전 경매</p>
							</Dot>
						</DotWrap>
						<DotWrap>
							<Dot dotColor={dotPm}>
								<p>오후 경매</p>
							</Dot>
						</DotWrap>
						<DotWrap>
							<Dot dotColor={dotPlus}>
								<p>추가 경매</p>
							</Dot>
						</DotWrap>
					</DotContainer>
				</>
			)
		}

		return null
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
