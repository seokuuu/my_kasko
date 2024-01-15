import { checkboxSelection, headerCheckboxSelection } from "../../pages/Table/util";

/**
 * @constant 테이블컬럼 라벨 - 변수명 바인딩 객체
 * @description 사용자 주문확인 > 목록 테이블에서 사용합니다.
 */
export const userOrderListField = {
  "주문 고유 번호": "orderUid",
  "상시판매 번호": "auctionNumber",
  "상시판매 상태": "auctionStatus",
  "상시판매 주문일자": "auctionCreateDate",
  "확정 전송 상태": "orderStatus",
  "패키지 고유 번호": "packageUid",
  "패키지 명": "packageName",
  "패키지 번호": "packageNumber",
  "상품 고유 번호": "productUid",
  "상품 번호": "productNumber",
  "상품 Pro.No": "productProNumber",
  "상품 창고": "storageName",
  "판매 유형": "saleType",
  "판매 구분": "saleCategory",
  "판매가 구분": "salePriceType",
  "상시 판매가": "salePrice",
  "상시 판매 주문 상태": "saleStatus",
  "제품 수량": "quantity",
  "총 중량": "totalWeight",
  "제품군": "spart",
  "규격 약호": "spec",
  "여재원인": "causeCode",
  "여재원인 명": "causeCodeName",
  "용도 코드": "usageCode",
  "용도명": "usageCodeName",
  "메모": "productMemo",
  "제품 낙찰 단가": "productBiddingPrice",
  "낙찰 총 단가 & 운임 총 단가": "totalBiddingPrice",
  "제품 공급가": "orderPrice",
  "제품대 부가세": "orderPriceVat",
  "제품 금액 (VAT)": "totalOrderPrice",
  "운송비 공급가": "freightCost",
  "운송비 부가세": "freightCostVat",
  "운반비 금액 (VAT)": "totalFreightCost",
  "기본 운임 단가": "freightFee",
  "할증 운임 단가": "extraUnitPrice",
  "총 공급가": "totalSupplyPrice",
  "총 부가세": "totalVat",
  "합계 금액 (원/톤)": "totalPrice",
  "고객사 고유 번호": "customerUid",
  "고객사 명": "customerName",
  "고객사 코드": "customerCode",
  "승인 여부": "approvalStatus",
  "목적지 고유 번호": "destinationUid",
  "목적지 코드": "destinationCode",
  "목적지 명": "destinationName",
  "고객사 목적지 고유 번호": "customerDestinationUid",
  "목적지 주소": "customerDestinationAddress",
  "목적지 연락처": "customerDestinationPhone",
  "목적지 담당자 연락처": "customerDestinationManagerPhone",
  "하차지 명": "customerDestinationName",
  "변경 요청 목적지 명": "requestDestinationName",
  "변경 요청 목적지 주소": "requestCustomerDestinationAddress",
  "변경 요청 목적지 연락처": "requestCustomerDestinationPhone",
  "변경 요청 목적지 담당자 연락처": "requestDestinationManagerPhone",
  "최종 수정자 고유번호": "updateMemberUid",
  "최종 수정자": "updateMemberName",
  "최종 수정 일자": "updateDate"
};

/**
 * @constant 테이블컬럼 라벨 - 변수명 바인딩 객체
 * @description 사용자 주문확인 상세 > 목록 테이블에서 사용합니다.
 */
export const userOrderDetailsField = {
  "고유 번호": "orderUid",
  "제품 번호": "productNumber",
  "규격 약호": "spec",
  "창고": "storageName",
  "제품 사양": "wdh",
  "두께": "thickness",
  "폭": "width",
  "길이": "length",
  "중량": "weight",
  "제품 등급": "grade",
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
  "제품군명": "spart",
  "제품명": "productName",
  "정척 여부": "preferThickness",
  "여재 원인 코드": "causeCode",
  "여재 원인명": "causeCodeName",
  "입고일": "receiptDate",
  "유찰 횟수": "failCount",
  "제품 상태": "productStatus",
  "경매 등록 상태": "registrationStatus",
  "매입처": "supplier",
  "제조사": "maker",
  "판매 구분": "saleCategory",
  "판매 제외 사유": "excludeSaleReason",
  "재고 상태": "stockStatus",
  "판매 유형": "saleType",
  "입고 상태": "receiptStatus",
  "상시 판매 상태": "saleStatus",
  "판매가 유형": "salePriceType",
  "추천 제품 여부": "bestStatus",
  "등록 일자": "createDate",
  "최종 수정 일자": "updateDate",
  "최종 수정자": "lastedUpdater",
  "매입가": "price",
  "노출 상태": "viewStatus",
  "경매 시작 단가": "auctionStartPrice",
  "주문 상태": "orderStatus",
  "클레임 진행 상태": "claimStatus",
  "확정 전송 일자": "sendDate",
  "패키지명": "packageName",
  "패키지번호": "packageNumber",
  "Pro.No": "productNoNumber",
  "경매 번호": "auctionNumber",
  "제품 낙찰 단가": "productBiddingPrice",
  "낙찰 총 단가": "totalBiddingPrice",
  "기본 운임 단가": "freightFee",
  "할증 운임 단가": "extraUnitPrice",
  "제품 공급가": "orderPrice",
  "제품 부가세": "orderPriceVat",
  "운반비 공급가": "freightCost",
  "운반비 부가세": "freightCostVat",
  "목적지명": "destinationName",
  "낙찰 상태": "biddingStatus",
  "메모": "memo",
  "비고": "note",
  "상시 판매가": "salePrice"
};

