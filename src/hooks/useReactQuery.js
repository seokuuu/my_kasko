import { useQuery } from '@tanstack/react-query'
// import axios from 'axios'
// import { getDestination } from '../api/myPage'

export default function useReactQuery(obj, api) {
  const { isLoading, isError, data, isSuccess } = useQuery(['query', obj], () => api(obj))

  return { isLoading, isError, data, isSuccess }
}
