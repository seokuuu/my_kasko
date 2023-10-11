import * as XLSX from 'xlsx'

const readExcelFile = (file) => {
  const reader = new FileReader()

  return new Promise((resolve, reject) => {
    reader.onload = (e) => {
      try {
        const data = e.target.result
        const workbook = XLSX.read(data, { type: 'binary' })

        // 시트 이름 가져오기
        const sheetName = workbook.SheetNames[0]

        // 시트 데이터 가져오기
        const sheet = workbook.Sheets[sheetName]

        // 시트 데이터를 JSON 배열로 변환
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 })

        // 헤더와 데이터를 따로 추출
        const [header, ...rows] = jsonData

        // 데이터를 헤더를 키로 사용하는 객체로 변환
        const formattedData = rows.map((row) => {
          const obj = {}
          header.forEach((key, index) => {
            obj[key] = row[index]
          })
          return obj
        })

        resolve(formattedData)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = (error) => {
      reject(error)
    }

    // 파일을 이진 문자열로 읽기
    reader.readAsBinaryString(file)
  })
}

export { readExcelFile }