/**
 * @constant 테이블컬럼 라벨 - 변수명 바인딩 객체
 * @description 사용자 주문확인 상세 > 목적지 변경 모달에서 사용합니다.
 * @todo 비고 없음
 */
export const userDestinationField = {
  "고객코드": "uid",
  "비고": "",
  "목적지 코드": "destinationCode",
  "목적지명": "destinationName",
  "하차지명": "name",
  "담당자 연락처": "managerPhone",
  "하차지 연락처": "phone",
  "상세주소": "address",
};

/**
 * @constant 테이블컬럼
 * @description 사용자 주문확인 > 목록 테이블에서 사용합니다.
 */
export const userOrderListFieldsCols = [
  { field: "", maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  { field: "주문 고유 번호", minWidth: 140 },
  { field: "상시판매 번호", minWidth: 120 },
  { field: "상시판매 상태", minWidth: 120 },
  { field: "상시판매 주문일자", minWidth: 160 },
  { field: "확정 전송 상태", minWidth: 120 },
  { field: "패키지 고유 번호", minWidth: 140 },
  { field: "패키지 명", minWidth: 100 },
  { field: "패키지 번호", minWidth: 100 },
  { field: "상품 고유 번호", minWidth: 120 },
  { field: "상품 번호", minWidth: 100 },
  { field: "상품 Pro.No", minWidth: 120 },
  { field: "상품 창고", minWidth: 100 },
  { field: "판매 유형 (경매 대상재 / 상시판매 대상재)", minWidth: 100 },
  { field: "판매 구분 (판매재 / 판매 제외재 / 판매 완료재)", minWidth: 100 },
  { field: "판매가 구분 (일반 / 특가)", minWidth: 100 },
  { field: "상시 판매가", minWidth: 100 },
  { field: "상시 판매 주문 상태", minWidth: 100 },
  { field: "제품 수량", minWidth: 100 },
  { field: "총 중량", minWidth: 100 },
  { field: "제품군", minWidth: 100 },
  { field: "규격 약호", minWidth: 100 },
  { field: "여재원인", minWidth: 100 },
  { field: "여재원인 명", minWidth: 100 },
  { field: "용도 코드", minWidth: 100 },
  { field: "용도명", minWidth: 100 },
  { field: "메모", minWidth: 100 },
  { field: "제품 낙찰 단가", minWidth: 100 },
  { field: "낙찰 총 단가 & 운임 총 단가", minWidth: 100 },
  { field: "제품 공급가", minWidth: 100 },
  { field: "제품대 부가세", minWidth: 100 },
  { field: "제품 금액 (VAT)", minWidth: 100 },
  { field: "운송비 공급가", minWidth: 100 },
  { field: "운송비 부가세", minWidth: 100 },
  { field: "운반비 금액 (VAT)", minWidth: 100 },
  { field: "기본 운임 단가", minWidth: 100 },
  { field: "할증 운임 단가", minWidth: 100 },
  { field: "총 공급가", minWidth: 100 },
  { field: "총 부가세", minWidth: 100 },
  { field: "합계 금액 (원/톤)", minWidth: 100 },
  { field: "고객사 고유 번호", minWidth: 100 },
  { field: "고객사 명", minWidth: 100 },
  { field: "고객사 코드", minWidth: 100 },
  { field: "승인 여부 (0: 미승인 / 1: 승인)", minWidth: 100 },
  { field: "목적지 고유 번호", minWidth: 100 },
  { field: "목적지 코드", minWidth: 100 },
  { field: "목적지 명", minWidth: 100 },
  { field: "고객사 목적지 고유 번호", minWidth: 100 },
  { field: "목적지 주소", minWidth: 100 },
  { field: "목적지 연락처", minWidth: 100 },
  { field: "목적지 담당자 연락처", minWidth: 100 },
  { field: "하차지 명", minWidth: 100 },
  { field: "변경 요청 목적지 명", minWidth: 100 },
  { field: "변경 요청 목적지 주소", minWidth: 100 },
  { field: "변경 요청 목적지 연락처", minWidth: 100 },
  { field: "변경 요청 목적지 담당자 연락처", minWidth: 100 },
  { field: "최종 수정자 고유번호", minWidth: 100 },
  { field: "최종 수정자", minWidth: 100 },
  { field: "최종 수정 일자", minWidth: 100 }
];

/**
 * @constant 테이블컬럼
 * @description 사용자 주문확인 상세 > 목록 테이블에서 사용합니다.
 */
export const userOrderDetailsFieldsCols = [
  { field: "", maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  { field: "고유 번호", minWidth: 100 },
  { field: "제품 번호", minWidth: 100 },
  { field: "규격 약호", minWidth: 100 },
  { field: "창고", minWidth: 100 },
  { field: "제품 사양", minWidth: 100 },
  { field: "두께", minWidth: 100 },
  { field: "폭", minWidth: 100 },
  { field: "길이", minWidth: 100 },
  { field: "중량", minWidth: 100 },
  { field: "제품 등급", minWidth: 100 },
  { field: "용도 코드", minWidth: 100 },
  { field: "용도명", minWidth: 100 },
  { field: "C%", minWidth: 100 },
  { field: "Si", minWidth: 100 },
  { field: "Mn", minWidth: 100 },
  { field: "P", minWidth: 100 },
  { field: "S", minWidth: 100 },
  { field: "TS", minWidth: 100 },
  { field: "YP", minWidth: 100 },
  { field: "EL", minWidth: 100 },
  { field: "제품군명", minWidth: 100 },
  { field: "제품명", minWidth: 100 },
  { field: "정척 여부", minWidth: 100 },
  { field: "여재 원인 코드", minWidth: 100 },
  { field: "여재 원인명", minWidth: 100 },
  { field: "입고일", minWidth: 100 },
  { field: "유찰 횟수", minWidth: 100 },
  { field: "제품 상태", minWidth: 100 },
  { field: "경매 등록 상태", minWidth: 100 },
  { field: "매입처", minWidth: 100 },
  { field: "제조사", minWidth: 100 },
  { field: "판매 구분", minWidth: 100 },
  { field: "판매 제외 사유", minWidth: 100 },
  { field: "재고 상태", minWidth: 100 },
  { field: "판매 유형", minWidth: 100 },
  { field: "입고 상태", minWidth: 100 },
  { field: "상시 판매 상태", minWidth: 100 },
  { field: "판매가 유형", minWidth: 100 },
  { field: "추천 제품 여부", minWidth: 100 },
  { field: "등록 일자", minWidth: 100 },
  { field: "최종 수정 일자", minWidth: 100 },
  { field: "최종 수정자", minWidth: 100 },
  { field: "매입가", minWidth: 100 },
  { field: "노출 상태", minWidth: 100 },
  { field: "경매 시작 단가", minWidth: 100 },
  { field: "주문 상태", minWidth: 100 },
  { field: "클레임 진행 상태", minWidth: 100 },
  { field: "확정 전송 일자", minWidth: 100 },
  { field: "패키지명", minWidth: 100 },
  { field: "패키지번호", minWidth: 100 },
  { field: "Pro.No", minWidth: 100 },
  { field: "경매 번호", minWidth: 100 },
  { field: "제품 낙찰 단가", minWidth: 100 },
  { field: "낙찰 총 단가", minWidth: 100 },
  { field: "기본 운임 단가", minWidth: 100 },
  { field: "할증 운임 단가", minWidth: 100 },
  { field: "제품 공급가", minWidth: 100 },
  { field: "제품 부가세", minWidth: 100 },
  { field: "운반비 공급가", minWidth: 100 },
  { field: "운반비 부가세", minWidth: 100 },
  { field: "목적지명", minWidth: 100 },
  { field: "낙찰 상태", minWidth: 100 },
  { field: "메모", minWidth: 100 },
  { field: "비고", minWidth: 100 },
  { field: "상시 판매가", minWidth: 100 },
]

/**
 * @constant 테이블컬럼
 * @description 사용자 주문확인 상세 > 목적지 변경 모달에서 사용합니다.
 */
export const userDestinationFieldsCols = [
  { field: "", maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  { field: '고객코드', maxWidth: 100 },
  { field: '비고', maxWidth: 100 },
  { field: '목적지 코드', maxWidth: 100 },
  { field: '목적지명', maxWidth: 100 },
  { field: '하차지명', maxWidth: 100 },
  { field: '담당자 연락처', maxWidth: 100 },
  { field: '하차지 연락처', maxWidth: 100 },
  { field: '상세주소', maxWidth: 100 },
]