// import React, { useCallback, useState, useMemo, useRef, useEffect } from 'react'
// import styled from 'styled-components'
// import { useAtom } from 'jotai'
// import { requestSingleModify, singleModifyObj } from '../../store/Layout/Layout'

// const selectBox = {
// 	maker: [
// 		{ label: '현대제철', value: '현대제철' },
// 		{ label: '동은스틸', value: '동은스틸' },
// 	],
// 	supplier: [
// 		{ label: '현대제철', value: '현대제철' },
// 		{ label: '동은스틸', value: '동은스틸' },
// 	],
// 	stockStatus: [
// 		{ label: '자사재고', value: '자사재고' },
// 		{ label: '타사재고', value: '타사재고' },
// 	],
// 	saleCategory: [
// 		{ label: '판매재', value: '판매재' },
// 		{ label: '판매 제외재', value: '판매 제외재' },
// 		{ label: '판매 완료재', value: '판매 완료재' },
// 	],
// }

// export default function InputCellRenderer({ data, uidFieldName, valueName, type }) {
// 	const [request, setRequest] = useAtom(requestSingleModify)
// 	const [values, setValues] = useState(request)
// 	const inputRef = useRef(null)
// 	const datas = useMemo(() => {
// 		setRequest(values)
// 		return values
// 	}, [values])
// 	const handlerChange = (e) => {
// 		const updatedValue = e.target.value
// 		setValues((p) => ({ ...p, [valueName]: updatedValue }))
// 	}
// 	const keyDownChange = (e) => {
// 		if (e.isComposing || e.keyCode === 229) return
// 		if (e.key === 'Enter') {
// 			// e.preventDefault()
// 			const nextInput = e.target.parentNode.nextSibling // 현재 엘리먼트의 다음 형제 엘리먼트를 찾음

// 			if (nextInput && nextInput.tagName === 'DIV') {
// 				console.log(nextInput.childNodes[0])
// 				nextInput.childNodes[0].focus()
// 				if (nextInput.childNodes[0].tagName === 'INPUT') {
// 					nextInput.childNodes[0].focus()
// 				}
// 				// 다음 형제 엘리먼트가 INPUT이면 포커스를 이동
// 			}
// 		}
// 		if (e.key === 'Tab') {
// 			if (e.isComposing || e.keyCode === 229) return
// 			e.preventDefault()
// 			e.target.blur()
// 		}
// 	}

// 	return (
// 		<>
// 			{type === 'select' ? (
// 				<Select defaultValue={values[valueName]} onChange={handlerChange}>
// 					{valueName === 'stockStatus'
// 						? selectBox.stockStatus.map((item, idx) => {
// 								return (
// 									<option key={idx} value={item.value}>
// 										{item.label}
// 									</option>
// 								)
// 						  })
// 						: valueName === 'saleCategory'
// 						? selectBox.saleCategory.map((item, idx) => {
// 								return (
// 									<option key={idx} value={item.value}>
// 										{item.label}
// 									</option>
// 								)
// 						  })
// 						: valueName === 'supplier'
// 						? selectBox.supplier.map((item, idx) => {
// 								return (
// 									<option key={idx} value={item.value}>
// 										{item.label}
// 									</option>
// 								)
// 						  })
// 						: valueName === 'maker'
// 						? selectBox.maker.map((item, idx) => {
// 								return (
// 									<option key={idx} value={item.value}>
// 										{item.label}
// 									</option>
// 								)
// 						  })
// 						: null}
// 				</Select>
// 			) : (
// 				<>
// 					<Input
// 						type="text"
// 						autoComplete="off"
// 						readOnly={uidFieldName === '제품 번호' ? true : false}
// 						name={valueName}
// 						value={datas[valueName]}
// 						onChange={handlerChange}
// 						onKeyDown={keyDownChange}
// 						onCompositionEnd={(e) => {
// 							setValues((p) => ({ ...p, [valueName]: e.target.value }))
// 						}}
// 					/>
// 				</>
// 			)}
// 		</>
// 	)
// }

// const Input = styled.input`
// 	text-align: center;
// 	text-overflow: ellipsis;
// 	overflow: hidden;
// 	width: 90%;
// 	height: 36px;
// 	z-index: 99999;
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;
// 	margin: 1px auto;
// 	padding: 4px 0;
// 	border: 1px solid #eaeaea;
// 	border-radius: 4px;
// `
// const Select = styled.select`
// 	width: 99%;
// 	height: 36px;
// 	display: flex;
// 	justify-content: space-between;
// 	flex-direction: row;
// 	padding: 0 4px;
// 	gap: 8px;
// 	span {
// 		text-align: center;
// 		margin: 0 auto;
// 		width: 17px;
// 		height: auto;
// 		font-size: 35px;
// 	}
// `

import { useAtom } from 'jotai'
import React from 'react'
import styled from 'styled-components'
import { requestSingleModify } from '../../store/Layout/Layout'
export default function InputCellRenderer({ data, uidFieldName, valueName, type }) {
	// const [request, setRequest] = useAtom(requestSingleModify)
	const [request, setRequest] = useAtom(requestSingleModify)
	const handleChange = (e) => {
		console.log('hi', valueName, e.target.value)
		setRequest((p) => ({ ...p, [valueName]: e.target.value }))
	}
	console.log('DATA', request)
	console.log('DATA', [uidFieldName])

	return (
		<>
			{type === 'select' ? (
				<Select>{data[uidFieldName]}</Select>
			) : (
				// <Input readOnly name={valueName} value={data[uidFieldName]} onChange={handleChange} />
				<Input as={'div'}>{data[uidFieldName]}</Input>
			)}
		</>
	)
}

const Input = styled.input`
	text-align: center;
	text-overflow: ellipsis;
	overflow: hidden;
	width: 100%;
	height: 36px;
	z-index: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: auto;
	/* border: 1px solid; */
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
