import WishCellRenderer from "../../pages/Table/WishCellRenderer";
import { checkboxSelection, headerCheckboxSelection } from "../../pages/Table/util";

/**
 * @constant 테이블컬럼 라벨 - 변수명 바인딩 객체
 * @description 사용자 주문확인 > 목록 테이블에서 사용합니다.
*/
export const userOrderListField = {
  "주문 고유 번호": "orderUid",
  "상시판매 번호": "auctionNumber",
  "상시판매 주문일자": "auctionCreateDate",
  "상시판매 상태": "orderStatus",
  "패키지명": "packageName",
  "패키지번호": "packageNumber",
  "고객사명": "customerName",
  "고객코드": "customerCode",
  "제품번호": "productNumber",
  "프로넘(ProNo.)": "productProNumber",
  "창고": "storageName",
  "상시판매 상태": "saleStatus",
  "승인상태": "approvalStatus",
  "판매유형": "saleType",
  "판매가유형": "salePriceType",
  "제품군": "spart",
  "상시 판매가": "salePrice",
  "제품 등급": "grade",
  "제품 수량": "quantity",
  "총 중량": "totalWeight",
  "제품 금액(VAT포함)": "totalOrderPrice",
  "운반비 금액(VAT포함)": "totalFreightCost",
  "입금 요청액": "salePrice",
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
 * @description 사용자 주문확인 상세 > 목록 테이블에서 사용합니다.
 */
export const userOrderDetailsField = {
  "고유 번호": "orderUid",
  "상시판매 번호": "auctionNumber",
  "상시판매 주문일자": "auctionCreateDate",
  "상시판매 상태": "orderStatus",
  "패키지명": "packageName",
  "패키지번호": "packageNumber",
  "고객사명": "customerName",
  "고객코드": "customerCode",
  "제품번호": "productNumber",
  "프로넘(ProNo.)": "productProNumber",
  "창고": "storageName",
  "상시판매 상태": "saleStatus",
  "승인상태": "approvalStatus",
  "판매유형": "saleType",
  "판매가유형": "salePriceType",
  "제품군": "spart",
  "상시 판매가": "salePrice",
  "제품 등급": "grade",
  "목적지 코드": "customerDestinationCode",
  "목적지 명": "custonerDestinationName",
  "목적지 주소": "customerDestinationAddress",
  "목적지 연락처(사무실)": "customerDestinationPhone",
  "목적지담당자 연락처(휴대폰)": "customerDestinationManagerPhone",
  "하차지 명": "customerDestinationName",
  "변경요청 목적지명": "requestDestinationName",
  "변경요청 목적지 주소": "requestCustomerDestinationAddress",
  "변경요청 목적지 연락처": "requestCustomerDestinationPhone",
  "제품 단가(원/톤)": "productBiddingPrice",
  "제품 공급가(원/톤)": "orderPrice",
  "제품 부가세(원/톤)": "orderPriceVat",
  "제품 금액(VAT포함)": "totalOrderPrice",
  "기본 운임 단가(원/톤)": "freightFee",
  "할증 운임 단가(원/톤)": "extraUnitPrice",
  "운임 총단가": "totalFreightCost",
  "운반비 공급가(원/톤)": "freightCost",
  "운반비 부가세(원/톤)": "freightCostVat",
  "운반비 금액(VAT포함)": "freightCostVat",
  "총공급가(원/톤)": "totalSupplyPrice",
  "총부가세(원/톤)": "totalVat",
  "합계금액(원/톤)": "totalPrice",
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
  { field: "상시판매 번호", minWidth: 140 },
  { field: "상시판매 주문일자", minWidth: 140 },
  { field: "상시판매 상태", minWidth: 140 },
  { field: "패키지명", minWidth: 100 },
  { field: "패키지번호", minWidth: 100 },
  { field: "고객사명", minWidth: 100 },
  { field: "고객코드", minWidth: 100 },
  { field: "제품번호", minWidth: 100,  cellRenderer: WishCellRenderer },
  { field: "프로넘(ProNo.)", minWidth: 100 },
  { field: "창고", minWidth: 100 },
  { field: "상시판매 상태", minWidth: 140 },
  { field: "승인상태", minWidth: 100 },
  { field: "판매유형", minWidth: 100 },
  { field: "판매가유형", minWidth: 140 },
  { field: "제품군", minWidth: 100 },
  { field: "상시 판매가", minWidth: 140 },
  { field: "제품 등급", minWidth: 140 },
  { field: "제품 수량", minWidth: 140 },
  { field: "총 중량", minWidth: 140 },
  { field: "제품 금액(VAT포함)", minWidth: 140 },
  { field: "운반비 금액(VAT포함)", minWidth: 140 },
  { field: "입금 요청액", minWidth: 140 },
  { field: "목적지 코드", minWidth: 140 },
  { field: "목적지 명", minWidth: 140 },
  { field: "목적지 주소", minWidth: 140 },
  { field: "목적지 연락처(사무실)", minWidth: 140 },
  { field: "목적지담당자 연락처(휴대폰)", minWidth: 140 },
  { field: "하차지 명", minWidth: 140 },
  { field: "두께", minWidth: 140 },
  { field: "폭", minWidth: 140 },
  { field: "길이", minWidth: 140 },
  { field: "중량", minWidth: 140 },
  { field: "규격 약호", minWidth: 140 },
  { field: "TS", minWidth: 100 },
  { field: "YP", minWidth: 100 },
  { field: "C%", minWidth: 100 },
  { field: "EL", minWidth: 100 },
  { field: "Si", minWidth: 100 },
  { field: "MN", minWidth: 100 },
  { field: "P", minWidth: 100 },
  { field: "S", minWidth: 100 },
  { field: "여재원인", minWidth: 100 },
  { field: "여재원인명1", minWidth: 140 },
  { field: "용도 코드", minWidth: 100 },
  { field: "용도명", minWidth: 100 },
  { field: "메모", minWidth: 140 },
];

/**
 * @constant 테이블컬럼
 * @description 사용자 주문확인 상세 > 목록 테이블에서 사용합니다.
 */
export const userOrderDetailsFieldsCols = [
  { field: "", maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  { field: "고유 번호", minWidth: 100 },
  { field: "상시판매 번호", minWidth: 100 },
  { field: "상시판매 주문일자", minWidth: 100 },
  { field: "상시판매 상태", minWidth: 100 },
  { field: "패키지명", minWidth: 100 },
  { field: "패키지번호", minWidth: 100 },
  { field: "고객사명", minWidth: 100 },
  { field: "고객코드", minWidth: 100 },
  { field: "제품번호", minWidth: 100,  cellRenderer: WishCellRenderer },
  { field: "프로넘(ProNo.)", minWidth: 100 },
  { field: "창고", minWidth: 100 },
  { field: "상시판매 상태", minWidth: 100 },
  { field: "승인상태", minWidth: 100 },
  { field: "판매유형", minWidth: 100 },
  { field: "판매가유형", minWidth: 100 },
  { field: "제품군", minWidth: 100 },
  { field: "상시 판매가", minWidth: 100 },
  { field: "제품 등급", minWidth: 100 },
  { field: "목적지 코드", minWidth: 100 },
  { field: "목적지 명", minWidth: 100 },
  { field: "목적지 주소", minWidth: 100 },
  { field: "목적지 연락처(사무실)", minWidth: 100 },
  { field: "목적지담당자 연락처(휴대폰)", minWidth: 100 },
  { field: "하차지 명", minWidth: 100 },
  { field: "변경요청 목적지명", minWidth: 100 },
  { field: "변경요청 목적지 주소", minWidth: 100 },
  { field: "변경요청 목적지 연락처", minWidth: 100 },
  { field: "제품 단가(원/톤)", minWidth: 100 },
  { field: "제품 공급가(원/톤)", minWidth: 100 },
  { field: "제품 부가세(원/톤)", minWidth: 100 },
  { field: "제품 금액(VAT포함)", minWidth: 100 },
  { field: "기본 운임 단가(원/톤)", minWidth: 100 },
  { field: "할증 운임 단가(원/톤)", minWidth: 100 },
  { field: "운임 총단가", minWidth: 100 },
  { field: "운반비 공급가(원/톤)", minWidth: 100 },
  { field: "운반비 부가세(원/톤)", minWidth: 100 },
  { field: "운반비 금액(VAT포함)", minWidth: 100 },
  { field: "총공급가(원/톤)", minWidth: 100 },
  { field: "총북가세(원/톤)", minWidth: 100 },
  { field: "합계금액(원/톤)", minWidth: 100 },
  { field: "운송진행", minWidth: 100 },
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