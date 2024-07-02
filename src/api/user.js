import { client } from './index'
import { useQuery, useMutation } from '@tanstack/react-query'
import { queryClient } from './query'
import useAlert from '../store/Alert/useAlert'
import { getUrlWithSearchParam } from '../utils/parameters'
import useWishList from '../hooks/useWishList'

export const USER_URL = {
	get: '/user/signup',
	singleProductList: '/single-product',
	packageProductList: '/package-product',
	packageProductDetailsList: '/package-product/products',
	cartList: '/sale-product/cart', // GET
	cartRequest: '/sale-product/cart', // POST
	orderRequest: '/sale-product/order', // POST
	orderList: '/sale-product/order', // GET
	orderDetail: '/sale-product/order/details', // GET
	orderCancel: '/admin/order/cancel',
	destinationList: '/auction/successfulBid/destination',
	destinationUpdate: '/auction/successfulBid/request',
}

/* ==============================
    회원 정보
============================== */
export function getUser() {
	return client.get(USER_URL.get)
}

/**
 * 상시판매 단일 목록 API 쿼리
 * @param {number} param.pageNum 페이지
 * @param {number} param.pageSize 페이지당 조회 갯수
 */
export const useUserSingleProductListQuery = (param) => {
	const { wishProdNums } = useWishList() // 관심상품 목록 데이터 조회 hook
	const newParam = {
		...param,
		wishProductNumbers: wishProdNums?.filter((item) => !item.includes('PK'))?.join(','),
	}
	return useQuery({
		queryKey: ['user', 'single', newParam],
		queryFn: async () => {
			const { data } = await client.get(getUrlWithSearchParam(USER_URL.singleProductList, newParam))
			return data.data
		},
	})
}

/**
 * 상시판매 패키지 목록 API 쿼리
 * @param {number} param.pageNum 페이지
 * @param {number} param.pageSize 페이지당 조회 갯수
 */
export const useUserPackageProductListQuery = (param) => {
	const { wishProdNums } = useWishList() // 관심상품 목록 데이터 조회 hook
	const newParam = {
		...param,
		wishPackageNumbers: wishProdNums?.filter((item) => item.includes('PK'))?.join(','),
	}
	return useQuery({
		queryKey: ['user', 'package', newParam],
		queryFn: async () => {
			const { data } = await client.get(getUrlWithSearchParam(USER_URL.packageProductList, newParam))
			return data.data
		},
	})
}

/**
 * 상시판매 패키지 상세 목록 API 쿼리
 * @param {number} param.pageNum 페이지
 * @param {number} param.pageSize 페이지당 조회 갯수
 */
export const useUserPackageProductDetailsListQuery = (param) =>
	useQuery({
		queryKey: ['user', 'package', 'details', param],
		queryFn: async () => {
			const { data } = await client.get(getUrlWithSearchParam(USER_URL.packageProductDetailsList, param))
			return data.data
		},
	})

/**
 * 장바구니 목록 조회 쿼리
 * @param {'SINGLE | 'PACKAGE} param.category 카테고리
 * @param {number} param.pageNum 페이지
 * @param {number} param.pageSize 페이지당 조회 갯수
 */
export const useUserCartListQuery = (param) =>
	useQuery({
		queryKey: ['user', 'cart', param],
		queryFn: async () => {
			const { data } = await client.get(
				`${USER_URL.cartList}/${param.category}?pageNum=${param.pageNum || 1}&pageSize=${param.pageSize || 50}`,
			)
			return data.data
		},
	})

/**
 * 상시판매 주문확인 API 쿼리
 * @param {number} param.pageNum 페이지
 * @param {number} param.pageSize 페이지당 조회 갯수
 */
export const useUserOrderListQuery = (param) =>
	useQuery({
		queryKey: ['user', 'order', param],
		queryFn: async () => {
			const { data } = await client.get(getUrlWithSearchParam(USER_URL.orderList, param))
			return data.data
		},
	})

/**
 * 상시판매 주문확인상세 API 쿼리
 * @param {number} param.pageNum 페이지
 * @param {number} param.pageSize 페이지당 조회 갯수
 * @param {number} param.auctionNumber 상시판매 번호
 */
