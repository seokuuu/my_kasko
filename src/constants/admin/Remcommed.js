/* eslint-disable no-restricted-globals */
import RecommendCellRenderer from "../../pages/Table/RecommendCellRenderer.jsx"
import RecommendCellRenderer2 from "../../pages/Table/RecommendCellRenderer2.jsx"
import BtnCellRenderer from '../../pages/Table/BtnCellRenderer.jsx'
import LinkCellRender from '../../pages/Table/LinkCellRenderer.jsx'

var checkboxSelection = function (params) {

  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}

export const singleRecommendDispatchFields= {
    '순번':'index',
    '고유 번호': 'uid',
    '제품 번호': 'number',
    '규격 약호': 'spec',
    '창고': 'storageName',
    '제품 사양': 'wdh',
    '두께': 'thickness',
    '폭': 'width',
    '길이': 'length',
    '중량': 'weight',
    '제품 등급': 'grade',
    '용도 코드': 'usageCode',
    '용도명': 'usageCodeName',
    'C%': 'c',
    'Si': 'si',
    'Mn': 'mn',
    'P': 'p',
    'S': 's',
    'TS': 'ts',
    'YP': 'yp',
    'EL': 'el',
    '제품군명': 'spart',
    '제품명': 'productName',
    '정척 여부': 'preferThickness',
    '여재 원인 코드': 'causeCode',
    '여재 원인명': 'causeCodeName',
    '입고일': 'receiptDate',
    '유찰 횟수': 'failCount',
    '제품 상태': 'productStatus',
    '경매 등록 상태': 'registrationStatus',
    '매입처': 'supplier',
    '제조사': 'maker',
    '판매 구분': 'saleCategory',
    '판매 제외 사유': 'excludeSaleReason',
    '재고 상태': 'stockStatus',
    '판매 유형': 'saleType',
    '입고 상태': 'receiptStatus',
    '상시 판매 상태': 'saleStatus',
    '판매가 유형': 'salePriceType',
    '추천 제품 여부': 'bestStatus',
    '등록 일자': 'createDate',
    '최종 수정 일자': 'updateDate',
    '최종 수정자': 'lastedUpdater',
    '매입가': 'price',
    '노출 상태': 'viewStatus',
    '경매 시작 단가': 'auctionStartPrice',
    '주문 상태': 'orderStatus',
    '클레임 진행 상태': 'claimStatus',
    '확정 전송 일자': 'sendDate',
    '패키지명': 'packageName',
    '패키지번호': 'packageNumber',
    'Pro.No': 'productNoNumber',
    '경매 번호': 'auctionNumber',
    '제품 낙찰 단가': 'productBiddingPrice',
    '낙찰 총 단가': 'totalBiddingPrice',
    '기본 운임 단가': 'freightFee',
    '할증 운임 단가': 'extraUnitPrice',
    '제품 공급가': 'orderPrice',
    '제품 부가세': 'orderPriceVat',
    '운반비 공급가': 'freightCost',
    '운반비 부가세': 'freightCostVat',
    '목적지명': 'destinationName',
    '낙찰 상태': 'biddingStatus',
    '메모': 'memo',
    '비고': 'note',
    '상시 판매가': 'salePrice'
  }
  



