import React, { useEffect } from 'react'
import useReactQuery from '../../../../hooks/useReactQuery'
import { getPopupList } from '../../../../api/popup/popup'
const PopupComponent = ({}) => {
	const { isLoading, isError, data, isSuccess, refetch } = useReactQuery('', 'popup', getPopupList)

	const resData = data?.data?.data


	useEffect(() => {
		const sortedData = resData?.sort((a, b) => b.position - a.position)

		const popupWidth = 600
		const popupHeight = 400
		const diagonalMove = 280 // 팝업 간격 조절

		let lastPopupX = (window.innerWidth - popupWidth + 100) / 2 + diagonalMove + 100
		let lastPopupY = (window.innerHeight - popupHeight) / 2 + diagonalMove


		sortedData?.forEach((item, index) => {
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
	}, [data])

	return null
}

export default PopupComponent
