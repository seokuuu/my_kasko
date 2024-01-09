var checkboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}

export const saleProductListFieldsCols = [
  { field: '', maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  { header: '순번', field: 'productUid' },
  { header: '상시판매 번호', field: 'auctionNumber' },
  { header: '상시판매 주문일자', field: 'auctionCreateDate' },
  { header: '고객사명', field: 'customerName' },
  { header: '고객코드', field: 'customerCode' },
  { header: '창고', field: 'storageName' },
  { header: '상시판매 상태', field: 'auctionStatus' },
  { header: '승인상태', field: 'approvalStatus' },
  { header: '판매구분', field: 'saleCategory' },
  { header: '판매유형', field: 'saleType' },
  { header: '판매가유형', field: 'salePriceType' },
  { header: '제품군', field: 'spart' },
  { header: '제품 수량', field: 'quantity' },
  { header: '중량 합계', field: 'totalWeight' },
  { header: '제품금액 (VAT포함)', field: 'totalOrderPrice' },
  { header: '운반비 금액 (VAT포함)', field: 'totalFreightCost' },
  { header: '입금 요청액', field: 'orderPrice' },
  { header: '목적지 코드', field: 'destinationCode' },
  { header: '목적지 명', field: 'destinationName' },
  { header: '목적지 주소', field: 'customerDestinationAddress' },
  { header: '목적지 연락처(사무실)', field: 'customerDestinationPhone' },
  { header: '목적지담당자 연락처 (휴대폰)', field: 'customerDestinationManagerPhone' },
  { header: '하차지명', field: 'customerDestinationName' },
  { header: '주문상태', field: 'orderStatus' },
  { header: '확정전송 일자', field: 'updateDate' },
  { header: '주문번호', field: 'auctionBidUid' },
  { header: '비고', field: 'productMemo' },
  { header: '매입운반비', field: 'freightCost' },
  { header: '매출운반비', field: 'totalFreightCost' },
  { header: '재고상태', field: 'saleStatus' },
  { header: '최종수정자', field: 'updateMemberName' },
  { header: '최종수정일시', field: 'updateDate' },
]

/*
    api/sale-product/order
    Response
    
    auctionBidUid;                           // 주문 고유 번호
    auctionNumber;                           // 상시판매 번호
    auctionStatus;                           // 상시판매 상태
    auctionCreateDate;                       // 상시판매 주문일자
    orderStatus;                             // 확정 전송 상태
    packageUid;                              // 패키지 고유 번호
    packageName;                             // 패키지 명
    packageNumber;                           // 패키지 번호
    productUid;                              // 상품 고유 번호
    productNumber;                           // 상품 번호
    productProNumber;                        // 상품 Pro.No
    storageName;                             // 상품 창고
    saleType;                                // 판매 유형 (경매 대상재 / 상시판매 대상재)
    saleCategory;                            // 판매 구분 (판매재 / 판매 제외재 / 판매 완료재)
    salePriceType;                           // 판매가 구분 (일반 / 특가)
    salePrice;                               // 상시 판매가
    saleStatus;                              // 상시 판매 주문 상태
    quantity;                                // 제품 수량
    totalWeight;                             // 총 중량
    spart;                                   // 제품군
    spec;                                    // 규격 약호
    causeCode;                               // 여재원인
    causeCodeName;                           // 여재원인 명
    usageCode;                               // 용도 코드
    usageCodeName;                           // 용도명
    productMemo;                             // 메모
    productBiddingPrice;                     // 제품 낙찰 단가
    totalBiddingPrice;                       // 낙찰 총 단가 & 운임 총 단가
    orderPrice;                              // 제품 공급가
    orderPriceVat;                           // 제품대 부가세
    totalOrderPrice;                         // 제품 금액 (VAT)
    freightCost;                             // 운송비 공급가
    freightCostVat;                          // 운송비 부가세
    totalFreightCost;                        // 운반비 금액 (VAT)
    freightFee;                              // 기본 운임 단가
    extraUnitPrice;                          // 할증 운임 단가
    totalSupplyPrice;                        // 총 공급가
    totalVat;                                // 총 부가세
    totalPrice;                              // 합계 금액 (원/톤)
    customerUid;                             // 고객사 고유 번호
    customerName;                            // 고객사 명
    customerCode;                            // 고객사 코드
    approvalStatus;                          // 승인 여부 (0: 미승인 / 1: 승인)
    destinationUid;                          // 목적지 고유 번호
    destinationCode;                         // 목적지 코드
    destinationName;                         // 목적지 명
    customerDestinationUid;                  // 고객사 목적지 고유 번호
    customerDestinationAddress;              // 목적지 주소
    customerDestinationPhone;                // 목적지 연락처
    customerDestinationManagerPhone;         // 목적지 담당자 연락처
    customerDestinationName;                 // 하차지 명
    requestDestinationName;                  // 변경 요청 목적지 명
    requestCustomerDestinationAddress;       // 변경 요청 목적지 주소
    requestCustomerDestinationPhone;         // 변경 요청 목적지 연락처
    requestDestinationManagerPhone;          // 변경 요청 목적지 담당자 연락처
    updateMemberUid;                         // 최종 수정자 고유번호
    updateMemberName;                        // 최종 수정자
    updateDate;                              // 최종 수정 일자
*/

export const saleProductListResponseToTableRowMap = {
  순번: 'uid', // This field 'sequence' was not in the original response. Please replace with the correct field if necessary.
  '상시판매 번호': 'auctionNumber',
  '상시판매 주문일자': 'auctionCreateDate',
  고객사명: 'customerName',
  고객코드: 'customerCode',
  창고: 'storageName',
  '상시판매 상태': 'auctionStatus',
  승인상태: 'approvalStatus',
  판매구분: 'saleCategory',
  판매유형: 'saleType',
  판매가유형: 'salePriceType',
  제품군: 'spart',
  '제품 수량': 'quantity',
  '중량 합계': 'totalWeight',
  '제품금액 (VAT포함)': 'totalOrderPrice',
  '운반비 금액 (VAT포함)': 'totalFreightCost',
  '입금 요청액': 'orderPrice',
  '목적지 코드': 'destinationCode',
  '목적지 명': 'destinationName',
  '목적지 주소': 'customerDestinationAddress',
  '목적지 연락처(사무실)': 'customerDestinationPhone',
  '목적지담당자 연락처 (휴대폰)': 'customerDestinationManagerPhone',
  하차지명: 'customerDestinationName',
  주문상태: 'orderStatus',
  '확정전송 일자': 'updateDate',
  주문번호: 'auctionBidUid',
  비고: 'productMemo',
  매입운반비: 'freightCost',
  매출운반비: 'totalFreightCost',
  재고상태: 'saleStatus',
  최종수정자: 'updateMemberName',
  최종수정일시: 'updateDate',
}
