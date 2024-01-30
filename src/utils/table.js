import CustomTableHeader from "../pages/Table/CustomTableHeader";

/**
 * 테이블 로우 반환 함수
 * @param {object[]} tableRows 
 * @returns {object[]} 
 * - 빈 값이 '-'로 대체된 object 배열
 * - 셀 스타일 중앙으로 지정
 * - 셀 최소너비 100으로 지정
 * - 체크박스의 경우 핀 고정으로 지정
 */
export function getNormalTableRows(tableRows = []) {
  return tableRows.map(v => ({
    ...v, 
    ...!v.cellRenderer && {
      cellRenderer: (params) => params?.value || '-',
      // cellRenderer: CustomTableHeader,
      // valueGetter: v => {
      //   console.log(v.value);
      //   return v;
      // }
    }, 
    ...!v.cellStyle && {cellStyle: { textAlign: 'center' }},
    ...!v.minWidth && { minWidth: 100 },
    ...v.checkboxSelection && { initialPinned: true },
  }));
}