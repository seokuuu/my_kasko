import React, { useEffect, useState } from 'react'
import TableUi from './TableUi'
import { columnDefs } from './etcVariable'
import PagingComp from '../paging/PagingComp'
/**
 * @see
 * :TableUi.jsx-테이블 컴포넌트
 * :PagingComp.jsx-페이징 컴포넌트
 */
const TestParents = () => {
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
    /** 페이징 처리위해 필요 */
    pagination: true,
    paginationPageSize: 1,
  }

  /**
   * @description :페이징 처리 useState
   */
  const [currentPage, setCurrentPage] = useState(1)
  const totalPage = Math.ceil(rowData.length / gridOptions.paginationPageSize)

  const onPageChange = (pageNumber) => {
    gridApi.paginationGoToPage(pageNumber - 1)
    setCurrentPage(pageNumber)
  }

  /**
   * @Func :페이징 이동버튼
   */
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
    let currentGroupLastPage = Math.ceil(currentPage / 5) * 5
    currentGroupLastPage = Math.min(currentGroupLastPage, totalPage)

    // 현재 페이지가 그룹의 마지막 페이지인 경우, 다음 그룹의 마지막 페이지로 이동
    let targetPage
    // 다음 페이지 그룹의 1번째 페이지로 이동
    if (currentPage === currentGroupLastPage) targetPage = Math.min(currentGroupLastPage + 1, totalPage)
    // 현재 그룹의 마지막 페이지로 이동
    else targetPage = currentGroupLastPage

    onPageChange(targetPage)
  }
  const goToStartOfRange = () => {
    let startPageInGroup = Math.floor((currentPage - 1) / 5) * 5 + 1

    // 현재 페이지가 그룹의 시작 페이지일 경우, 이전 그룹의 마지막 페이지로 이동
    if (currentPage === startPageInGroup && currentPage !== 1) startPageInGroup = Math.max(startPageInGroup - 1, 1)

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
      {/* 가운데 정렬을 위한 div태그 */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <PagingComp
          currentPage={currentPage}
          totalPage={totalPage}
          onPageChange={onPageChange}
          goToNextPage={goToNextPage}
          goToPreviousPage={goToPreviousPage}
          goToLastPage={goToLastPage}
          goToStartOfRange={goToStartOfRange}
        />
      </div>
    </>
  )
}

export default TestParents
