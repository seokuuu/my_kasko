import React, { useEffect, useState } from 'react'
import {
	Alert,
	HalfWrap,
	Left,
	MainTitle,
	OnePageContainer,
	OnePageSubContainer,
	Part,
	Right,
	Title,
} from '../../../common/OnePage/OnePage.Styled'
import { CustomInput } from '../../../common/Input/Input'
import { styled } from 'styled-components'
import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../../common/Check/RadioImg'
import { CheckBox } from '../../../common/Check/Checkbox'
import { get_addressFind, get_detailClientDestination, patch_clientDestination } from '../../../api/userManage'
import { BlackBtn, WhiteBtn } from '../../../common/Button/Button'
import { isEmptyObj } from '../../../lib'
import useMutationQuery from '../../../hooks/useMutationQuery'
import { UsermanageFindModal } from '../../../store/Layout/Layout'
import { useAtom } from 'jotai'
import ClientDestiCustomerFind from './ClientDestiCustomerFind'
import useReactQuery from '../../../hooks/useReactQuery'
import useAlert from '../../../store/Alert/useAlert'
import AddressFinder from '../../../components/DaumPost/Address'
import { getSpecialDestination } from '../../../api/search'
import { MainSelect } from '../../../common/Option/Main'

const init = {
	uid: '',
	represent: '', // (0: 미지정 / 1: 지정)
	customerUid: '', //고객 고유번호
	destinationUid: '', //목적지 고유번호
	address: '', //주소,
	addressDetail: '',
	name: '', //하차지명
	managerTitle: '', //담당자 직함
	managerName: '', //담당자 이름
	managerPhone: '', //담당자 연락처
	phone: '', //하차지담당자번호
	memo: '', //메모
}

