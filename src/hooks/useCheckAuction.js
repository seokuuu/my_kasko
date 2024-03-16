import { useState, useEffect } from 'react'
import { getCountdown } from '../api/mainPage/mainPage'

export const useCheckAuction = () => {
	const [isEventActive, setIsEventActive] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				// API를 통해 경매 시간 가져오기
				const countdownData = await getCountdown()

				if (countdownData?.data?.data === null) {
					setIsEventActive(false)
					return
				}

				// 경매 시작 및 종료 시간
				const { startDate, endDate } = countdownData?.data?.data

				// startDate와 endDate를 Date 객체로 변환
				const startDateObj = new Date(startDate)
				const endDateObj = new Date(endDate)

				// 현재 서버 시간을 가져오는 함수
				const getCurrentServerTime = () => new Date()

				// 현재 서버 시간
				const currentTime = getCurrentServerTime()

				// startDate와 endDate가 현재 서버 시간 사이에 있는지 여부 확인
				const eventIsActive = currentTime >= startDateObj && currentTime <= endDateObj

				// 상태 업데이트
				setIsEventActive(eventIsActive)
			} catch (error) {
				console.error('API 호출 중 에러:', error)
			}
		}

		fetchData()
	}, [])

	return isEventActive
}
