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
	BlueSubDiv,
	FadeOverlay,
	ModalContainer,
	ResultCell,
	ResultContainer,
	ResultHead,
	ResultRow,
	WhiteCloseBtn,
} from '../Common/Common.Styled'

import { useAtom } from 'jotai'
import { blueModalAtom } from '../../store/Layout/Layout'

import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../common/Check/RadioImg'
import { BlueRadioWrap } from '../Common/Common.Styled'

import { GreyBtn } from '../../common/Button/Button'
import { CheckBox } from '../../common/Check/Checkbox'
import { TxtInput } from '../../common/Input/Input'

import { BlackBtn } from '../../common/Button/Button'
import { CustomSelect } from '../../common/Option/Main'
import { storageOptions } from '../../common/Option/SignUp'

import { BMDTitle } from './CustomerFind'

import useReactQuery from '../../hooks/useReactQuery'
import { getCustomerFind } from '../../service/admin/Auction'
import { RadioSearchButton } from '../../components/Search'
import {
	driverCarNumberValidQuery,
	getSearchDriverByNameListQuery,
	useSearchDriverNameListQuery,
} from '../../api/driver'
import { getStorageList } from '../../api/search'
import { phoneRegex } from '../../common/Regex/Regex'
import { useSetDispatchMutation } from '../../api/shipment'

const DispatchDetail = ({ id, setIsPostModal }) => {
	const matchData = { name: '기사명', carNumber: '차량 번호', carType: '차량 종류', phone: '기사 연락처' }
	const [mode, setMode] = useState('검색') // 등록 방식 - 검색 / 직접등록
	const [search, setSearch] = useState('') // 검색어
	const [result, setResult] = useState([]) // 검색 결과
	const [selectedUid, setSelectedUid] = useState(null)
	const [data, setData] = useState({
		name: '',
		phone: '',
		carNumber: '',
		isCarNumberValid: false,
		carType: '',
		storage: '',
		memo: '',
	})

	const { mutate: setDispatch } = useSetDispatchMutation()

	const modalClose = () => setIsPostModal(false)

	const handleCellClick = (uid) => setSelectedUid(uid)

	const handleSearch = async () => {
		const data = await getSearchDriverByNameListQuery(search)
		setResult(data)
	}

	const reset = () => {
		setSearch('')
		setResult([])
		setSelectedUid(null)
	}

	const onRegister = () => {
		if (!selectedUid) {
			return window.alert('등록할 기사를 선택해주세요.')
		}
		if (window.confirm('배차 등록 하시겠습니까?')) {
			setDispatch({ productOutUid: id, driverUid: selectedUid })
			modalClose()
		}
	}

	useEffect(() => {
		reset()
	}, [mode])

	return (
		<>
			<FadeOverlay />
			<ModalContainer width={530}>
				<BlueBarHeader>
					<div>배차 기사 등록</div>
					<WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
				</BlueBarHeader>
				<BlueSubContainer>
					<BlueMainDiv>
						<BlueSubDiv style={{ display: 'block', height: '80px' }}>
							<h6>등록 방식</h6>
							<BlueRadioWrap style={{ gap: '100px', padding: '25px 0px' }}>
								{['검색', '직접 등록'].map((text, index) => (
									<RadioMainDiv key={index}>
										<RadioCircleDiv isChecked={mode === text} onClick={() => setMode(text)}>
											<RadioInnerCircleDiv isChecked={mode === text} />
										</RadioCircleDiv>
										<div style={{ display: 'flex', marginLeft: '5px', color: 'black' }}>{text}</div>
									</RadioMainDiv>
								))}
							</BlueRadioWrap>
						</BlueSubDiv>
					</BlueMainDiv>
					{mode === '검색' ? (
						<>
							<BlueMainDiv style={{ fontSize: '18px' }}>
								<div style={{ display: 'flex', alignItems: 'center' }}>
									<BMDTitle style={{ width: '90px' }}>검색</BMDTitle>
									<TxtInput value={search} onChange={(e) => setSearch(e.target.value)} />
									<GreyBtn height={40} width={15} margin={5} onClick={handleSearch}>
										찾기
									</GreyBtn>
								</div>
							</BlueMainDiv>
							<BlueMainDiv style={{ padding: '0px' }}>
								<ResultContainer>
									{result?.length > 0 && (
										<>
											<ResultHead>
												<ResultCell>선택</ResultCell>
												<ResultCell>{matchData.name}</ResultCell>
												<ResultCell>{matchData.carNumber}</ResultCell>
												<ResultCell>{matchData.carType}</ResultCell>
												<ResultCell>{matchData.phone}</ResultCell>
											</ResultHead>
											{result.map((item) => (
												<ResultRow key={item.uid} onClick={() => handleCellClick(item.uid)}>
													<ResultCell>
														<RadioMainDiv>
															<RadioCircleDiv
																isChecked={item.uid === selectedUid}
																onClick={(event) => {
																	event.stopPropagation() // 상위 요소의 onClick 이벤트 막기
																	handleCellClick(item.uid, item.name, item.code, item.businessNumber) // 셀 클릭 이벤트 처리
																}}
															>
																<RadioInnerCircleDiv isChecked={item.uid === selectedUid} />
															</RadioCircleDiv>
														</RadioMainDiv>
													</ResultCell>
													<ResultCell>{item.name}</ResultCell>
													<ResultCell>{item.carNumber}</ResultCell>
													<ResultCell>{item.carType}</ResultCell>
													<ResultCell>{item.phone}</ResultCell>
												</ResultRow>
											))}
										</>
									)}
								</ResultContainer>
							</BlueMainDiv>
							<BlueBtnWrap>
								<BlueBlackBtn onClick={onRegister}>등록</BlueBlackBtn>
							</BlueBtnWrap>
						</>
					) : (
						<DrvierPost id={id} data={data} setData={setData} onSubmit={setDispatch} modalClose={modalClose} />
					)}
				</BlueSubContainer>
			</ModalContainer>
		</>
	)
}

