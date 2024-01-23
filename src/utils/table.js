/**
 * 테이블 로우 반환 함수
 * @param {object[]} tableRows 
 * @returns {object[]} 빈 값이 '-'로 대체된 object 배열
 */
export function getNormalTableRows(tableRows = []) {
  return tableRows.map(v => v?.cellRenderer? v : ({...v, cellRenderer: (params) => params?.value || '-'}));
}