import React from 'react'
import { ExcelBtn } from '../../common/Button/Button'
import * as XLSX from 'xlsx'

const Excel = ({ getRow }) => {
  const exportToXLSX = () => {
    const jsonData = getRow

    console.log('jsonData', jsonData)

    const keys = Object.keys(jsonData[0])
    const data = [keys].concat(jsonData.map((item) => keys.map((key) => item[key])))

    const ws_name = 'SheetJS'
    const ws_data = data

    const ws = XLSX.utils.aoa_to_sheet(ws_data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, ws_name)

    const currentDate = new Date()
      .toLocaleDateString('ko-KR', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\./g, '_') // 날짜 구분자를 '_'로 변경
      .replace(/\s/g, '') // 공백 제거

    const fileName = `kasko_${currentDate}.xlsx`

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
