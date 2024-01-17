import { useLayoutEffect, useState } from "react";

const TOKEN_STORAGE_KEY = 'accessToken';

const WISH_STORAGE_KEY = 'kasko_wish_products';
const USER_WISH_STORAGE_KEY = (userId) => `${WISH_STORAGE_KEY}_${userId}`; 

const MAX_SAVE_COUNT = 10;

function getMergedUids(prevUids=[], nextUids=[]) {
  const newUids = [...nextUids].slice(0, MAX_SAVE_COUNT);
  if(newUids.length < MAX_SAVE_COUNT) {
    let idx = 0;
    while(newUids.length < 10) {
      if(!newUids.includes(prevUids[idx])) newUids.push(prevUids[idx]);
      idx++;
    }
  }
  return newUids;
}

function getWishList(userId='') {
  const savedData = sessionStorage.getItem(USER_WISH_STORAGE_KEY(userId));
  const parsedData = savedData? JSON.parse(savedData) : [];
  return parsedData;
}


function saveWishList(uids=[], userId='') {
  const prevWishUids = getWishList(userId);
  const newWishUids = getMergedUids(prevWishUids, uids);
  sessionStorage.setItem(USER_WISH_STORAGE_KEY(userId), JSON.stringify(newWishUids));
}

/**
 * 관심상품 HOOK
 */
export default function useWishList() {
  const [wishUids, setWishUids] = useState([]);
  const [userId, setUserId] = useState('');
  
  function addWishList(products, uidKey='uid') {
    saveWishList(products.map(v => v[uidKey]+'' || '').filter(v => v.length > 0), userId);
  }

  useLayoutEffect(() => {
    const token = sessionStorage.getItem(TOKEN_STORAGE_KEY);
    
    console.log(token);
  }, []);

  return ({
    wishUids,
    addWishList
  })
}