import { useQuery } from '@tanstack/react-query'

export function useLiveReactQuery(obj, key, api) {
	const { isLoading, isError, data, isSuccess, refetch } = useQuery([key, obj], () => api(obj), {
		retry: false,
		refetchInterval: 2000, // 조건에 따라 refetchInterval 추가
	})
	return { isLoading, isError, data, isSuccess, refetch }
}
