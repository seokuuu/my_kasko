import React, { useEffect } from 'react'
import './styles.css'
const PopupComponent = ({}) => {
	const data = [
		{
			uid: 42,
			title: '333',
			status: 1,
			startDate: '2024-02-13 04:20:51',
			endDate: '2024-02-13 04:20:51',
			popupTitle: '',
			position: 3,
			content:
				'<p></p>\n<img src="https://kr.object.ncloudstorage.com/kasko-bucket/editor/59f18dd6-d21b-4f80-b71e-a20ada19ea3e.jpg" alt="undefined" style="height: 200px;width: 400px"/>\n<p>33333</p>\n',
			link: 'www.korea.com',
		},
		{
			uid: 42,
			title: '222',
			status: 1,
			startDate: '2024-02-13 04:20:51',
			endDate: '2024-02-13 04:20:51',
			popupTitle: '',
			position: 2,
			content:
				'<p></p>\n<img src="https://kr.object.ncloudstorage.com/kasko-bucket/editor/59f18dd6-d21b-4f80-b71e-a20ada19ea3e.jpg" alt="undefined" style="height: 200px;width: 400px"/>\n<p>33333</p>\n',
			link: 'www.korea.com',
		},
		{
			uid: 42,
			title: '111',
			status: 1,
			startDate: '2024-02-13 04:20:51',
			endDate: '2024-02-13 04:20:51',
			popupTitle: '',
			position: 1,
			content:
				'<p></p>\n<img src="https://kr.object.ncloudstorage.com/kasko-bucket/editor/59f18dd6-d21b-4f80-b71e-a20ada19ea3e.jpg" alt="undefined" style="height: 200px;width: 400px"/>\n<p>33333</p>\n',
			link: 'www.korea.com',
		},
	]

	useEffect(() => {
		const sortedData = data.sort((a, b) => b.position - a.position)

		const popupWidth = 600
		const popupHeight = 400
		const diagonalMove = 280 // 팝업 간격 조절

		let lastPopupX = (window.innerWidth - popupWidth + 100) / 2 + diagonalMove + 100
		let lastPopupY = (window.innerHeight - popupHeight) / 2 + diagonalMove

		console.log('x랑 y위치 =>', lastPopupX, lastPopupY)

		sortedData.forEach((item, index) => {
			const { title, startDate, endDate, content, link } = item

			const popupX = Math.max(lastPopupX - popupWidth + diagonalMove, 100)
			const popupY = Math.max(lastPopupY - popupHeight + diagonalMove + index * 10, 150)

			const popupWindow = window.open(
				'',
				'_blank',
				`width=${popupWidth},height=${popupHeight},left=${popupX},top=${popupY}`,
			)
			if (popupWindow) {
				const popupContent = `
          <html>
            <head>
              <title>${title}</title>
							<link rel="stylesheet" type="text/css" href="styles.css">
            </head>
            <body >
              <h2>${title}</h2>
              <p>Start Date: ${startDate}</p>
              <p>End Date: ${endDate}</p>
              <div>${content}</div>
              <a href="${link}" target="_blank">Link</a>
            </body>
          </html>
        `
				popupWindow.document.write(popupContent)

				// lastPopupX와 lastPopupY 값 변경
				lastPopupX = popupX
				lastPopupY = popupY
			} else {
				console.error('Popup blocked by browser')
			}
		})
	}, [])

	return null
}

export default PopupComponent
