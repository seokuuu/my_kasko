// import { useQuery, useMutation } from '@tanstack/react-query'

// import { getAdminDestination, postAdminDestination } from '../../../service/admin/Standard'

// const DESTINATE_KEYS = {
//   getAdminDestination: ['getAdminDestination'],
//   postDestiation: ['postDestination'],
// }

// // 목적지 관리 - 목록 "GET"
// export const useGetAdminDestinationQuery = (params) => {
//   return useQuery(DESTINATE_KEYS.getAdminDestination, async () => {
//     const { data } = await getAdminDestination(params)
//     console.log('data=>', data)
//     return data
//   })
// }

// // 목적지 관리 - 등록 "POST"
// export const usePostAdminDestinationQuery = () =>
//   useMutation({
//     mutationFn: (params) => {
//       console.log('params =>', params)
//       return postAdminDestination(params)
//     },
//   })