export const singleRecommendDispatchFieldsCols = [
  { headerClass:'custom-header-style',rowDrag:true,flex:1,minWidth:50,cellStyle:{ borderRight: '1px solid #c8c8c8', textAlign: 'center' } },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '', minWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '순번', minWidth: 60 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '고유 번호', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '제품 번호', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '규격 약호', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '창고', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '제품 사양', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '두께', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '폭', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '길이', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '중량', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '제품 등급', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '용도 코드', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '용도명', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: 'C%', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: 'Si', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: 'Mn', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: 'P', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: 'S', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: 'TS', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: 'YP', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: 'EL', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '제품군명', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '제품명', minWidth: 100 ,cellRenderer:RecommendCellRenderer2,cellRendererParams:{
    uidFieldName:'제품명',
    editType:'recommend'
  }},
  { headerClass:'custom-header-style', flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '정척 여부', minWidth: 100 },
  { headerClass:'custom-header-style', flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '여재 원인 코드', minWidth: 100 },
  { headerClass:'custom-header-style', flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '여재 원인명', minWidth: 100 },
  { headerClass:'custom-header-style', flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '입고일', minWidth: 100 },
  { headerClass:'custom-header-style', flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '유찰 횟수', minWidth: 100 },
  { headerClass:'custom-header-style', flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '제품 상태', minWidth: 100 },
  { headerClass:'custom-header-style', flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '경매 등록 상태', minWidth: 100 },
  { headerClass:'custom-header-style', flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '매입처', minWidth: 100 },
  { headerClass:'custom-header-style', flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '제조사', minWidth: 100 },
  { headerClass:'custom-header-style', flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '판매 구분', minWidth: 100 },
  { headerClass:'custom-header-style', flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '판매 제외 사유', minWidth: 100 },
  { headerClass:'custom-header-style', flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '재고 상태', minWidth: 100 },
  { headerClass:'custom-header-style', flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '판매 유형', minWidth: 100 },
  { headerClass:'custom-header-style', flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '입고 상태', minWidth: 100 },
  { headerClass:'custom-header-style', flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '상시 판매 상태', minWidth: 100 },
  { headerClass:'custom-header-style', flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '판매가 유형', minWidth: 100 },
  { headerClass:'custom-header-style', flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '추천 제품 여부', minWidth: 100, cellRenderer:RecommendCellRenderer,
    cellRendererParams:{
    uidFieldName:'추천 제품 여부',
    editType:'recommend'
  }},
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '등록 일자', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '최종 수정 일자', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '최종 수정자', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '매입가', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '노출 상태', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '경매 시작 단가', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '주문 상태', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '클레임 진행 상태', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '확정 전송 일자', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '패키지명', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '패키지번호', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: 'Pro.No', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '경매 번호', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '제품 낙찰 단가', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '낙찰 총 단가', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '기본 운임 단가', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '할증 운임 단가', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '제품 공급가', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '제품 부가세', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '운반비 공급가', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '운반비 부가세', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '목적지명', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '낙찰 상태', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '메모', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '비고', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '상시 판매가', minWidth: 100 },
];





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



export const packageRecommendDispatchFieldsCols = [
  { rowDrag:true,headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '', minWidth: 50, },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '', minWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '순번', minWidth: 60 },
  { headerClass: 'custom-header-style', flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '고유 번호', minWidth: 100,},
  { headerClass: 'custom-header-style', flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '패키지 이름', minWidth: 150,},
  { headerClass: 'custom-header-style', flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '패키지 번호', minWidth: 110,  
    cellRenderer: LinkCellRender,
    cellRendererParams: {
      uidFieldName: '패키지 번호', // 해당 get의 uid (필수수)
      editType: 'openDetailModal',
      moveUrl:'/product/packageedit' // modal의 띄울 종류 (선택)
    }},
  { headerClass: 'custom-header-style', flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '경매 번호', minWidth: 120 },
  { headerClass: 'custom-header-style', flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '판매 구분', minWidth: 100 },
  { headerClass: 'custom-header-style', flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '판매 유형', minWidth: 100 },
  { headerClass: 'custom-header-style', flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '패키지 경매&판매 시작가', minWidth: 200 },
  { headerClass: 'custom-header-style', flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '중량', minWidth: 100 },
  { headerClass: 'custom-header-style', flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '메모', minWidth: 100 },
  { headerClass: 'custom-header-style', flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '비고', minWidth: 100 },
  { headerClass: 'custom-header-style', flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '경매 상태', minWidth: 100 },
  { headerClass: 'custom-header-style', flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '최종 수정자', minWidth: 100 },
  { headerClass: 'custom-header-style', flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '최종 수정 일자', minWidth: 100 },
]
  


export const packageRecommendProductsDispatchFieldsCols = [
  { rowDrag:true,headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '', width: 50, },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '', width: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '순번', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '패키지 번호', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '패키지 명', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '제품 고유 번호', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '제품 창고 명', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '제품 매입처', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '제품 제조사', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '제품 경매 번호', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '제품 판매 유형', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '제품 판매 구분', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '제품 판매가 유형', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '제품군', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '제품 중량', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '메모', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '비고', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '낙찰 단가', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '낙찰 총 단가', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '공급가', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '부가세', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '경매 시작가', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '최종수정자', minWidth: 100 },
  { headerClass:'custom-header-style',flex:1,cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },field: '최종 수정 일자', minWidth: 120 },
]
  

