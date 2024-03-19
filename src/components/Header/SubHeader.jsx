import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import Countdown from '../Countdown/Countdown'
import { getBanner } from '../../api/mainPage/mainPage'

const SubHeader = () => {
	const [banner, setBanner] = useState(null)

	const bannerData = async () => {
		try {
			const response = await getBanner()
			const responseData = response?.data?.data
			setBanner(responseData)
		} catch (e) {
		}
	}

	useEffect(() => {
		bannerData()
	}, [])

	return (
		<SubHeaderContainer>
			<SubHeadLeft>{banner}</SubHeadLeft>
			<SubHeadRight>
				<Countdown />
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
