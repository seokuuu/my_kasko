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
import { useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { get_addressFind, post_clientDestination } from '../../../api/userManage'
import { BlackBtn, WhiteBtn } from '../../../common/Button/Button'
import useMutationQuery from '../../../hooks/useMutationQuery'
import { isEmptyObj } from '../../../lib'
import useAlert from '../../../store/Alert/useAlert'
import { UsermanageFindModal } from '../../../store/Layout/Layout'
import ClientDestiCustomerFind from './ClientDestiCustomerFind'
import AddressFinder from '../../../components/DaumPost/Address'
import { MainSelect } from '../../../common/Option/Main'
import { getSpecialDestination } from '../../../api/search'
import { CustomerSearch } from '../../../components/Search'
import { AccountSelect } from '../../../common/Option/SignUp'

const init = {
	represent: '', // (0: 미지정 / 1: 지정)
	customerUid: '', //고객 고유번호 (고객사 조회 API 필요, 고객사 찾기 모달)
	address: '', //주소,
	addressDetail: '',
	name: '', //하차지명
	managerTitle: '', //담당자 직함
	managerName: '', //담당자 이름
	managerPhone: '', //담당자 연락처
	phone: '', //하차지담당자번호
	memo: '', //메모
}

const sidoMapping = {
	서울: '서울특별시',
	부산: '부산광역시',
	대구: '대구광역시',
	인천: '인천광역시',
	광주: '광주광역시',
	대전: '대전광역시',
	울산: '울산광역시',
	경기: '경기도',
	충북: '충청북도',
	충남: '충청남도',
	전남: '전라남도',
	경북: '경상북도',
	경남: '경상남도',
}
const DestinationPost = ({ setChoiceComponent }) => {
	const { simpleConfirm, showAlert, simpleAlert } = useAlert()

	const [postAddress, setPostAdress] = useState('')
	const [submitData, setSubmitData] = useState(init)

	// 목적지 주소 핸들러
	function onAddressHandler(address, addressDetail, sido, sigungu, bname, bname1) {
		const destination = `${sidoMapping[sido]} ${sigungu} ${bname} ${bname1}`
		setPostAdress(address)
		setSubmitData((p) => ({ ...p, address, addressDetail, destination }))
	}

	const [destiCode, setDestiCode] = useState()

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

	const [findModal, setFindModal] = useAtom(UsermanageFindModal)
	const queryClient = useQueryClient()
	const radioDummy = ['지정', '미지정']
	const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, () => false)) // 더미 데이터에 맞는 check 생성 (해당 false / true값 반환)
	const [savedRadioValue, setSavedRadioValue] = useState('')

	const mutation = useMutationQuery('', post_clientDestination)
	const [customerFindResult, setCustomerFindResult] = useState()

	// 특수목적지 목록
	const [specialDestinations, setSpecialDestinations] = useState([])
	const [selectedSpecialDestination, setSelectedSpecialDestination] = useState(null)

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

	const eventHandle = (e) => {
		const { name, value } = e.target
		setSubmitData({ ...submitData, [name]: value, customerUid: customerFindResult?.uid })
	}

	const submitHandle = (e) => {
		if (!isEmptyObj(submitData)) {
			return simpleAlert('빈값을 채워주세요.')
		}

		if (isEmptyObj(submitData)) {
			if (!!selectedSpecialDestination && !submitData.address.startsWith(selectedSpecialDestination.value)) {
				simpleAlert('선택한 특수목적지로 주소를 다시 검색해주세요.')
				return
			}

			mutation.mutate(submitData, {
				onSuccess: (d) => {
					if (d?.data?.status === 200) {
						showAlert({
							title: '저장되었습니다.',
							func: () => {
								setChoiceComponent('리스트')
								queryClient.invalidateQueries('clientDestination')
							},
						})
					}
				},
				onError: (e) => {
					if (e?.data?.status === 400) {
						simpleAlert(e.data?.message, setChoiceComponent('등록'))
					}
				},
			})
		} else {
			simpleAlert('내용을 모두 기입해주세요.')
		}
	}

	const goBack = () => {
		setChoiceComponent('리스트')
	}

	const getSpecials = async () => {
		const response = await getSpecialDestination()
		setSpecialDestinations(response)
	}

	useEffect(() => {
		getSpecials()
	}, [])

	return (
		<OnePageContainer style={{ minHeight: '88vh' }}>
			<MainTitle>고객사 목적지 등록</MainTitle>
			<OnePageSubContainer>
				<HalfWrap>
					<Left style={{ width: '50%' }}>
						<Part>
							<Title>
								<h4>대표 목적지 지정</h4>
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
							<CustomInput width={112} defaultValue={customerFindResult?.name} />
							<span style={{ margin: 'auto 5px' }}>-</span>
							<CustomInput width={112} defaultValue={customerFindResult?.code} />
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
								name="selectedSpecialDestination"
								options={specialDestinations}
								defaultValue={specialDestinations[0]}
								value={selectedSpecialDestination || specialDestinations[0]}
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
								defaultQuery={selectedSpecialDestination?.value}
								// prevAddress={selectedSpecialDestination?.value}
							/>
						</Part>
						<Part>
							<Title>
								<h4>적용 목적지</h4>
								<p></p>
							</Title>
							<div
								style={{
									display: 'flex',
									width: '345px',
								}}
							>
								<div>
									<CustomInput width={340} value={destiCode} disabled />
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
							<CustomInput placeholder="제 1창고,제 2창고 등." width={340} name="name" onChange={eventHandle} />
						</Part>
						<Part>
							<Title>
								<h4>하차지 담당자 정보</h4>
								<p></p>
							</Title>
							<CustomInput placeholder="담당자 성함 입력" width={200} name="managerName" onChange={eventHandle} />
							<CustomInput
								placeholder="직함 입력"
								width={135}
								name="managerTitle"
								onChange={eventHandle}
								style={{ marginLeft: '5px' }}
							/>
							<CustomInput
								type="number"
								placeholder="담당자 휴대폰 번호 입력 ('-' 제외)"
								width={340}
								style={{ marginTop: '5px' }}
								name="managerPhone"
								onChange={eventHandle}
							/>

							<Alert style={{ margin: '5px auto' }}>*하차지 연락처 미입력 시 토요일 하차 불가</Alert>
							<CustomInput
								type="number"
								placeholder="하차지 연락처 입력 ('-' 제외)"
								width={340}
								name="phone"
								onChange={eventHandle}
							/>
						</Part>

						<Part>
							<Title>
								<h4>하차지 특이사항(비고)</h4>
								<p></p>
							</Title>
							<CustomInput placeholder="하차지 특이사항" width={340} name="memo" onChange={eventHandle} />
						</Part>
					</Right>
				</HalfWrap>
			</OnePageSubContainer>
			<BtnWrap bottom={-250}>
				<WhiteBtn
					width={40}
					height={40}
					onClick={() => {
						simpleConfirm('현재 작업 중인 내용이 저장되지 않았습니다.\n 페이지를 나가겠습니까?', () => {
							goBack()
						})
					}}
				>
					돌아가기
				</WhiteBtn>
				<BlackBtn width={40} height={40} onClick={submitHandle}>
					저장
				</BlackBtn>
			</BtnWrap>
			{findModal && (
				<ClientDestiCustomerFind setFindModal={setFindModal} setCustomerFindResult={setCustomerFindResult} />
			)}
		</OnePageContainer>
	)
}

export default DestinationPost

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
