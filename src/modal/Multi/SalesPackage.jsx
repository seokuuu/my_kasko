import React from 'react'
import { useState } from 'react'
import {
	NonFadeOverlay,
	ModalContainer,
	WhiteCloseBtn,
	BlueSubContainer,
	BlueBarHeader,
	BlueMainDiv,
	BlueSubDiv,
	BlueBtnWrap,
	BlueBlackBtn,
} from '../Common/Common.Styled'

import { blueModalAtom, salesPackageModal } from '../../store/Layout/Layout'
import { useAtom } from 'jotai'

import { ExRadioWrap } from '../External/ExternalFilter'
import { BlueRadioWrap } from '../Common/Common.Styled'
import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../common/Check/RadioImg'

import { CheckBox } from '../../common/Check/Checkbox'

const SalesPackage = ({ onClick }) => {
	const [isModal, setIsModal] = useAtom(salesPackageModal)

	const modalClose = () => {
		setIsModal(false)
	}

	const radioDummy = ['노출 ', '비노출']

	const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))

	console.log('checkRadio =>', checkRadio)

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
						<BlueBlackBtn onClick={onClick}>확인</BlueBlackBtn>
					</BlueBtnWrap>
				</BlueSubContainer>
			</ModalContainer>
		</>
	)
}

export default SalesPackage
