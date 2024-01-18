/* eslint-disable no-restricted-globals */
import BtnCellRenderer from '../../pages/Table/BtnCellRenderer.jsx'
import InputCellRenderer from "../../pages/Table/InputCellRenderer.jsx"



var checkboxSelection = function (params) {

  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}

export const singleDispatchFields= {
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
  

export const SingleDispatchFieldsCols= [
  { field: '',   headerClass:'custom-header-style',flex:1,
    cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
     minWidth: 50, checkboxSelection, headerCheckboxSelection },
  ...Object.keys(singleDispatchFields).map((item) => ({
    headerClass:'custom-header-style',flex:1,
    cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
    field: item,
    minWidth: 100,
  })),
]

export const SingleSalesDispatchFieldsCols= [
  { field: '',   headerClass:'custom-header-style',flex:1,
  cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
  minWidth: 50, checkboxSelection, headerCheckboxSelection },
  { field: '수정',   headerClass:'custom-header-style',flex:1,
  cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
  minWidth: 100,  cellRenderer: BtnCellRenderer,
  cellRendererParams: {
    uidFieldName: '경매 번호',
    editType: 'productModify',
  }},
  ...Object.keys(singleDispatchFields).map((item) => ({
    headerClass:'custom-header-style',flex:1,
    cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
    field: item,
    minWidth: 100,
  })),
]
var optionFn = function (key){
  
  let options= [];
  
  switch (key){
    case '재고 상태':
    options =['자사 재고','타사 재고'];
    break;
    case '제조사':
    options =['현대제철','동은스틸'];
    break;
    case '판매 구분':
    options= ['판매재','판매 제외재','판매 완료재'];
    break;
    case '매입처':
    options= ['현대제철','카스코 철강'];
    break;
    default:
      break
  }

return options
}
/// 제품 수정 창에 데려올 필드와 설정하는 컬럼

export const SingleModifyFields = {
  "제품 번호": "number",
  "저장 위치": "storage",
  "저장 위치명": "storageName",
  "규격 약호": "spec",
  "제품 사양": "wdh",
  "두께": "thickness",
  "폭": "width",
  "길이": "length",
  "중량": "weight",
  "등급": "grade",
  "용도 코드": "usageCode",
  "용도명": "usageCodeName",
  "C%": "c",
  "Si": "si",
  "Mn": "mn",
  "P": "p",
  "S": "s",
  "TS": "ts",
  "YP": "yp",
  "EL": "el",
  "제품군 코드": "spartCode",
  "제품군명": "spart",
  "매입처": "supplier",
  "제조사": "maker",
  "품명": "name",
  매입가:'price',
  "정척 여부": "preferThickness",
  "여재 원인 코드": "causeCode",
  "여재 원인명": "causeCodeName",
  "입고일": "receiptDate",
  "재고 상태": "stockStatus",
  "판매 구분":'saleCategory'
};



export const SingleModifyDispatchFieldsCols= [
  { field: '',   headerClass:'custom-header-style',flex:1,
    cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
     minWidth: 50, checkboxSelection, headerCheckboxSelection },
  ...Object.entries(SingleModifyFields).map(([k,v]) => {
    console.log(k)
    if(k !=='재고 상태' && k !== '판매 구분' && k !== '매입처' && k !=='제조사' ){
      return {
        headerClass:'custom-header-style',flex:1,
        cellStyle: { borderRight: '1px solid #c8c8c8',width:'100px',padding:'0'},
        field: k,
        minWidth: 100,
        editable:true,
        cellRenderer:InputCellRenderer,
        cellRendererParams:{
          uidFieldName:k,
          valueName:v,
          type:'input'
        
        }
      }
    }else{
      return {
        headerClass:'custom-header-style',flex:1,
        cellStyle: { borderRight: '1px solid #c8c8c8',width:'100px',padding:'0'},
        field: k,
        minWidth: 100,
        editable:true,
        cellEditor:'agSelectCellEditor',
        cellRenderer:InputCellRenderer,
        cellRendererParams:{
          uidFieldName:k,
          valueName:v,
          type:'select'
        },
        cellEditorParams: {
          values:optionFn(k), // 셀렉트 박스에 표시할 옵션들
        },
      }
    }
  }),
]