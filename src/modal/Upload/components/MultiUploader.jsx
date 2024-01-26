import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { BlueMainDiv, BlueSubDiv } from '../../Common/Common.Styled'
// import { UldAfterWrap, UldBtn, UldText, UldWrap } from '../../Table/TableModal'

/**
 * @description
 * 대량 등록 컴포넌트입니다.
 *
 */
const MultiUploader = ({ file, setFile }) => {
	const [uploadProgress, setUploadProgress] = useState(0)
	// 대량 등록 관련 값들입니다.
	const fileInputRef = useRef(null)
	console.log('file :', Boolean(file))

	useEffect(() => {
		if (file) setUploadProgress(100)
	}, [file])
	return (
		<BlueMainDiv style={{ margin: '0px auto', borderTop: 'none', height: '200px', display: 'flex' }}>
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
							onChange={(e) => {
								const file = e.target.files[0]

								setFile(file)
							}}
						/>
						<UldWrap>
							{file && (
								<div>
									<div>{file?.name}</div>
									<div>
										<progress value={uploadProgress} max="100" />
									</div>
								</div>
							)}
						</UldWrap>
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
