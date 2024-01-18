import React from 'react'
import { destiDelPopupAtom, popupObject } from '../../../store/Layout/Layout'
import { useUserOrderMutaion } from '../../../api/user'
import { useAtom } from 'jotai'
import { SkyBtn } from '../../../common/Button/Button'
import AlertPopup from '../../../modal/Alert/AlertPopup'
import { PROD_CATEGORY } from '../../../constants/user/product'

/**
 * @constant 최소 주문 중량(25톤/단위kg)
 */
const MIN_ORDER_WEIGHT = 25_000

/**
 * 선택 제품 주문 컴포넌트
 * @todo API 변수 parameter 확인
 */
const AddOrderButton = ({ category, totalWeight, products=[] }) => {
  // API
  const { mutate: requestOrder, loading: isOrderLoading } = useUserOrderMutaion() // 주문하기 뮤테이션
  // POPUP(선택제품주문)
  const [popupSwitch, setPopupSwitch] = useAtom(destiDelPopupAtom) // 팝업 스위치
  const [_, setNowPopup] = useAtom(popupObject)

  /**
   * 선택 항목 주문 핸들러
   */
  function handleSelectOrder(e) {
    e.preventDefault()

    if (products.length < 1) {
      setPopupSwitch(true)
      setNowPopup({
        num: '1',
        content: '주문할 상품을 선택해 주세요.',
      })
      return
    }

    // 25톤 이상 주문건만 주문 가능
    if (totalWeight < MIN_ORDER_WEIGHT) {
      setPopupSwitch(true)
      setNowPopup({
        num: '1',
        content: '25톤 이상 부터 주문이 가능합니다.\n확인하시고 다시 시도해 주세요.',
      })
      return
    }

    requestOrder({
      type: category === PROD_CATEGORY.single ? 'normal' : 'package',
      orderList: products.map((v) =>
        category === PROD_CATEGORY.single
          ? {
              productUid: v['고유 번호'] || '',
              salePrice: v['상시판매가'] || 0,
            }
          : {
              packageNumber: v['패키지번호'] || 0,
              salePrice: v['상시 판매가'] || 0,
            },
      ),
    })
  }

  return (
    <>
      <SkyBtn disabled={isOrderLoading} onClick={handleSelectOrder}>선택 제품 주문</SkyBtn>
      {popupSwitch && <AlertPopup setPopupSwitch={setPopupSwitch} />}
    </>
  )
}

export default AddOrderButton