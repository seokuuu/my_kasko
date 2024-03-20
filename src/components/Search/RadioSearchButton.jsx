import { useAtom } from 'jotai'
import { constructN } from 'ramda'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { userBiddingWishCheck } from '../../store/Layout/Layout'

/**
 * 라디오 서치 버튼
 * @param title 제목
 * @param options 옵션 [{label, value}]
 * @param value 선택 값
 * @param onChange 체인지 이벤트 void | undefined
 */
const RadioSearchButton = ({ title, options, value, onChange, label }) => {
	const [wishCheck, setWishCheck] = useAtom(userBiddingWishCheck) // 관심제품
	const [check, setCheck] = useState()
	const changeHandler = (value, label) => {
		if (!onChange) return
		onChange(value)
		setCheck(label)
	}

	console.log('check', check, wishCheck)

	useEffect(() => {
		if (check === '관심제품') setWishCheck(true)
		else setWishCheck(false)
	}, [check])

	return (
		<RadioContainer>
			{title && <h6>{title}</h6>}
			<RadioBox>
				{options.map((option, index) => (
					<RadioMainDiv key={index} onClick={() => changeHandler(option.value, option.label)}>
						<RadioCircleDiv isChecked={option.value === value}>
							<RadioInnerCircleDiv isChecked={option.value === value} />
						</RadioCircleDiv>
						<div>{option.label}</div>
					</RadioMainDiv>
				))}
			</RadioBox>
		</RadioContainer>
	)
}

export default RadioSearchButton

const RadioContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;

	& h6 {
		font-size: 16px;
		color: #6b6b6b;
	}
`

const RadioBox = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`

const RadioMainDiv = styled.div`
	display: flex;
	align-items: center;
	font-size: 16px;
	gap: 8px;
`

// Filter 전용 라디오
const RadioCircleDiv = styled.div`
	background-color: ${({ isChecked, isWhite }) => (isChecked ? '#cedcf2' : isWhite ? 'white' : '#dbe2f0')};
	border-radius: 999px;
	width: 20px;
	height: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: ${({ isChecked }) => (isChecked ? '2px solid #4c83d6' : '1px solid #b9b9b9')};
	cursor: pointer;
	background-color: inherit;
`

// Filter 전용 라디오
const RadioInnerCircleDiv = styled.div`
	background-color: ${({ isChecked, isWhite }) => (isChecked ? '#4c83d6' : isWhite ? 'white' : '')};
	border-radius: 100%;
	width: 12px;
	height: 12px;
	justify-content: center;
	align-items: center;
	display: flex;
`
