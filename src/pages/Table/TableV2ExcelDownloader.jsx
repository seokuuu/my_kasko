import React from 'react';
import useAlert from '../../store/Alert/useAlert';
import { client } from '../../api';
import { ExcelBtn } from '../../common/Button/Button';
import { getUrlWithSearchParam } from '../../utils/parameters';
import { add_element_field } from '../../lib/tableHelpers';
import * as XLSX from 'xlsx'
import { read } from 'xlsx';

/**
 * 엑셀 다운로더
 * @param {string} props.requestUrl 요청 URL
 * @param {string} props.requestMethod 요청 메서드
 * @param {number} props.requestCount 요청 갯수(전체 항목 갯수)
 * @returns 
 */
export const TableV2ExcelDownloader = ({
  requestUrl = '',  
  requenstMethod = '',
  requestCount = 0,
  field=[],
  sheetName=""
}) => {
  // ALERT
  const { simpleAlert } = useAlert();

  /**
   * 전체 데이터 요청
   */
  async function getData() {
    try {
     const res = await client({
        method: requenstMethod,
        url: getUrlWithSearchParam(requestUrl, {
          pageSize: requestCount || 1000,
          pageNum: 1
        }),
      });

      if(res.status === 200) {
        const arrData = Array.isArray(res?.data?.data)? res.data.data : (res?.data?.data?.list || []);
        return arrData;
      } else {
        simpleAlert('엑셀 다운로드에 실패했습니다.\n다시 시도해 주세요.');
        throw new Error('requet error');
      }
    } catch(error) {
      simpleAlert(error?.data?.message || '엑셀 다운로드에 실패했습니다.\n다시 시도해 주세요.');
      throw error;
    }
  }

  /**
   * 데이터 다운로드
   */
  function downloadData(jsonData) {
    if(!jsonData || jsonData.length < 1) {
      return simpleAlert('다운로드 받을 데이터가 존재하지 않습니다.')
    }

		const keys = Object.keys(jsonData[0])
		const data = [keys].concat(jsonData.map((item) => keys.map((key) => item[key])))

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

  // 다운로드 클릭 핸들러
  async function handleClick(e) {
    e.preventDefault();

    const rawData = await getData();
    const sortedData = field? add_element_field(rawData, field) : rawData;
    downloadData(sortedData);
  }

  return (
		<ExcelBtn onClick={handleClick}>
			<div>
				<img src="/img/excel.png" alt="Excel Icon" />
			</div>
			엑셀 다운로드
		</ExcelBtn>
  )
}

export default TableV2ExcelDownloader;