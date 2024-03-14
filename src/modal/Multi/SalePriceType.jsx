import React from 'react'
import {
	BlueBarHeader,
	BlueBlackBtn,
	BlueBtnWrap,
	BlueMainDiv,
	BlueSubContainer,
	BlueSubDiv,
	ModalContainer,
	WhiteCloseBtn,
} from '../Common/Common.Styled'

import styled from 'styled-components'
import useAlert from '../../store/Alert/useAlert'
import { RadioSearchButton } from '../../components/Search'

const SalsePriceType = ({ closeFn, saveFn, data, setData }) => {
	const { simpleConfirm } = useAlert()

	return (
		<OutSideArea>
			<ModalContainer width={530}>
				<BlueBarHeader>
					<div>판매가 유형 변경</div>
					<div>
						<WhiteCloseBtn onClick={closeFn} src="/svg/white_btn_close.svg" />
					</div>
				</BlueBarHeader>
				<BlueSubContainer>
					<div>
						<BlueMainDiv>
							<BlueSubDiv>
								<h6>판매가 유형</h6>
								<RadioSearchButton
									options={[
										{ label: '일반', value: '일반' },
										{ label: '특가', value: '특가' },
										{ label: '특판', value: '특판' },
									]}
									value={data}
									onChange={(value) => setData(value)}
								/>
							</BlueSubDiv>
						</BlueMainDiv>
					</div>
					<BlueBtnWrap>
						<BlueBlackBtn
							onClick={() => {
								simpleConfirm('변경하시겠습니까?', () => {
									saveFn()
								})
							}}
						>
							저장
						</BlueBlackBtn>
					</BlueBtnWrap>
				</BlueSubContainer>
			</ModalContainer>
		</OutSideArea>
	)
}

export default SalsePriceType

const OutSideArea = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 9;
	background-color: rgba(0, 0, 0, 0.4);
`
