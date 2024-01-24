import { FadeOverlay, ModalContainer } from '../modal/Common/Common.Styled'
import React from 'react'
import { usePolicyQuery } from '../api/operate'
import { styled } from 'styled-components'
import moment from 'moment'

/**
 * 정책 모달
 * @param closeModal 모달 닫기 이벤트
 * @param type 개인정보처리방침 / 이용약관
 */
const PolicyModal = ({ closeModal, type }) => {
	const { data } = usePolicyQuery(type)

	if (!data) return
	return (
		<>
			<FadeOverlay />
			<ModalContainer width={600} style={{ padding: '60px 40px 60px 40px' }}>
				<Title>{data?.data?.data?.type}</Title>
				<Box>
					<p>{data?.data?.data?.type}</p>
					<span>최종수정일: {moment(data?.data?.data?.updateDate).format('YYYY.MM.DD')}</span>
				</Box>
				<Content>{data?.data?.data?.content}</Content>
				<ButtonContainer>
					<Button onClick={closeModal}>확인</Button>
				</ButtonContainer>
			</ModalContainer>
		</>
	)
}

const Title = styled.div`
	width: 100%;
	height: 38px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 30px 0;
	font-size: 24px;
	font-weight: 500;
`
const Box = styled.div`
	width: 100%;
	height: 48px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 2px solid #000;

	& p {
		font-size: 20px;
		font-weight: 500;
	}

	& span {
		font-size: 13px;
		color: #6b6b6b;
	}
`

const Content = styled.div`
	border: 1px solid #e1e1e1;
	padding: 16px 12px 16px 12px;
	margin: 30px 0;
	color: #202020;
	font-size: 14px;
	line-height: 18px;
	white-space: pre-wrap;
	width: 100%;
	height: 80%;
	min-height: 200px;
	max-height: 400px;
	overflow-y: scroll;
`

const ButtonContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`

const Button = styled.div`
	background: #000000;
	width: 160px;
	height: 35px;
	padding: 8px 16px;
	color: #fff;
	text-align: center;
	cursor: pointer;
`

export default PolicyModal
