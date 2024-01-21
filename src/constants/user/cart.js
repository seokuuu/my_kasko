import WishCellRenderer from "../../pages/Table/WishCellRenderer";
import { checkboxSelection, headerCheckboxSelection } from '../../pages/Table/util';

/**
 * @constant 테이블컬럼 라벨 - 변수명 바인딩 객체
 * @description 사용자 장바구니 > 단일 테이블에서 사용합니다.
 */
export const userCartListSingleField = {
  "고유 번호": "productUid",
  "제품번호": "number",
  "규격 약호": "spec",
  "창고": "storage",
  "창고명": "storageName",
  "제품 사양": "wdh",
  "길이": "thickness",
  "폭": "width",
  "규격약호": "length",
  "중량": "weight",
  "등급": "grade",
  "c": "c",
  "si": "si",
  "mn": "mn",
  "p": "p",
  "s": "s",
  "ts": "ts",
  "yp": "yp",
  "el": "el",
  "용도 코드": "usageCode",
  "용도명": "usageCodeName",
  "제품군 코드": "spartCode",
  "제품군": "spart",
  "제품명": "name",
  "정척여부": "preferThickness",
  "여재원인코드": "causeCode",
  "여재원인명": "causeCodeName",
  "입고일": "receiptDate",
  "제품 상태": "productStatus",
  "경매 등록 상태": "registrationStatus",
  "매입처": "supplier",
  "제조사": "maker",
  "판매구분": "saleCategory",
  "판매제외재 사유": "excludeSaleReason",
  "재고 상태": "stockStatus",
  "입고 상태": "receiptStatus",
  "상시판매 주문 상태": "saleStatus",
  "판매 유형": "saleType",
  "판매가 구분": "salePriceType",
  "상시 판매가": "salePrice"  
};

/**
 * @constant 테이블컬럼 라벨 - 변수명 바인딩 객체
 * @description 사용자 장바구니 > 패키지 테이블에서 사용합니다.
 */
export const userCartListPackageField = {
  "패키지 고유 번호" :"packageUid",
  "패키지 이름" :"packageName",
  "패키지 번호" :"packageNumber",
  "패지키 판매 유형" :"packageSaleType",
  "패키지 판매 구분" :"packageSaleCategory",
  "패키지 상시 판매가" :"packageSalePrice",
  "패키지 상품 총 개수" :"packageQuantity",
  "패키지 상품 총 중량" :"packageTotalWeight",
};

/**
 * @constant 테이블컬럼
 * @description 사용자 장바구니 > 단일 테이블에서 사용합니다.
 */
export const userCartListSingleFieldsCols = [
  { field: '', maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  { field: "제품번호", minWidth: 100,  cellRenderer: WishCellRenderer },
  { field: "규격 약호", minWidth: 100 },
  { field: "창고", minWidth: 100 },
  { field: "창고명", minWidth: 100 },
  { field: "제품 사양", minWidth: 180 },
  { field: "길이", minWidth: 100 },
  { field: "폭", minWidth: 100 },
  { field: "규격약호", minWidth: 100 },
  { field: "중량", minWidth: 100 },
  { field: "등급", minWidth: 100 },
  { field: "c", minWidth: 100 },
  { field: "si", minWidth: 100 },
  { field: "mn", minWidth: 100 },
  { field: "p", minWidth: 100 },
  { field: "s", minWidth: 100 },
  { field: "ts", minWidth: 100 },
  { field: "yp", minWidth: 100 },
  { field: "el", minWidth: 100 },
  { field: "용도 코드", minWidth: 100 },
  { field: "용도명", minWidth: 130 },
  { field: "제품군 코드", minWidth: 100 },
  { field: "제품군", minWidth: 100 },
  { field: "제품명", minWidth: 100 },
  { field: "정척여부", minWidth: 100 },
  { field: "여재원인코드", minWidth: 100 },
  { field: "여재원인명", minWidth: 100 },
  { field: "입고일", minWidth: 100 },
  { field: "제품 상태", minWidth: 100 },
  { field: "경매 등록 상태", minWidth: 130 },
  { field: "매입처", minWidth: 100 },
  { field: "제조사", minWidth: 100 },
  { field: "판매구분", minWidth: 100 },
  { field: "판매제외재 사유", minWidth: 130 },
  { field: "재고 상태", minWidth: 100 },
  { field: "입고 상태", minWidth: 100 },
  { field: "상시판매 주문 상태", minWidth: 160 },
  { field: "판매 유형", minWidth: 130 },
  { field: "판매가 구분", minWidth: 100 },
  { field: "상시 판매가", minWidth: 100 }
];

/**
 * @constant 테이블컬럼
 * @description 사용자 장바구니 > 패키지 테이블에서 사용합니다.
 */
export const userCartListPackageFieldCols = (numberClickHandler=undefined) =>  [
  { field: '', maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  {field: "패키지 이름", minWidth: 100 },
  { 
    field: "패키지 번호", 
    minWidth: 100, 
    cellRenderer: WishCellRenderer, 
    valueGetter: (v) => ({...v.data[v.column.colId], clickHandler: numberClickHandler }) 
  },
  {field: "패지키 판매 유형", minWidth: 130 },
  {field: "패키지 판매 구분" , minWidth: 130  },
  {field: "패키지 상시 판매가" , minWidth: 150 },
  {field: "패키지 상품 총 개수" , minWidth: 150 },
  {field: "패키지 상품 총 중량" , minWidth: 150  },
];