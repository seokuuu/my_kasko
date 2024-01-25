import React from 'react'
import {
	FadeOverlay,
	ModalContainer,
	ModalSubContainer,
	ModalText,
	ModalTitle,
	WhiteCloseBtn,
} from '../../../modal/Common/Common.Styled'
import { ModalPart } from '../../User/SignUp/SignUp.Styled'
import { BlackBtn } from '../../../common/Button/Button'
import { log } from '../../../lib'
import styled from 'styled-components'
import { useState } from 'react'
import { FlexContent, FlexPart, FlexTitle } from '../../../common/OnePage/OnePage.Styled'
import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../../common/Check/RadioImg'
import { CheckBox } from '../../../common/Check/Checkbox'

const ClientAuctionRestrictionModal = ({ clientRestrict, selectedValue, setSelectedValue, setAuctionModal }) => {
	const radioDummy3 = ['제한 없음', '시작가 제한', '경매 제한']
	const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy3.length }, (_, index) => index === 0))

	const selectedRadioIndex = checkRadio.findIndex((value) => value)

	const outputValue = selectedRadioIndex !== -1 ? radioDummy3[selectedRadioIndex] : null
	setSelectedValue(outputValue)

	const offModal = (e) => {
		setAuctionModal(false)
	}

	return (
		<>
			<FadeOverlay />
			<ModalContainerC width={280} height={350}>
				<ModalTitle>
					<TitleSub>
						<div>회원 제한</div>
						<WhiteCloseBtn onClick={offModal} src="/svg/white_btn_close.svg" />
					</TitleSub>
				</ModalTitle>
				<ModalSubContainerC>
					<div style={{ position: 'relative', left: '20px' }}>
						<FlexPart>
							<FlexContent>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: '20px',
										justifyContent: 'center',
									}}
								>
									{radioDummy3.map((text, index) => (
										<RadioMainDiv key={index}>
											<RadioCircleDiv
												name="type"
												isChecked={checkRadio[index]}
												onClick={() => setCheckRadio(CheckBox(checkRadio, checkRadio.length, index))}
											>
												<RadioInnerCircleDiv isChecked={checkRadio[index]} />
											</RadioCircleDiv>
											<div style={{ display: 'flex', marginLeft: '5px' }}>{text}</div>
										</RadioMainDiv>
									))}
								</div>
							</FlexContent>
						</FlexPart>
						<BlackBtn style={{ fontSize: '17px' }} width={80} height={50} onClick={clientRestrict}>
							적용
						</BlackBtn>
					</div>
				</ModalSubContainerC>
			</ModalContainerC>
		</>
	)
}

export default ClientAuctionRestrictionModal

const RadioWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 16px;
`

const RadioLabel = styled.label`
	margin-bottom: 8px;
`

const ModalSubContainerC = styled.div`
	padding: 56px 24px 32px 24px;
	border-radius: 10px;
`
const TitleSub = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: white;
	background: var(--primary-heavy, #061737);
	padding: 20px 24px;
`
const ModalContainerC = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: white;
	width: ${(props) => props.width}px;
	height: ${(props) => props.height}px;
	// height: max-content;
	z-index: 9999;
	border: 1px solid black;
	border-radius: 5px;
`
const Button = styled.button`
	display: flex; // Use flexbox
	justify-content: center; // Center horizontally
	align-items: center;
	background: none;
	border: none;
	cursor: pointer;
	font-size: 24px; // or whatever size you want for the X
	color: white;

	&:focus {
		outline: none;
	}
`
