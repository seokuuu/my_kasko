import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SkyBtn } from '../../../../../common/Button/Button'

const ClaimCellRender = (props) => {
	const { data } = props
	console.log('data: ', data)

	const navigate = useNavigate()

	function toDetailPage() {
		navigate(`/operate/common/product/${data['고유값']}`, {
			state: {
				auctionNumber: data['경매번호'],
			},
		})
	}
	return (
		<>
			<SkyBtn style={{ marginLeft: 'auto', marginRight: 'auto' }} onClick={toDetailPage}>
				수정
			</SkyBtn>
		</>
	)
}

export default ClaimCellRender
