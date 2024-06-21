import React, { useEffect, useState } from 'react'
import { getCountdown } from '../../api/mainPage/mainPage'
import moment from 'moment'
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown'
import '@leenguyen/react-flip-clock-countdown/dist/index.css'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAtom, useAtomValue } from 'jotai'
import { auctionStartAtom } from '../../store/Layout/Layout'
import { authAtom } from '../../store/Auth/auth'
import { useCheckAuction } from '../../hooks/useCheckAuction'

const Countdown = () => {
	const nowAuction = useCheckAuction()
	const auth = useAtomValue(authAtom)
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const [data, setData] = useState(null)
	const [aucCheck, setAucCheck] = useAtom(auctionStartAtom)

	const getCountdownData = async () => {
		try {
			const response = await getCountdown()
			return response?.data?.data
		} catch (e) {}
	}

	const countdown = async () => {
		try {
			const responseData = await getCountdownData()
			setCountdownData(responseData)
		} catch (e) {}
	}

	const setCountdownData = (responseData) => {
		setData({
			type: responseData?.type,
			date: moment(responseData?.date).toDate().getTime(),
		})
		setAucCheck(responseData?.type)
	}

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
		if (nowAuction) {
			setTimeout(() => {
				getCountdown()
					.then((response) => response?.data?.data)
					.then((responseData) => setCountdownData(responseData))
			}, 3000)
		}
	}

	useEffect(() => {
		countdown()
	}, [])

	const auctionDirectonClick = () => {
		if (auth?.role === '카스코철강') navigate('/auction/biddingsingle')
		else navigate('/userpage/auctionsingle')
	}

	return (
		<>
			{data && (
				<div style={{ cursor: 'pointer' }} onClick={auctionDirectonClick}>
					<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
						{data?.type === 'START' && <CountText>경매 시작까지 남은 시간 </CountText>}
						{data?.type === 'END' && <CountText>경매 종료까지 남은 시간 </CountText>}
						<FlipClockCountdown
							to={data?.date}
							renderMap={[true, true, true, true]}
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
