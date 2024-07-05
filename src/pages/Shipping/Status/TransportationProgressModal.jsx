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
import DateGrid from '../../../components/DateGrid/DateGrid'

const TransportationProgressModal = ({ closeFn, auctionFn }) => {
	const [outLoadDate, setOutLoadDate] = useState()
	const [outUnLoadDate, setOutUnLoadDate] = useState()
	const [errorMessage, setMessage] = useState('')
	const onHandleClick = () => {
		if (!outLoadDate) {
			setMessage('상차 일자를 입력해주세요.')
			return null
		}
		if (!outUnLoadDate) {
			setMessage('하차 예정 일자를 입력해주세요.')
			return null
		}
		auctionFn(outLoadDate, outUnLoadDate)
	}

	return (
		<OutSideArea>
			<ModalContainer width={530}>
				<BlueBarHeader>
					<div></div>
					<div>
						<WhiteCloseBtn onClick={closeFn} src="/svg/white_btn_close.svg" />
					</div>
				</BlueBarHeader>
				<BlueSubContainer>
					<div style={{ position: 'relative' }}>
						<BlueMainDiv>
							<BlueSubDiv>
								<h6>상차 일자</h6>
								<DateGrid bgColor={'white'} fontSize={17} startDate={outLoadDate} setStartDate={setOutLoadDate} />
							</BlueSubDiv>
							<BlueSubDiv>
								<h6>하차 예정 일자</h6>
								<DateGrid bgColor={'white'} fontSize={17} startDate={outUnLoadDate} setStartDate={setOutUnLoadDate} />
							</BlueSubDiv>
						</BlueMainDiv>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							{errorMessage && <ErrorMsg>{errorMessage}</ErrorMsg>}
						</div>
					</div>
					<BlueBtnWrap>
						<BlueBlackBtn onClick={onHandleClick}>운송 진행</BlueBlackBtn>
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

const ErrorMsg = styled.p`
	color: red;
	font-size: 16px;
`

export default TransportationProgressModal
