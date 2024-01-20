import BtnCellRendererV2 from '../../pages/Table/BtnCellRendererV2'

var checkboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}


export const StockInventoryFields = {
  '제품 고유 번호': 'uid',
  '제품 번호': 'productNumber',
  '고객 코드': 'customerCode',
  '고객사명': 'customerName',
  '등급': 'grade',
  '중량': 'weight',
  '두께': 'thickness',
  '폭': 'width',
  '길이': 'length',
  'yp': 'yp',
  'ys': 'ts',
  'c': 'c',
  'p': 'p',
  's': 's',
  'si': 'si',
  'el': 'el',
  'mn': 'mn',
  '창고': 'storageName',
  '입고일': 'receiptDate',
  '제품군': 'spart',
  '재고 상태': 'stockStatus',
  '매입처': 'supplier',
  '제조사': 'maker',
  '판매 구분': 'saleCategory',
  '판매 유형': 'saleType',
  '판매가 유형 (특가 / 일반)': 'salePriceType',
  '경매 번호': 'auctionNumber',
  '정척 여부 (Y / N)': 'preferThickness',
  '유찰 횟수': 'failCount',
  '규격 약호': 'spec',
  '여재 원인 코드': 'causeCode',
  '여재 원인명': 'causeCodeName',
  '용도 코드': 'usageCode',
  '용도명': 'usageCodeName',
  '제품 낙찰 단가': 'productBiddingPrice',
  '기본 운임 단가': 'freightFee',
  '할증 운임 단가': 'extraUnitPrice',
  '낙찰 총 단가': 'totalBiddingPrice',
  '제품 공급가': 'orderPrice',
  '운송비 공급가': 'freightCost',
  '총 공급가': 'totalSupplyPrice',
  '제품대 부가세': 'orderPriceVat',
  '운송비 부가세': 'freightCostVat',
  '총 부가세': 'totalVat',
  '제품 금액': 'totalOrderPrice',
  '운반비 금액 ': 'totalFreightCost',
  '목적지명': 'destinationName',
  '수정일': 'updateDate',
  '상시판매 주문번호': 'orderNumber',
  '현대제철 주문번호': 'hsOrderNo',
  '패키지명': 'packageName',
  '패키지 번호': 'packageNumber',
  '클레임 진행상태': 'claimStatus',
  '입고 상태 ': 'receiptStatus',
  '출하 상태 ': 'shipmentStatus',
  '현대제철 반품일자': 'hsReturnDate',
  '카스코 반품일자': 'kaskoReturnDate',
  '등록일': 'createDate',
  '확정 전송일': 'sendDate',
  '매입가': 'price',
  '중량 판매 개수': 'splitCount',
  '매입 운반비': 'inboundFreightAmount',
  '매출 운반비': 'outboundFreightAmount',
  '시작가': 'auctionStartPrice'
}


export const StockInventoryFieldCols = [
  { field: '',   headerClass:'custom-header-style',flex:1,
    cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
     minWidth: 50, checkboxSelection, headerCheckboxSelection },

  { field: '중량 판매 등록',   headerClass:'custom-header-style',flex:1,
  cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
  minWidth: 120, cellRenderer:BtnCellRendererV2,
    cellRendererParams: {
    uidFieldName: '패키지 번호', // 해당 get의 uid (필수수)
    editType: 'weight',
  } },
   ...Object.entries(StockInventoryFields).map(([k,v]) => (
        {
          headerClass:'custom-header-style',flex:1,
          cellStyle: { borderRight: '1px solid #c8c8c8',width:'100px',textAlign:'center'},
          field: k,
          minWidth: 100,
        }))
] 





export const StockDetailInventoryFields = {
  // '중량 제품 번호':'productNoNumber',
  '제품 고유 번호': 'uid',
  '제품 번호': 'number',
  '중량': 'weight',
  '폭': 'width',
  '길이': 'length',
  '제조사': 'maker',
  '판매 구분': 'saleCategory',
  '유찰 횟수': 'failCount',
  '수정자': 'updateMember',
  '수정 날짜':'updateDate',
  '중량 판매 개수': 'splitCount',
}




export const StockInventoryDetailFieldCols = [
  { field: '',   headerClass:'custom-header-style',flex:1,
    cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
     minWidth: 50, checkboxSelection, headerCheckboxSelection },


   ...Object.entries(StockDetailInventoryFields).map(([k,v]) => (
        {
          headerClass:'custom-header-style',flex:1,
          cellStyle: { borderRight: '1px solid #c8c8c8',width:'100px',textAlign:'center'},
          field: k,
          minWidth: 100,
        }))
] 
