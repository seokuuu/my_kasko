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
 * @constant 버튼 타입
 */
export const ORDER_BUTTON_TYPE = {
  default: 'default',
  simple: 'simple'
}

/**
 * 선택 제품 주문 컴포넌트
 * @todo API 변수 parameter 확인
 * @param {string} param.category 상품 카테고리(단일|패키지) 
 * @param {string} param.products 상품 목록 
 * @param {string} param.totalWeight 총 중량 
 * @param {string} param.buttontType 버튼 타입(default|simple) 
 */
const AddOrderButton = ({ category, totalWeight, products=[], buttonType }) => {
  // API
  const { mutate: requestOrder, loading: isOrderLoading } = useUserOrderMutaion() // 주문하기 뮤테이션
  // POPUP(선택제품주문)
  const [popupSwitch, setPopupSwitch] = useAtom(destiDelPopupAtom) // 팝업 스위치
  const [_, setNowPopup] = useAtom(popupObject)
  // 버튼 타입
  const isTableButton =  !buttonType || buttonType !== ORDER_BUTTON_TYPE.default;

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
      { buttonType === ORDER_BUTTON_TYPE.default && buttonType === undefined && <SkyBtn disabled={isOrderLoading} onClick={handleSelectOrder}>선택 제품 주문</SkyBtn> }
      { buttonType === ORDER_BUTTON_TYPE.simple &&  <SkyBtn style={{ borderRadius: '0px' }} width={14} height={38} fontSize={18} onClick={handleSelectOrder}>제품구매</SkyBtn> }
      {popupSwitch && <AlertPopup setPopupSwitch={setPopupSwitch} />}
    </>
  )
}

export default AddOrderButton