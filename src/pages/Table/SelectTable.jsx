import Table from './Table'
import { AdminOrderManageFieldsCols } from '../../constants/admin/AdminOrderDetail'
import React, { useEffect, useState } from 'react'
import { StockIncomingFields } from '../../constants/admin/StockIncoming'
import TableUi from '../../components/TableUiComponent/TableUi'
import { columnDefs } from '../../components/TableUiComponent/etcVariable'

const SelectedRowsTable = ({ selectedRows, columns }) => {
	const [rowData, setRowData] = useState([])
	const [gridApi, setGridApi] = useState(null)
	const [gridColumnApi, setGridColumnApi] = useState(null)

	const onGridReady = (params) => {
		setGridApi(params.api)
		setGridColumnApi(params.columnApi)
		params.api.sizeColumnsToFit()
	}
	const onCellClicked = async (params) => {
		if (params.colDef.field === 'title') {
			window.location.href = `/operate/notice/view/${params.data.no}`
		}
	}
	const gridOptions = {
		getRowStyle: (params) => {
			if (params.node.rowPinned) return { 'font-weight': 'bold' }
		},
		headerHeight: 30,
		rowHeight: 30,
		/** 페이징 처리위해 필요 */
		pagination: true,
	}
	// 만약 선택된 행이 없으면 아무것도 렌더링하지 않습니다.
	if (!selectedRows.length) {
		return null
	}
	const makeRequest = (selectedRows) => {
		if(!selectedRows) return [];
		return selectedRows.map((row) => ({
			orderUid: row['detailUid'],
			changeProductUid: row['uid'],
		}))
	}
	const handleProno =  () => {

	}
	return (
		<>
			<div style={{ marginTop: '30px' }}>
				<TableUi
					columnDefs={columnDefs}
					rowData={selectedRows}
					onGridReady={onGridReady}
					onCellClicked={onCellClicked}
					gridOptions={gridOptions}
					buttonClick={handleProno}
				/>
			</div>
		</>
	)
}

export default SelectedRowsTable
