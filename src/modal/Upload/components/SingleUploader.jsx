import moment from 'moment'
import React from 'react'
import { CustomSelect } from '../../../common/Option/Main'
import { BlueMainDiv } from '../../Common/Common.Styled'
import { Input, Table, Td, Th } from '../../Table/TableModal'

/**
 * @description
 * 단일 등록 업로드입니다.
 */
const SingleUploader = ({ modalInTable, convertKey, onEditHandler, dropdownProps }) => {
	// 오늘 날짜(단일 등록 적용일자에 사용됩니다.)
	const date = moment().format('YYYY-MM-DD')
	return (
		<BlueMainDiv style={{ margin: '0px auto', borderTop: 'none', height: '200px' }}>
			<Table>
				<thead>
					<tr>
						{Object.keys(modalInTable)?.map((key) => (
							<Th key={key}>{key}</Th>
						))}
					</tr>
				</thead>
				<tbody>
					<tr>
						{Object.entries(modalInTable)?.map(([key, value], index) => (
							<Td key={index}>
								{console.log('key ==>', key)}
								{value === 'input' ? (
									value === '작성일' ? (
										<div>{date}</div>
									) : (
										<Input
											type="text"
											name={convertKey && convertKey[key]}
											onChange={(e) => {
												onEditHandler(e)
											}}
										/>
									)
								) : value === 'dropdown' ? (
									<CustomSelect
										options={dropdownProps[0]?.options}
										defaultValue={dropdownProps[0]?.defaultValue}
										onChange={(selectedValue) =>
											onEditHandler({ target: { name: 'spart', value: selectedValue.label } })
										}
									/>
								) : value === 'dropdown2' ? (
									<CustomSelect
										options={dropdownProps[1]?.options}
										defaultValue={dropdownProps[1]?.defaultValue}
										onChange={(selectedValue) =>
											onEditHandler({ target: { name: 'preferThickness', value: selectedValue.label } })
										}
									/>
								) : value === 'dropdown3' ? (
									<CustomSelect
										options={dropdownProps[2].options}
										defaultValue={dropdownProps[2].defaultValue}
										onChange={(selectedValue) =>
											onEditHandler({ target: { name: 'grade', value: selectedValue.value } })
										}
									/>
								) : key === '적용일자' ? (
									<>{date}</>
								) : (
									''
								)}
							</Td>
						))}
					</tr>
				</tbody>
			</Table>
		</BlueMainDiv>
	)
}

export default SingleUploader
