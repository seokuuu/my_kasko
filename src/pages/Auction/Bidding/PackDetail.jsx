import React, { Fragment, useEffect, useState } from 'react'
import { BlackBtn, BtnBound, NewBottomBtnWrap, SkyBtn, TGreyBtn, WhiteBtn } from '../../../common/Button/Button'
import Excel from '../../../components/TableInner/Excel'

import {
	CustomInput,
	FilterContianer,
	FilterTCTop,
	FilterTopContainer,
	TableContianer,
	TCSubContainer,
} from '../../../modal/External/ExternalFilter'

import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'

import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle } from '../../../components/MapTable/MapTable'

import { isEqual } from 'lodash'
import { getBidding, getBiddingDetail, getBiddingPackDetail, postBidding } from '../../../api/auction/bidding'
import { AuctionBiddingFields, AuctionBiddingFieldsCols } from '../../../constants/admin/Auction'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import {
	BlueBarHeader,
	BlueSubContainer,
	FadeOverlay,
	ModalContainer,
	WhiteCloseBtn,
} from '../../../modal/Common/Common.Styled'
import Table from '../../Table/Table'
import { useAtom } from 'jotai'
import { selectedRowsAtom } from '../../../store/Layout/Layout'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAlert from '../../../store/Alert/useAlert'

