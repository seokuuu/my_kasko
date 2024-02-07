import { useQuery } from '@tanstack/react-query'
import { client } from '../index'

const CUSTOMER_MAIN = '/main-page/customer'

export const QUERY_KEY = {
	customer: ['main-page', 'customer'],
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

export const getCountdown = async () => {
	return await client.get(`/main/count`)
}
