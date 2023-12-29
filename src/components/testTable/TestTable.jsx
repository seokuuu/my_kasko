import { useEffect, useState } from 'react'
import TableUi from '../TableUiComponent/TableUi'
import { columnDefs } from './etcVariable'

/**
 * @Title 테이블컴포넌트 테스트
 */

const TestTable = () => {
  const [rowData, setRowData] = useState([])
  const [gridApi, setGridApi] = useState(null)
  const [gridColumnApi, setGridColumnApi] = useState(null)
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
  /**
   * @description :TableUi 컴포넌트에 필요한 props 정의
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
    <div>
      <TableUi
        columnDefs={columnDefs}
        rowData={rowData}
        onGridReady={onGridReady}
        onCellClicked={onCellClicked}
        gridOptions={gridOptions}
      />
    </div>
  )
}

export default TestTable