// 패키지 상세보기 (경매)
const PackDetail = ({ aucDetail, setAucDetailModal, packNum }) => {
	const auctionNum = aucDetail['경매 번호']
	const { simpleAlert, simpleConfirm, showAlert } = useAlert() // 에러 핸들링
	const queryClient = useQueryClient()
	const checkedArray = useAtom(selectedRowsAtom)[0]
	const productListInner = {
		biddingPrice: null,
	}

	const [winningCreateInput, setwinningCreateInput] = useState(productListInner) // 응찰 상태
	const [finalInput, setFinalInput] = useState({
		biddingPrice: null,
	})
	const init = {
		auctionNumber: auctionNum,
	}
	const [winningCreateData, setWinningCreateData] = useState(init)

	const [getRow, setGetRow] = useState('')
	const [tablePagination, setTablePagination] = useState([])
	const modalClose = () => {
		setAucDetailModal(false)
	}

	useEffect(() => {
		const updatedProductList = checkedArray?.map((item) => ({
			packageNumber: item['패키지 번호'],
			biddingPrice: finalInput?.biddingPrice,
			// 여기에 다른 필요한 속성을 추가할 수 있습니다.
		}))

		// winningCreateData를 업데이트하여 productList를 갱신
		setWinningCreateData((prevData) => ({
			...prevData,
			biddingList: updatedProductList,
		}))
	}, [checkedArray, finalInput])

	const paramData = {
		pageNum: 1,
		pageSize: 50,
		type: '상세',
		packageNumber: packNum,
	}

	const [param, setParam] = useState(paramData)

	console.log('param 파람 ==>', param)

	const { isLoading, isError, data, isSuccess, refetch } = useReactQuery(
		paramData,
		'getBiddingDetail',
		getBiddingPackDetail,
	)
	const resData = data?.data?.data?.list
	const resPagination = data?.data?.data?.pagination

	useEffect(() => {
		let getData = resData
		if (!isSuccess && !resData) return
		if (Array.isArray(getData)) {
			setGetRow(add_element_field(getData, AuctionBiddingFields))
			setTablePagination(resPagination)
		}
	}, [isSuccess, resData])

	const globalProductResetOnClick = () => {
		// if resetting the search field shouldn't rerender table
		// then we need to create paramData object to reset the search fields.
		setParam(paramData)
	}
	// import
	const globalProductSearchOnClick = (userSearchParam) => {
		setParam((prevParam) => {
			if (isEqual(prevParam, { ...prevParam, ...userSearchParam })) {
				refetch()
				return prevParam
			}
			return {
				...prevParam,
				...userSearchParam,
			}
		})
	}

	const onPageChange = (value) => {
		setParam((prevParam) => ({
			...prevParam,
			pageNum: Number(value),
		}))
	}

	const { mutate: postMutation } = useMutation(postBidding, {
		onSuccess() {
			showAlert({
				title: '응찰이 완료되었습니다.',
				content: '',
				func: () => {
					refetch()
					queryClient.invalidateQueries('auction')
				},
			})
		},
		onError: () => {
			simpleAlert('오류가 발생했습니다. 다시 시도해주세요.')
		},
	})

	const confirmOnClickHandler = () => {
		postMutation(winningCreateData)
	}

	console.log('winningCreateData PackDetail.jsx', winningCreateData)

	const titleData = ['패키지 명', '수량', '시작가']
	const contentData = [aucDetail['패키지명'], '수정해야함', aucDetail['시작가']]

	const handleTablePageSize = (event) => {
		setParam((prevParam) => ({
			...prevParam,
			pageSize: Number(event.target.value),
			pageNum: 1,
		}))
	}

	return (
		<>
			<FadeOverlay />
			<ModalContainer style={{ width: '75%', height: '90vh' }}>
				<BlueBarHeader style={{ height: '60px' }}>
					{/* <div>{title}</div> */}
					<div>패키지 상세 보기(경매)</div>
					<div>
						<WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
					</div>
				</BlueBarHeader>
				<BlueSubContainer style={{ padding: '0px 30px' }}>
					<FilterContianer>
						<div style={{ marginTop: '50px' }}></div>
						<FilterTopContainer>
							<FilterTCTop>
								<h6>패키지 번호</h6>
								<p>{aucDetail['패키지 번호']}</p>
							</FilterTCTop>
						</FilterTopContainer>
						<ClaimTable style={{ marginBottom: '30px' }}>
							{[0].map((index) => (
								<ClaimRow key={index}>
									{titleData.slice(index * 3, index * 3 + 3).map((title, idx) => (
										<Fragment agmentkey={title}>
											<ClaimTitle>{title}</ClaimTitle>
											<ClaimContent>{contentData[index * 3 + idx]}</ClaimContent>
										</Fragment>
									))}
								</ClaimRow>
							))}
						</ClaimTable>
						<TableContianer>
							<TCSubContainer bor>
								<div>
									조회 목록 (선택 <span>2</span> / 50개 )
									<Hidden />
								</div>
								<div style={{ display: 'flex', gap: '10px' }}>
									<PageDropdown handleDropdown={handleTablePageSize} />
									<Excel getRow={getRow} />
								</div>
							</TCSubContainer>
							<TCSubContainer>
								<div>
									선택 중량<span> 2 </span>kg / 총 중량 kg
								</div>
								<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
									<p>일괄 경매 응찰</p>
									<CustomInput
										placeholder="응찰가 + 최고가 입력"
										width={140}
										height={32}
										onChange={(e) => {
											setwinningCreateInput((p) => ({
												...p,
												biddingPrice: parseInt(e.target.value) || null,
											}))
										}}
									/>
									<TGreyBtn
										height={30}
										style={{ width: '50px' }}
										onClick={() => {
											setFinalInput((p) => ({
												...p,
												biddingPrice: winningCreateInput?.biddingPrice,
											}))
										}}
									>
										적용
									</TGreyBtn>
									<BtnBound />
									<SkyBtn style={{ width: '200px', fontSize: '20px' }} height={50} onClick={confirmOnClickHandler}>
										응찰
									</SkyBtn>
								</div>
							</TCSubContainer>
							<Table
								hei2={400}
								hei={100}
								getCol={AuctionBiddingFieldsCols}
								getRow={getRow}
								tablePagination={tablePagination}
								onPageChange={onPageChange}
							/>
						</TableContianer>
					</FilterContianer>
					<NewBottomBtnWrap bottom={-5}>
						<BlackBtn width={13} height={40} onClick={modalClose}>
							닫기
						</BlackBtn>
					</NewBottomBtnWrap>
				</BlueSubContainer>
			</ModalContainer>
		</>
	)
}

export default PackDetail
