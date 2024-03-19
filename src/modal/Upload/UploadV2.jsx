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
import './style.css'

import { useAtom } from 'jotai'

import { useEffect } from 'react'
import { popupAtom } from '../../store/Layout/Layout'
import AlertPopup from '../Alert/AlertPopup'

import { useRef } from 'react'
import styled from 'styled-components'
import { KrFiledtoEng } from '../../lib/tableHelpers'
import { readExcelFile } from '../../utils/ReadExcelFile'

import useMutationQuery from '../../hooks/useMutationQuery'
import useAlert from '../../store/Alert/useAlert'
import { FileRemoveButton, UploadCompleteText } from './components/MultiUploader'

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
const UploadV2 = ({ setModalSwitch, title, originEngRowField, setExcelToJson, width, postApi }) => {
	const { simpleAlert, simpleConfirm } = useAlert()
	const [popupSwitch, setPopupSwitch] = useAtom(popupAtom) // 팝업 스위치

	const fileInputRef = useRef(null)
	const [selectedFile, setSelectedFile] = useState(null)
	const [uploadProgress, setUploadProgress] = useState(0)

	const { mutate } = useMutationQuery('upload', postApi, {
		onError(error) {
			simpleAlert(error?.data?.message && '둥록에 실패하였습니다.')
		},
	})
	const handlerFileUpload = (e) => {
		const formData = new FormData()
		Array.from(selectedFile).forEach((el) => {
			formData.append('excel', el)
		})
		mutate(formData)
	}
	// 처음 팝업 띄우는 컴포넌트의 onClickHandler
	const firstPopupClick = () => {
		simpleConfirm('저장하시겠습니까?', handlerFileUpload)
	}

	const handleFileExcel = async (event) => {
		const selectedFile = event.target.files

		if (selectedFile) {
			setSelectedFile(selectedFile)
			setInterval(() => {
				if (uploadProgress < 100) {
					let i = Math.floor(Math.random() * 101)
					// i += 10
					setUploadProgress((p) => p + i)
				}
				// setUploadProgress(10)
			}, 100)
			try {
				// 단일이 아닌 대량으로 엑셀을 여러개 넣거나 엑셀에 들어가는 내용들이 여러개이기에
				// Promise.all로 배열의 요소마다 readExcelFile을 적용할수 있게 했습니다.
				const jsonData = await Promise.all(
					Array.from(selectedFile).map(
						(file) => readExcelFile(file), // Excel 파일을 JSON으로 변환
					),
				)
				const mappedData = KrFiledtoEng(jsonData, originEngRowField)

				setExcelToJson(mappedData)
			} catch (error) {
			}
		}
	}

	// 모달 닫기
	const modalClose = () => {
		setModalSwitch(false)
	}

	// 파일 취소
	const handleCancel = () => {
		setSelectedFile(null)
		setUploadProgress(0)
	}

	// 저장된 내용 알럿
	useEffect(() => {
		const handleBeforeUnload = (event) => {
			const message = '현재 작업 중인 내용이 저장되지 않았습니다. 페이지를 나가시겠습니까?'
			event.returnValue = message // Standard for most browsers
			return message // For some older browsers
		}
		window.addEventListener('beforeunload', handleBeforeUnload)
		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload)
		}
	}, [])

	return (
		<>
			<FadeOverlay />
			<ModalContainer width={width ?? 850}>
				<BlueBarHeader>
					<div>{title}</div>
					<div>
						<WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
					</div>
				</BlueBarHeader>
				<BlueSubContainer>
					<div>
						<input
							type="text"
							onChange={(e) => {
							}}
						/>
						<BlueMainDiv style={{ margin: '8px auto', height: '200px' }}>
							{!selectedFile && (
								<BlueSubDiv style={{ display: 'block', margin: '7% auto' }}>
									<UldWrap>
										<UldText>
											업로드 최대 용량 10MB <br /> 파일의 용량에 따라 업로드 시간이 지연될 수 있습니다.
										</UldText>
										<input
											multiple="multiple"
											type="file"
											accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
											ref={fileInputRef}
											style={{ display: 'none' }}
											onChange={handleFileExcel}
										/>
										<UldWrap>
											{selectedFile && (
												<div>
													<div>{selectedFile.name}</div>
													<div>
														<progress value={uploadProgress} max="100" style={{ background: 'blue' }} />
													</div>
												</div>
											)}
										</UldWrap>
									</UldWrap>
									<UldWrap>
										<UldBtn onClick={() => fileInputRef.current.click()}> 업로드</UldBtn>
									</UldWrap>
								</BlueSubDiv>
							)}
							<div style={{ display: 'flex', flexDirection: 'column', width: '732px' }}>
								{selectedFile &&
									Object.entries(selectedFile)?.map(([k, v], idx) => (
										<UldAfterWrap>
											<div style={{ fontSize: '16px' }}>{v.name}</div>
											<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
												{uploadProgress >= 100 && <UploadCompleteText>업로드 완료</UploadCompleteText>}

												<Progressbar style={{ background: 'blue' }} value={uploadProgress} max="100" id="progress" />
												<FileRemoveButton onClick={handleCancel}>x</FileRemoveButton>
											</div>
										</UldAfterWrap>
									))}
							</div>
						</BlueMainDiv>
					</div>
					<BlueBtnWrap>
						<BlueBlackBtn
							onClick={() => {
								if (!selectedFile) return simpleAlert('파일을 업로드해주세요.')
								if (uploadProgress > 100) {
									firstPopupClick('2-3')
								} else if (uploadProgress < 100) {
									simpleAlert('업로드중입니다.')
								}
							}}
						>
							저장
						</BlueBlackBtn>
						{popupSwitch && <AlertPopup setPopupSwitch={setPopupSwitch} />}
					</BlueBtnWrap>
				</BlueSubContainer>
			</ModalContainer>
		</>
	)
}

export default UploadV2

const UldWrap = styled.div`
	margin-left: auto;
	margin-right: auto;
	text-align: center;
	justify-content: center;
	align-items: center;
`

const UldText = styled.div`
	color: #b5b5b5;
	font-size: 18px;
	margin-top: -20px;
`

const UldBtn = styled.button`
	width: 200px;
	height: 35px;
	color: #4c83d6;
	background-color: white;
	border: 1px solid #b5b5b5;
	font-size: 18px;
	margin-top: 35px;
`

const UldAfterWrap = styled.div`
	width: 100%;
	margin: 10px;
	/* border: 1px solid; */
	display: flex;
	padding: 8px;
	background: #f1f1f1;
	/* gap:4px; */
	justify-content: space-between;
	align-items: center;
`
const Dropdown = styled.div``

const Progressbar = styled.progress`
	background-color: blue;
	::-webkit-progress-bar {
		background-color: gray;
	}
	::-webkit-progress-value {
		background-color: #4c83d6;
	}
`
