import { useQuery } from '@tanstack/react-query'

export default function useFetchQuery(obj, key, api, types) {
  const { isLoading, isError, data, isSuccess } = useQuery([key, obj], () => api(obj), {
    enabled: types !== null, // 'types'가 null이 아닐 때 데이터를 가져옴
  })
  return { isLoading, isError, data, isSuccess }
}
