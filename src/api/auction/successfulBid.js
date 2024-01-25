import { client } from '../'
import useAlert from '../../store/Alert/useAlert'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../query'

const auctionSuccessfulBidApproveEndpoint = '/auction/successfulBid/approve'
const auctionSuccessfulBidRejectEndpoint = '/auction/successfulBid/reject'
const auctionSuccessfulBidRequestEndpoint = '/auction/successfulBid/request'

export const useAuctionSuccessfulBidApprove = () => {
	const { simpleAlert } = useAlert()

	return useMutation({
		mutationFn: async (orderParam) => {
			await client.post(auctionSuccessfulBidApproveEndpoint, orderParam)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: 'cart' })
			return simpleAlert('목적지 변경 승인 완료하였습니다.')
		},
		onError: (error) => {
			return simpleAlert(error?.data?.message || '요청중 오류가 발생했습니다.\n다시 시도해 주세요.')
		},
	})
}

export const useAuctionSuccessfulBidReject = () => {
	const { simpleAlert } = useAlert()

	return useMutation({
		mutationFn: async (orderParam) => {
			await client.post(auctionSuccessfulBidRejectEndpoint, orderParam)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: 'cart' })
			return simpleAlert('목적지 변경 반려 완료하였습니다.')
		},
		onError: (error) => {
			return simpleAlert(error?.data?.message || '요청중 오류가 발생했습니다.\n다시 시도해 주세요.')
		},
	})
}

export const useAuctionSuccessfulBidRequest = () => {
	const { simpleAlert } = useAlert()

	return useMutation({
		mutationFn: async (orderParam) => {
			await client.post(auctionSuccessfulBidRequestEndpoint, orderParam)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: 'cart' })
			return simpleAlert('목적지 승인 요청 완료하였습니다.')
		},
		onError: (error) => {
			return simpleAlert(error?.data?.message || '요청중 오류가 발생했습니다.\n다시 시도해 주세요.')
		},
	})
}
