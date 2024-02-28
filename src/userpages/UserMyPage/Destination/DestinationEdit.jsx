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

import { useMutation } from '@tanstack/react-query'
import { destinationQueryKey, getDetailDestination, patchDestination } from '../../../api/myPage'
import { queryClient } from '../../../api/query'
import { BlackBtn, WhiteBtn } from '../../../common/Button/Button'
import AddressFinder from '../../../components/DaumPost/Address'
import useReactQuery from '../../../hooks/useReactQuery'
import { isEmptyObj } from '../../../lib'
import useAlert from '../../../store/Alert/useAlert'
import { getSpecialDestination } from '../../../api/search'
import { MainSelect } from '../../../common/Option/Main'

/**
 * @description
 * 목적지 수정 페이지입니다.
 */
const DestinationEdit = ({ setSwtichDestiEdit, uidAtom }) => {
	const { simpleAlert, showAlert } = useAlert()

	// 대표 주소 지정 옵션
	const representOptions = [
		{
			text: '지정',
			value: 1,
		},
		{
			text: '미지정',
			value: 0,
		},
	]

	// 특수목적지 목록
	const [specialDestinations, setSpecialDestinations] = useState([])
	const [selectedSpecialDestination, setSelectedSpecialDestination] = useState(null)

	const getSpecials = async () => {
		const response = await getSpecialDestination()
		setSpecialDestinations(response)
	}

	const { mutate: update } = useMutation(patchDestination, {
		onSuccess() {
			simpleAlert('저장되었습니다.', () => {
				setSwtichDestiEdit(false)
				queryClient.invalidateQueries({ queryKey: destinationQueryKey.list })
			})
		},
		onError(error) {
			if (error) {
				simpleAlert(error.data.message)
			}
		},
	})

	const backComponent = () => {
		setSwtichDestiEdit(false)
	}

	const init = {
		represent: 1, // 대표 주소 지정 여부
		// destinationUid: '',
		address: '', // 주소
		addressDetail: '', // 상세주소
		name: '', // 하차지명
		phone: '', // 하차지 연락처
		managerTitle: '', // 담당자 직함
		managerName: '', // 담당자 이름
		managerPhone: '', // 담당자 번호
		memo: '', // 비고
	}

	const { data } = useReactQuery(uidAtom, 'getDetailDestination', getDetailDestination)

	const detailData = data?.data?.data

	const [input, setInput] = useState(init)
	// 라디오 헨들러
	function onRepresentHandler(value) {
		setInput((p) => ({ ...p, represent: value }))
	}

	// 목적지 주소 핸들러
	function onAddressHandler(address, addressDetail, sido, sigungu, dongLee, eubMyeon) {
		setInput((p) => ({ ...p, address, addressDetail }))
	}

	const handleChange = (e) => {
		const { name, value } = e.target
		setInput({ ...input, [name]: value })
	}
	const submit = async () => {
		if (!isEmptyObj(input)) {
			simpleAlert('빈값을 채워주세요.')
			return
		}
		if (!!selectedSpecialDestination && !input.address.startsWith(selectedSpecialDestination.label)) {
			simpleAlert('선택한 특수목적지로 주소를 다시 검색해주세요.')
			return
		}
		update({ uid: uidAtom, ...input })
	}
	useEffect(() => {
		if (detailData) {
			setInput({
				represent: detailData.represent,
				name: detailData.name,
				memo: detailData.memo,
				managerTitle: detailData.managerTitle,
				managerName: detailData.managerName,
				managerPhone: detailData.managerPhone,
				phone: detailData.phone,
				address: detailData.address, // 주소 필드
				addressDetail: detailData.addressDetail, // 상세 주소 필드
			})
		}
	}, [detailData])

	useEffect(() => {
		getSpecials()
	}, [])

	return (
		<OnePageContainer>
			<MainTitle>목적지 수정</MainTitle>
			<OnePageSubContainer>
				<HalfWrap>
					<Left>
						<Part>
							<Title>
								<h4>대표 주소 지정</h4>
								<p></p>
							</Title>
							<RadioContainer>
								{representOptions.map((option, index) => (
									<RadioMainDiv key={index}>
										<RadioCircleDiv
											isChecked={option.value === input.represent}
											onClick={() => onRepresentHandler(option.value)}
										>
											<RadioInnerCircleDiv isChecked={option.value === input.represent} />
										</RadioCircleDiv>
										<div style={{ display: 'flex', marginLeft: '5px' }}>{option.text}</div>
									</RadioMainDiv>
								))}
							</RadioContainer>
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
								prevAddress={input.address}
								prevAddressDetail={input.addressDetail}
								defaultQuery={selectedSpecialDestination?.label}
							/>
						</Part>

						<Part>
							<Title>
								<h4>하차지 특이사항(비고)</h4>
								<p></p>
							</Title>
							<CustomInput
								placeholder="하차지 특이사항(비고)"
								width={340}
								name="memo"
								value={input.memo}
								onChange={handleChange}
							/>
						</Part>
					</Left>
					<Right>
						<Part>
							<Title>
								<h4>하차지 명</h4>
								<p></p>
							</Title>
							<CustomInput
								placeholder="제 1창고,제 2창고 등."
								width={340}
								name="name"
								value={input.name}
								onChange={handleChange}
							/>
						</Part>
						<Part>
							<Title>
								<h4>하차지 담당자 정보</h4>
								<p></p>
							</Title>
							<div style={{ display: 'flex', gap: '5px' }}>
								<CustomInput
									placeholder="담당자 성함 입력"
									value={input.managerName}
									width={200}
									name="managerName"
									onChange={handleChange}
								/>
								<CustomInput
									placeholder="직함 입력"
									width={135}
									name="managerTitle"
									value={input.managerTitle}
									onChange={handleChange}
								/>
							</div>
							<CustomInput
								placeholder="담당자 휴대폰 번호 입력 ('-' 제외)"
								value={input.managerPhone}
								width={340}
								style={{ marginTop: '5px' }}
								name="managerPhone"
								onChange={handleChange}
							/>

							<Alert style={{ margin: '5px auto' }}>
								*하차지 연락처 미입력 시 토요일 하차 불가
								<br />
								*토요일 출고시 목적지 하차관련 문제 발생, 통화불가할 경우 회차비용 발생할수 있음.
							</Alert>
							<CustomInput
								placeholder="하차지 연락처 입력 ('-' 제외)"
								width={340}
								name="phone"
								value={input.phone}
								onChange={handleChange}
							/>
						</Part>
					</Right>
				</HalfWrap>
				<BtnWrap bottom={-270}>
					<WhiteBtn width={40} height={40} onClick={backComponent}>
						돌아가기
					</WhiteBtn>
					<BlackBtn width={40} height={40} onClick={submit}>
						저장
					</BlackBtn>
				</BtnWrap>
			</OnePageSubContainer>
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
