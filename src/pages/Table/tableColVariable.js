const checkboxSelection = function (params) {
  return params.columnApi.getRowGroupColumns().length === 0
}

const headerCheckboxSelection = function (params) {
  return params.columnApi.getRowGroupColumns().length === 0
}

export const columnDefs = [
  {
    headerName: '',
    field: 'check',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8' },
    checkboxSelection: checkboxSelection,
    headerCheckboxSelection: headerCheckboxSelection,
    width: 50,
  },
  {
    headerName: '순번',
    field: 'num',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8' },
    width: 80,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: '중량',
    field: 'weight',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8' },
    width: 110,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: '경매 / 상시 판매 번호',
    field: 'auctionNumber',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8' },
    width: 150,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: '주문 일자',
    field: 'orderDate',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8' },
    width: 107,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: '패키지 명',
    field: 'packageName',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8' },
    width: 90,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: '패키지 번호',
    field: 'packageNumber',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8' },
    width: 100,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: '주문 상태',
    field: 'title',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8' },
    width: 90,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: '확정전송 일자',
    field: 'title',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8' },
    width: 107,
    cellRenderer: (params) => params.value || 'N',
  },
  {
    headerName: '주문 번호',
    field: 'orderNumber',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8' },
    width: 110,
    cellRenderer: (params) => params.value || '-',
  },
  {
    headerName: '고객사 명',
    field: 'customerName',
    headerClass: 'custom-header-style',
    cellStyle: { borderRight: '1px solid #c8c8c8' },
    width: 110,
    cellRenderer: (params) => params.value || 'N/A',
  },
]
