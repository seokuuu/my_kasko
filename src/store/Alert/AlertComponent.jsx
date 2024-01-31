import React from 'react'
import { useAtomValue } from 'jotai'
import { alertAtom } from './alertAtom'
import { FadeOverlay, ModalSubContainer, ModalText, ModalTitle } from '../../modal/Common/Common.Styled'
import { ModalPart } from '../../pages/User/SignUp/SignUp.Styled'
import { BlackBtn, RedBtn, WhiteBtn } from '../../common/Button/Button'
import useAlert from './useAlert'
import { styled } from 'styled-components'

const AlertComponent = () => {
	const { isOpen, isConfirm, isRed, title, content, func } = useAtomValue(alertAtom)
	const { closeAlert } = useAlert()

	const handleEvent = () => {
		if (func) func()
		closeAlert()
	}

	if (!isOpen) return null

	return (
		<>
			<FadeOverlay style={{ zIndex: '9000' }} />
			<Container>
				{!isConfirm && (
					<ModalSubContainer>
						<ModalPart>
							<ModalTitle>{title ?? ''}</ModalTitle>
							<ModalText>{content ?? ''}</ModalText>
						</ModalPart>
						<BlackBtn onClick={handleEvent} width={100} height={50}>
							확인
						</BlackBtn>
					</ModalSubContainer>
				)}

				{isConfirm && (
					<ModalSubContainer>
						<ModalPart>
							<ModalTitle>{title ?? ''}</ModalTitle>
							<ModalText>{content ?? ''}</ModalText>
						</ModalPart>
						{isRed ? (
							<RedBtn onClick={handleEvent} width={100} height={50}>
								확인
							</RedBtn>
						) : (
							<BlackBtn onClick={handleEvent} width={100} height={50}>
								확인
							</BlackBtn>
						)}
						<WhiteBtn onClick={closeAlert} width={100} height={50}>
							취소
						</WhiteBtn>
					</ModalSubContainer>
				)}
			</Container>
		</>
	)
}

const Container = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: white;
	width: 400px;
	height: max-content;
	z-index: 99999;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	border-radius: 8px;
`

export default AlertComponent
