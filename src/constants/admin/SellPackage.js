import RecommendCellRenderer from "../../pages/Table/RecommendCellRenderer"
import RecommendCellRenderer2 from "../../pages/Table/RecommendCellRenderer2"
import BtnCellRenderer from '../../pages/Table/BtnCellRenderer.jsx'
import LinkCellRender from '../../pages/Table/LinkCellRenderer.jsx'
import { commonStyles } from "../commonCellStyle.js"
import LinkCellRenderer from "../../pages/Table/LinkCellRenderer.jsx"
var checkboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}
export const packageDispatchFields= {
  '순번':'index',
  '고유 번호':'uid',
  '패키지 이름': 'name',
  '패키지 번호': 'number',
  '경매 번호': 'auctionNumber',
  '판매 구분': 'saleCategory',
  '판매 유형': 'saleType',
  '패키지 경매&판매 시작가': 'price',
  '중량': 'totalWeight',
  '메모': 'memo',
  '비고': 'note',
  '시작가':'price',
  '경매 상태': 'auctionStatus',
  '최종 수정자': 'updater',
  '최종 수정 일자': 'updateDate',
  }
  
export const packageProductsDispatchFields = {
  '순번':'index',
  '패키지 번호': 'packageNumber',
  '패키지 명': 'packageName',
  수량: 'quantity',
  '총 중량': 'totalWeight',
  '제품 경매 번호': 'auctionNumber',
  '제품 고유 번호': 'productUid',
  '제품 창고 명': 'storage',
  '제품 매입처': 'supplier',
  '제품 제조사': 'maker',
  '제품 판매 유형': 'saleType',
  '제품 판매 구분': 'saleCategory',
  '제품 판매가 유형': 'saleTypePrice',
  제품군: 'spart',
  '제품 중량': 'weight',
  메모: 'memo',
  비고: 'note',
  '낙찰 단가': 'productBiddingPrice',
  '낙찰 총 단가': 'totalBiddingPrice',
  공급가: 'orderPrice',
  부가세: 'orderPriceVat',
  '경매 시작가': 'auctionStartPrice',
  '최종 수정자': 'updater',
  '최종 수정 일자': 'updateDate',
}


// 패키지 관리 컬럼들
export const packageDispatchFieldsCols = [

  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '', minWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '순번', minWidth: 60 },
  {
    headerClass:'custom-header-style',
    field: '수정',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
    minWidth: 90,
    cellRenderer: BtnCellRenderer,
    cellRendererParams: {
      uidFieldName: '패키지 번호', // 해당 get의 uid (필수수)
      editType: 'packageUpdate', // modal의 띄울 종류 (선택)
      moveUrl:'/product/packageedit' // link로 보내려면 (선택)
    },
  },

  ...Object.keys(packageDispatchFields).map((item) => ({
    ...commonStyles,
    field: item,
    editable:(item === '메모' || item === '비고' )? true:false,
    minWidth: (item === '메모' || item === '비고' )? 200 : 150,
    cellRenderer:item ==='패키지 번호' && LinkCellRenderer,    
    cellRendererParams: {
      uidFieldName: '패키지 번호', // 해당 get의 uid (필수수)
      editType: 'openDetailModal',
      moveUrl:'/product/packageedit' // modal의 띄울 종류 (선택)
    },
  })),
  
]
  

// 패키지 관리
export const packageProductsDispatchFieldsCols = [
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '', minWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  ...Object.keys(packageProductsDispatchFields).map((item) => ({
    ...commonStyles,
    field: item,
    editable:false,
    minWidth: item ==='순번'? 80 :150,
   
  })),
]
  

export const packageDetailDispatchFieldsCols = [
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '', minWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
    ...Object.keys(packageProductsDispatchFields).map((item) => ({
      ...commonStyles,
      field: item,
      editable:false,
      minWidth: item ==='순번'? 80 :150,
      cellRenderer:item ==='패키지 번호' && LinkCellRenderer,    
      cellRendererParams: {
        uidFieldName: '패키지 번호', // 해당 get의 uid (필수수)
        editType: 'openDetailModal',
        moveUrl:'/product/packageedit' // modal의 띄울 종류 (선택)
      },
    })),
]

