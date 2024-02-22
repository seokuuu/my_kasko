import React from 'react'
import { styled } from 'styled-components'
import UserPostCommon from '../../../components/UserPostCommon'
import { WhiteCloseBtn } from '../../../modal/Common/Common.Styled'

const ClientPostModal = ({ setEditModal, id }) => {
	const closeModal = () => {
		setEditModal(false)
	}

	return (
		<>
			<ModalOverlayC />
			<Container>
				<MainTitleC style={{ fontSize: '18px' }}>
					<div>사용자 {id ? '수정' : '등록'}</div>
					<WhiteCloseBtn onClick={closeModal} src="/svg/white_btn_close.svg" />
				</MainTitleC>
				<UserPostCommon id={id} closeModal={closeModal} />
			</Container>
		</>
	)
}

export default ClientPostModal

const Container = styled.div`
	border-radius: 10px;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: white;
	height: 90vh;
	z-index: 999;
	border: 1px solid black;
	overflow: hidden;
	overflow-y: auto;
`

export const ModalContainerC = styled.div`
	border-radius: 10px;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: white;
	height: 90vh;
	z-index: 999;
	border: 1px solid black;
	overflow: hidden;
	overflow-y: auto;
`

export const ModalContainerSubC = styled.form`
	width: ${(props) => props.width}px;
	height: 1200px;
	padding: 120px 24px 56px 24px;
`

export const ModalOverlayC = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 998;
`
export const MainTitleC = styled.div`
	display: flex;
	justify-content: space-between;
	font-size: 24px;
	padding: 20px 24px;
	background: var(--primary-heavy, #061737);
	color: white;
`

export const CheckTxt2 = styled.p`
	min-width: 100px;
	font-size: 16px;
`

export const FlexContent2 = styled.div`
	display: flex;
	min-width: 600px;
	flex-wrap: wrap;
`
