import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import './TableUi.css'
import { TableContianer } from '../../modal/External/ExternalFilter'
import { BMDTitle } from '../../modal/Multi/CustomerFind'
import { BlackBtn } from '../../common/Button/Button'

/**
 * @see :TestParents.jsx참조
 * @description
 * 1. 헤더, 셀(넓이 포함) Props로 전달 받아야함(columnDefs)
 * 2. 셀을 클릭할 때의 동작 Props로 전달(onCellClicked)
 */
const TableUi = ({
	buttonClick,
	columnDefs,
	rowData,
	onGridReady,
	onCellClicked,
	gridOptions,
	height = 400,
	width = '100%',
	checkBoxHandler,
}) => {
	const defaultColDef = {
		resizable: true,
		cellStyle: { textAlign: 'center' },
	}
	return (
		<>
			<div className="ag-theme-alpine" style={{ height, width }}>
				<TableContianer>
					<AgGridReact
						onGridReady={onGridReady}
						columnDefs={columnDefs}
						rowData={rowData}
						defaultColDef={defaultColDef}
						gridOptions={gridOptions}
						onCellClicked={onCellClicked}
					/>
					<div style={{ display: 'flex', justifyContent: 'center', marginTop:'5px' }}>
						<BlackBtn fontSize={17} width={10} height={35} onClick={buttonClick}>
							저장
						</BlackBtn>
					</div>
				</TableContianer>
			</div>
		</>
	)
}

export default TableUi
