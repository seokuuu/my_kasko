import React from 'react'
import { ExcelBtn } from '../../common/Button/Button'
import * as XLSX from 'xlsx'

const Excel = ({ getRow }) => {
  const exportToXLSX = () => {
    const jsonData = getRow

    const keys = Object.keys(jsonData[0])

    const data = [keys].concat(jsonData.map((item) => keys.map((key) => item[key])))

    const ws_name = 'SheetJS'
    const ws_data = data

    const ws = XLSX.utils.aoa_to_sheet(ws_data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, ws_name)

    XLSX.writeFile(wb, 'exported_data.xlsx')
  }

  return (
    <ExcelBtn onClick={exportToXLSX}>
      <div>
        <img src="/img/excel.png" alt="Excel Icon" />
      </div>
      엑셀 다운로드
    </ExcelBtn>
  )
}

export default Excel