export const useUserOrderDetailsQuery = (param) =>
	useQuery({
		queryKey: ['user', 'order', 'details', param],
		queryFn: async () => {
			const { data } = await client.get(getUrlWithSearchParam(USER_URL.orderDetail, param))
			return data.data
		},
	})

/**
 * 장바구니  추가하기 API 뮤테이션
 * @param {*} cartParam
 * @description 장바구니 추가하기 API
 */
export const useUserAddCartMutaion = () => {
	const { simpleAlert } = useAlert()

	return useMutation({
		mutationFn: async (cartParam) => {
			await client.post(USER_URL.cartRequest, cartParam)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user', 'cart'] })
			queryClient.invalidateQueries({ queryKey: ['user', 'single'] })
			queryClient.invalidateQueries({ queryKey: ['user', 'package'] })
			queryClient.invalidateQueries({ queryKey: ['user', 'order'] })
			simpleAlert('장바구니에 추가하였습니다.')
		},
		onError: (error) => {
			simpleAlert(error?.data?.message || '장바구니 추가에 실패하였습니다.')
		},
	})
}

/**
 * 장바구니 삭제하기 API 뮤테이션
 * @param {*} cartParam
 * @description 장바구니 삭제하기 API
 */
export const useUserDelCartMutaion = () => {
	const { simpleAlert } = useAlert()

	return useMutation({
		mutationFn: async (cartParam) => {
			await client.delete(`${USER_URL.cartRequest}/${cartParam}`)
		},
		onSuccess: () => {
			simpleAlert('장바구니에서 삭제하였습니다.', () => {
				window.location.reload()
			})
		},
		onError: (error) => {
			simpleAlert(error?.data?.message || '장바구니 삭제에 실패하였습니다.')
		},
	})
}

/**
 * 주문하기 API 뮤테이션
 * @param {*} orderParam
 * @description 장바구니 > 선택항목 주문하기 API
 */
export const useUserOrderMutaion = () => {
	const { simpleAlert } = useAlert()

	return useMutation({
		mutationFn: async (orderParam) => {
			await client.post(USER_URL.orderRequest, orderParam)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user', 'cart'] })
			queryClient.invalidateQueries({ queryKey: ['user', 'single'] })
			queryClient.invalidateQueries({ queryKey: ['user', 'package'] })
			queryClient.invalidateQueries({ queryKey: ['user', 'order'] })
			return simpleAlert('주문을 완료하였습니다.')
		},
		onError: (error) => {
			return simpleAlert(error?.data?.message || '주문 요청 중 오류가 발생했습니다.\n다시 시도해 주세요.')
		},
	})
}

/**
 * 주문취소 API 뮤테이션
 * @param {*} cancelParam
 * @description 주문확인 > 선택항목 주문취소하기
 */
export const useUserOrderCancelMutation = () => {
	const { simpleAlert } = useAlert()

	return useMutation({
		mutationFn: async (cancelParam) => {
			await client.post(USER_URL.orderCancel, cancelParam)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user', 'single'] })
			queryClient.invalidateQueries({ queryKey: ['user', 'package'] })
			queryClient.invalidateQueries({ queryKey: 'order' })
			queryClient.invalidateQueries({ queryKey: 'getOrderList' })
			return simpleAlert('주문을 취소하였습니다.')
		},
		onError: (error) => {
			return simpleAlert(error?.data?.message || '주문 취소 중 오류가 발생했습니다.\n다시 시도해 주세요.')
		},
	})
}

/**
 * 목적지 변경 목록 API 쿼리
 */
export const useUserDestinationQuery = (param) =>
	useQuery({
		queryKey: ['user', 'destination', 'list', param],
		queryFn: async () => {
			const { data } = await client.get(`${USER_URL.destinationList}?customerCode=${param}`)
			return data.data
		},
	})

/**
 * 목적지 변경 승인 요청 API 뮤테이션
 */
export const useUserDestinationUpdateRequestMutation = () => {
	const { simpleAlert } = useAlert()

	return useMutation({
		mutationFn: async (param) => {
			await client.post(USER_URL.destinationUpdate, param)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: 'order' })
			return simpleAlert('목적지 변경 승인을 요청하였습니다.')
		},
		onError: (error) => {
			return simpleAlert(error?.data?.message || '목적지 변경 요청중 오류가 발생했습니다. 다시 시도해 주세요.')
		},
	})
}
