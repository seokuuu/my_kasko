import React from 'react'
import { useUserDelCartMutaion } from '../../../api/user'
import { WhiteRedBtn } from '../../../common/Button/Button'
import { PROD_CATEGORY, PROD_COL_NAME } from '../../../constants/user/constantKey'
import useAlert from '../../../store/Alert/useAlert'

const DelCartButton = ({ category, products = [], listRefetch }) => {
	// API
	const { mutate: delCart, isLoading } = useUserDelCartMutaion() // 장바구니 추가하기 뮤테이션
	// ALERT
	const { simpleAlert, simpleConfirm } = useAlert()

	/**
	 * 선택 항목 장바구니 추가 핸들러
	 */
	function handleDelete(e) {
		e.preventDefault()

		if (products.length < 1) {
			return simpleAlert('장바구니에서 삭제할 상품을 선택해 주세요.')
		}

		const uids = products.map((v) => v[PROD_COL_NAME.cartUid])
		simpleConfirm('선택하신 장바구니 제품을 삭제하시겠습니까?', () => {
			delCart(uids.toString())
			listRefetch()
		})
	}

	return (
		<WhiteRedBtn onClick={handleDelete} disabled={isLoading}>
			선택제품 장바구니 삭제
		</WhiteRedBtn>
	)
}

export default DelCartButton
