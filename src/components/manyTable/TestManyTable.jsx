import React, { useEffect, useState } from 'react'
import ManyTable from './ManyTable'
import { columnDefs } from './etcVariable'
import { CheckBoxDefault } from '../storeCheckbox'

const TestManyTable = () => {
  const [rowData, setRowData] = useState([{}])
  const [gridApi, setGridApi] = useState(null)
  const [gridColumnApi, setGridColumnApi] = useState(null)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/order?pageNum=1&pageSize=15`)
  //       const data = await response.json()
  //       const transformedData = data.data.list.map((item) => ({
  //         customerCode: item.customerCode,
  //         customerName: item.customerName,
  //         packageName: item.packageName,
  //         packageNumber: item.packageNumber,
  //         orderNumber: item.orderNumber,
  //         storageName: item.storageName,
  //         saleType: item.saleType,
  //         salePriceType: item.salePriceType,
  //         auctionNumber: item.auctionNumber,
  //         createDate: item.createDate,
  //         updateDate: item.updateDate
  //       }))
  //       setRowData(transformedData)
  //     } catch (error) {
  //       console.error('Error fetching data: ', error)
  //     }
  //   }

  //   fetchData()
  // }, [])
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
