import React from 'react'
import { WhiteGrnBtn } from '../../../common/Button/Button'
import useWishList from '../../../hooks/useWishList'
import useAlert from '../../../store/Alert/useAlert'

/**
 * 관심 상품 등록 버튼
 * @param {object[]} param.products 관심상품에 등록할 상품 목록
 * @param {string} param.productNumberKey 상품번호(패키지번호)를 가져올 수 있는 키(한글 컬럼명)
 * @returns
 */
const AddWishButton = ({ products, productNumberKey }) => {
	const { addWishList } = useWishList() // 관심상품 등록하기 hook
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
			<WhiteGrnBtn onClick={handleWishAdd} style={{ minWidth: '130px' }}>
				<div>
					<img src="/img/grnstar.png" alt="" />
				</div>
				관심상품 등록
			</WhiteGrnBtn>
		</>
	)
}

export default AddWishButton
