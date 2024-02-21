import { useState } from 'react'
import {
	BlueBarHeader,
	BlueBlackBtn,
	BlueBtnWrap,
	BlueMainDiv,
	BlueSubContainer,
	FadeOverlay,
	ModalContainer,
	ResultCell,
	ResultContainer,
	ResultHead,
	ResultRow,
	WhiteCloseBtn,
} from '../Common/Common.Styled'
import { GreyBtn } from '../../common/Button/Button'
import { TxtInput } from '../../common/Input/Input'
import styled from 'styled-components'
import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../common/Check/RadioImg'
import { getDestinations } from '../../api/search'
import useAlert from '../../store/Alert/useAlert'
import { useLoading } from '../../store/Loading/loadingAtom'

const DestinationFind = ({ setSwitch, handleButtonOnClick }) => {
	const { simpleAlert } = useAlert()
	const [loading, setLoading] = useState(false)
	const [searchTerm, setSearchTerm] = useState('') // 검색어
	const [clickedResult, setClickedResult] = useState() // 선택 데이터
	const [selectedUid, setSelectedUid] = useState(null) // 선택한 uid
	const [result, setResult] = useState([]) // 목적지 get data
	const [error, setError] = useState(false) // 목적지 get data

	console.log('AAA 혁님 만든거', result)

	const modalClose = () => {
		setSwitch(false)
	}

	const handleSearch = async () => {
		if (!searchTerm) {
			simpleAlert('검색할 목적지를 입력해주세요.')
			return
		}
		if (searchTerm.length < 2) {
			simpleAlert('검색어를 2글자 이상 입력해주세요.')
			return
		}
		// if (!['동', '리', '면', '읍'].some((key) => searchTerm.includes(key))) {
		// 	simpleAlert('검색어에 "동 / 리 / 면 / 읍"을 포함시켜주세요. ')
		// 	return
		// }
		try {
			setError(false)
			setLoading(true)
			const response = await getDestinations(searchTerm)
			if (response.data.data.length === 0) {
				setError(true)
				return
			}
			setResult(response.data.data)
		} catch (e) {
			setError(true)
		} finally {
			setLoading(false)
		}
	}

	const handleCellClick = (uid, name, code) => {
		setClickedResult({ uid, name, code })
		setSelectedUid(uid)
	}

	const onSubmit = () => {
		handleButtonOnClick(clickedResult)
		modalClose()
	}

	useLoading(loading)

	return (
		<>
			<FadeOverlay />
			<ModalContainer style={{ width: '700px', height: '720px' }}>
				<BlueBarHeader style={{ height: '60px' }}>
					<div>목적지 찾기</div>
					<div>
						<WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
					</div>
				</BlueBarHeader>
				<BlueSubContainer>
					<div>
						<BlueMainDiv style={{ fontSize: '18px' }}>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<BMDTitle style={{ width: '90px' }}>검색</BMDTitle>
								<TxtInput
									placeholder={'목적지 명 입력...'}
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
								<GreyBtn height={40} width={15} margin={5} onClick={handleSearch}>
									찾기
								</GreyBtn>
							</div>
						</BlueMainDiv>
						<BlueMainDiv style={{ padding: '0px' }}>
							<ResultContainer>
								<ResultHead>
									<ResultCell wid={50}>선택</ResultCell>
									<ResultCell style={{ width: '60%' }}>목적지</ResultCell>
									<ResultCell style={{ width: '20%' }}>목적지 코드</ResultCell>
								</ResultHead>
								{error && <ResultError>검색 결과가 없습니다.</ResultError>}
								{!error &&
									result &&
									result.map((item, index) => (
										<ResultRow key={item.uid} onClick={() => handleCellClick(item.uid, item.name, item.code)}>
											<ResultCell wid={50}>
												<RadioMainDiv key={index}>
													<RadioCircleDiv
														isChecked={item.uid === selectedUid}
														onClick={(event) => {
															event.stopPropagation() // 상위 요소의 onClick 이벤트 막기
															handleCellClick(item.uid, item.name, item.code)
														}}
													>
														<RadioInnerCircleDiv isChecked={item.uid === selectedUid} />
													</RadioCircleDiv>
												</RadioMainDiv>
											</ResultCell>
											<ResultCell wid={300}>{item.name}</ResultCell>
											<ResultCell>{item.code}</ResultCell>
										</ResultRow>
									))}
							</ResultContainer>
						</BlueMainDiv>
					</div>
					<BlueBtnWrap>
						<BlueBlackBtn onClick={onSubmit}>적용</BlueBlackBtn>
					</BlueBtnWrap>
				</BlueSubContainer>
			</ModalContainer>
		</>
	)
}
const ResultError = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 80px;
`
const BMDTitle = styled.div`
	display: flex;
	justify-content: center;
`

export default DestinationFind
