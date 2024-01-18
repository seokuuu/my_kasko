import { useAtom } from 'jotai'
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { wishProductNumbersAtom } from '../store/Product';

/**
 * @constant 스토리지 키
 */
const TOKEN_STORAGE_KEY = 'accessToken';
const WISH_STORAGE_KEY = 'ksk_wish';

/**
 * @constant 위시리스트 최대 갯수
 */
const MAX_WISH_COUNT = 10;

/**
 * 위시리스트 스토리지 저장 키 반환 함수
 * @param {string} userId 
 * @returns {string} 
 */
const USER_WISH_STORAGE_KEY = (userId) => `${WISH_STORAGE_KEY}_${userId}`; 


/**
 * 관심상품 HOOK
 */
export default function useWishList() {
  const [wishProdNums, setWishProdNums] = useAtom(wishProductNumbersAtom);
  const [userId, setUserId] = useState('');
  
  /**
   * 위시리스트에 상품 추가 함수
   * @param {object[]} products 상품 목록 
   * @param {string} prodNumKey 상품 object에서 productNumber를 가져올 수 있는 key 
   */
  function addWishList(products=[], prodNumKey='number') {
    if(!userId) {
      return alert('로그인 후 이용해 주세요.');
    }

    if(products.length < 1) {
      return;
    }

    const addProdNums = products.map(v => getProductNumber(v[prodNumKey])).filter(v => v.length > 0);
    const mergedProdNums = getMergedProdNums(wishProdNums, addProdNums);

    setWishProdNums(mergedProdNums);
    saveWishList(mergedProdNums, userId);
    alert('관심상품으로 등록하였습니다.');
  }

  // 로그인유저 관심상품목록 설정
  useEffect(() => {
    const token = sessionStorage.getItem(TOKEN_STORAGE_KEY);

    if(token) {
      const userId = jwtDecode(token)?.sub || '';
      setUserId(userId);
      setWishProdNums(getWishList(userId));
    }
  }, []);

  return ({
    wishProdNums,
    addWishList
  })
}

/* ==================== UTILS start ==================== */
/**
 * 위시리스트 상품UID 목록 반환 함수
 * @param {string[]} prevProdNums 이전에 저장된 ProductNumber 목록
 * @param {string[]} addProdNums 새로 저장할 ProductNumber 목록
 * @returns {string[]} 스토리지에 저장할 ProductNumber 목록
 */
function getMergedProdNums(prevProdNums=[], addProdNums=[]) {
  const mergedProdNums = [...addProdNums].slice(0, MAX_WISH_COUNT);

  if(prevProdNums.length > 0 && mergedProdNums.length < MAX_WISH_COUNT) {
    let idx = 0;
    while(idx < prevProdNums.length && mergedProdNums.length < MAX_WISH_COUNT) {
      if(!mergedProdNums.includes(prevProdNums[idx])) mergedProdNums.push(prevProdNums[idx]);
      idx++;
    }
  }
  return mergedProdNums;
}

/**
 * 스토리지 위시리시트 반환 함수
 * @param {string} userId 
 * @returns {string[]} 위시리스트 ProductNumber 목록
 */
function getWishList(userId='') {
  const savedData = sessionStorage.getItem(USER_WISH_STORAGE_KEY(userId));
  const parsedData = savedData? JSON.parse(savedData) : [];
  return parsedData;
}

/**
 * 위시리트스 스토리지 저장 함수
 * @param {string[]} productNumbers 저장할 ProductNumber 목록
 * @param {string} userId 사용자 아이디
 */
function saveWishList(productNumbers=[], userId='') {
  if(userId.length > 0) {
    sessionStorage.setItem(
      USER_WISH_STORAGE_KEY(userId), 
      JSON.stringify(productNumbers)
    );
  }
}

/**
 * 제품번호 반환 함수
 * @description
 * 테이블 셀에서 데이터를 가져오기 때문에 제품번호 셀에 관심상품을 노출할 경우,
 * 테이블 데이터는 { value: [productNumnber], wish: false }의 value 형식을 갖게 됩니다.
 * 위 형식에서 value만을 추출하는 함수입니다.
 */
export function getProductNumber(value) {
  if(typeof value === 'string') {
    return value + '';
  }
  if(typeof value === 'object') {
    return value?.value || ''
  }
  return '';
}
/* ==================== UTILS end ==================== */