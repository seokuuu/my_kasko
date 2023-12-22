import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import './TableUi.css'
/**
 * @see :TestParents.jsx참조
 * @description
 * 1. 헤더, 셀(넓이 포함) Props로 전달 받아야함(columnDefs)
 * 2. 셀을 클릭할 때의 동작 Props로 전달(onCellClicked)
 */
const TableUi = ({ columnDefs, rowData, onGridReady, onCellClicked, gridOptions, height = 400, width = '100%' }) => {
  const defaultColDef = {
    resizable: true,
    cellStyle: { textAlign: 'center' },
  }
  return (
    <>
      <div className="ag-theme-alpine" style={{ height, width }}>
        <AgGridReact
          onGridReady={onGridReady}
          columnDefs={columnDefs}
          rowData={rowData}
          defaultColDef={defaultColDef}
          gridOptions={gridOptions}
          onCellClicked={onCellClicked}
        />
      </div>
    </>
  )
}

export default TableUi
