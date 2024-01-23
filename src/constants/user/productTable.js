import WishCellRenderer from "../../pages/Table/WishCellRenderer";
import { checkboxSelection, headerCheckboxSelection } from "../../pages/Table/util";
import { getNormalTableRows } from "../../utils/table";
import { PROD_COL_NAME } from "./constantKey";

/**
 * @constant 테이블컬럼 라벨 - 변수명 바인딩 객체
 * @description 사용자 주문확인 > 단일 테이블에서 사용합니다.
*/
export const userSingleProductField = {
  [PROD_COL_NAME.productUid]: "uid",
  "상시판매 번호": "orderNumber",
  "상시판매 주문일자": "saleOrderDate",
  [PROD_COL_NAME.productNumber]: "number",
  "프로넘(ProNo.)": "productNoNumber",
  "창고": "storageName",
  "상시판매 상태": "saleStatus",
  "승인상태": "approvalStatus",
  "판매유형": "saleType",
  "판매가유형": "salePriceType",
  "제품군": "spart",
  "제품 등급": "grade",
  [PROD_COL_NAME.salePrice]: "salePrice",
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
  [PROD_COL_NAME.productUid]: "uid",
  "상시판매 번호": "auctionNumber",
  "상시판매 주문일자": "orderDate",
  "패키지명": "name",
  [PROD_COL_NAME.packageNumber]: "number",
  "상시판매 상태": "saleStatus",
  "판매유형": "saleType",
  [PROD_COL_NAME.salePrice]: "price",
  "제품 수량" : "quantity",
  "중량 합계" : "totalWeight",
  "목적지 코드": "destinationCode",
  "목적지 명": "destinationName",
  "목적지 주소": "customerDestinationAddress",
  "목적지 연락처(사무실)": "customerDestinationPhone",
  "목적지담당자 연락처(휴대폰)": "customerDestinationManagerPhone",
  "하차지 명": "customerDestinationName",
  "메모": "memo",
};

/**
 * @constant 테이블컬럼 라벨 - 변수명 바인딩 객체
 * @description 사용자 주문확인 > 패키지 상세보기 테이블에서 사용합니다.
 */
export const userPackageDetailsField = {
  "패키지 고유 번호": "packageUid",
  "패키지 명": "packageName",
  [PROD_COL_NAME.packageNumber]: "packageNumber",
  "수량": "quantity",
  "총 중량": "totalWeight",
  "제품 고유 번호": "productUid",
  "제품 창고 명": "storage",
  "제품 매입처": "supplier",
  "제품 제조사": "maker",
  "제품 경매 번호": "auctionNumber",
  "제품 판매 유형": "saleType",
  "제품 판매 구분": "saleCategory",
  "제품 판매가 유형": "saleTypePrice",
  "제품군": "spart",
  "제품 중량": "weight",
  "제품 메모": "memo",
  "제품 비고": "note",
  "제품 낙찰 단가": "productBiddingPrice",
  "낙찰 총 단가": "totalBiddingPrice",
  "제품 공급가": "orderPrice",
  "제품 부가세": "orderPriceVat",
  "경매 시작가": "auctionStartPrice",
  "최종 수정자": "updater",
  "최종 수정일자": "updateDate",
  "상시판매 시작가": "packagePrice"
}

/**
 * @constant 테이블컬럼
 * @description 사용자 주문확인 > 단일 테이블에서 사용합니다.
 */
export const userSingleProductFieldsCols = getNormalTableRows([
  { field: "", maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  { field: PROD_COL_NAME.productUid, minWidth: 100 },
  { field: "상시판매 번호", minWidth: 100 },
  { field: "상시판매 주문일자", minWidth: 100 },
  { field: PROD_COL_NAME.productNumber, minWidth: 100, cellRenderer: WishCellRenderer },
  { field: "프로넘(ProNo.)", minWidth: 100 },
  { field: "창고", minWidth: 100 },
  { field: "상시판매 상태", minWidth: 100 },
  { field: "승인상태", minWidth: 100 },
  { field: "판매유형", minWidth: 100 },
  { field: "판매가유형", minWidth: 100 },
  { field: "제품군", minWidth: 100 },
  { field: "제품 등급", minWidth: 100 },
  { field: PROD_COL_NAME.salePrice, minWidth: 100 },
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
])

/**
 * @constant 테이블컬럼
 * @description 사용자 주문확인 > 패키지 테이블에서 사용합니다.
 */
export const getUserPackageProductFieldsCols = (numberClickHandler=undefined) => getNormalTableRows([
  { field: "", maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  { field: PROD_COL_NAME.productUid, minWidth: 100 },
  { field: "상시판매 번호", minWidth: 100 },
  { field: "상시판매 주문일자", minWidth: 100 },
  { field: "패키지명", minWidth: 100 },
  { 
    field: PROD_COL_NAME.packageNumber, 
    minWidth: 100, 
    cellRenderer: WishCellRenderer, 
    valueGetter: (v) => ({...v.data[v.column.colId], clickHandler: numberClickHandler }) 
  },
  { field: "상시판매 상태", minWidth: 100 },
  { field: "판매유형", minWidth: 100 },
  { field: PROD_COL_NAME.salePrice, minWidth: 100 },
  { field: "제품 수량", minWidth: 100 },
  { field: "중량 합계", minWidth: 100 },
  { field: "목적지 코드", minWidth: 100 },
  { field: "목적지 명", minWidth: 100 },
  { field: "목적지 주소", minWidth: 100 },
  { field: "목적지 연락처(사무실)", minWidth: 100 },
  { field: "목적지담당자 연락처(휴대폰)", minWidth: 100 },
  { field: "하차지 명", minWidth: 100 },
  { field: "메모", minWidth: 100 },
])

export const getUserPackageDetailsFieldsCols = getNormalTableRows([
  { field: "", maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  { field: "패키지 고유 번호", minWidth: 100 },
  { field: "패키지 명", minWidth: 100 },
  { field: PROD_COL_NAME.packageNumber, minWidth: 100, cellRenderer: WishCellRenderer,  },
  { field: "수량", minWidth: 100 },
  { field: "총 중량", minWidth: 100 },
  { field: "제품 고유 번호", minWidth: 100 },
  { field: "제품 창고 명", minWidth: 100 },
  { field: "제품 매입처", minWidth: 100 },
  { field: "제품 제조사", minWidth: 100 },
  { field: "제품 경매 번호", minWidth: 100 },
  { field: "제품 판매 유형", minWidth: 100 },
  { field: "제품 판매 구분", minWidth: 100 },
  { field: "제품 판매가 유형", minWidth: 100 },
  { field: "제품군", minWidth: 100 },
  { field: "제품 중량", minWidth: 100 },
  { field: "제품 메모", minWidth: 100 },
  { field: "제품 비고", minWidth: 100 },
  { field: "제품 낙찰 단가", minWidth: 100 },
  { field: "낙찰 총 단가", minWidth: 100 },
  { field: "제품 공급가", minWidth: 100 },
  { field: "제품 부가세", minWidth: 100 },
  { field: "경매 시작가", minWidth: 100 },
  { field: "최종 수정자", minWidth: 100 },
  { field: "최종 수정일자", minWidth: 100 }
]);