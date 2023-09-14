import { useQuery, useMutation } from '@tanstack/react-query'

import { getURLDestination, postDestination } from '../../../service/user/Mypage'

const DESTINATE_KEYS = {
  getDestination: ['getDestination'],
  postDestiation: ['postDestination'],
}

{
  /* 회원 */
}

// 목적지 관리 - 목록 "GET"
export const useGetDestinationQuery = (params) => {
  return useQuery(DESTINATE_KEYS.getDestination, async () => {
    const { data } = await getURLDestination(params)
    return data
  })
}

// 목적지 관리 - 등록 "POST"
export const usePostDestinationQuery = () =>
  useMutation({
    mutationFn: (params) => {
      console.log('params =>', params)
      return postDestination(params)
    },
  })
