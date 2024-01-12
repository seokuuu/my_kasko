import React, { useEffect, useState } from 'react'
import ManyTable from './ManyTable'
import { columnDefs } from './etcVariable'
import { CheckBoxDefault } from '../storeCheckbox'

const TestManyTable = () => {
  const [rowData, setRowData] = useState([{}])
  const [gridApi, setGridApi] = useState(null)
  const [gridColumnApi, setGridColumnApi] = useState(null)

  /**
   * @description : ManyTable 컴포넌트에 필요한 props 정의
   */
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
  }

  return (
    <>
      <ManyTable
        columnDefs={columnDefs}
        rowData={rowData}
        onGridReady={onGridReady}
        onCellClicked={onCellClicked}
        gridOptions={gridOptions}
      />
    </>
  )
}

export default TestManyTable
