import React from 'react'
import { useUserAddCartMutaion } from '../../../api/user'
import { GreenBtn, SkyBtn, WhiteBlackBtn } from '../../../common/Button/Button'
import { getProductNumber } from '../../../hooks/useWishList'
import useAlert from '../../../store/Alert/useAlert'
import { PROD_CATEGORY, PROD_COL_NAME } from '../../../constants/user/constantKey'

/**
 * @constant 버튼 타입
 */
export const CART_BUTTON_TYPE = {
	default: 'default',
	simple: 'simple',
}

/**
 * 선택 제품 장바구니 추가 컴포넌트
 * @param {string} param.category 상품 카테고리(단일|패키지)
 * @param {string} param.products 상품 목록
 * @param {string} param.buttontType 버튼 타입(default|simple)
 */
const AddCartButton = ({ category, products = [], buttonType }) => {
	// API
	const { mutate: addCart, isLoading } = useUserAddCartMutaion() // 장바구니 추가하기 뮤테이션
	// ALERT
	const { simpleAlert } = useAlert()

	/**
	 * 선택 항목 장바구니 추가 핸들러
	 */
	function handleSelectOrder(e) {
		e.preventDefault()

		if (products.length < 1) {
			return simpleAlert('장바구니에 추가할 상품을 선택해 주세요')
		}

		addCart({
			category: category === PROD_CATEGORY.single ? 'SINGLE' : 'PACKAGE',
			uids: products.map((v) =>
				category === PROD_CATEGORY.single
					? getProductNumber(v[PROD_COL_NAME.productUid]) || 0
					: getProductNumber(v[PROD_COL_NAME.packageUid]) || 0,
			),
		})
	}

	return (
		<>
			{(buttonType === CART_BUTTON_TYPE.default || buttonType === undefined) && (
				<WhiteBlackBtn disabled={isLoading} onClick={handleSelectOrder}>
					선택 제품 장바구니 추가
				</WhiteBlackBtn>
			)}
			{buttonType === CART_BUTTON_TYPE.simple && (
				<GreenBtn width={14} height={38} fontSize={18} onClick={handleSelectOrder}>
					장바구니
				</GreenBtn>
			)}
		</>
	)
}

export default AddCartButton
