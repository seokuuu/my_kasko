import BtnCellRenderer from '../../pages/Table/BtnCellRenderer'

var checkboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}

export const ShippingDispatchFields = {
  '고유 번호': 'uid',
  이름: 'name',
  '차량 번호': 'carNumber',
  연락처: 'phone',
  '차량 종류': 'carType',
  비고: 'memo',
}

export const ShippingDispatchFieldsCols = [
  { field: '', maxWidth: 50, checkboxSelection, headerCheckboxSelection },
  {
    field: '수정',
    maxWidth: 90,
    cellRenderer: BtnCellRenderer,
    cellRendererParams: {
      uidFieldName: '고유 번호', // 해당 get의 uid (필수수)
      editType: 'dispatch', // modal의 띄울 종류 (선택)
    },
  },
  {
    field: '고유 번호',
    minWidth: 100,
  },
  { field: '이름', minWidth: 100 },
  { field: '차량 번호', minWidth: 100 },
  { field: '연락처', minWidth: 100 },
  { field: '차량 종류', minWidth: 100 },
  { field: '비고', minWidth: 100 },
]

/**
 * 출하 지시 항목 필드
 */
export const ShippingRegisterFields = {
  경매번호: 'auctionNumber',
  경매일자: 'auctionStartDate',
  '주문 고유 번호': 'orderUid',
  '주문번호 & 상시판매 번호': 'orderNumber',
  주문상태: 'orderStatus',
  '확정전송 일자': 'sendDate',
  '출하 상태': 'shipmentStatus',
  출하지시일자: 'shippingDate',
  '등록 일자 & 상시판매 주문일자': 'orderCreateDate',
  최종수정자: 'orderUpdater',
  최종수정일시: 'orderUpdateDate',
  '제품 고유 번호': 'productUid',
  제품번호: 'productNumber',
  창고: 'storageName',
  '판매 유형 (경매 대상재 / 상시 판매 대상재)': 'saleType',
  '판매 구분 (판매재 / 판매 제외재 / 판매 완료재)': 'saleCategory',
  '판매가 유형 (특가 / 일반)': 'salePriceType',
  제품군: 'spart',
  제품등급: 'gradle',
  상시판매가: 'salePrice',
  두께: 'grade',
  폭: 'weight',
  길이: 'thickness',
  중량: 'width',
  규격약호: 'length',
  TS: 'ts',
  YP: 'yp',
  'C%': 'c',
  EL: 'el',
  SI: 'si',
  MN: 'mn',
  P: 'p',
  S: 's',
  여제원인명1: 'causeCodeName',
  용도명: 'usageCodeName',
  메모: 'productMemo',
  비고: 'productNote',
  재고상태: 'stockStatus',
  입고일자: 'productCreateDate',
  패키지명: 'packageName',
  패키지번호: 'packageNumber',
  '제품 낙찰 단가(원/톤)': 'productBiddingPrice',
  '낙찰 총 단가(원/톤)': 'totalBiddingPrice',
  '제품 공급가(원/톤)': 'orderPrice',
  '제품 부가세(원/톤)': 'orderPriceVat',
  '제품 금액 (VAT 포함)': 'totalOrderPrice',
  '기본 운임 단가(원/톤)': 'freightFee',
  '할증 운임 단가(원/톤)': 'extraUnitPrice',
  '운임 총단가': 'totalFreightPrice',
  '운반비 공급가(원/톤)': 'freightCost',
  '운반비 부가세(원/톤)': 'freightCostVat',
  '운반비 금액 (VAT 포함)': 'totalFreightCost',
  '총 공급가(원/톤)': 'totalSupplyPrice',
  '총 부가세(원/톤)': 'totalVat',
  '합계 금액(원/톤)': 'totalPrice',
  '매입 기본 운임 단가(원/톤)': 'inboundFreightFee',
  '매입 할증 운임 단가(원/톤)': 'inboundExtraUnitPrice',
  '매입 운임 총 단가': 'inboundFreightCost',
  '매입 운반비 공급가(원/톤)': 'inboundFreightTotalCost',
  '매입 운반비 부가세(원/톤)': 'inboundFreightCostVat',
  '매입 운반비': 'inboundFreightAmount',
  '매출 운반비': 'outboundFreightAmount',
  고객사명: 'customerName',
  고객코드: 'customerCode',
  '목적지 코드': 'destinationCode',
  '목적지 명': 'destinationName',
  '목적지 주소': 'customerDestinationAddress',
  '목적지 연락처(사무실)': 'customerDestinationPhone',
  '목적지담당자 연락처 (휴대폰)': 'customerDestinationManagerPhone',
  하차지명: 'customerDestinationName',
  '제품추가 일자': 'productOutCreateDate',
  '합짐 여부': 'productOutStatus',
  '배차 여부': 'driverStatus',
  '제품 수량': 'productQuantity',
  '제품 총 중량': 'productTotalWeight',
  운전기사명: 'driverName',
  '운전기사 연락처': 'driverPhone',
  차량번호: 'carNumber',
  '차량 종류': 'carType',
}

export const ShippingRegisterFieldsCols = [
  { field: '', maxWidth: 50, checkboxSelection, headerCheckboxSelection },
  ...Object.keys(ShippingRegisterFields).map((item) => ({
    field: item,
    maxWidth: 200,
  })),
]
