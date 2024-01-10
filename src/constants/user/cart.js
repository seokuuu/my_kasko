import { checkboxSelection, headerCheckboxSelection } from '../../pages/Table/util';
import RecommendCellRenderer from "../../pages/Table/RecommendCellRenderer"
import RecommendCellRenderer2 from "../../pages/Table/RecommendCellRenderer2"

/**
 * @constant 테이블컬럼 라벨 - 변수명 바인딩 객체
 * @description 사용자 장바구니 > 단일 테이블에서 사용합니다.
 */
export const userCartListSingleField = {
  '고유 번호': 'uid',
  '순번': 'index',
  '상시판매 번호': 'auctionNumber',
  '상시판매 주문일자': 'auctionCreateDate',
  '제품 번호': 'number',
  '프로넘(ProNo.)': 'productProNumber',
  '창고': 'storageName',
  '상시판매 상태': 'saleStatus',
  '승인상태': 'approvalStatus',
  '판매유형': 'saleType',
  '판매가유형': 'saleCategory',
  '제품군': 'spart',
  '제품등급': 'grade',
  '상시판매가': 'salePrice',
  '목적지 코드': 'destinationCode',
  '목적지 명': 'destinationName',
  '목적지 주소': 'customerDestinationAddress',
  '목적지 연락처(사무실)': 'customerDestinationPhone',
  '목적지담당자 연락처(휴대폰)': 'customerDestinationManagerPhone',
  '하차지명': 'customerDestinationName',
  '두께': 'thickness',
  '폭': 'width',
  '길이': 'length',
  '중량': 'weight',
  '규격약호': 'spec',
  'TS': 'ts',
  'YP': 'yp',
  'C%': 'c',
  'EL': 'el',
  'SI': 'si',
  'MN': 'mn',
  'P': 'p',
  'S': 's',
  '여재원인': 'causeCode',
  '여재원인명1': 'causeCodeName',
  '용도코드': 'usageCode',
  '용도명': 'usageCodeName',
  '메모': 'memo',
};

/**
 * @constant 테이블컬럼 라벨 - 변수명 바인딩 객체
 * @description 사용자 장바구니 > 패키지 테이블에서 사용합니다.
 */
export const userCartListPackageField = {};

/**
 * @constant 테이블컬럼
 * @description 사용자 장바구니 > 단일 테이블에서 사용합니다.
 */
export const userCartListSingleFieldsCols = [
  { field: '', maxWidth: 50, checkboxSelection: checkboxSelection, headerCheckboxSelection: headerCheckboxSelection },
  { field: '순번', minWidth: 100 },
  { field: '상시판매 번호', minWidth: 110 },
  { field: '상시판매 주문일자', minWidth: 130 },
  // { field: '제품 번호', minWidth: 100 },
  { field: '제품 번호', minWidth: 100,cellRenderer:RecommendCellRenderer,cellRendererParams:{
    uidFieldName:'제품 번호',
    editType:'recommend'
  } },
  { field: '프로넘(ProNo.)', minWidth: 110 },
  { field: '창고', minWidth: 100 },
  { field: '상시판매 상태', minWidth: 110 },
  { field: '승인상태', minWidth: 100 },
  { field: '판매유형', minWidth: 130 },
  { field: '판매가유형', minWidth: 100 },
  { field: '제품군', minWidth: 100 },
  { field: '제품등급', minWidth: 100 },
  { field: '상시판매가', minWidth: 100 },
  { field: '목적지 코드', minWidth: 100 },
  { field: '목적지 명', minWidth: 100 },
  { field: '목적지 주소', minWidth: 100 },
  { field: '목적지 연락처(사무실)', minWidth: 160 },
  { field: '목적지담당자 연락처(휴대폰)', minWidth: 200 },
  { field: '하차지명', minWidth: 100 },
  { field: '두께', minWidth: 100 },
  { field: '폭', minWidth: 100 },
  { field: '길이', minWidth: 100 },
  { field: '중량', minWidth: 100 },
  { field: '규격약호', minWidth: 100 },
  { field: 'TS', minWidth: 100 },
  { field: 'YP', minWidth: 100 },
  { field: 'C%', minWidth: 100 },
  { field: 'EL', minWidth: 100 },
  { field: 'SI', minWidth: 100 },
  { field: 'MN', minWidth: 100 },
  { field: 'P', minWidth: 100 },
  { field: 'S', minWidth: 100 },
  { field: '여재원인', minWidth: 100 },
  { field: '여재원인명1', minWidth: 100 },
  { field: '용도코드', minWidth: 100 },
  { field: '용도명', minWidth: 100 },
  { field: '메모', minWidth: 100 },
];

/**
 * @constant 테이블컬럼
 * @description 사용자 장바구니 > 패키지 테이블에서 사용합니다.
 */
export const userCartListPackageFieldCols = [];