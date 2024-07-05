import {
	BlueBarHeader,
	BlueBlackBtn,
	BlueBtnWrap,
	BlueMainDiv,
	BlueSubContainer,
	BlueSubDiv,
	ModalContainer,
	WhiteCloseBtn,
} from '../../../modal/Common/Common.Styled'
import React, { useState } from 'react'
import styled from 'styled-components'

const OutCancelModel = ({ closeFn, auctionFn }) => {
	const [text, setText] = useState('')
	const [errorMessage, setMessage] = useState('')
	const onCancel = () => {
		if (!text) {
			setMessage('취소 사유를 입력해주세요.')
			return null
		}
		setMessage('')
		auctionFn(text)
	}

	return (
		<OutSideArea>
			<ModalContainer width={530}>
				<BlueBarHeader>
					<div>출고 취소</div>
					<div>
						<WhiteCloseBtn onClick={closeFn} src="/svg/white_btn_close.svg" />
					</div>
				</BlueBarHeader>
				<BlueSubContainer>
					<div style={{ position: 'relative' }}>
						<BlueMainDiv>
							<BlueSubDiv>
								<h6>취소 사유</h6>
								<TextInput
									type="text"
									value={text}
									onChange={(e) => {
										if (errorMessage) setMessage('')
										setText(e.target.value)
									}}
								/>
							</BlueSubDiv>
						</BlueMainDiv>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							{errorMessage && <ErrorMsg>{errorMessage}</ErrorMsg>}
						</div>
					</div>
					<BlueBtnWrap>
						<BlueBlackBtn onClick={onCancel}>출고 취소</BlueBlackBtn>
					</BlueBtnWrap>
				</BlueSubContainer>
			</ModalContainer>
		</OutSideArea>
	)
}

const OutSideArea = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 9;
	background-color: rgba(0, 0, 0, 0.4);
`

const TextInput = styled.input`
	width: 100%;
	height: 56px;
	border: 1px solid #c8c8c8;
`

const ErrorMsg = styled.p`
	color: red;
	font-size: 16px;
`

export default OutCancelModel
