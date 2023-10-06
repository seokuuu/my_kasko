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

    const currentDate = new Date()
    const year = currentDate.getFullYear().toString().slice(2) // 연도의 끝 두 자리
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2) // 월을 두 자리로
    const day = ('0' + currentDate.getDate()).slice(-2) // 일을 두 자리로

    const fileName = `kasko_${year}_${month}_${day}.xlsx`

    XLSX.writeFile(wb, fileName)
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
