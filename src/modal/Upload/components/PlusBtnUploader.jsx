import moment from 'moment'
import React, { useCallback, useState } from 'react'
import { CustomSelect } from '../../../common/Option/Main'
import DateGrid from '../../../components/DateGrid/DateGrid'
import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import { BlueMainDiv } from '../../Common/Common.Styled'
import { Input, Table, Td, Th } from '../../Table/TableModal'
import { AuctionUnitPricePostDropOptions, AuctionUnitPricePostDropOptions2 } from '../../../constants/admin/Auction'

/**
 * @description
 * 단일 등록 업로드입니다.
 */
const PlusBtnUploader = ({ convertKey, startDate, setStartDate }) => {
	const date = moment().format('YYYY-MM-DD')
	const nowDate = new Date()
	const nowRealDate = moment(nowDate).format('YYYY-MM-DD')
	const editInit = {
		failCount: '',
		effectPrice: '',
		effectDate: nowRealDate,
	}

	const [editInput, setEditInput] = useState(editInit)

	const AuctionUnitPricePost = {
		제품군: 'dropdown',
		정척여부: 'dropdown2',
		유찰횟수: 'input',
		제품등급: 'dropdown3',
		적용일자: 'auto',
		'적용 단가': 'input',
	}

	// 단가 등록 셀렉트 리스트
	const { spartList, gradeList } = useGlobalProductSearchFieldData()
	const dropdownProps = [
		{ options: spartList, defaultValue: spartList[0] },
		{ options: AuctionUnitPricePostDropOptions2, defaultValue: AuctionUnitPricePostDropOptions2[0] },
		{ options: gradeList, defaultValue: gradeList[0] },
	]

	// handler
	const onEditHandler = useCallback((e) => {
		console.log('Edit input event:', e)
		const { name, value } = e.target

		// failCount와 effectPrice에 대해서만 정수로 변환
		const intValue = ['failCount', 'effectPrice'].includes(name) ? parseInt(value, 10) : value

		setEditInput((prevEditInput) => ({
			...prevEditInput,
			[name]: ['failCount', 'effectPrice'].includes(name) ? (isNaN(intValue) ? '' : intValue) : value,
		}))
	}, [])

	return (
		<BlueMainDiv style={{ margin: '0px auto', borderTop: 'none', height: '200px' }}>
			<Table>
				<thead>
					<tr>
						<Th>제품군</Th>
						<Th>정척여부</Th>
						<Th>유찰횟수</Th>
						<Th>제품등급</Th>
						<Th>적용일자</Th>
						<Th>적용 단가</Th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<Td>
							<CustomSelect
								options={dropdownProps[0]?.options}
								defaultValue={dropdownProps[0]?.defaultValue}
								onChange={(selectedValue) => onEditHandler({ target: { name: 'spart', value: selectedValue.label } })}
							/>
						</Td>
						<Td>
							<Input
								type="text"
								name="note"
								onChange={(e) => {
									onEditHandler(e)
								}}
							/>
						</Td>
						<Td>
							<CustomSelect
								options={dropdownProps[1]?.options}
								defaultValue={dropdownProps[1]?.defaultValue}
								onChange={(selectedValue) =>
									onEditHandler({ target: { name: 'preferThickness', value: selectedValue.label } })
								}
							/>
						</Td>
						<Td>
							<div>
								<>{date}</>
							</div>
						</Td>
						<Td>
							<CustomSelect
								options={dropdownProps[2].options}
								defaultValue={dropdownProps[2].defaultValue}
								onChange={(selectedValue) => onEditHandler({ target: { name: 'grade', value: selectedValue.value } })}
							/>
						</Td>
						<Td>
							<Input
								type="text"
								name="note"
								onChange={(e) => {
									onEditHandler(e)
								}}
							/>
						</Td>
					</tr>
				</tbody>
			</Table>
		</BlueMainDiv>
	)
}

export default PlusBtnUploader
