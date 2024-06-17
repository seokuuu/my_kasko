import React from 'react'
import { ExcelBtn } from '../../common/Button/Button'
import * as XLSX from 'xlsx'
import useAlert from '../../store/Alert/useAlert'

// prettier-ignore
const numberFormatList = [
	'제품 등급', '등급', '중량', '제품 중량','수량',
	'폭', '길이', '두께', 'TS', 'YP', 'C%', 'C', 'EL', 'Si', 'Mn', 'P', 'S',
	'매입가',
	'낙찰가',
	'응찰가',
	'제품 금액',
	'제품 낙찰 단가(원/톤)',
	'낙찰 총 단가(원/톤)',
	'제품 공급가(원/톤)',
	'제품 부가세',
	'제품 금액(VAT 포함)',
	'운반비(VAT 포함)',
	'입금 요청액',
	'할증 운임 단가',
	'매입 운반비', '매입 기본 운임단가', '매입 할증 운임단가', '매입 운반비 공급가(원/톤)', '매입 운송비 부가세',
	'매출 운반비', '매출 기본 운임단가', '매출 할증 운임단가', '매출 운송비 공급가', '매출 운송비 부가세',
	'카스코 낙찰가', '상시 판매가', '아울렛 가격',
	'총공급가', '총부가세', '합계',
	'적용 단가', '시작가', '경매 시작가', '적용전 단가', '시작가/판매가'
]

/**
 * 엑셀
 * @param getRow 엑셀 데이터
 * @param sheetName 엑셀 파일 이름
 */
const Excel = ({ getRow, sheetName = 'kasko' }) => {
	const { simpleAlert } = useAlert()

	const exportToXLSX = () => {
		// 숫자 처리
		const jsonData = getRow.map((item) => {
			const keys = Object.keys(item)
			const newItem = item
			for (let key of keys) {
				if (numberFormatList.includes(key)) {
					newItem[key] = Number(item[key])
				} else {
					newItem[key] = item[key]
				}
			}
			return newItem
		})

		if (!jsonData || jsonData?.length === 0) {
			return simpleAlert('다운로드 받을 데이터가 존재하지 않습니다.')
		}

		const keys = Object.keys(jsonData[0])
		const data = [keys].concat(jsonData.map((item) => keys.map((key) => item[key]?.value ?? item[key])))

		const ws_name = sheetName
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

		const fileName = `${sheetName}_${currentDate}.xlsx`

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
