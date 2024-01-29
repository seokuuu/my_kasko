import Table from './Table'
import { AdminOrderManageFieldsCols } from '../../constants/admin/AdminOrderDetail'
import React, { useEffect, useState } from 'react'
import TableUi from '../../components/TableUiComponent/TableUi'
import { columnDefs } from '../../components/TableUiComponent/etcVariable'
import useAlert from '../../store/Alert/useAlert'
import axios from 'axios'

const API_PATH = process.env.REACT_APP_API_URL

const SelectedRowsTable = ({ selectedRows, orderId }) => {
	console.log('Selected OrderId: ',orderId)
	const { simpleConfirm, simpleAlert } = useAlert()
	// 만약 선택된 행이 없으면 아무것도 렌더링하지 않습니다.
	if (!selectedRows.length) {
		return null
	}

	const gridOptions = {
		getRowStyle: (params) => {
			if (params.node.rowPinned) return { 'font-weight': 'bold' }
		},
		headerHeight: 30,
		rowHeight: 30,
	}

	const makeRequest = (selectedRows) => {
		if (!selectedRows) return []
		return selectedRows.map((row) => ({
			orderUid: orderId,
			changeProductUid: row['제품 고유 번호'],
		}))
	}
	const handleProno = () => {
		const requestData = makeRequest(selectedRows)

		simpleConfirm('이 작업을 수행하시겠습니까?', () => {
			axios
				.post(`${API_PATH}/admin/order/product`, requestData)
				.then((response) => {
					console.log('작업 성공:', response.data)
				})
				.catch((error) => {
					console.error('작업 실패:', error)
				})
		})
	}
	return (
		<>
			<div style={{ marginTop: '30px' }}>
				<TableUi columnDefs={columnDefs} rowData={selectedRows} gridOptions={gridOptions} buttonClick={handleProno} />
			</div>
		</>
	)
}

export default SelectedRowsTable
