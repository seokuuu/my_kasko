import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { getDestination } from '../api/myPage'

export default function useReactQuery(obj) {
  const { isLoading, isError, data, isSuccess } = useQuery(['query', obj], () => getDestination(obj))

  return { isLoading, isError, data, isSuccess }
}
