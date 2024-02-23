import { BlueMainDiv } from '../../../modal/Common/Common.Styled'
import styled from 'styled-components'
import moment from 'moment/moment'
import { RadioSearchButton } from '../../../components/Search'

const DestinationSinglePost = ({ data, setData }) => {
	const changeHandler = (name, value) => {
		setData((p) => ({ ...p, [name]: value }))
	}
	return (
		<BlueMainDiv style={{ margin: '0px auto', borderTop: 0, padding: '0px' }}>
			<Table>
				<thead>
					<tr>
						<Th>특별목적지 여부</Th>
						<Th>목적지 명</Th>
						<Th>비고</Th>
						<Th>등록일자</Th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<Td width={5}>
							<RadioSearchButton
								options={[
									{ label: 'Y', value: true },
									{ label: 'N', value: false },
								]}
								value={data?.isSpecialAddress}
								onChange={(value) => changeHandler('isSpecialAddress', value)}
							/>
						</Td>
						<Td width={30}>
							<Input value={data?.name} onChange={(e) => changeHandler('name', e.target.value)} />
						</Td>
						<Td width={20}>
							<Input value={data?.note} onChange={(e) => changeHandler('note', e.target.value)} />
						</Td>
						<Td width={20}>{moment(new Date()).format('YYYY-MM-DD')}</Td>
					</tr>
				</tbody>
			</Table>
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

export default DestinationSinglePost
