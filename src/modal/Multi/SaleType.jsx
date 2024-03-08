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
	FadeOverlay,
} from '../Common/Common.Styled'

import styled from 'styled-components'
import { blueModalAtom } from '../../store/Layout/Layout'
import { useAtom } from 'jotai'

import { CustomInput, ExRadioWrap, Input } from '../External/ExternalFilter'
import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../common/Check/RadioImg'

import { CheckBox } from '../../common/Check/Checkbox'
import { useEffect } from 'react'
import CommonTest from '../Alert/PopupMessages'
import { popupMessages } from '../Alert/PopupMessages'
import AlertPopup from '../Alert/AlertPopup'
import { popupAtom2 } from '../../store/Layout/Layout'

import { popupObject } from '../../store/Layout/Layout'
import { popupDummy } from '../Alert/PopupDummy'
import { popupTypeAtom } from '../../store/Layout/Layout'
import { changeSaleTypeAtom } from '../../store/Layout/Popup'
import useAlert from '../../store/Alert/useAlert'

const SalseType = ({ modalSwitch, errMsg, setModalSwitch, closeFn, saveFn, productNumbers }) => {
	const [popupSwitch, setPopupSwitch] = useAtom(popupAtom2) // 팝업 스위치

	const [nowPopup, setNowPopup] = useAtom(popupObject) // 팝업 객체

	const [nowPopupType, setNowPopupType] = useAtom(popupTypeAtom) // 팝업 타입

	const [parameter, setParmeter] = useAtom(changeSaleTypeAtom)
	console.log('에러')
	// 처음 팝업 띄우는 컴포넌트의 onClickHandler
	const firstPopupClick = (num, callBack) => {
		setPopupSwitch(true)
		const firstPopup = popupDummy.find((popup) => {
			if (popup.num === num) {
				return (popup.func = callBack)
			}

			console.log(popup)
		})
		// console.log(firstPopup)
		setNowPopup(firstPopup)
	}

	console.log('에러2')
	// 팝업 타입 최신화
	useEffect(() => {
		const firstType = nowPopup.num.split('-')[0]
		setNowPopupType(firstType)
	}, [nowPopup, nowPopupType])

	const modalClose = () => {
		setModalSwitch(false)
	}

	console.log('에러3')
	// const radioDummy = ['판매재', '판매제외재', '판매완료재']
	const radioDummy2 = ['경매 대상재', '상시판매 대상재']
	// const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))
	const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy2.length }, (_, index) => index === 0))
	const [checkData, setCheckData] = useState(Array.from({ length: radioDummy2.length }, () => ''))
	const [price, setPrice] = useState('0')
	const handleChangePrice = (e) => {
		setPrice(e.currentTarget.value)
	}
	useEffect(() => {
		// true에 해당되면, value를, false면 빈값을 반환
		const updatedCheck = radioDummy2.map((value, index) => {
			return checkRadio[index] ? value : ''
		})
		// 빈값을 제외한 진짜배기 값이 filteredCheck에 담긴다.
		const filteredCheck = updatedCheck.filter((item) => item !== '')
		setCheckData(filteredCheck)
	}, [checkRadio])

	console.log('에러5')
	useEffect(() => {
		setParmeter((p) => ({
			...p,
			saleType: checkData.join(''), // 경매 대상재 / 상시판매 대상재
			salePrice: price, // 상시 판매가
			numbers: productNumbers, // 제품번호 목록
		}))
	}, [checkData, price])
	const { simpleConfirm } = useAlert()
	return (
		// 재고 관리 - 판매 구분 변경
		<OutSideArea>
			{/* <FadeOverlay /> */}
			<ModalContainer width={530}>
				<BlueBarHeader>
					<div>판매 구분 변경</div>
					<div>
						<WhiteCloseBtn onClick={closeFn} src="/svg/white_btn_close.svg" />
					</div>
				</BlueBarHeader>
				<BlueSubContainer>
					<div>
						<BlueMainDiv>
							<BlueSubDiv>
								<h6>판매 구분</h6>
								<ExRadioWrap>
									{radioDummy2.map((text, index) => (
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
								</ExRadioWrap>
							</BlueSubDiv>
							{checkRadio[1] && (
								<BlueSubDiv bor>
									<h6>상시 판매 가격</h6>
									<CustomInput
										width={300}
										height={40}
										placeholder="상시 판매 가격"
										value={price}
										onChange={handleChangePrice}
									/>
								</BlueSubDiv>
							)}
						</BlueMainDiv>
					</div>
					<BlueBtnWrap>
						<BlueBlackBtn
							onClick={() => {
								simpleConfirm('저장하시겠습니까?', () => {
									saveFn()
								})
							}}
							// saveFn={saveFn}
						>
							저장
						</BlueBlackBtn>
						{popupSwitch && <AlertPopup saveFn={saveFn} err={errMsg} setPopupSwitch={setPopupSwitch} />}
					</BlueBtnWrap>
				</BlueSubContainer>
			</ModalContainer>
		</OutSideArea>
	)
}

export default SalseType
const OutSideArea = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 9;
	background-color: rgba(0, 0, 0, 0.4);
`
