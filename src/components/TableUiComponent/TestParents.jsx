import React, { useEffect, useState } from 'react'
import TableUi from './TableUi'
import { columnDefs } from './etcVariable'

const CustomPagination = ({ currentPage, totalPage, onPageChange }) => {
  const pageNumbers = []
  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i)
  }

  return (
    <div style={{ gap: '8px', display: 'flex' }}>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          disabled={currentPage === number}
          style={{
            fontSize: '15px',
            color: currentPage === number ? 'dodgerBlue' : 'grey',
            backgroundColor: 'transparent',
          }}
        >
          {number}
        </button>
      ))}
    </div>
  )
}
const TestParents = () => {
  const [rowData, setRowData] = useState([])
  const [gridApi, setGridApi] = useState(null)
  const [gridColumnApi, setGridColumnApi] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/notice?type=공지사항&pageNum=1&pageSize=30`)
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

  // 여기서 TableUi 컴포넌트에 필요한 props 정의
  const onGridReady = (params) => {
    setGridApi(params.api)
    setGridColumnApi(params.columnApi)
    params.api.sizeColumnsToFit()
  }

  const gridOptions = {
    getRowStyle: (params) => {
      if (params.node.rowPinned) {
        return { 'font-weight': 'bold' }
      }
    },
    pagination: true,
    paginationPageSize: 2,
    headerHeight: 30,
    rowHeight: 30,
  }
  const [currentPage, setCurrentPage] = useState(1)
  const totalPage = Math.ceil(rowData.length / gridOptions.paginationPageSize)

  const onPageChange = (pageNumber) => {
    gridApi.paginationGoToPage(pageNumber - 1)
    setCurrentPage(pageNumber)
  }

  const onCellClicked = async (params) => {
    if (params.colDef.field === 'title') {
      window.location.href = `/operate/notice/view/${params.data.no}`
    }
  }

  return (
    <>
      <TableUi
        columnDefs={columnDefs}
        rowData={rowData}
        onGridReady={onGridReady}
        onCellClicked={onCellClicked}
        gridOptions={gridOptions}
      />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CustomPagination currentPage={currentPage} totalPage={totalPage} onPageChange={onPageChange} />
      </div>
    </>
  )
}

export default TestParents
