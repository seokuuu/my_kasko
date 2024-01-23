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

  /**
   * @description :데이터 가져오는 부분
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/notice?type=datasheet&pageNum=1&pageSize=30`)
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
    paginationPageSize: 1,
  }
  // 만약 선택된 행이 없으면 아무것도 렌더링하지 않습니다.
  if (!selectedRows.length) {
    return null
  }
  return (
    <>
      <p>이 부분만 하면 나옴</p>
      <TableUi
        columnDefs={columnDefs}
        rowData={rowData}
        onGridReady={onGridReady}
        onCellClicked={onCellClicked}
        gridOptions={gridOptions}
      />
    </>
  )
}

export default SelectedRowsTable
