import { useAtom } from 'jotai'
import React from 'react'
import { useUserAddCartMutaion } from '../../../api/user'
import { SkyBtn } from '../../../common/Button/Button'
import { PROD_CATEGORY } from '../../../constants/user/product'
import AlertPopup from '../../../modal/Alert/AlertPopup'
import { destiDelPopupAtom, popupObject } from '../../../store/Layout/Layout'
import { getProductNumber } from '../../../hooks/useWishList'

/**
 * 선택 제품 장바구니 추가 컴포넌트
 * @todo API 변수 parameter 확인
 */
const AddCartButton = ({ category, products=[] }) => {
  // API
  const { mutate: addCart, isLoading } = useUserAddCartMutaion() // 장바구니 추가하기 뮤테이션
  // POPUP(선택제품주문)
  const [popupSwitch, setPopupSwitch] = useAtom(destiDelPopupAtom) // 팝업 스위치
  const [_, setNowPopup] = useAtom(popupObject)

  /**
   * 선택 항목 장바구니 추가 핸들러
   */
  function handleSelectOrder(e) {
    e.preventDefault()

    if (products.length < 1) {
      setPopupSwitch(true)
      setNowPopup({
        num: '1',
        content: '장바구니에 추가할 상품을 선택해 주세요.',
      })
      return
    }

    addCart({
      category: category === PROD_CATEGORY.single ? 'SINGLE' : 'PACKAGE',
      uids:products.map((v) => category === PROD_CATEGORY.single
          ? (getProductNumber(v['고유 번호'] )|| 0)
          : (getProductNumber(v['고유 번호']) || 0)
      ),
    })
  }

  return (
    <>
      <SkyBtn disabled={isLoading} onClick={handleSelectOrder}>선택 제품 장바구니 추가</SkyBtn>
      {popupSwitch && <AlertPopup setPopupSwitch={setPopupSwitch} />}
    </>
  )
}

export default AddCartButton