import React from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

const Test9 = () => {
  const columnDefs = [
    { headerName: '이름', field: 'name' },
    { headerName: '나이', field: 'age' },
    {
      headerName: '버튼',
      cellRendererFramework: (params) => (
        <button onClick={() => alert(`버튼 클릭! 행 데이터: ${JSON.stringify(params.data)}`)}>클릭</button>
      ),
    },
  ]

  const rowData = [
    { name: 'John', age: 28 },
    { name: 'Jane', age: 35 },
    // 나머지 데이터...
  ]

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact columnDefs={columnDefs} rowData={rowData} domLayout="autoHeight" />
    </div>
  )
}

export default Test9
