import { useQuery, useMutation } from '@tanstack/react-query'

import { getMemberDestination, postMemberDestination } from '../../../service/user/Mypage'

const DESTINATE_KEYS = {
  getDestination: ['getDestination'],
  postDestiation: ['postDestination'],
}

// 목적지 관리 - 목록 "GET"
export const useGetUserDestinationQuery = (params) => {
  return useQuery(DESTINATE_KEYS.getDestination, async () => {
    const { data } = await getMemberDestination(params)
    console.log('user Desti get =>', params)
    return data
  })
}

// 목적지 관리 - 등록 "POST"
export const usePostUserDestinationQuery = () =>
  useMutation({
    mutationFn: (params) => {
      console.log('params =>', params)
      return postMemberDestination(params)
    },
  })
