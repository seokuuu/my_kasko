/**
 * 테이블 로우 반환 함수
 * @param {object[]} tableRows 
 * @returns {object[]} 
 * - 빈 값이 '-'로 대체된 object 배열
 * - 셀 스타일 중앙으로 지정
 */
export function getNormalTableRows(tableRows = []) {
  return tableRows.map(v => ({
    ...v, 
    ...!v.cellRenderer && {cellRenderer: (params) => params?.value || '-'}, 
    ...!v.cellStyle && {cellStyle: { textAlign: 'center' }},
    ...!v.minWidth && { minWidth: 100 }
  }));
}