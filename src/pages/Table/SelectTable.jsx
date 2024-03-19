import React from 'react'
import { client } from '../../api'
import TableUi from '../../components/TableUiComponent/TableUi'
import { columnDefs } from '../../components/TableUiComponent/etcVariable'
import useAlert from '../../store/Alert/useAlert'


const SelectedRowsTable = ({ selectedRows, orderId }) => {
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
		if (!selectedRows || selectedRows.length === 0) return {};

		const firstRow = selectedRows[0];
		return {
			orderUid: orderId,
			changeProductUid: firstRow['제품 고유 번호'],
		};
	};

	const handleProno = () => {
		const requestData = makeRequest(selectedRows)

		simpleConfirm('이 작업을 수행하시겠습니까?', () => {
			client
				.post(`/admin/order/product`, requestData)
				.then((response) => {
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
