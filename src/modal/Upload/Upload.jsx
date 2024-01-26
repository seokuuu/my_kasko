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

// 1. Upload를 사용하는 컴포넌트에서 originEngRowField props를 받는다
// ex) Destination.jsx에서 StandardDestinaionFields를 받음.
// 2. excelToJson, setExcelToJson을 Props로 내려받아, handleFileExcel에 처리된 mappedData를 set으로 받는다

// 예시 )
// export const StandardTransportationPost = {
//   출발지: 'auto',
//   '목적지 코드': 'auto',
//   '목적지 명': 'input',
//   '제품 구분': 'auto',
//   '단가 적용 일자': 'auto',
//   '적용 단가': 'input',
// }

// 목적지 등록 기획 오류로 인한 보류 !!!
const Upload = ({
	modalSwitch,
	setModalSwitch,
	title,
	originEngRowField,
	excelToJson,
	setExcelToJson,
	propsHandler,
	modalInTable,
	getRow,
	uidAtom,
	onEditHandler,
	dropdownProps,
	width,
	convertKey,
	handleSelectChange,
	dropInput,
	setDropInput,
	excelUpload, // 엑셀 업로드 핸들러입니다.(저장 버튼을 누를시 실행되는 함수입니다.)
}) => {
	// 등록 타입
	const [registerType, setRegisterType] = useState('multi')
	const { simpleConfirm } = useAlert()

	const [file, setFile] = useState(null)
	// console.log('files :', file)

	// 저장 핸들러
	const submit = () => {
		if (registerType === 'multi') excelUpload(file)
		else if (registerType === 'single') simpleConfirm('저장하시겠습니까?', propsHandler)
	}

	// 변경 모달
	const message = '현재 작업 중인 내용이 저장되지 않았습니다. 페이지를 나가시겠습니까?'

	// 모달 닫기
	const modalClose = () => {
		if (registerType === 'single') simpleConfirm(message, () => setModalSwitch(false))
		else setModalSwitch(false)
	}

	// 변경사항 저장 알럿
	// useEffect(() => {
	// 	const handleBeforeUnload = (event) => {
	// 		const message = '현재 작업 중인 내용이 저장되지 않았습니다. 페이지를 나가시겠습니까?'
	// 		event.returnValue = message // Standard for most browsers
	// 		return message // For some older browsers
	// 	}
	// 	window.addEventListener('beforeunload', handleBeforeUnload)
	// 	return () => {
	// 		window.removeEventListener('beforeunload', handleBeforeUnload)
	// 	}
	// }, [])

	return (
		// 재고 관리 - 판매 구분 변경
		<>
			<FadeOverlay zindex={899} />
			<ModalContainer width={width ?? 850} zindex={900}>
				<BlueBarHeader>
					<div>{title}</div>
					<div>
						<WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
					</div>
				</BlueBarHeader>
				<BlueSubContainer>
					<div>
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
						{/* 대량 등록 */}
						{registerType === 'multi' && <MultiUploader file={file} setFile={setFile} />}
						{/* 단일 등록 */}
						{registerType === 'single' && (
							<SingleUploader
								modalInTable={modalInTable}
								convertKey={convertKey}
								onEditHandler={onEditHandler}
								dropdownProps={dropdownProps}
							/>
						)}
					</div>
					<BlueBtnWrap>
						<BlueBlackBtn onClick={submit}> {registerType === 'multi' ? '등록' : '저장'}</BlueBlackBtn>
					</BlueBtnWrap>
				</BlueSubContainer>
			</ModalContainer>
		</>
	)
}

export default Upload
