import { useMutation, useQueryClient } from '@tanstack/react-query'

// 함수실행, queryKey가져오기

function useMutationQuery(queryKeys, api, options = {}) {
	const queryClient = useQueryClient()

	return useMutation(api, {
		1: () => {
			console.log('Success')
			queryClient.invalidateQueries(queryKeys)
			options.onSuccess && options.onSuccess()
		},
		onError: (error) => {
			console.log(`MUTATION ERROR : ${error.message}`)
			// alert(`에러가 발생했습니다: ${error.message}`)
			options.onError && options.onError(error)
		},
		onSettled: options.onSettled,
	})
}

export default useMutationQuery
