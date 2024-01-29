import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import useAlert from '../../../store/Alert/useAlert'
import { BlueMainDiv, BlueSubDiv } from '../../Common/Common.Styled'
// import { UldAfterWrap, UldBtn, UldText, UldWrap } from '../../Table/TableModal'

/**
 * @description
 * 대량 등록 컴포넌트입니다.
 *
 */
const MultiUploader = ({ file, setFile, isExcelUploadOnly }) => {
	const [uploadProgress, setUploadProgress] = useState(0)

	const { simpleAlert } = useAlert()
	// 대량 등록 관련 값들입니다.

	const fileInputRef = useRef(null)
	// 엑셀 파일이 10 MB이상이면 예외처리를 해줍니다.
	const KB = 1024
	const MB = KB ** 2
	const MAX_CAPACITY = 10 * MB

	// 파일 핸들러
	function onFileChange(e) {
		const file = e.target.files[0]

		// 프로그레스바
		setInterval(() => {
			if (uploadProgress < 100) {
				let i = Math.floor(Math.random() * 101)
				setUploadProgress((p) => p + i)
			}
		}, 100)

		// 파일 용량 체크
		if (file.size > MAX_CAPACITY) return simpleAlert('업로드 최대 용량은 10MB 입니다.')

		// 파일 할당
		setFile(file)
	}
	// 파일 초기화
	function initFileHandler() {
		setFile(null)
	}

	return (
		<BlueMainDiv style={{ margin: '0px auto', height: '200px', display: 'flex' }}>
			{!file && (
				<BlueSubDiv style={{ display: 'block' }}>
					<UldWrap>
						<UldText>
							업로드 최대 용량 10MB <br /> 파일의 용량에 따라 업로드 시간이 지연될 수 있습니다.
						</UldText>
						<input
							type="file"
							accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
							ref={fileInputRef}
							style={{ display: 'none' }}
							onChange={onFileChange}
						/>
					</UldWrap>
					<UldWrap>
						<UldBtn
							onClick={() => {
								fileInputRef.current.click()
							}}
						>
							업로드
						</UldBtn>
					</UldWrap>
				</BlueSubDiv>
			)}
			{file && (
				<UldAfterWrap>
					<div style={{ fontSize: '16px' }}>{file.name}</div>
					<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
						{uploadProgress >= 100 && <UploadCompleteText>업로드 완료</UploadCompleteText>}
						<Progressbar value={uploadProgress} max={100} />
						<FileRemoveButton onClick={initFileHandler}>x</FileRemoveButton>
					</div>
				</UldAfterWrap>
			)}
		</BlueMainDiv>
	)
}

export default MultiUploader

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
const Progressbar = styled.progress`
	background-color: blue;
	::-webkit-progress-bar {
		background-color: gray;
	}
	::-webkit-progress-value {
		background-color: #4c83d6;
	}
`

const FileRemoveButton = styled.button`
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background: #666666;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	padding-bottom: 4px;
`
const UploadCompleteText = styled.span`
	color: #4c83d6;
	font-size: 12px;
`
