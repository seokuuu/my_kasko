import React, { useEffect, useState } from 'react'
import { getCountdown } from '../../api/mainPage/mainPage'
import moment from 'moment'
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown'
import '@leenguyen/react-flip-clock-countdown/dist/index.css'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAtom } from 'jotai'
import { auctionStartAtom } from '../../store/Layout/Layout'

const Countdown = () => {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const [data, setData] = useState(null)
	const [aucCheck, setAucCheck] = useAtom(auctionStartAtom)

	const getCountdownData = async () => {
		try {
			const response = await getCountdown()
			console.log('경매 시간', response?.data?.data)
			return response?.data?.data
		} catch (e) {
			console.log(e)
		}
	}

	const countdown = async () => {
		try {
			const responseData = await getCountdownData()
			setCountdownData(responseData)
		} catch (e) {
			console.log(e)
		}
	}

	const setCountdownData = (responseData) => {
		setData({
			type: responseData?.type,
			date: moment(responseData?.date).toDate().getTime(),
		})
		setAucCheck(responseData?.type)
	}

	console.log('isAuction', data?.type)
	// 경매 중에는 END
	// 경매 끝나고 다음 경매떄까진 START

	const onTimeUp = () => {
		const isAuction = data?.type

		const auctionPages = [
			'/auction/biddingsingle',
			'/auction/biddingpackage',
			'/userpage/auctionsingle',
			'/userpage/auctionpackage',
		]
		if (isAuction && auctionPages.includes(pathname)) {
			window.location.reload()
		}
		setTimeout(() => {
			getCountdown()
				.then((response) => response?.data?.data)
				.then((responseData) => setCountdownData(responseData))
				.catch((e) => console.log(e))
		}, 3000)
	}

	useEffect(() => {
		countdown()
	}, [])

	return (
		<>
			{data && (
				<div style={{ cursor: 'pointer' }} onClick={() => navigate('/auction/bidding')}>
					<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
						{data?.type === 'START' && <CountText>경매 시작까지 남은 시간 </CountText>}
						{data?.type === 'END' && <CountText>경매 종료까지 남은 시간 </CountText>}
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
				</div>
			)}
		</>
	)
}

export default React.memo(Countdown)

const CountText = styled.span`
	color: #337ae4;
	font-weight: bolder;
`
