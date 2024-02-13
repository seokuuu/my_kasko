import { WhiteSkyBtn } from '../../../common/Button/Button'
import React from 'react'
import { shipmentInvoiceAllListQuery } from '../../../api/shipment'
import { useAtomValue } from 'jotai'
import { selectedRowsAtom } from '../../../store/Layout/Layout'
import useAlert from '../../../store/Alert/useAlert'
import { add_element_field } from '../../../lib/tableHelpers'
import * as XLSX from 'xlsx'
import moment from 'moment'

// prettier-ignore
const excelField = {
	'창고': 'storageName',
	'주문번호': 'orderNumber',
	'고객사명': 'customerName',
	'목적지명': 'destinationName',
	'인도조건': '',
	'목적지 연락처(사무실)': 'customerDestinationPhone',
	'제품번호': 'productNumber',
	'등급': 'grade',
	'중량': 'weight',
	'두께': 'thickness',
	'폭': 'width',
	'길이': 'length',
	'규격약호': 'spec',
	'목적지 주소': 'customerDestinationAddress',
}

const ReceiptExcel = () => {
	const { simpleAlert } = useAlert()
	const selectedRows = useAtomValue(selectedRowsAtom)

	// 수취서 출력
	const getData = async (outUid) => {
		return await shipmentInvoiceAllListQuery(outUid)
	}

	/**
	 * 데이터 다운로드
	 */
	function downloadData(outNumber, headerData, footerData, jsonData) {
		if (!jsonData || jsonData?.length === 0) {
			throw new Error('다운로드 받을 데이터가 존재하지 않습니다.')
		}

		const sheetName = `'출고-${outNumber} 수취서`
		const keys = Object.keys(jsonData[0])
		const data = [keys].concat(jsonData.map((item) => keys.map((key) => item[key])))

		const newData = []
		for (const [key, value] of Object.entries(headerData)) {
			newData.push([...value, ...data, footerData])
		}

		const wb = XLSX.utils.book_new()
		const ws01 = XLSX.utils.aoa_to_sheet(newData[0], { cellStyles: true })
		const ws02 = XLSX.utils.aoa_to_sheet(newData[1], { cellStyles: true })
		const ws03 = XLSX.utils.aoa_to_sheet(newData[2], { cellStyles: true })
		const ws04 = XLSX.utils.aoa_to_sheet(newData[3], { cellStyles: true })

		const colsStyle = []
		for (let d of newData[0]) {
			colsStyle.push({ wpx: 100, alignment: { vertical: 'middle', horizontal: 'center', wrapText: true } })
		}
		ws01['!cols'] = colsStyle
		ws02['!cols'] = colsStyle
		ws03['!cols'] = colsStyle
		ws04['!cols'] = colsStyle

		XLSX.utils.book_append_sheet(wb, ws01, '물품수취서', true)
		XLSX.utils.book_append_sheet(wb, ws02, '거래명세서 (정문회수용)', true)
		XLSX.utils.book_append_sheet(wb, ws03, '거래명세서 (공급받는자용)', true)
		XLSX.utils.book_append_sheet(wb, ws04, '인수증 (회수용)', true)

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

	// 다운로드 클릭 핸들러
	async function handleClick(e) {
		e.preventDefault()

		if (!selectedRows || selectedRows?.length === 0) {
			return simpleAlert('출력할 제품을 선택해주세요.')
		}
		if (!selectedRows || selectedRows?.length > 1) {
			return simpleAlert('수취서 출력은 하나만 가능합니다.')
		}

		const selectItem = selectedRows[0]
		const outUid = selectItem['출고 고유번호']

		try {
			const rawData = await getData(outUid)
			// 엑셀 body 데이터
			const sortedData = add_element_field(rawData, excelField)
			const excelData = sortedData.map((item, index) => ({ 순번: index + 1, ...item }))

			const headerData = [
				['물품수취서'],
				['출고일자', moment(rawData[0].outDate).format('YYYY-MM-DD')],
				['차량번호', rawData[0].carNumber, '기사명', rawData[0].driverName, '연락처', rawData[0].driverPhone],
				[''],
			]

			const headerData02 = [
				['(주)카스코철강', '', '인수확인', moment(new Date()).format('YYYY-MM-DD'), '(인)'],
				['', '', '', '도착제품이 이상 없음을 확인합니다.'],
				[''],
				['거래명세서', '', '정문회수용'],
				['출고일자', moment(rawData[0].outDate).format('YYYY-MM-DD')],
				['차량번호', rawData[0].carNumber, '기사명', rawData[0].driverName, '연락처', rawData[0].driverPhone],
				[''],
			]

			const headerData03 = [
				['(주)카스코철강', '', '인수확인', moment(new Date()).format('YYYY-MM-DD'), '(인)'],
				['', '', '', '도착제품이 이상 없음을 확인합니다.'],
				[''],
				['거래명세서', '', '공급받는자용'],
				['출고일자', moment(rawData[0].outDate).format('YYYY-MM-DD')],
				['차량번호', rawData[0].carNumber],
				[''],
			]

			const headerData04 = [
				['(주)카스코철강', '', '인수확인', moment(new Date()).format('YYYY-MM-DD'), '(인)'],
				['', '', '', '도착제품이 이상 없음을 확인합니다.'],
				[''],
				['거래명세서', '', '회수용'],
				['출고일자', moment(rawData[0].outDate).format('YYYY-MM-DD')],
				['차량번호', rawData[0].carNumber, '기사명', rawData[0].driverName, '연락처', rawData[0].driverPhone],
				[''],
			]
			const header = { headerData, headerData02, headerData03, headerData04 }

			const totalWeight = rawData
				.map((item) => item.weight)
				.reduce((acc, cur) => Number(acc) + Number(cur), 0)
				.toLocaleString()
			const footer = ['총 중량', totalWeight]

			downloadData(rawData[0].outNumber, header, footer, excelData)
		} catch (e) {
			simpleAlert(e.message)
		}
	}

	return <WhiteSkyBtn onClick={handleClick}>수취서 출력</WhiteSkyBtn>
}

export default ReceiptExcel
