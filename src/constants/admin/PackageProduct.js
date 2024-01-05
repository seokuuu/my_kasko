import RecommendCellRenderer from "../../pages/Table/RecommendCellRenderer.jsx"
import RecommendCellRenderer2 from "../../pages/Table/RecommendCellRenderer2.jsx"
import BtnCellRenderer from '../../pages/Table/BtnCellRenderer.jsx'
var checkboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}
export const packageFields = {
  '패키지 고유번호': 'uid',
  '패키지 이름': 'name',
  '패키지 번호': 'number',
  '판매 유형': 'saleType',
  '판매 구분': 'saleCategory',
  '패키지 경매&판매 시작가': 'price',
  '중량': 'totalWeight',
  '메모': 'memo',
  '비고': 'note',
  '최종 수정일자': 'updateDate',
  '경매 번호': 'auctionNumber',
  '경매 상태': 'auctionStatus',
  '최종 수정자': 'updater'
}

export const packageFieldsCols = [
  { field: '', maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  { field: '패키지 고유번호', minWidth: 100 },
  { field: '패키지 이름', minWidth: 100 },
  { field: '패키지 번호', minWidth: 100 },
  { field: '판매 유형', minWidth: 100 },
  { field: '판매 구분', minWidth: 100 },
  { field: '패키지 경매&판매 시작가', minWidth: 100 },
  { field: '중량', minWidth: 100 },
  { field: '메모', minWidth: 100 },
  { field: '비고', minWidth: 100 },
  { field: '최종 수정일자', minWidth: 100 },
  { field: '경매 번호', minWidth: 100 },
  { field: '경매 상태', minWidth: 100 },
  { field: '최종 수정자', minWidth: 100 }
];