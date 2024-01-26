import { useEffect, useState } from 'react'
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

import { get_addressFind, post_clientDestination } from '../../../api/userManage'
import { BlackBtn, BtnWrap, WhiteBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { isEmptyObj } from '../../../lib'
import useMutationQuery from '../../../hooks/useMutationQuery'
import { useQueryClient } from '@tanstack/react-query'
import { UsermanageFindModal } from '../../../store/Layout/Layout'
import { useAtom } from 'jotai'
import { find } from 'lodash'
import ClientDestiCustomerFind from './ClientDestiCustomerFind'
import SignUpPost from '../../../modal/SignUp/SignUpPost'
import useReactQuery from '../../../hooks/useReactQuery'
import useAlert from '../../../store/Alert/useAlert'
import DaumPostcode from 'react-daum-postcode'
import { FadeOverlay } from '../../../modal/Common/Common.Styled'
import AddressFinder from '../../../components/DaumPost/Address'

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
	const [postcodeModal, setPostcodeModal] = useState(false)
	const [postFind, setPostFind] = useState(false)
	const [address, setAddress] = useState('')
	const [postAddress, setPostAdress] = useState('')
	const [detailAddress, setDetailAddress] = useState('')
	const [isDaumPostOpen, setIsDaumPostOpen] = useState(false)
	const [submitData, setSubmitData] = useState(init)


	console.log('submitData', submitData)

	const postCheck = () => {
		setPostFind(false)
	}

	const directCheck = () => {
		setPostFind(true)
		setAddress('')
		setDetailAddress('')
		setSubmitData({ ...submitData, address: '', addressDetail: '' })
	}

	const daumPostHandleBtn = () => {
		setIsDaumPostOpen(true)
	}

	const detailAddressHandler = (e) => {
		const value = e.target.value
		setDetailAddress(value)
	}

	const comfirmPost = () => {
		setPostcodeModal(false)
		setSubmitData({ ...submitData, address: address, addressDetail: detailAddress })
	}

	const closeModal = () => {
		setPostcodeModal(false)
		setAddress('')
		setDetailAddress('')
		setSubmitData({ ...submitData, address: '', addressDetail: '' })
	}

	const daumPosthandleClose = () => {
		setIsDaumPostOpen(false)
	}

	const daumPostHandleComplete = (data) => {
		console.log('daum post data', data)
		const { address } = data

		// 지번 주소 전달
		const mappedSido = sidoMapping[data?.sido] || data?.sido
		const mergedAddress = [mappedSido, data?.sigungu, data?.bname1, data?.bname2]
			.filter((value) => value !== '')
			.join(' ')
		setAddress(mergedAddress)
		setDetailAddress(data?.jibunAddressEnglish?.split(' ')[0])
		setPostAdress(mergedAddress)
		console.log('mergedAddress =>', mergedAddress)
		setIsDaumPostOpen(false)

	const { showAlert, simpleAlert } = useAlert()
	console.log('submitData', submitData)

	// 목적지 주소 핸들러
	function onAddressHandler(address, addressDetail, sido, sigungu, bname) {
		const destination = `${sido} ${sigungu} ${bname}`
		setSubmitData((p) => ({ ...p, address, addressDetail, destination }))

	}

	console.log('찐 =>', address, detailAddress)

	const [destiCode, setDestiCode] = useState()

	console.log('postAddress', postAddress)

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

	console.log('customerFindResult', customerFindResult)

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
			mutation.mutate(submitData, {
				onSuccess: (d) => {
					console.log('테스트 ')
					if (d?.data?.status === 200) {
						showAlert({
							title: '저징되었습니다.',
							func: () => {
								setChoiceComponent('리스트')
								window.location.reload()
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
			alert('내용을 모두 기입해주세요.')
		}
	}

	const goBack = () => {
		setChoiceComponent('리스트')
	}
	return (
		<OnePageContainer style={{ minHeight: '88vh' }}>
			<MainTitle>고객사 목적지 등록</MainTitle>
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
							<CustomInput width={120} defaultValue={customerFindResult?.name} />
							<span style={{ margin: 'auto 5px' }}>-</span>
							<CustomInput width={120} defaultValue={customerFindResult?.code} />
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
								<h4>목적지</h4>
								<p></p>
							</Title>

							<CustomInput width={260} onChange={eventHandle} name="address" value={address} />
							<BlackBtn
								width={20}
								height={40}
								style={{ marginLeft: '10px' }}
								onClick={() => {
									setPostcodeModal(true)
								}}
							>
								조회
							</BlackBtn>
							<CustomInput
								placeholder="상세 주소 입력"
								width={340}
								name="detailAddress"
								value={detailAddress}
								onChange={eventHandle}
								style={{ marginTop: '5px' }}

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
									<CustomInput width={340} disabled value={destiCode} />
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
							<CustomInput placeholder="상세 주소 입력" width={340} name="name" onChange={eventHandle} />
						</Part>
						<Part>
							<Title>
								<h4>하차지 담당자 정보</h4>
								<p></p>
							</Title>
							<CustomInput placeholder="직함 입력" width={135} name="managerTitle" onChange={eventHandle} />
							<CustomInput
								placeholder="담당자 성함 입력"
								width={200}
								style={{ marginLeft: '5px' }}
								name="managerName"
								onChange={eventHandle}
							/>
							<CustomInput
								placeholder="담당자 휴대폰 번호 입력 ('-' 제외)"
								width={340}
								style={{ marginTop: '5px' }}
								name="managerPhone"
								onChange={eventHandle}
							/>

							<Alert style={{ margin: '5px auto' }}>*하차지 연락처 미입력 시 토요일 하차 불가</Alert>
							<CustomInput
								placeholder="하차지 연락처 입력 ('-' 제외)"
								width={340}
								name="phone"
								onChange={eventHandle}
							/>
						</Part>

						<Part>
							<Title>
								<h4>비고</h4>
								<p></p>
							</Title>
							<CustomInput placeholder="비고 작성" width={340} name="memo" onChange={eventHandle} />
						</Part>
					</Right>
				</HalfWrap>
			</OnePageSubContainer>
			<BtnWrap bottom={-250}>
				<WhiteBtn width={40} height={40} onClick={goBack}>
					돌아가기
				</WhiteBtn>
				<BlackBtn width={40} height={40} onClick={submitHandle}>
					저장
				</BlackBtn>
			</BtnWrap>
			{findModal && (
				<ClientDestiCustomerFind setFindModal={setFindModal} setCustomerFindResult={setCustomerFindResult} />
			)}



			{postcodeModal && (
				<SignUpPost
					postCheck={postCheck}
					directCheck={directCheck}
					postFind={postFind}
					address={address}
					daumPostHandleBtn={daumPostHandleBtn}
					detailAddress={detailAddress}
					setDetailAddress={setDetailAddress}
					detailAddressHandler={detailAddressHandler}
					comfirmPost={comfirmPost}
					closeModal={closeModal}
					isDaumPostOpen={isDaumPostOpen}
					daumPosthandleClose={daumPosthandleClose}
					daumPostHandleComplete={daumPostHandleComplete}

					noDirect={true}
				/>
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
