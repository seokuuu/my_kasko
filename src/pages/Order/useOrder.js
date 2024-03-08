import useMutationQuery from '../../hooks/useMutationQuery'
import { cancelOrderPost, cancelOrderList, depositCancelOrder, depositCancelOrderList } from '../../api/detailOrderList'
import useAlert from '../../store/Alert/useAlert'
import { queryClient } from '../../api/query'
import { successfulOrderPost, successfulOrderListPost } from '../../api/orderList'
import { useNavigate } from 'react-router-dom'
import { useLoading } from '../../store/Loading/loadingAtom'

const useOrder = () => {
	const navigate = useNavigate()
	const { simpleConfirm, simpleAlert } = useAlert()
	// prettier-ignore
	const { mutate: cancelOrder, isLoading: cancelOrderLoading } = useMutationQuery('cancelOrder', cancelOrderPost)
	// prettier-ignore
	const { mutate: cancelOrderAll, isLoading: cancelOrderAllLoading } = useMutationQuery('cancelAllOrderList', cancelOrderList)
	// prettier-ignore
	const { mutate: depositCancel, isLoading: depositCancelLoading } = useMutationQuery('depositCancelOrder', depositCancelOrder)
	// prettier-ignore
	const { mutate: depositCancelAll, isLoading: depositCancelAllLoading } = useMutationQuery('depositCancelOrderList', depositCancelOrderList)
	// prettier-ignore
	const { mutate: successfulOrder, isLoading: successfulOrderLoading } = useMutationQuery('successfulOrder', successfulOrderPost);
	// prettier-ignore
	const { mutate: successfulOrderAll, isLoading: successfulOrderAllLoading } = useMutationQuery('successfulOrderListPost', successfulOrderListPost);

	/** 주문 전체 취소 */
	const postCancelOrderAll = (data, updateKey, isBack = false) => {
		simpleConfirm('전체 주문 취소하시겠습니까?', () => {
			cancelOrderAll(data, {
				onSuccess: () => {
					simpleAlert('주문 취소 성공하였습니다.', () => {
						queryClient.invalidateQueries(updateKey)
						if (isBack) navigate(-1)
					})
				},
				onError: () => {
					simpleAlert('주문 취소 중 오류가 발생했습니다.')
				},
			})
		})
	}

	/** 주문 부분 취소 */
	const postCancelOrder = (data, updateKey) => {
		simpleConfirm('부분 주문 취소하시겠습니까?', () => {
			cancelOrder(
				{ requestList: data },
				{
					onSuccess: () => {
						simpleAlert('주문 취소 성공하였습니다.', () => {
							queryClient.invalidateQueries(updateKey)
						})
					},
					onError: () => {
						simpleAlert('주문 취소 중 오류가 발생했습니다.')
					},
				},
			)
		})
	}

	/** 입금 전체 취소 */
	const postDepositCancelOrderAll = (data, updateKey, isBack) => {
		simpleConfirm('전체 입금 취소하시겠습니까?', () => {
			depositCancelAll(data, {
				onSuccess: () => {
					simpleAlert('입금 취소 성공하였습니다.', () => {
						queryClient.invalidateQueries(updateKey)
						if (isBack) navigate(-1)
					})
				},
				onError: () => {
					simpleAlert('입금 취소 중 오류가 발생했습니다.')
				},
			})
		})
	}

	/** 입금 부분 취소 */
	const postDepositCancelOrder = (data, updateKey) => {
		simpleConfirm('부분 입금 취소하시겠습니까?', () => {
			depositCancel(
				{ requestList: data },
				{
					onSuccess: () => {
						simpleAlert('입금 취소 성공하였습니다.', () => {
							queryClient.invalidateQueries(updateKey)
						})
					},
					onError: () => {
						simpleAlert('입금 취소 중 오류가 발생했습니다.')
					},
				},
			)
		})
	}

	/** 부분 확정 전송 */
	const postSuccessfulOrder = (data, updateKey) => {
		simpleConfirm('부분 확정 전송을 진행하시겠습니까?', () => {
			successfulOrder(
				{ orderUids: data },
				{
					onSuccess: () => {
						simpleAlert('확정 전송 성공하였습니다.', () => {
							queryClient.invalidateQueries(updateKey)
						})
					},
					onError: (error) => {
						simpleAlert(error?.data?.message || '확정 전송 중 오류가 발생했습니다.')
					},
				},
			)
		})
	}

	/** 전체 확정 전송 */
	const postSuccessfulOrderAll = (data, updateKey) => {
		simpleConfirm('전체 확정 전송을 진행하시겠습니까?', () => {
			successfulOrderAll(data, {
				onSuccess: () => {
					simpleAlert('확정 전송 성공하였습니다.', () => {
						queryClient.invalidateQueries(updateKey)
					})
				},
				onError: (error) => {
					console.error(error)
					simpleAlert(error?.data?.message || '확정 전송 중 오류가 발생했습니다.')
				},
			})
		})
	}

	// 로딩
	useLoading(
		cancelOrderLoading ||
			cancelOrderAllLoading ||
			depositCancelLoading ||
			depositCancelAllLoading ||
			successfulOrderLoading ||
			successfulOrderAllLoading,
	)

	return {
		postCancelOrderAll,
		postCancelOrder,
		postDepositCancelOrderAll,
		postDepositCancelOrder,
		postSuccessfulOrderAll,
		postSuccessfulOrder,
	}
}

export default useOrder
