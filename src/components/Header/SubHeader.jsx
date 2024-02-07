import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import Countdown from '../Countdown/Countdown'

const SubHeader = () => {
	const [notice, setNotice] = useState(null)

	return (
		<SubHeaderContainer>
			{notice && (
				<SubHeadLeft>
					{notice.type === 'START' && (
						<span>
							[알림] {notice.round}회차 {notice.date}시 경매 준비중으로 제품 조회만 가능합니다.
						</span>
					)}
					{notice.type === 'END' && (
						<span>
							[알림] {notice.round}회차 {notice.date}시 경매 진행 중입니다.
						</span>
					)}
				</SubHeadLeft>
			)}
			<SubHeadRight>
				<Countdown setNotice={setNotice} />
			</SubHeadRight>
		</SubHeaderContainer>
	)
}

export default SubHeader

const SubHeaderContainer = styled.div`
	width: 100%;
	height: 50px;
	display: flex;
	align-items: center;
	padding: 0px 50px;
	justify-content: space-between;
	border: 1px solid #bfbfbf;
	background-color: white;
`

const SubHeadLeft = styled.div`
	color: red;
`

const SubHeadRight = styled.div`
	color: blue;
`
