import { isEqual } from 'lodash'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { destinationQueryKey, postDestination } from '../../../api/myPage'
import { queryClient } from '../../../api/query'
import { BlackBtn, BtnWrap, WhiteBtn } from '../../../common/Button/Button'
import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../../common/Check/RadioImg'
import { CustomInput } from '../../../common/Input/Input'
import { Alert, HalfWrap, Left, MainTitle, Part, Right, Title } from '../../../common/OnePage/OnePage.Styled'
import AddressFinder from '../../../components/DaumPost/Address'
import useBlockRoute from '../../../hooks/useBlockRoute'
import { isEmptyObj } from '../../../lib'
import useAlert from '../../../store/Alert/useAlert'

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

/**
 * @description
 * 목적지 등록 페이지입니다.
 */
const DestinationPost = ({ setChoiceComponent }) => {
	const { simpleAlert, showAlert, simpleConfirm } = useAlert()

	// 폼
	const [input, setInput] = useState(init) //summit input 데이터
	console.log('input :', input)

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

	// 대부분 필드에서 사용되는 핸들러입니다.
	const handleChange = (e) => {
		const { name, value } = e.target
		setInput({ ...input, [name]: value })
	}

	// 라디오 헨들러
	function onRepresentHandler(value) {
		setInput((p) => ({ ...p, represent: value }))
	}

	// 목적지 주소 핸들러
	function onAddressHandler(address, addressDetail, sido, sigungu, dongLee, eubMyeon) {
		const translateSido = sidoMapping[sido] ?? sido

		// 서버로 보낼 주소
		const destination = eubMyeon
			? `${translateSido} ${sigungu} ${eubMyeon} ${dongLee}`
			: `${translateSido} ${sigungu} ${dongLee}`

		setInput((p) => ({ ...p, address: destination, addressDetail }))
	}

	// 저장 핸들러
	const submit = async () => {
		if (!isEmptyObj(input)) return simpleAlert('빈값을 채워주세요.')

		const serverParams = {
			...input,
		}

		console.log('serverParams :', serverParams)
		try {
			const { data: res } = await postDestination(input)
			if (res.status === 200) {
				showAlert({
					title: '저장되었습니다.',
					content: '',
					func: () => {
						setChoiceComponent('리스트')
						queryClient.invalidateQueries({ queryKey: destinationQueryKey.list })
					},
				})
			} else {
				simpleAlert('저장에 실패하였습니다.')
			}
		} catch (err) {
			console.log(err)
		}
	}

	// 처음 폼과 이전 폼을 비교한 값입니다.
	const blockCondition = useMemo(() => !isEqual(init, input), [input])

	// 돌아가기
	const backComponent = () => {
		if (blockCondition) {
			simpleConfirm('현재 작업 중인 내용이 저장되지 않았습니다. \n페이지를 나가시겠습니까?', () =>
				setChoiceComponent('리스트'),
			)
		}
	}

	/**
	 * @description
	 * 처음 폼과 변경된 폼을 비교하여 변경된 사항이 있으면 모달을 띄워줍니다.
	 */

	useBlockRoute(blockCondition)

	return (
		<OnePageContainer2>
			<MainTitle>목적지 등록</MainTitle>
			<OnePageSubContainer2>
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
								<h4>목적지</h4>
								<p></p>
							</Title>
							<AddressFinder onAddressChange={onAddressHandler} />
						</Part>

						<Part>
							<Title>
								<h4>비고</h4>
								<p></p>
							</Title>
							<CustomInput placeholder="비고 작성" width={340} name="memo" value={input.memo} onChange={handleChange} />
						</Part>
					</Left>
					<Right>
						<Part>
							<Title>
								<h4>하차지 명</h4>
								<p></p>
							</Title>
							<CustomInput
								placeholder="상세 주소 입력"
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
							<CustomInput
								placeholder="직함 입력"
								width={130}
								name="managerTitle"
								value={input.managerTitle}
								onChange={handleChange}
							/>
							<CustomInput
								placeholder="담당자 성함 입력"
								value={input.managerName}
								width={195}
								style={{ marginLeft: '5px' }}
								name="managerName"
								onChange={handleChange}
							/>
							<CustomInput
								placeholder="담당자 휴대폰 번호 입력 ('-' 제외)"
								value={input.managerPhone}
								width={340}
								style={{ marginTop: '5px' }}
								name="managerPhone"
								onChange={handleChange}
							/>

							<Alert style={{ margin: '5px auto' }}>*하차지 연락처 미입력 시 토요일 하차 불가</Alert>
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
			</OnePageSubContainer2>
		</OnePageContainer2>
	)
}

export default DestinationPost

const RadioContainer = styled.div`
	display: flex;
	width: 250px;
	justify-content: space-between;
`
const OnePageContainer2 = styled.div`
	width: fit-content;
	font-size: 18px;
	background-color: white;
	margin-left: auto;
	margin-right: auto;
	border: 1px solid black;
	min-height: 88vh;
	max-height: 100vh;
`

const OnePageSubContainer2 = styled.div`
	width: 100%;
	padding: 0px 50px;
`
