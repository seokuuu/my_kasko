import React, { useEffect, useState } from 'react'

const Countdown = () => {
	const [data, setData] = useState({ count: '', type: '' })

	useEffect(() => {
		let eventSource = null // EventSource 객체를 저장하기 위한 변수

		const connect = () => {
			eventSource = new EventSource(process.env.REACT_APP_SSE_URL + '/connect')

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
