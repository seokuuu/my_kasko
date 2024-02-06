import React, { useEffect, useState } from 'react'
import { Input, Table, Td, Th } from '../../Table/TableModal'
import { CustomSelect } from '../../../common/Option/Main'
import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import { AuctionUnitPricePostDropOptions2 } from '../../../constants/admin/Auction'
import moment from 'moment'
import styled from 'styled-components'
import { BlueMainDiv } from '../../Common/Common.Styled'

const SingleRegiUploader = ({ setFinal }) => {
	const date = moment().format('YYYY-MM-DD')
	const [insertList, setInsertList] = useState([
		{
			id: 1,
			spart: '', // 제품군 string
			preferThickness: '', // 정척 여부 string
			failCount: null, // 유찰 횟수 int
			grade: '', // 젶제품 등급 string
			effectDate: date, // 적용 일자 string
			effectPrice: null, // 적용 단가 int
		},
	])

	useEffect(() => {
		const newList = insertList.map(({ id, ...rest }) => rest)
		setFinal(newList)
	}, [insertList])

	const handleAddRow = () => {
		if (insertList.length < 4) {
			const newId = insertList.length + 1
			const newEmptyRow = {
				id: newId,
				spart: '',
				preferThickness: '',
				failCount: null,
				grade: '',
				effectDate: date,
				effectPrice: null,
			}
			setInsertList([...insertList, newEmptyRow])
		}
	}

	const handleInputChange = (id, key, value) => {
		const newList = insertList.map((item) => {
			if (key === 'grade') {
				value = value.toString()
			}
			return item.id === id ? { ...item, [key]: value } : item
		})
		setInsertList(newList)
	}

	const { spartList, gradeList } = useGlobalProductSearchFieldData()

	const dropdownProps = [
		{ options: spartList, defaultValue: spartList[0] },
		{ options: AuctionUnitPricePostDropOptions2, defaultValue: AuctionUnitPricePostDropOptions2[0] },
		{ options: gradeList, defaultValue: gradeList[0] },
	]

	return (
		<BlueMainDiv style={{ margin: '0px auto', borderTop: 'none', maxHeight: '360px' }}>
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
					{insertList.map((rowData) => (
						<tr key={rowData.id}>
							<Td>
								<CustomSelect
									options={dropdownProps[0]?.options}
									defaultValue={dropdownProps[0]?.defaultValue}
									// value={rowData.spart}

									onChange={(e) => handleInputChange(rowData.id, 'spart', e.value)}
								/>
							</Td>
							<Td>
								<CustomSelect
									options={dropdownProps[1]?.options}
									defaultValue={dropdownProps[1]?.defaultValue}
									// value={rowData.spart}

									onChange={(e) => handleInputChange(rowData.id, 'preferThickness', e.value)}
								/>
							</Td>
							<Td>
								<Input
									type="text"
									value={rowData.failCount}
									onChange={(e) => handleInputChange(rowData.id, 'failCount', parseInt(e.target.value))}
								/>
							</Td>
							<Td>
								<CustomSelect
									options={dropdownProps[2]?.options}
									defaultValue={dropdownProps[2]?.defaultValue}
									// value={rowData.spart}
									onChange={(e) => handleInputChange(rowData.id, 'grade', e.value)}
								/>
							</Td>
							<Td>
								<div>{date}</div>
							</Td>
							<Td>
								<Input
									type="text"
									value={rowData.effectPrice}
									onChange={(e) => handleInputChange(rowData.id, 'effectPrice', parseInt(e.target.value))}
								/>
							</Td>
						</tr>
					))}
				</tbody>
			</Table>
			<AddBtn>
				<img src="/img/circle_add.png" onClick={handleAddRow} alt="add row" />
			</AddBtn>
		</BlueMainDiv>
	)
}

export default SingleRegiUploader

const AddBtn = styled.div`
	display: flex;
	width: 100%;

	img {
		margin-top: 20px;
		margin-left: auto;
		margin-right: auto;
		cursor: pointer;
	}
`