const DestinationEdit = ({ uidAtom, setEditModal }) => {
	const { showAlert, simpleConfirm, simpleAlert } = useAlert()

	const { data } = useReactQuery(uidAtom, 'detailclientDestination', get_detailClientDestination)
	const matchingData = data?.data?.data

	const [address, setAddress] = useState()
	const [savedRadioValue, setSavedRadioValue] = useState('')
	const [detailAddress, setDetailAddress] = useState()
	const [postAddress, setPostAdress] = useState('')
	const [findModal, setFindModal] = useAtom(UsermanageFindModal)
	const [customerFindResult, setCustomerFindResult] = useState()
	const [customerNameInput, setCustomerNameInput] = useState({})
	const [destiCode, setDestiCode] = useState()

	// 특수목적지 목록
	const [specialDestinations, setSpecialDestinations] = useState([])
	const [selectedSpecialDestination, setSelectedSpecialDestination] = useState(null)

	const getSpecials = async () => {
		const response = await getSpecialDestination()
		setSpecialDestinations(response)
	}

	useEffect(() => {
		setAddress(matchingData?.address)
		setDetailAddress(matchingData?.addressDetail)
		setCustomerNameInput({
			customerName: matchingData?.customerName,
			customerCode: matchingData?.customerCode,
		})
	}, [uidAtom, matchingData])

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (postAddress) {
					const response = await get_addressFind(postAddress)
					const resData = response?.data?.data
					if (resData) {
						setDestiCode(resData)
					} else {
						setDestiCode('미등록 또는 대기 중인 코드입니다.')
					}
				}
			} catch (error) {
				console.error(error)
			}
		}

		fetchData()
	}, [postAddress, get_addressFind])

	const radioDummy = ['지정', '미지정']
	const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, () => false)) // 더미 데이터에 맞는 check 생성 (해당 false / true값 반환)

	const [submitData, setSubmitData] = useState(init)

	const mutation = useMutationQuery('', patch_clientDestination)

	function onAddressHandler(address, addressDetail, sido, sigungu, bname) {
		const destination = `${sido} ${sigungu} ${bname}`
		setPostAdress(address)
		setSubmitData((p) => ({ ...p, address, addressDetail, destination }))
	}
	useEffect(() => {
		const uid = matchingData?.uid
		setSubmitData({ ...submitData, ...matchingData, ...customerNameInput })
	}, [matchingData, customerNameInput])

	useEffect(() => {
		const checkedIndex = checkRadio.findIndex((isChecked, index) => isChecked && index < radioDummy.length)
		if (checkedIndex === 0) {
			setSubmitData({ ...submitData, represent: 1 })
		}
		if (checkedIndex === 1) {
			setSubmitData({ ...submitData, represent: 0 })
		}
		if (checkedIndex !== -1) {
			const selectedValue = radioDummy[checkedIndex]
			setSavedRadioValue(selectedValue)
		}
	}, [checkRadio])

	useEffect(() => {
		const checkedIndex = matchingData?.represent === 0 ? 1 : 0
		const newCheckRadio = Array.from({ length: radioDummy.length }, (_, index) => index === checkedIndex)

		setCheckRadio(newCheckRadio)
		setSubmitData({
			...submitData,
			...matchingData,
			represent: checkedIndex,
		})
	}, [matchingData])

	const eventHandle = (e) => {
		const { name, value } = e.target
		setSubmitData({ ...submitData, [name]: value, address: address, addressDetail: detailAddress })
	}

	const submitHandle = (e) => {
		if (!isEmptyObj(submitData)) return simpleAlert('빈값을 채워주세요.')

		if (isEmptyObj(submitData)) {
			if (!!selectedSpecialDestination && !submitData.address.startsWith(selectedSpecialDestination.label)) {
				simpleAlert('등록된 기본 주소로 다시 검색해주세요.')
				return
			}

			mutation.mutate(submitData, {
				onSuccess: () => {
					showAlert({
						title: '수정되었습니다.',
						func: () => {
							window.location.reload()
						},
					})
				},
			})
		} else {
			simpleAlert('내용을 모두 기입해주세요.')
		}
	}

	useEffect(() => {
		// 컴포넌트가 언마운트될 때 switchEdit을 재설정하는 정리 함수
		return () => {
			setEditModal(false)
		}
	}, [])

	useEffect(() => {
		getSpecials()
	}, [])

	return (
		<OnePageContainer style={{ minHeight: '88vh' }}>
			<MainTitle>고객사 목적지 수정</MainTitle>
			<OnePageSubContainer>
				<HalfWrap>
					<Left style={{ width: '50%' }}>
						<Part>
							<Title>
								<h4>대표 주소 지정</h4>
								<p></p>
							</Title>
							<RadioContainer>
								{radioDummy.map((text, index) => (
									<RadioMainDiv key={index}>
										<RadioCircleDiv
											isChecked={checkRadio[index]}
											onClick={() => {
												setCheckRadio(CheckBox(checkRadio, checkRadio.length, index))
											}}
										>
											<RadioInnerCircleDiv isChecked={checkRadio[index]} />
										</RadioCircleDiv>
										<div style={{ display: 'flex', marginLeft: '5px' }}>{text}</div>
									</RadioMainDiv>
								))}
							</RadioContainer>
						</Part>
						<Part>
							<Title>
								<h4>고객사 명</h4>
								<p></p>
							</Title>
							<CustomInput width={120} value={customerNameInput?.customerName} />
							<span style={{ margin: 'auto 5px' }}>-</span>
							<CustomInput width={120} value={customerNameInput?.customerCode} />
							<BlackBtn
								width={20}
								height={40}
								style={{ marginLeft: '10px' }}
								onClick={() => {
									setFindModal(true)
								}}
							>
								조회
							</BlackBtn>
						</Part>

						<Part>
							<Title>
								<h4>특수목적지 선택</h4>
								<p></p>
							</Title>
							<MainSelect
								width={320}
								options={specialDestinations}
								defaultValue={specialDestinations[0]}
								value={selectedSpecialDestination}
								name="selectedSpecialDestination"
								onChange={(e) => setSelectedSpecialDestination(e)}
							/>
						</Part>

						<Part>
							<Title>
								<h4>목적지</h4>
								<p></p>
							</Title>
							<AddressFinder
								onAddressChange={onAddressHandler}
								prevAddress={selectedSpecialDestination?.label ?? address}
								prevAddressDetail={destiCode?.detailAddress}
								defaultQuery={selectedSpecialDestination?.label}
							/>
						</Part>

						<Part>
							<Title>
								<h4>목적지 코드</h4>
								<p></p>
							</Title>
							<div
								style={{
									display: 'flex',
									width: '345px',
								}}
							>
								<div>
									<CustomInput
										width={340}
										disabled
										value={destiCode}
										defaultValue={matchingData?.destinationCode}
										onChange={eventHandle}
									/>
								</div>
							</div>
						</Part>
					</Left>
					<Right style={{ width: '50%' }}>
						<Part>
							<Title>
								<h4>하차지 명</h4>
								<p></p>
							</Title>
							<CustomInput
								placeholder="제 1창고,제 2창고 등."
								width={340}
								name="name"
								onChange={eventHandle}
								defaultValue={matchingData?.name}
							/>
						</Part>
						<Part>
							<Title>
								<h4>하차지 담당자 정보</h4>
								<p></p>
							</Title>
							<CustomInput
								placeholder="담당자 성함 입력"
								width={200}
								name="managerName"
								onChange={eventHandle}
								defaultValue={matchingData?.managerName}
							/>
							<CustomInput
								placeholder="직함 입력"
								width={135}
								style={{ marginLeft: '5px' }}
								name="managerTitle"
								onChange={eventHandle}
								defaultValue={matchingData?.managerTitle}
							/>
							<CustomInput
								placeholder="담당자 휴대폰 번호 입력 ('-' 제외)"
								width={340}
								style={{ marginTop: '5px' }}
								name="managerPhone"
								onChange={eventHandle}
								defaultValue={matchingData?.managerPhone}
							/>

							<Alert style={{ margin: '5px auto' }}>*하차지 연락처 미입력 시 토요일 하차 불가</Alert>
							<CustomInput
								placeholder="하차지 연락처 입력 ('-' 제외)"
								width={340}
								name="phone"
								onChange={eventHandle}
								defaultValue={matchingData?.phone}
							/>
						</Part>

						<Part>
							<Title>
								<h4>하차지 특이사항(비고)</h4>
								<p></p>
							</Title>
							<CustomInput
								placeholder="하차지 특이사항 작성"
								width={340}
								name="memo"
								onChange={eventHandle}
								defaultValue={matchingData?.memo}
							/>
						</Part>
					</Right>
				</HalfWrap>
			</OnePageSubContainer>
			<BtnWrap bottom={-250}>
				<WhiteBtn
					width={40}
					height={40}
					onClick={() =>
						simpleConfirm('현재 작업 중인 내용이 저장되지 않았습니다.\n 페이지를 나가겠습니까?', () => {
							setEditModal(false)
						})
					}
				>
					돌아가기
				</WhiteBtn>
				<BlackBtn width={40} height={40} onClick={submitHandle}>
					저장
				</BlackBtn>
			</BtnWrap>
			{findModal && (
				<ClientDestiCustomerFind
					setFindModal={setFindModal}
					setCustomerFindResult={setCustomerFindResult}
					customerNameInput={customerNameInput}
					setCustomerNameInput={setCustomerNameInput}
				/>
			)}
		</OnePageContainer>
	)
}

export default DestinationEdit

const RadioContainer = styled.div`
	display: flex;
	width: 250px;
	justify-content: space-between;
`

const BtnWrap = styled.div`
	display: flex;
	width: 400px;
	height: 50px;
	justify-content: space-evenly;
	align-items: center;
	margin: 60px auto;
`
