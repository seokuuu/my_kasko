import { useQuery } from '@tanstack/react-query'
// import axios from 'axios'
// import { getDestination } from '../api/myPage'

export default function useReactQuery(obj, key, api) {
  const { isLoading, isError, data, isSuccess } = useQuery([key, obj], () => api(obj))

  return { isLoading, isError, data, isSuccess }
}

// staleTime: 1000 * 60 * 5, // 데이터가 5분 동안 신선하다고 간주
// refetchInterval: 1000 * 60, // 1분마다 데이터를 다시 가져옴
