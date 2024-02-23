import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { BlueMainDiv } from '../../../modal/Common/Common.Styled'
import { MainSelect } from '../../../common/Option/Main'
import useReactQuery from '../../../hooks/useReactQuery'
import { getSpartList, getStorageList } from '../../../api/transPortDrop'
import { WhiteSkyBtn } from '../../../common/Button/Button'
import DateGrid from '../../../components/DateGrid/DateGrid'
import DestinationFind from '../../../modal/Multi/DestinationFind'
import { useAtom } from 'jotai/index'
import { invenDestination } from '../../../store/Layout/Layout'

export default function TransportSinglePost({ data, setData }) {
	const { data: storageList } = useReactQuery('', 'getStorageList', getStorageList)
	const { data: spartList } = useReactQuery('', 'getSPartList', getSpartList)

	const [destinationPopUp, setDestinationPopUp] = useAtom(invenDestination)

	const modalOpen = () => setDestinationPopUp(true)

	const changeHandler = (name, value) => {
		setData((p) => ({ ...p, [name]: value }))
	}

	const handleFindButtonOnClick = (result) => {
		if (!result && !Object.hasOwn(result ?? {}, 'code') && !Object.hasOwn(result ?? {}, 'name')) {
			return
		}
		changeHandler('destinationName', result.name)
		changeHandler('destinationCode', result.code)
	}

	return (
		<BlueMainDiv style={{ margin: '0px auto', borderTop: 0, padding: '0px' }}>
			<Table>
				<thead>
					<tr>
						<Th>출발지</Th>
						<Th>목적지 찾기</Th>
						<Th>목적지 코드</Th>
						<Th>목적지 명</Th>
						<Th>제품구분</Th>
						<Th>단가 적용일</Th>
						<Th>적용 단가</Th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<Td width={5}>
							<MainSelect
								options={storageList}
								defaultValue={storageList[0]}
								value={data.storage}
								name="storage"
								onChange={(e) => changeHandler('storage', e)}
							/>
						</Td>
						<Td width={15}>
							<WhiteSkyBtn onClick={modalOpen}>찾기</WhiteSkyBtn>
						</Td>
						<Td width={15}>{data?.destinationCode}</Td>
						<Td width={20}>{data?.destinationName}</Td>
						<Td width={5}>
							<MainSelect
								options={spartList}
								defaultValue={spartList[0]}
								value={data.spart}
								name="spart"
								onChange={(e) => changeHandler('spart', e)}
							/>
						</Td>
						<Td width={15}>
							<DateGrid
								width={145}
								startDate={data.effectDate}
								setStartDate={(value) => changeHandler('effectDate', moment(value).format('YYYY-MM-DD'))}
							/>
						</Td>
						<Td width={20}>
							<Input
								type="number"
								value={data?.effectCost}
								onChange={(e) => changeHandler('effectCost', e.target.value)}
							/>
						</Td>
					</tr>
				</tbody>
			</Table>
			{destinationPopUp && (
				<DestinationFind handleButtonOnClick={handleFindButtonOnClick} setSwitch={setDestinationPopUp} />
			)}
		</BlueMainDiv>
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
	width: ${(props) => props.width ?? 100}%;
	height: 35px;
	padding: 3px;
	font-size: 18px;
`

const Input = styled.input`
	width: 100%;
	height: 28px;
	border: 1px solid #c8c8c8;
	padding: 4px;
`
