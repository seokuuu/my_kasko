import React, { useEffect, useState } from 'react'
import {
	BlueBarHeader,
	BlueBlackBtn,
	BlueBtnWrap,
	BlueMainDiv,
	BlueRadioWrap,
	BlueSubContainer,
	BlueSubDiv,
	FadeOverlay,
	ModalContainer,
	NonFadeOverlay,
	WhiteCloseBtn,
} from '../Common/Common.Styled'

import { CheckBox } from '../../common/Check/Checkbox'
import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../common/Check/RadioImg'

const PrintType = ({
	checkRadio,
	setCheckRadio,
	checkRadioValue,
	setCheckRadioValue,
	setCheckModal,
	radioDummy,
	handleExtract,
}) => {
	return (
		// 판매 제품 관리 - 패키지 관리
		<>
			<FadeOverlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />

			<ModalContainer width={400} style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}>
				<BlueBarHeader>
					<div>입금 요청서 출력</div>
					<div>
						<WhiteCloseBtn
							onClick={() => {
								setCheckModal(false)
							}}
							src="/svg/white_btn_close.svg"
						/>
					</div>
				</BlueBarHeader>
				<BlueSubContainer>
					<div>
						<BlueMainDiv>
							<BlueSubDiv style={{ height: '80px' }}>
								<h6>출력 타입</h6>
								<BlueRadioWrap style={{ gap: '50px' }}>
									{radioDummy?.map((text, index) => (
										<RadioMainDiv key={index}>
											<RadioCircleDiv
												isChecked={checkRadio[index]}
												onClick={() => {
													setCheckRadio(CheckBox(checkRadio, checkRadio.length, index))
												}}
											>
												<RadioInnerCircleDiv isChecked={checkRadio[index]} />
											</RadioCircleDiv>
											<div style={{ display: 'flex', marginLeft: '5px', color: 'black' }}>{text}</div>
										</RadioMainDiv>
									))}
								</BlueRadioWrap>
							</BlueSubDiv>
						</BlueMainDiv>
					</div>
					<BlueBtnWrap>
						<BlueBlackBtn onClick={handleExtract}>
							<p style={{ color: 'white' }}>출력</p>
						</BlueBlackBtn>
					</BlueBtnWrap>
				</BlueSubContainer>
			</ModalContainer>
		</>
	)
}

export default PrintType