const DrvierPost = ({ id, data, setData, onSubmit, modalClose }) => {
	const { data: storageList } = useReactQuery('', 'getStorageList', getStorageList)

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
		if (!isValid) window.alert('이미 등록된 차량 번호입니다.')

		setData((prev) => ({ ...prev, isCarNumberValid: isValid }))
	}

	const isPostValid = () => {
		if (!data.storage || data.storage === '전체') {
			throw new Error('창고를 선택해주세요.')
		}
		if (!data.name) {
			throw new Error('기사명을 입력해주세요.')
		}
		if (!data.phone) {
			throw new Error('기사 연락처를 입력해주세요.')
		}
		if (!phoneRegex.test(data.phone)) {
			throw new Error('정확한 연락처를 입력해주세요.')
		}
		if (!data.isCarNumberValid) {
			throw new Error('차량 번호 중복체크를 진행해주세요.')
		}
		if (!data.carType) {
			throw new Error('차량 종류를 입력해주세요.')
		}
	}

	const postDispatch = async () => {
		try {
			isPostValid()
			onSubmit({ productOutUid: id, ...data })
			modalClose()
		} catch (error) {
			window.alert(error.message)
		}
	}

	return (
		<>
			<BlueMainDiv style={{ border: 'none' }}>
				<BlueOneDiv bor>
					<h6>창고</h6>
					<CustomSelect
						name="storage"
						value={storageList?.filter(({ label }) => label === data.storage)}
						options={storageList}
						onChange={(e) => setData((prev) => ({ ...prev, storage: e.label }))}
					/>
				</BlueOneDiv>
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
						<div style={{ display: 'block', height: '100px' }}>
							<BlueInput placeholder="예) 123가5678" name="carNumber" value={data.carNumber} onChange={onChange} />
							{!data?.isCarNumberValid && (
								<BlackBtn style={{ marginTop: '5px' }} fontSize={17} width={100} height={40} onClick={carNumberValid}>
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
			<BlueBtnWrap>
				<BlueBlackBtn onClick={postDispatch}>등록</BlueBlackBtn>
			</BlueBtnWrap>
		</>
	)
}

export default DispatchDetail
