import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useAtom } from 'jotai'
import { requestSingleModify, singleModifyObj } from '../../store/Layout/Layout'
export default function InputCellRenderer({ data, uidFieldName, valueName, type }) {
	// const [request, setRequest] = useAtom(requestSingleModify)
	const [request, setRequest] = useAtom(singleModifyObj)
	const handleChange = (e) => {
		console.log('hi', valueName, e.target.value)
		setRequest((p) => ({ ...p, [valueName]: e.target.value }))
		console.log('DATA', request)
		console.log('DATA', [uidFieldName])
	}

	return (
		<>
			{type === 'select' ? (
				<Select>{request[valueName]}</Select>
			) : (
				<Input name={valueName} value={request[valueName]} onChange={handleChange} />
			)}
		</>
	)
}

const Input = styled.input`
	text-align: center;
	text-overflow: ellipsis;
	overflow: hidden;
	width: 90px;
	height: 36px;
	z-index: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: auto;
	border: 1px solid;
`
const Select = styled.div`
	width: 100px;
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	padding: 0 4px;
	gap: 8px;
	span {
		text-align: center;
		margin: 0 auto;
		width: 17px;
		height: auto;
		font-size: 35px;
	}
`
