import { useLayoutEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

/**
 * @constant 스토리지 키
 */
const TOKEN_STORAGE_KEY = 'accessToken';
const WISH_STORAGE_KEY = 'ksk_wish';

/**
 * @constant 위시리스트 최대 갯수
 */
const MAX_SAVE_COUNT = 10;

/**
 * 위시리스트 스토리지 저장 키 반환 함수
 * @param {string} userId 
 * @returns {string} 
 */
const USER_WISH_STORAGE_KEY = (userId) => `${WISH_STORAGE_KEY}_${userId}`; 

/**
 * 위시리스트 상품UID 목록 반환 함수
 * @param {string[]} prevUids 이전에 저장된 UID 목록
 * @param {string[]} nextUids 새로 저장할 UID 목록
 * @returns {string[]} 스토리지에 저장할 UID 목록
 */
function getMergedUids(prevUids=[], nextUids=[]) {
  const newUids = [...nextUids].slice(0, MAX_SAVE_COUNT);

  if(prevUids.length > 0 && newUids.length < MAX_SAVE_COUNT) {
    let idx = 0;
    while(idx < prevUids.length && newUids.length < MAX_SAVE_COUNT) {
      if(!newUids.includes(prevUids[idx])) newUids.push(prevUids[idx]);
      idx++;
    }
  }
  return newUids;
}

/**
 * 스토리지 위시리시트 반환 함수
 * @param {string} userId 
 * @returns {string[]} 위시리스트 UID목록
 */
function getWishList(userId='') {
  if(userId.length < 1) {
    return [];
  }
  const savedData = sessionStorage.getItem(USER_WISH_STORAGE_KEY(userId));
  const parsedData = savedData? JSON.parse(savedData) : [];
  return parsedData;
}

/**
 * 위시리트스 스토리지 저장 함수
 * @param {string[]} uids 저장할 UID 목록
 * @param {string} userId 사용자 아이디
 */
function saveWishList(uids=[], userId='') {
  if(userId.length < 1 || uids.length < 1) {
    return;
  }
  sessionStorage.setItem(USER_WISH_STORAGE_KEY(userId), JSON.stringify(uids));
  alert('관심상품으로 등록하였습니다.');
}

/**
 * 관심상품 HOOK
 */
export default function useWishList() {
  const [wishUids, setWishUids] = useState([]);
  const [userId, setUserId] = useState('');
  
  /**
   * 위시리스트에 상품 추가 함수
   * @param {object[]} products 상품 목록 
   * @param {string} uidKey 상품 object에서 uid를 가져올 수 있는 key 
   */
  function addWishList(products, uidKey='uid') {
    if(!userId) {
      return alert('로그인 후 이용해 주세요.');
    }

    const newUids = products.map(v => v[uidKey]+'' || '').filter(v => v.length > 0);
    const mergedUids = getMergedUids(wishUids, newUids);

    saveWishList(mergedUids, userId);
    setWishUids(mergedUids);
  }

  useLayoutEffect(() => {
    const token = sessionStorage.getItem(TOKEN_STORAGE_KEY);

    if(token) {
      const userId = jwtDecode(token)?.sub || '';
      setUserId(userId);
      setWishUids(getWishList(userId));
    }
  }, []);

  return ({
    wishUids,
    addWishList
  })
}