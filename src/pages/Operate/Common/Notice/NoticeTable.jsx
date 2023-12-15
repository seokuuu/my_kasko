import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'

const NoticeTable = () => {
  const [gridApi, setGridApi] = useState(null)
  const [gridColumnApi, setGridColumnApi] = useState(null)

  const [rowData, setRowData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/notice?type=공지사항&pageNum=1&pageSize=5`)
        const data = await response.json()

        const transformedData = data.data.list.map((item) => ({
          no: item.uid,
          title: item.title,
          date: item.createDate,
          writer: item.name,
          views: item.count,
        }))

        setRowData(transformedData)
      } catch (error) {
        console.error('Error fetching data: ', error)
      }
    }

    fetchData()
  }, [])
  const onGridReady = (params) => {
    setGridApi(params.api)
    setGridColumnApi(params.columnApi)
    params.api.sizeColumnsToFit()
  }

  const columnDefs = [
    {
      headerName: '순번',
      field: 'no',
      headerClass: 'custom-header-style',
      cellStyle: { borderRight: '1px solid #c8c8c8' },
      flex: 1,
      minWidth: 74,
    },
    {
      headerName: '제목',
      field: 'title',
      headerClass: 'custom-header-style',
      cellStyle: { borderRight: '1px solid #c8c8c8' },
      flex: 8,
      minWidth: 859,
    },
    {
      headerName: '작성일자',
      field: 'date',
      headerClass: 'custom-header-style',
      cellStyle: { borderRight: '1px solid #c8c8c8' },
      flex: 2,
      minWidth: 160,
    },
    {
      headerName: '작성자',
      field: 'writer',
      headerClass: 'custom-header-style',
      cellStyle: { borderRight: '1px solid #c8c8c8' },
      flex: 2,
      minWidth: 160,
    },
    {
      headerName: '조회수',
      field: 'views',
      headerClass: 'custom-header-style',
      flex: 1,
      minWidth: 100,
    },
  ]

  const defaultColDef = {
    resizable: true,
    cellStyle: { textAlign: 'center' },
  }

  const gridOptions = {
    getRowStyle: (params) => {
      if (params.node.rowPinned) {
        return { 'font-weight': 'bold' }
      }
    },
    headerHeight: 30,
    rowHeight: 30,
  }

  const onCellClicked = async (params) => {
    if (params.colDef.field === 'title') {
      window.location.href = `/operate/notice/view/${params.data.no}`
    }
  }

  return (
    <>
      <style>
        {`
          .custom-header-style {
            background-color: #DBE2F0;
            text-align: center;
            border-right: 1px solid #c8c8c8; 
            box-sizing: border-box;
            justify-content: center;
          }
          .custom-header-style:last-child {
            border-right: none;
            box-sizing: border-box;
          }
          .ag-header-cell {
            justify-content: center !important;
          }
          
        `}
      </style>
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
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

export default NoticeTable
