import React, { useState } from 'react'
import {
	BlueBarHeader,
	BlueBlackBtn,
	BlueBtnWrap,
	BlueMainDiv,
	BlueSubContainer,
	BlueSubDiv,
	FadeOverlay,
	ModalContainer,
	WhiteCloseBtn,
} from '../Common/Common.Styled'

import { ExRadioWrap } from '../External/ExternalFilter'

import { RadioSearchButton } from '../../components/Search'
import useAlert from '../../store/Alert/useAlert'
import MultiUploader from './components/MultiUploader'
import SingleUploader from './components/SingleUploader'

/**
 * @description
 * 엑셀 대량 등록 모달입니다.
 * 등록 버튼을 누를시, 실행될 함수를 전달해주시면 됩니다.
 */
const Upload = ({
	modalSwitch,
	originEngRowField,
	excelToJson,
	setExcelToJson,
	getRow,
	uidAtom,
	handleSelectChange,
	dropInput,
	setDropInput,
	address,
	setAddress,
	excelUpload, // 대량 등록(엑셀 업로드) 핸들러입니다.(저장 버튼을 누를시 실행되는 함수입니다.)
	isExcelUploadOnly = false, // 대량 등록만 있으면 true 아니면 false 값을 할당해주시면 됩니다.
	setModalSwitch, // 모달창 여닫기 setState
	title, // 모달 제목
	propsHandler, // 단일 등록 버튼 핸들러입니다.(필수값 X)
	modalInTable, // 단일 등록 폼 관련 값입니다.(필수값 X)
	onEditHandler, // 단일 등록 폼 핸들러입니다.(필수값 X)
	dropdownProps, // 단일 등록 폼 관련 값입니다.
	width = 850, // 모달 너비값입니다.(필수값 X)
	convertKey, // 단일 등록 폼 관련 값입니다.(필수값 X)
}) => {
	// 등록 타입
	const [registerType, setRegisterType] = useState('multi')
	const { simpleConfirm } = useAlert()

	const [file, setFile] = useState(null)

	// 저장 핸들러
	const submit = () => {
		if (registerType === 'multi') excelUpload(file) // 대량 등록시
		else if (registerType === 'single') simpleConfirm('저장하시겠습니까?', propsHandler) // 단일 등록시
	}

	// 변경 알럿 메시지
	const message = '현재 작업 중인 내용이 저장되지 않았습니다. 페이지를 나가시겠습니까?'

	// 모달 닫기
	const modalClose = () => {
		if (registerType === 'single') simpleConfirm(message, () => setModalSwitch(false))
		else setModalSwitch(false)
	}

	return (
		// 재고 관리 - 판매 구분 변경
		<>
			<FadeOverlay zindex={899} />
			<ModalContainer width={width} zindex={900}>
				<BlueBarHeader>
					<div>{title}</div>
					<div>
						<WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
					</div>
				</BlueBarHeader>
				<BlueSubContainer>
					{!isExcelUploadOnly && (
						<BlueMainDiv style={{ margin: '0px auto' }}>
							<BlueSubDiv>
								<ExRadioWrap>
									<RadioSearchButton
										options={[
											{ label: '대량 등록', value: 'multi' },
											{ label: '단일 등록', value: 'single' },
										]}
										value={registerType}
										onChange={(value) => setRegisterType(value)}
									/>
								</ExRadioWrap>
							</BlueSubDiv>
						</BlueMainDiv>
					)}
					{/* 대량 등록 */}
					{registerType === 'multi' && <MultiUploader file={file} setFile={setFile} />}
					{/* 단일 등록 */}
					{registerType === 'single' && (
						<SingleUploader
							modalInTable={modalInTable}
							convertKey={convertKey}
							onEditHandler={onEditHandler}
							dropdownProps={dropdownProps}
							address={address}
							setAddress={setAddress}
						/>
					)}
					<BlueBtnWrap>
						<BlueBlackBtn onClick={submit}> {registerType === 'multi' ? '등록' : '저장'}</BlueBlackBtn>
					</BlueBtnWrap>
				</BlueSubContainer>
			</ModalContainer>
		</>
	)
}

export default Upload
