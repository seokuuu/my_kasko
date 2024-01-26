import React from 'react'
import { useUserDelCartMutaion } from '../../../api/user'
import { WhiteRedBtn } from '../../../common/Button/Button'
import { PROD_CATEGORY, PROD_COL_NAME } from '../../../constants/user/constantKey'
import useAlert from '../../../store/Alert/useAlert'

const DelCartButton = ({ category, products = []}) => {
  // API
	const { mutate: delCart, isLoading } = useUserDelCartMutaion() // 장바구니 추가하기 뮤테이션
	// ALERT
	const { simpleAlert } = useAlert()

	/**
	 * 선택 항목 장바구니 추가 핸들러
	 */
	function handleDelete(e) {
		e.preventDefault()

		if (products.length < 1) {
			return simpleAlert('장바구니에서 삭제할 상품을 선택해 주세요.');
		}

    const uids = products.map(v => v[category === PROD_CATEGORY.single? PROD_COL_NAME.productUid : PROD_COL_NAME.packageUid]);
    delCart(uids.toString());
	}

  return (
    <WhiteRedBtn onClick={handleDelete} disabled={isLoading}>
      선택제품 장바구니 삭제
    </WhiteRedBtn>
  )
}

export default DelCartButton