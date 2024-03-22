import { useQuery } from '@tanstack/react-query'
import { client } from '../index'

const CUSTOMER_MAIN = '/main-page/customer'
const CUSTOMER_RECOMMEND = '/main-page/recommend-product'
const CUSTOMER_NOTION = '/main-page/notion'
const CUSTOMER_FAVORITE = '/main-page/favorite-product'

export const QUERY_KEY = {
	customer: ['main-page', 'customer'],
	recommend: ['main-page', 'customer', 'recommend'],
	notion: ['main-page', 'customer', 'notion'],
	favorite: ['main-page', 'customer', 'favorite'],
}

// 사용자 메인페이지 데이터
export function useCustomerMainPageQuery() {
	return useQuery({
		queryKey: QUERY_KEY.customer,
		queryFn: async function () {
			const response = await client.get(CUSTOMER_MAIN)
			return response?.data?.data
		},
	})
}

// 사용자 메인페이지 추천상품 데이터
export function useCustomerMainPageRecommendProductsQuery() {
	return useQuery({
		queryKey: QUERY_KEY.recommend,
		queryFn: async function () {
			const response = await client.get(CUSTOMER_RECOMMEND)
			return response?.data?.data
		},
	})
}

// 사용자 메인페이지 공지사항 데이터
export function useCustomerMainPageNotionQuery() {
	return useQuery({
		queryKey: QUERY_KEY.notion,
		queryFn: async function () {
			const response = await client.get(CUSTOMER_NOTION)
			return response?.data?.data
		},
	})
}

// 사용자 메인페이지 선호제품 데이터
export function useCustomerMainPageFavoriteProductsQuery() {
	return useQuery({
		queryKey: QUERY_KEY.favorite,
		queryFn: async function () {
			const response = await client.get(CUSTOMER_FAVORITE)
			return response?.data?.data
		},
	})
}

export const getCountdown = async () => {
	return await client.get(`/main/count`)
}

export const getBanner = async () => {
	return await client.get(`/main/banner`)
}
