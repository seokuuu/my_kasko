import React from 'react'
import { WhiteGrnBtn } from '../../../common/Button/Button'
import useWishList from '../../../hooks/useWishList'
import useAlert from '../../../store/Alert/useAlert'

/**
 * 관심 상품 등록 버튼
 */
const AddWishButton = ({ products, productNumberKey }) => {
	const { addWishList } = useWishList()
	// ALERT
	const { simpleAlert } = useAlert()

	function handleWishAdd(e) {
		e.preventDefault()

		if (products.length < 1) {
			return simpleAlert('관심상품에 등록할 상품을 선택해 주세요.')
		}

		addWishList(products, productNumberKey)
	}

	return (
		<>
			<WhiteGrnBtn onClick={handleWishAdd}>
				<div>
					<img src="/img/grnstar.png" />
				</div>
				관심상품 등록
			</WhiteGrnBtn>
		</>
	)
}

export default AddWishButton
