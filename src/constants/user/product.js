import { checkboxSelection, headerCheckboxSelection } from "../../pages/Table/util";

/**
 * @constant 상품 카테고리(단일|패키지)
 */
export const PROD_CATEGORY = {
  single: 'SINGLE',
  package: 'PACKAGE',
}

/**
 * @constant 테이블컬럼 라벨 - 변수명 바인딩 객체
 * @description 사용자 주문확인 > 단일 테이블에서 사용합니다.
*/
export const userSingleProductField = {
  "고유 번호": "uid",
  "상시판매 번호": "orderNumber",
  "상시판매 주문일자": "saleOrderDate",
  "제품번호": "number",
  "프로넘(ProNo.)": "productNoNumber",
  "창고": "storageName",
  "상시판매 상태": "saleStatus",
  "승인상태": "approvalStatus",
  "판매유형": "saleType",
  "판매가유형": "salePriceType",
  "제품군": "spart",
  "제품 등급": "grade",
  "상시 판매가": "salePrice",
  "목적지 코드": "destinationCode",
  "목적지 명": "destinationName",
  "목적지 주소": "customerDestinationAddress",
  "목적지 연락처(사무실)": "customerDestinationPhone",
  "목적지담당자 연락처(휴대폰)": "customerDestinationManagerPhone",
  "하차지 명": "customerDestinationName",
  "두께": "thickness",
  "폭": "width",
  "길이": "length",
  "중량": "weight",
  "규격 약호": "spec",
  "TS": "ts",
  "YP": "yp",
  "C%": "c",
  "EL": "el",
  "Si": "si",
  "MN": "mn",
  "P": "p",
  "S": "s",
  "여재원인": "causeCode",
  "여재원인명1": "causeCodeName",
  "용도 코드": "usageCode",
  "용도명": "usageCodeName",
  "메모": "productMemo",
};

/**
 * @constant 테이블컬럼 라벨 - 변수명 바인딩 객체
 * @description 사용자 주문확인 > 패키지 테이블에서 사용합니다.
 */
export const userPackageProductField = {
  "고유 번호": "orderUid",
  "상시판매 번호": "auctionNumber",
  "상시판매 주문일자": "auctionCreateDate",
  "패키지명": "packageName",
  "패키지번호": "packageNumber",
  "창고": "storageName",
  "상시판매 상태": "orderStatus",
  "승인상태": "approvalStatus",
  "판매유형": "saleType",
  "판매가유형": "salePriceType",
  "제품군": "spart",
  "상시 판매가": "salePrice",
  "제품 수량" : "",
  "중량 합계" : "",
  "제품 금액(VAT포함)": "totalOrderPrice",
  "운반비 금액(VAT포함)": "freightCostVat",
  "합계금액(원/톤)": "totalPrice",
  "목적지 코드": "customerDestinationCode",
  "목적지 명": "custonerDestinationName",
  "목적지 주소": "customerDestinationAddress",
  "목적지 연락처(사무실)": "customerDestinationPhone",
  "목적지담당자 연락처(휴대폰)": "customerDestinationManagerPhone",
  "하차지 명": "customerDestinationName",
  "메모": "productMemo",
};

/**
 * @constant 테이블컬럼
 * @description 사용자 주문확인 > 단일 테이블에서 사용합니다.
 */
export const userSingleProductFieldsCols = [
  { field: "", maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  { field: "고유 번호", minWidth: 100 },
  { field: "상시판매 번호", minWidth: 100 },
  { field: "상시판매 주문일자", minWidth: 100 },
  { field: "제품번호", minWidth: 100 },
  { field: "프로넘(ProNo.)", minWidth: 100 },
  { field: "창고", minWidth: 100 },
  { field: "상시판매 상태", minWidth: 100 },
  { field: "승인상태", minWidth: 100 },
  { field: "판매유형", minWidth: 100 },
  { field: "판매가유형", minWidth: 100 },
  { field: "제품군", minWidth: 100 },
  { field: "제품 등급", minWidth: 100 },
  { field: "상시 판매가", minWidth: 100 },
  { field: "목적지 코드", minWidth: 100 },
  { field: "목적지 명", minWidth: 100 },
  { field: "목적지 주소", minWidth: 100 },
  { field: "목적지 연락처(사무실)", minWidth: 100 },
  { field: "목적지담당자 연락처(휴대폰)", minWidth: 100 },
  { field: "하차지 명", minWidth: 100 },
  { field: "두께", minWidth: 100 },
  { field: "폭", minWidth: 100 },
  { field: "길이", minWidth: 100 },
  { field: "중량", minWidth: 100 },
  { field: "규격 약호", minWidth: 100 },
  { field: "TS", minWidth: 100 },
  { field: "YP", minWidth: 100 },
  { field: "C%", minWidth: 100 },
  { field: "EL", minWidth: 100 },
  { field: "Si", minWidth: 100 },
  { field: "MN", minWidth: 100 },
  { field: "P", minWidth: 100 },
  { field: "S", minWidth: 100 },
  { field: "여재원인", minWidth: 100 },
  { field: "여재원인명1", minWidth: 100 },
  { field: "용도 코드", minWidth: 100 },
  { field: "용도명", minWidth: 100 },
  { field: "메모", minWidth: 100 },
];

/**
 * @constant 테이블컬럼
 * @description 사용자 주문확인 > 패키지 테이블에서 사용합니다.
 */
export const userPackageProductFieldsCols = [
  { field: "", maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  { field: "고유 번호", minWidth: 100 },
  { field: "상시판매 번호", minWidth: 100 },
  { field: "상시판매 주문일자", minWidth: 100 },
  { field: "패키지명", minWidth: 100 },
  { field: "패키지번호", minWidth: 100 },
  { field: "창고", minWidth: 100 },
  { field: "상시판매 상태", minWidth: 100 },
  { field: "승인상태", minWidth: 100 },
  { field: "판매유형", minWidth: 100 },
  { field: "판매가유형", minWidth: 100 },
  { field: "제품군", minWidth: 100 },
  { field: "상시 판매가", minWidth: 100 },
  { field: "제품 수량", minWidth: 100 },
  { field: "중량 합계", minWidth: 100 },
  { field: "제품 금액(VAT포함)", minWidth: 100 },
  { field: "운반비 금액(VAT포함)", minWidth: 100 },
  { field: "합계금액(원/톤)", minWidth: 100 },
  { field: "목적지 코드", minWidth: 100 },
  { field: "목적지 명", minWidth: 100 },
  { field: "목적지 주소", minWidth: 100 },
  { field: "목적지 연락처(사무실)", minWidth: 100 },
  { field: "목적지담당자 연락처(휴대폰)", minWidth: 100 },
  { field: "하차지 명", minWidth: 100 },
  { field: "메모", minWidth: 100 },
]