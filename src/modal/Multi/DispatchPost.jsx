import React, { useEffect, useState } from 'react'
import {
	BlueBarHeader,
	BlueBlackBtn,
	BlueBtnWrap,
	BlueHalfDiv,
	BlueInput,
	BlueMainDiv,
	BlueOneDiv,
	BlueSubContainer,
	FadeOverlay,
	ModalContainer,
	WhiteCloseBtn,
} from '../Common/Common.Styled'
import { BlackBtn } from '../../common/Button/Button'
import { CustomSelect } from '../../common/Option/Main'
import {
	driverCarNumberValidQuery,
	useDriverCreateMutation,
	useDriverGetQuery,
	useDriverUpdateMutation,
} from '../../api/driver'
import useReactQuery from '../../hooks/useReactQuery'
import { getStorageList } from '../../api/search'
import { phoneRegex } from '../../common/Regex/Regex'
import useAlert from '../../store/Alert/useAlert'

const DispatchPost = ({ setIsModalPost, id }) => {
	const { simpleAlert } = useAlert()
	const { data: driverData } = useDriverGetQuery(id)
	const { data: storageList } = useReactQuery('', 'getStorageList', getStorageList)
	const { mutate: onCreateEvent } = useDriverCreateMutation()
	const { mutate: onUpdateEvent } = useDriverUpdateMutation()

	const [data, setData] = useState({
		name: '',
		phone: '',
		carNumber: '',
		isCarNumberValid: false,
		carType: '',
		memo: '',
	})

	const modalClose = () => setIsModalPost(false)

	const isNumber = (value) => /^\d*$/.test(value)

	const onChange = (e) => {
		const { name, value } = e.target
		const newValue = name === 'phone' && !isNumber(value) ? '' : value
		setData((prev) =>
			name === 'carNumber' ? { ...prev, [name]: newValue, isCarNumberValid: false } : { ...prev, [name]: newValue },
		)
	}

	const carNumberValid = async () => {
		const carNumber = data.carNumber
		if (!carNumber) return

		const isValid = await driverCarNumberValidQuery(carNumber)
		if (!isValid) simpleAlert('이미 등록된 차량 번호입니다.')

		setData((prev) => ({ ...prev, isCarNumberValid: isValid }))
	}

	const onSubmit = async () => {
		if (!data.name) {
			simpleAlert('기사명을 입력해주세요.')
			return
		}
		if (!data.phone) {
			simpleAlert('기사 연락처를 입력해주세요.')
			return
		}
		if (!phoneRegex.test(data.phone)) {
			simpleAlert('정확한 연락처를 입력해주세요.')
			return
		}
		if (!data.isCarNumberValid) {
			simpleAlert('차량 번호 중복체크를 진행해주세요.')
			return
		}
		if (!data.carType) {
			simpleAlert('차량 종류를 입력해주세요.')
			return
		}

		id ? await onUpdateEvent(data) : await onCreateEvent(data)
		modalClose()
	}

	useEffect(() => {
		if (!driverData) return
		setData((prev) => ({ ...prev, ...driverData, isCarNumberValid: true }))
	}, [driverData])

	return (
		// 판매 제품 관리 - 패키지 관리
		<>
			<FadeOverlay />
			<ModalContainer width={550}>
				<BlueBarHeader>
					<div>배차 기사 {id ? '수정' : '등록'}</div>
					<div>
						<WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
					</div>
				</BlueBarHeader>
				<BlueSubContainer>
					<div>
						<BlueMainDiv style={{ border: 'none' }}>
							<BlueHalfDiv>
								<div>
									<h6>기사 명</h6>
									<BlueInput placeholder="홍길동" name="name" value={data.name} onChange={onChange} />
								</div>
								<div>
									<h6>연락처</h6>
									<BlueInput
										placeholder="'-'제외한 숫자 입력"
										name="phone"
										value={data.phone}
										onChange={onChange}
										maxLength={11}
									/>
								</div>
							</BlueHalfDiv>
							<BlueHalfDiv>
								<div>
									<h6>차량 번호</h6>
									<div style={{ display: 'block', height: !data?.isCarNumberValid ? '100px' : '40px' }}>
										<BlueInput
											placeholder="예) 123가5678"
											name="carNumber"
											value={data.carNumber}
											onChange={onChange}
										/>
										{!data?.isCarNumberValid && (
											<BlackBtn
												style={{ marginTop: '5px' }}
												fontSize={17}
												width={100}
												height={40}
												onClick={carNumberValid}
											>
												중복 확인
											</BlackBtn>
										)}
									</div>
								</div>
								<div>
									<h6>차량 종류</h6>
									<BlueInput placeholder="예) 카고 트럭" name="carType" value={data.carType} onChange={onChange} />
								</div>
							</BlueHalfDiv>

							<BlueOneDiv>
								<h6>비고</h6>
								<BlueInput
									placeholder="내용을 입력해 주세요."
									name="memo"
									value={data.memo}
									onChange={onChange}
									style={{ width: '100%' }}
								/>
							</BlueOneDiv>
						</BlueMainDiv>
					</div>
					<BlueBtnWrap>
						<BlueBlackBtn onClick={onSubmit}>{id ? '수정' : '등록'}</BlueBlackBtn>
					</BlueBtnWrap>
				</BlueSubContainer>
			</ModalContainer>
		</>
	)
}

export default DispatchPost
