import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { BlueMainDiv, BlueSubDiv } from '../../Common/Common.Styled'
// import { UldAfterWrap, UldBtn, UldText, UldWrap } from '../../Table/TableModal'

/**
 * @description
 * 대량 등록 컴포넌트입니다.
 */
const MultiUploader = () => {
	const fileInputRef = useRef(null)
	const [selectedFile, setSelectedFile] = useState(null)
	const [uploadProgress, setUploadProgress] = useState(0)

	const handleCancel = () => {
		setSelectedFile(null)
		setUploadProgress(0)

		if (fileInputRef.current) {
			fileInputRef.current.value = null
		}
	}
	return (
		<BlueMainDiv style={{ margin: '0px auto', borderTop: 'none', height: '200px', display: 'flex' }}>
			{!selectedFile && (
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
							// onChange={handleFileExcel}
						/>
						<UldWrap>
							{selectedFile && (
								<div>
									<div>{selectedFile?.name}</div>
									<div>
										<progress value={uploadProgress} max="100" />
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
			{selectedFile && (
				<UldAfterWrap>
					<div style={{ fontSize: '16px' }}>{selectedFile.name}</div>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<progress value={uploadProgress} max="100" />
						<div>x</div>
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
	border: 1px solid;
	display: flex;
	justify-content: space-between;
	align-items: center;
`
const Dropdown = styled.div``
