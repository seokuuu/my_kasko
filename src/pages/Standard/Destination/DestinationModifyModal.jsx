import {
	BlueBarHeader,
	BlueBlackBtn,
	BlueBtnWrap,
	BlueMainDiv,
	BlueSubContainer,
	FadeOverlay,
	ModalContainer,
	WhiteCloseBtn,
} from '../../../modal/Common/Common.Styled'
import styled from 'styled-components'
import { editAdminDestination } from '../../../service/admin/Standard'
import useMutationQuery from '../../../hooks/useMutationQuery'
import { useState } from 'react'
import { useDaumPostcodePopup } from 'react-daum-postcode'
import moment from 'moment'
import useAlert from '../../../store/Alert/useAlert'

const DestinationModifyModal = ({ data, modalClose }) => {
	const { simpleConfirm } = useAlert()
	const open = useDaumPostcodePopup(`//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js`)
	const { mutate: updateDestination } = useMutationQuery('getAdminDestination', editAdminDestination)

	const [updateData, setUpdateData] = useState({ address: null, note: null })

	// 목적지 주소 핸들러
	function onAddressHandler(data) {
		const { sido, sigungu, bname, bname1, bname2 } = data
		const destination = `${sido} ${sigungu} ${bname1 && bname1 + ' '}${bname ?? bname2}`
		setUpdateData((p) => ({ ...p, address: destination }))
	}

	// 비고 핸들러
	const noteHandler = (e) => {
		const value = e.target.value
		setUpdateData((p) => ({ ...p, note: value }))
	}

	// 수정
	const onSubmit = async () => {
		simpleConfirm('수정하시겠습니까?', () => {
			updateDestination(updateData)
		})
	}

	const handleClick = () => {
		open({ onComplete: onAddressHandler })
	}

	return (
		<>
			<FadeOverlay />
			<ModalContainer style={{ zIndex: '9999' }} width={1400}>
				<BlueBarHeader>
					<div>목적지 수정</div>
					<div>
						<WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
					</div>
				</BlueBarHeader>
				<BlueSubContainer>
					<BlueMainDiv style={{ margin: '0px auto', borderTop: 'none', height: '200px', padding: '0px' }}>
						<Table>
							<thead>
								<tr>
									<Th>목적지 찾기</Th>
									<Th>목적지 코드</Th>
									<Th>목적지 명</Th>
									<Th>작성자</Th>
									<Th>작성일</Th>
									<Th>수정자</Th>
									<Th>수정일</Th>
									<Th>비고</Th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<Td>
										<SearchBtn onClick={handleClick}>찾기</SearchBtn>
									</Td>
									<Td>{updateData.address ? '-' : data.code}</Td>
									<Td width={300}>{updateData.address ?? data.name}</Td>
									<Td>{data.createMember}</Td>
									<Td>{moment(data.createDate).format('YYYY-MM-DD')}</Td>
									<Td>{data.updateMember}</Td>
									<Td>{moment(data.updateDate).format('YYYY-MM-DD')}</Td>
									<Td width={300}>
										<Input value={updateData.note ?? data.note} onChange={noteHandler} />
									</Td>
								</tr>
							</tbody>
						</Table>
					</BlueMainDiv>
					<BlueBtnWrap>
						<BlueBlackBtn onClick={onSubmit}>저장</BlueBlackBtn>
					</BlueBtnWrap>
				</BlueSubContainer>
			</ModalContainer>
		</>
	)
}

const Table = styled.table`
	border-collapse: collapse;
	width: 100%;
	overflow-x: scroll;
	margin-top: 20px;
	font-size: 18px;

	thead {
		background-color: #dbe2f0;
		border: 1px solid #ddd;
	}
`

const Th = styled.th`
	border: 1px solid #c8c8c8;
	padding: 8px;
	text-align: center;
	font-weight: 100;
	font-size: 18px;
`

const Td = styled.td`
	border: 1px solid #ddd;
	text-align: center;
	font-weight: 100;
	width: ${(props) => props.width ?? 140}px;
	height: 35px;
	padding: 3px;
	font-size: 18px;
`

const SearchBtn = styled.div`
	width: 100%;
	height: 28px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid #4ca9ff;
	color: #4c83d6;
	cursor: pointer;
`

const Input = styled.input`
	width: 100%;
	height: 28px;
	border: 1px solid #c8c8c8;
	padding: 4px;
`

export default DestinationModifyModal
