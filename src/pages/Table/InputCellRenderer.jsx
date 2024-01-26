import React, { useCallback, useState, useMemo, useEffect } from 'react'
import styled from 'styled-components'
import { useAtom } from 'jotai'
import { requestSingleModify, singleModifyObj } from '../../store/Layout/Layout'

const selectBox = {
	maker: [
		{ label: '현대제철', value: '현대제철' },
		{ label: '동은스틸', value: '동은스틸' },
	],
	supplier: [
		{ label: '현대제철', value: '현대제철' },
		{ label: '동은스틸', value: '동은스틸' },
	],
	stockStatus: [
		{ label: '자사재고', value: '자사재고' },
		{ label: '타사재고', value: '타사재고' },
	],
	saleCategory: [
		{ label: '판매재', value: '판매재' },
		{ label: '판매 제외재', value: '판매 제외재' },
		{ label: '판매 완료재', value: '판매 완료재' },
	],
}

export default function InputCellRenderer({ data, uidFieldName, valueName, type }) {
	const [request, setRequest] = useAtom(requestSingleModify)
	const [values, setValues] = useState(request)

	const datas = useMemo(() => {
		setRequest(values)
		return values
	}, [values])
	const handlerChange = (e) => {
		const updatedValue = e.target.value
		e.stopPropagation()

		setValues((p) => ({ ...p, [valueName]: updatedValue }))
	}
	const keyDownChange = (e) => {
		if (e.nativeEvent.isComposing) {
			e.stopPropagation()
		}
	}

	return (
		<>
			{type === 'select' ? (
				<Select defaultValue={values[valueName]} onChange={handlerChange}>
					{valueName === 'stockStatus'
						? selectBox.stockStatus.map((item, idx) => {
								return (
									<option key={idx} value={item.value}>
										{item.label}
									</option>
								)
						  })
						: valueName === 'saleCategory'
						? selectBox.saleCategory.map((item, idx) => {
								return (
									<option key={idx} value={item.value}>
										{item.label}
									</option>
								)
						  })
						: valueName === 'supplier'
						? selectBox.supplier.map((item, idx) => {
								return (
									<option key={idx} value={item.value}>
										{item.label}
									</option>
								)
						  })
						: valueName === 'maker'
						? selectBox.maker.map((item, idx) => {
								return (
									<option key={idx} value={item.value}>
										{item.label}
									</option>
								)
						  })
						: null}
				</Select>
			) : (
				<>
					<Input
						type="text"
						autoComplete="off"
						readOnly={uidFieldName === '제품 번호' ? true : false}
						name={valueName}
						value={datas[valueName]}
						onChange={handlerChange}
						onKeyDown={keyDownChange}
					/>
				</>
			)}
		</>
	)
}

const Input = styled.input`
	text-align: center;
	text-overflow: ellipsis;
	overflow: hidden;
	width: 90%;
	height: 36px;
	z-index: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 1px auto;
	padding: 4px 0;
	border: 1px solid #eaeaea;
	border-radius: 4px;
`
const Select = styled.select`
	width: 99%;
	height: 36px;
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
