import { useMemo } from 'react'
import { add_element_field } from '../lib/tableHelpers'
import useWishList, { getProductNumber } from './useWishList'

/**
 * 제품번호 기본키
 * @description serverData의 제품번호 키는 number 혹은 productNumber입니다.
 */
const PROD_NUM_KEY = 'number'

/**
 * 추천상품여부 기본키
 * @description serverData의 추천상품여부 키는 bestStatus입니다.
 */
const BEST_KEY = 'bestStatus'

/**
 * 테이블 데이터 HOOK
 * @param {object} param.tableField 테이블 필드 - add_element_field의 두번째 인자로 넘기는 값
 * @param {object} param.serverData 서버 데이터 - { pagination, list } 형식의 데이터
 * @param {string} param.wish.display 관심상품 노출 여부
 * @param {string[]} param.wish.key 관심상품 아이콘과 맵핑할 테이블 CELL, 고유번호 키
 * @param {string} param.best.display 추천상품 노출 여부
 * @param {string[]} param.best.key 추천상품 아이콘과 맵핑할 테이블 CELL, 고유번호 키
 * @returns tableRowData 테이블 데이터
 * @returns paginationData 페이지네이션 데이터
 * @returns totalWeight 총 중량
 * @returns totalWeightStr 총 중량 (localeString)
 * @returns totalCount 총 데이터 갯수
 * @returns totalCountStr 총 데이터 갯수 (localeString)
 */
export default function useTableData({ tableField, serverData, wish }) {
	// 관심상품목록
	const { wishProdNums } = useWishList() // 관심상품 목록 데이터 조회 hook
	const wishDisplay = Boolean(wish?.display) // 관심상품 노출 여부
	const wishKey = wish?.key || [PROD_NUM_KEY] // 관심상품 아이콘 표시할 컬럼 키
	// 추천상품목록
	const bestDisplay = Boolean(wish?.display) // 추천상품 노출 여부
	const bestKey = wish?.key || [PROD_NUM_KEY] // 추천상품 아이콘 표시할 컬럼 키

	/**
	 * 테이블 데이터
	 * @description 테이블 컴포넌트에 PROPS로 전달하는 값
	 */
	const tableRowData = useMemo(() => {
		if (!serverData || !serverData.list) {
			return []
		}
		const rowData =
			wishDisplay || bestDisplay
				? getDataWithMarkerData({
						data: serverData.list,
						...(bestDisplay && { bestKey: bestKey }),
						...(wishDisplay && { wishProdNums: wishProdNums, wishKey: wishKey }),
				  })
				: serverData.list
		const displayData = add_element_field(
			rowData.map((v, idx) => ({ ...v, index: idx + 1 })),
			tableField,
		)
		return displayData
	}, [serverData, wishProdNums]) // 테이블 노출 데이터

	/**
	 * 페이지 데이터
	 * @description 커스텀페이지네이션 컴포넌트에 PROPS로 전달하는 값
	 */
	const paginationData = useMemo(() => {
		let initialData = { pageNum: 1, startPage: 1, endPage: 1, maxPage: 1, listCount: 0 }
		if (serverData && serverData.pagination) {
			initialData = serverData.pagination
			initialData.endPage = Math.max(serverData.pagination.endPage, 1)
		}
		return initialData
	}, [serverData])

	// 총 중량 데이터
	const totalWeight = useMemo(
		() => (serverData && serverData.pagination ? serverData.pagination.totalWeight || 0 : 0),
		[serverData],
	)

	return {
		tableRowData,
		paginationData,
		totalWeight,
		totalWeightStr: totalWeight?.toLocaleString(),
		totalCount: paginationData.listCount,
		totalCountStr: paginationData.listCount?.toLocaleString(),
	}
}

/**
 * 관심상품 속성을 가진 테이블목록 데이터 반환
 */
function getDataWithMarkerData({ data = [], wishProdNums = [], wishKey = [], bestKey = [] }) {
	const dataWithWish = data
		.reduce((acc, d) => {
			const targetData = { ...d }

			if (bestKey) {
				bestKey.forEach((key) => {
					targetData[key] = getObjData(targetData[key], { best: targetData[BEST_KEY] })
				})
			}

			if (wishKey) {
				wishKey.forEach((key) => {
					targetData[key] = getObjData(targetData[key], {
						wish: wishProdNums.includes(getProductNumber(targetData[key])),
					})
				})
			}

			return [...acc, targetData]
		}, [])
		.sort((a, b) => wishSorting(a, b, wishKey))

	return dataWithWish
}

/**
 * 관심상품 정렬 함수
 */
function wishSorting(a, b, wishKey) {
	let result = 0
	for (const key of wishKey) {
		result += b[key].wish - a[key].wish
	}
	return result
}

/**
 * Object 형식 데이터 반환
 * @param {string|object} originData 기존 데이터
 * @param {object} addProps 추가할 object 형식 데이터
 * @returns Object 형식 데이터 { value: "apple", ... }
 */
function getObjData(originData, addProps) {
	return typeof originData === 'object'
		? { ...originData, ...addProps }
		: {
				value: originData,
				...addProps,
		  }
}
