import React, { useState } from 'react'
import {
	BlueBarHeader,
	BlueBlackBtn,
	BlueBtnWrap,
	BlueMainDiv,
	BlueRadioWrap,
	BlueSubContainer,
	BlueSubDiv,
	ModalContainer,
	NonFadeOverlay,
	WhiteCloseBtn,
} from '../Common/Common.Styled'

import { salesPackageModal } from '../../store/Layout/Layout'
import { useSetAtom } from 'jotai'
import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../common/Check/RadioImg'

import { CheckBox } from '../../common/Check/Checkbox'

const SalesPackage = ({ onClick }) => {
	const setIsModal = useSetAtom(salesPackageModal)

	const modalClose = () => {
		setIsModal(false)
	}

	const radioDummy = ['노출 ', '비노출']

	const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))

	const confirmButtonOnClick = () => {
		onClick(checkRadio)
	}

	return (
		// 재고 관리 - 판매 구분 변경
		<>
			<NonFadeOverlay />
			<ModalContainer width={530}>
				<BlueBarHeader>
					<div>노출 상태 변경</div>
					<div>
						<WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
					</div>
				</BlueBarHeader>
				<BlueSubContainer>
					<div>
						<BlueMainDiv>
							<BlueSubDiv>
								<h6>노출 여부</h6>
								<BlueRadioWrap style={{ gap: '50px' }}>
									{radioDummy.map((text, index) => (
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
						<BlueBlackBtn onClick={confirmButtonOnClick}>확인</BlueBlackBtn>
					</BlueBtnWrap>
				</BlueSubContainer>
			</ModalContainer>
		</>
	)
}

export default SalesPackage
