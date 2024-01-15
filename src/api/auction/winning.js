import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { client } from '..'
import { queryClient } from '../query'

const urls = {
  winning: 'auction/successfulBid',
  winningDetail: 'auction/successfulBid/detail',
  winningCreate: 'auction/successfulBid/product',
}

export function getWinning(data) {
  console.log('### getWinning ###')
  return client.get(`${urls.winning}?pageNum=${data.pageNum}&pageSize=${data.pageSize}&orderType=${data.orderType}`)
}

// 낙찰 취소
export function deleteBidding(data) {
  return client.post(`${urls.winning}/cancel-all`, data)
}
// 입금 확인
export function depositConfirm(data) {
  return client.post(`${urls.winning}/confirm-all`, data)
}

// 부분 낙찰 취소
export function partDeleteBidding(data) {
  return client.post(`${urls.winning}/cancel/${data}`)
}

// 부분 입금 확인
export function partDepositConfirm(data) {
  return client.post(`${urls.winning}/confirm/${data}`)
}

// 목적지 승인 요청
export function destiApproveReq(data) {
  return client.post(`${urls.winning}/request`, data)
}
// 목적지 변경 반려
export function destiChangeReject(data) {
  return client.post(`${urls.winning}/reject`, data)
}
// 목적지 변경 승인
export function destiChangeApprove(data) {
  return client.post(`${urls.winning}/approve`, data)
}

// 입금 요청서 발행
export function publishDepositForm(data) {
  return client.post(`${urls.winning}/deposit`, data)
}

// 고객사 목적지 목록 (경매 낙찰 관리)
export const getAuctionDestination = () => {
  return client.get(`${urls.winning}/destination`)
}

export function getWinningDetail(data) {
  console.log('data !@#', data)
  return client.get(
    `${urls.winningDetail}?pageNum=${data.pageNum}&pageSize=${data.pageSize}&auctionNumber=${data.auctionNumber}&storage=${data.storage}&customerDestinationUid=${data.customerDestinationUid}&biddingStatus=${data.biddingStatus}`,
  )
}

// 낙찰 생성 (낙찰 생성 제품 목록)
export function getWinningCreate(data) {
  console.log('### getWinningCreate ###')
  return client.get(
    `${urls.winningCreate}?pageNum=${data.pageNum}&pageSize=${data.pageSize}&saleType=${data.saleType}&registrationStatus=${data.registrationStatus}`,
  )
}
