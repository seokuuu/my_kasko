import React from 'react'
import * as XLSX from 'xlsx'

const TestExcel = ({ excelData }) => {
  const exportToXLSX = () => {
    const jsonData = [
      // Your JSON data goes here
      { name: 'John Doe', age: 25, city: 'New York' },
      { name: 'Jane Smith', age: 30, city: 'San Francisco' },
      // Add more data as needed
    ]

    const data = jsonData.map((item) => Object.values(item))
    const ws_name = 'SheetJS'

    const ws_data = [data]

    const ws = XLSX.utils.aoa_to_sheet(ws_data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, ws_name)

    XLSX.writeFile(wb, 'exported_data.xlsx')
  }

  return (
    <div>
      <button onClick={exportToXLSX}>Export to XLSX</button>
    </div>
  )
}

export default TestExcel
