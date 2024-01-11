import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { client } from '..'
import { queryClient } from '../query'

const urls = {
  winning: 'auction/successfulBid',
  allDetlete: 'auction/successfulBid/cancel-all',
  winningDetail: 'auction/successfulBid/detail',
  winningCreate: 'auction/successfulBid/product',
}

export function getWinning(data) {
  console.log('data !@#', data)
  return client.get(`${urls.winning}?pageNum=${data.pageNum}&pageSize=${data.pageSize}&orderType=${data.orderType}`)
}

export function deleteBidding(data) {
  return client.post(urls.allDetlete, data)
}

export function getWinningDetail(data) {
  console.log('data !@#', data)
  return client.get(
    `${urls.winning}?pageNum=${data.pageNum}&pageSize=${data.pageSize}&auctionNumber=${data.auctionNumber}&storage=${data.storage}&customerDestinationUid=${data.customerDestinationUid}&biddingStatus=${data.biddingStatus}`,
  )
}

// 낙찰 생성 (낙찰 생성 제품 목록)
export function getWinningCreate(data) {
  return client.get(
    `${urls.winning}?pageNum=${data.pageNum}&pageSize=${data.pageSize}&saleType=${data.saleType}&registrationStatus=${data.registrationStatus}`,
  )
}
