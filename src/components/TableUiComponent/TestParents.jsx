import React, { useEffect, useState } from 'react'
import TableUi from './TableUi'
import { columnDefs } from './etcVariable'

/** 페이지네이션 컴포넌트 */
const CustomPagination = ({ currentPage, totalPage, onPageChange }) => {
  const pageNumbers = []
  const pagesPerGroup = 5
  const currentGroup = Math.ceil(currentPage / pagesPerGroup)
  const startPage = (currentGroup - 1) * pagesPerGroup + 1
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPage)

  for (let i = startPage; i <= endPage; i++) {
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
            color: currentPage === number ? '#202020' : '#ACACAC',
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
    paginationPageSize: 1,
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

  /** 페이지네이션 이동버튼 */
  const goToNextPage = () => {
    const nextPage = Math.min(currentPage + 1, totalPage)
    onPageChange(nextPage)
  }
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = Math.min(currentPage - 1, totalPage)
      onPageChange(prevPage)
    }
  }
  const goToLastPage = () => {
    const lastPageInGroup = Math.ceil(currentPage / 5) * 5
    const adjustedLastPage = Math.min(lastPageInGroup, totalPage)
    onPageChange(adjustedLastPage)
  }
  const goToStartOfRange = () => {
    const startPageInGroup = Math.floor((currentPage - 1) / 5) * 5 + 1
    onPageChange(startPageInGroup)
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
        <button style={{ backgroundColor: 'transparent' }} onClick={goToStartOfRange}>
          <svg width="15" height="15" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M14 3h-2L7 8l5 5h2L9 8z" />
            <path fill="currentColor" d="M9 3H7L2 8l5 5h2L4 8z" />
          </svg>
        </button>
        <button style={{ backgroundColor: 'transparent' }} onClick={goToPreviousPage}>
          <svg width="15" height="15" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M12 13h-2L5 8l5-5h2L7 8z" />
          </svg>
        </button>
        <CustomPagination currentPage={currentPage} totalPage={totalPage} onPageChange={onPageChange} />
        <button style={{ backgroundColor: 'transparent' }} onClick={goToNextPage}>
          <svg width="15" height="15" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path fill="#000000" d="M4 13h2l5-5l-5-5H4l5 5z" />
          </svg>
        </button>
        <button style={{ backgroundColor: 'transparent' }} onClick={goToLastPage}>
          <svg width="15" height="15" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path fill="#000000" d="M2 13h2l5-5l-5-5H2l5 5z" />
            <path fill="#000000" d="M7 13h2l5-5l-5-5H7l5 5z" />
          </svg>
        </button>
      </div>
    </>
  )
}

export default TestParents
