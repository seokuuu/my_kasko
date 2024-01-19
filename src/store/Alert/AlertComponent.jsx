import React from 'react'
import { useAtomValue } from 'jotai'
import { alertAtom } from './alertAtom'
import { FadeOverlay, ModalContainer, ModalSubContainer, ModalText, ModalTitle } from '../../modal/Common/Common.Styled'
import { ModalPart } from '../../pages/User/SignUp/SignUp.Styled'
import { BlackBtn, RedBtn, WhiteBtn } from '../../common/Button/Button'
import useAlert from './useAlert'

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
			<FadeOverlay />
			<ModalContainer width={400}>
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
			</ModalContainer>
		</>
	)
}

export default AlertComponent
