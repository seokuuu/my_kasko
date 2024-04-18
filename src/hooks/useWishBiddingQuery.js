import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import useWishList from './useWishList'
import { useLocation } from 'react-router-dom'
// import axios from 'axios'
// import { getDestination } from '../api/myPage'

export default function useWishBiddingQuery(obj, key, api, auctionStatus) {
	const { wishProdNums } = useWishList() // 관심상품 목록 데이터 조회 hook
	const location = useLocation()

	// 사용자 - 경매 '단일' 응찰 페이지 관심제품 param 추가
	if (['/userpage/auctionsingle'].includes(location.pathname)) {
		obj = {
			...obj,
			wishProductNumbers: wishProdNums?.filter((item) => !item.includes('PK'))?.join(','),
		}
	}

	// 사용자 - 경매 '패키지 응찰 페이지 관심제품 param 추가
	if (['/userpage/auctionpackage'].includes(location.pathname)) {
		obj = {
			...obj,
			wishPackageNumbers: wishProdNums?.filter((item) => item.includes('PK'))?.join(','),
		}
	}

	const [isEnable, setIsEnable] = useState(true)
	useEffect(() => {
		setIsEnable(true)
	}, [obj])

	const { isLoading, isError, data, isSuccess, refetch } = useQuery([key, obj], () => api(obj), {
		retry: false,
		enabled: isEnable,
		...(key && auctionStatus ? { refetchInterval: 1000 } : {}), // 조건에 따라 refetchInterval 추가
	})
	return { isLoading, isError, data, isSuccess, refetch }
}

// staleTime: 1000 * 60 * 5, // 데이터가 5분 동안 신선하다고 간주
// refetchInterval: 1000 * 60, // 1분마다 데이터를 다시 가져옴
