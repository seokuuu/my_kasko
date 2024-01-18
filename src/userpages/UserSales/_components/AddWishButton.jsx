import React from 'react'
import { useAtom } from 'jotai'
import { WhiteGrnBtn } from '../../../common/Button/Button'
import AlertPopup from '../../../modal/Alert/AlertPopup'
import { destiDelPopupAtom, popupObject } from '../../../store/Layout/Layout'
import useWishList from '../../../hooks/useWishList'

/**
 * 관심 상품 등록 버튼
 * @returns 
 */
const AddWishButton = ({ products, productNumberKey }) => {
  const { addWishList } = useWishList();
  // POPUP
  const [popupSwitch, setPopupSwitch] = useAtom(destiDelPopupAtom); // 팝업 스위치
  const [_, setNowPopup] = useAtom(popupObject);

  function handleWishAdd(e) {
    e.preventDefault();

    if (products.length < 1) {
      setPopupSwitch(true)
      setNowPopup({
        num: '1',
        content: '관심상품에 등록할 상품을 선택해 주세요.',
      })
      return
    }
    
    addWishList(products, productNumberKey);
  }

  return (
    <>
      <WhiteGrnBtn onClick={handleWishAdd}>
        <div>
          <img src="/img/grnstar.png" />
        </div>
        관심상품 등록
      </WhiteGrnBtn>
      {popupSwitch && <AlertPopup setPopupSwitch={setPopupSwitch} />}
    </>
  )
}

export default AddWishButton