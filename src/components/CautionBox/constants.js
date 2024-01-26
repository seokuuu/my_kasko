/**
 * @constant 쿼리키
 */
export const CAUTION_QUERY_KEY = 'caution';

/**
 * @constant 주의사항 카테고리
 */
export const CAUTION_CATEGORY = Object.freeze({
  auction: 'auction',
  singleProduct: 'product',
  packageProduct: 'package',
  order: 'order',
  bid: 'bid'
});

/**
 * @constant 주의사항 카테고리 권한(한글)
 */
export const CAUTION_EDIT_AUTH = Object.freeze({
  [CAUTION_CATEGORY.auction]: ['경매관리'],
  [CAUTION_CATEGORY.singleProduct]: ['상시판매관리'],
  [CAUTION_CATEGORY.packageProduct]: ['상시판매관리'],
  [CAUTION_CATEGORY.order]: ['주문관리'],
  [CAUTION_CATEGORY.bid]: ['경매관리']
})

/**
 * @constant 에디터 옵션
 */
export const EDITOR_OPTIONS = {
  toolbar: {
    options: ['inline', 'textAlign', 'list', 'colorPicker'],
    inline: {
      monospace: { className: 'hidden-icon' },
      superscript: { className: 'hidden-icon' },
      subscript: { className: 'hidden-icon' },
    },
    list: {
      visible: true,
      inDropdown: false,
      unordered: { visible: true },
      ordered: { visible: true },
      indent: { className: 'hidden-icon' },
      outdent: { className: 'hidden-icon' }
    },
  }
}