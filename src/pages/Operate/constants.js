// 일반관리 탭 옵션
export const normalTabOptions = [
  {
    text: '클레임 관리',
    value: 'claim',
    link: '/operate/common',
  },
  {
    text: 'FAQ 관리',
    value: 'faq',
    link: '/operate/faq',
  },
  {
    text: '공지사항',
    value: 'notice',
    link: '/operate/notice',
  },
  {
    text: '자료실',
    value: 'datasheet',
    link: '/operate/datasheet',
  },
]

/* ==============================
    운영 관리 - FAQ 관리
============================== */

// FAQ 관리 검색 카테고리 셀렉트 박스 옵션
export const searchCategoryOptions = [
  {
    value: '제목',
    label: '제목',
  },
  {
    value: '카테고리',
    label: '카테고리',
  },
]

// FAQ 목록 검색 옵션 초기값
export const faqListSearchInitValue = {
  pageNum: 1,
  pageSize: 10,
  category: searchCategoryOptions[0],
  keyword: '',
}

/* ==============================
    운영 관리 - 공지사항 관리
============================== */
// 공지사항&자료실 관리 검색 카테고리 셀렉트 박스 옵션
export const noticeSearchCategoryOptions = [
  {
    value: '제목',
    label: '제목',
  },
  {
    value: '작성자',
    label: '작성자',
  },
]

// 공지사항&자료실 목록 검색 옵션 초기값
export const noticeListSearchInitValue = {
  pageNum: 1,
  pageSize: 10,
  category: noticeSearchCategoryOptions[0],
  keyword: '',
  type: '공지사항',
}
