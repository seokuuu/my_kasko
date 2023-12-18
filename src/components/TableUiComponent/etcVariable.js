/** 셀의 내용을 지정할 수 있는 columnDefs */
export const columnDefs = [
  {
    headerName: '순번',
    field: 'no',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8' },
    flex: 1,
    minWidth: 74,
  },
  {
    headerName: '제목',
    field: 'title',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8' },
    flex: 8,
    minWidth: 859,
  },
  {
    headerName: '작성일자',
    field: 'date',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8' },
    flex: 2,
    minWidth: 160,
  },
  {
    headerName: '작성자',
    field: 'writer',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8' },
    flex: 2,
    minWidth: 160,
  },
  {
    headerName: '조회수',
    field: 'views',
    headerClass: 'custom-header-style',
    flex: 1,
    minWidth: 100,
  },
]
