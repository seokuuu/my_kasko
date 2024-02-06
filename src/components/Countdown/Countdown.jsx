import React, { useEffect, useState } from 'react'
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill'

const EventSource = EventSourcePolyfill || NativeEventSource

const Countdown = () => {
	const [data, setData] = useState({ count: '', type: '' })

	useEffect(() => {
		let eventSource = null

		const connect = () => {
			eventSource = new EventSource(process.env.REACT_APP_SSE_URL + '/connect', {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				},
				retryTimeout: 3000,
			})

			eventSource.onopen = (e) => {
				console.log('Connection to server opened.')
			}

			eventSource.onerror = (e) => {
				console.error('Error occurred:', e)
				eventSource.close()
				setTimeout(connect, 1000)
			}

			eventSource.addEventListener('countDown', (e) => {
				if (e.data !== 'connect') {
					const parsedData = JSON.parse(e.data)
					setData({
						type: parsedData.type,
						count: parsedData.count,
					})
				}
			})
		}

		connect() // 첫 연결 시도

		return () => {
			if (eventSource) {
				eventSource.close()
			}
		}
	}, [])

	return (
		<div>
			{data.type === 'START' && <span>경매 시작까지 남은 시간: {data.count}</span>}
			{data.type === 'END' && <span>경매 종료까지 남은 시간: {data.count}</span>}
		</div>
	)
}

export default Countdown
