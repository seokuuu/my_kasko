import { atom, useAtom } from 'jotai'

// Standard - destination

export const adminDestnationPopup = atom(false)

// 판매 구분 변경

// 리퀘스트 파라미터 객체

export const changeCategoryAtom = atom({
  saleCategory: '판매완료재', // 판매재, 판매제외재, 판매완료재
  excludeSaleReason: '', // 판매 제외재 사유
  numbers: [], // 제품번호 목록
})
export const changeSaleTypeAtom = atom({
  saleType: '경매 대상재', // 경매 대상재 / 상시판매 대상재
  salePrice: '', // 상시 판매가
  numbers: [], // 제품번호 목록
})
