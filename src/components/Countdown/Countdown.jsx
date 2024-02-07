import React, { useEffect, useState } from 'react'
import { getCountdown } from '../../api/mainPage/mainPage'
import moment from 'moment'
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown'
import '@leenguyen/react-flip-clock-countdown/dist/index.css'

const Countdown = ({ setNotice }) => {
	const [data, setData] = useState(null)

	const getCountdownData = async () => {
		try {
			const response = await getCountdown()
			return response?.data?.data
		} catch (e) {
			console.log(e)
		}
	}

	const countdown = async () => {
		try {
			const responseData = await getCountdownData()
			setCountdownData(responseData)
			setNoticeData(responseData)
		} catch (e) {
			console.log(e)
		}
	}

	const setCountdownData = (responseData) => {
		setData({
			type: responseData.type,
			date: moment(responseData.date).toDate().getTime(),
		})
	}

	const setNoticeData = (responseData) => {
		setNotice({
			type: responseData.type,
			round: responseData.round,
			date: moment(responseData.startDate).format('HH:mm'),
		})
	}

	const onTimeUp = () => {
		setTimeout(() => {
			getCountdown()
				.then((response) => response?.data?.data)
				.then((responseData) => setCountdownData(responseData))
				.then((responseData) => setNoticeData(responseData))
				.catch((e) => console.log(e))
		}, 3000)
	}

	useEffect(() => {
		countdown()
	}, [])

	return (
		<>
			{data && (
				<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
					{data?.type === 'START' && <span>경매 시작까지 남은 시간 </span>}
					{data?.type === 'END' && <span>경매 종료까지 남은 시간 </span>}
					<FlipClockCountdown
						to={data?.date}
						renderMap={[false, true, true, true]}
						showLabels={false}
						digitBlockStyle={{ width: 20, height: 28, fontSize: 18 }}
						separatorStyle={{ color: 'black', size: '4px' }}
						duration={0.5}
						hideOnComplete={false}
						onComplete={onTimeUp}
					/>
				</div>
			)}
		</>
	)
}

export default React.memo(Countdown)
