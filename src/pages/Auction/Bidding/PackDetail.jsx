import React, { Fragment, memo, useEffect, useRef, useState } from 'react'
import { BlackBtn, BtnBound, NewBottomBtnWrap, SkyBtn, TGreyBtn } from '../../../common/Button/Button'
import Excel from '../../../components/TableInner/Excel'

import {
	CustomInput,
	FilterContianer,
	FilterTCTop,
	FilterTopContainer,
	TableContianer,
	TCSubContainer,
} from '../../../modal/External/ExternalFilter'

import PageDropdown from '../../../components/TableInner/PageDropdown'

import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle } from '../../../components/MapTable/MapTable'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { getBiddingPackDetail, postBidding } from '../../../api/auction/bidding'
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
import useAlert from '../../../store/Alert/useAlert'
import { selectedRowsAtom } from '../../../store/Layout/Layout'
import Table from '../../Table/Table'
import styled from 'styled-components'

// 패키지 상세보기 (경매)
const PackDetail = ({ aucDetail, setAucDetailModal, packNum, destiObject, nowAuction, live, setLive }) => {
	const auctionNum = aucDetail['경매 번호']
	console.log('aucDetail', aucDetail)
	const { simpleAlert, simpleConfirm, showAlert } = useAlert() // 에러 핸들링
	const queryClient = useQueryClient()
	const checkedArray = useAtom(selectedRowsAtom)[0]
	const productListInner = {
		biddingPrice: null,
	}

	// AuctionBiddingFieldsCols(checkedArrayState) 이런식으로 써야하나?
	const tableField = useRef(AuctionBiddingFieldsCols(checkedArray, true))

	// 체크박스 없애기
	useEffect(() => {
		const modifiedCols = tableField.current.filter(
			(col) =>
				col.field !== '' &&
				col.field !== '목적지 코드' &&
				col.field !== '목적지 명' &&
				col.field !== '목적지 주소' &&
				col.field !== '목적지 연락처(사무실)',
		)

		tableField.current = modifiedCols

		// 상위 컴포넌트 값 받아오기
		const updatedProductList = [
			{
				packageNumber: packNum,
				customerDestinationUid: destiObject && destiObject?.['uid'],
				biddingPrice: null, // Initialize biddingPrice to null
			},
		]

		setWinningCreateData((prevData) => ({
			...prevData,
			biddingList: updatedProductList,
		}))

		// 부모 라이브 끄기 / 모달 라이브 켜기
		setLive(false)

		// 부모 라이브 켜기 / 모달 라이브 끄기
		return () => {
			setLive(true)
		}
	}, [])

	const [winningCreateInput, setwinningCreateInput] = useState(productListInner) // 응찰 상태
	const [finalInput, setFinalInput] = useState({
		biddingPrice: null,
	})

	const init = {
		auctionNumber: auctionNum,
		type: '패키지',
	}
	const [winningCreateData, setWinningCreateData] = useState(init)

	const [getRow, setGetRow] = useState('')
	const [tablePagination, setTablePagination] = useState([])
	const modalClose = () => {
		setAucDetailModal(false)
	}

	const paramData = {
		pageNum: 1,
		pageSize: 50,
		type: '상세',
		packageNumber: packNum,
	}

	// live가 false여야지 모달 라이브가 돈다. !live = true에
	// modalLive 값을 하나 더 만들어 라이브 관리를 하자.

	const [modalLive, setModalLive] = useState(true)

	const [param, setParam] = useState(paramData)

	const { isLoading, isError, data, isSuccess, refetch } = useReactQuery(
		paramData,
		!live && modalLive,
		getBiddingPackDetail,
		nowAuction,
	)

	const resData = data?.data?.data?.list
	const resPagination = data?.data?.data?.pagination

	const firstGetRow = [getRow[0]]

	useEffect(() => {
		let getData = resData

		if (!isSuccess && !resData) return
		if (Array.isArray(getData)) {
			setGetRow(add_element_field(getData, AuctionBiddingFields))
			setTablePagination(resPagination)
		}
	}, [isSuccess, resData])

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
					setFinalInput({
						biddingPrice: null,
					})
					setModalLive(true) // 모달 라이브 켜기
				},
			})
		},
		onError: (error) => {
			simpleAlert(error?.data?.message || '오류가 발생했습니다. 다시 시도해주세요.')
		},
	})

	console.log('finalInput.biddingPrice', finalInput.biddingPrice)

	const confirmOnClickHandler = () => {
		if (finalInput.biddingPrice) {
			postMutation(winningCreateData)
		} else {
			packageRowBidding()
		}
	}

	console.log('finalInput', finalInput)

	console.log('winningCreateData', winningCreateData)

	const titleData = ['패키지 명', '수량', '중량', '시작가']
	const contentData = [aucDetail['패키지 명'], getRow?.length, aucDetail['총 중량'], aucDetail['시작가']]

	const handleTablePageSize = (event) => {
		setParam((prevParam) => ({
			...prevParam,
			pageSize: Number(event.target.value),
			pageNum: 1,
		}))
	}

	// biddingList에 들어갈 3총사를 다 넣어줌.
	// const packageRowBidding = async () => {
	// 	console.log('되나')
	// 	const updatedProductList = firstGetRow?.map((item) => ({
	// 		packageNumber: item['패키지 번호'],
	// 		biddingPrice:
	// 			item['현재 최고 가격'] === 0
	// 				? item['시작가'] + 1
	// 				: item['현재 최고 가격'] >= 1 && item['현재 최고 가격'] <= item['나의 최고 응찰 가격']
	// 				? item['나의 최고 응찰 가격'] + (finalInput?.biddingPrice || 1)
	// 				: item['현재 최고 가격'] + (finalInput?.biddingPrice || 1),
	// 	}))

	// 	// winningCreateData를 업데이트하여 productList를 갱신
	// 	setWinningCreateData((prevData) => ({
	// 		...prevData,
	// 		biddingList: updatedProductList,
	// 	}))

	// 	await postMutation(winningCreateData)
	// }

	const packageRowBidding = () => {
		const updatedProductList = firstGetRow?.map((item) => ({
			packageNumber: item['패키지 번호'],
			biddingPrice:
				item['현재 최고 가격'] === 0
					? item['시작가'] + 1
					: item['현재 최고 가격'] >= 1 && item['현재 최고 가격'] <= item['나의 최고 응찰 가격']
					? item['나의 최고 응찰 가격'] + (finalInput?.biddingPrice || 1)
					: item['현재 최고 가격'] + (finalInput?.biddingPrice || 1),
			customerDestinationUid: destiObject && destiObject?.['uid'],
		}))

		// winningCreateData를 업데이트하여 productList를 갱신
		const updatedData = {
			...winningCreateData,
			biddingList: updatedProductList,
		}

		setWinningCreateData((prevData) => ({
			...prevData,
			biddingList: updatedProductList,
		}))

		// postMutation 함수 내부에서 처리
		postMutation(updatedData)
	}

	// 응찰가 일괄 적용 버튼
	const handleButtonClick = () => {
		if (finalInput.biddingPrice === null) simpleAlert('값을 입력해주세요.')
		else {
			setModalLive(false) // 모달 LIVE 일시 중단
			simpleAlert('적용 되었습니다.', () => {
				const firstBiddingEntry = getRow[0]
				if (firstBiddingEntry) {
					setWinningCreateData((prevData) => ({
						...prevData,
						biddingList: [
							{
								packageNumber: packNum,
								customerDestinationUid: destiObject && destiObject?.['uid'],
								biddingPrice:
									firstBiddingEntry['현재 최고 가격'] === 0
										? firstBiddingEntry['시작가'] + (finalInput?.biddingPrice || 1)
										: firstBiddingEntry['현재 최고 가격'] >= 1 &&
										  firstBiddingEntry['현재 최고 가격'] <= firstBiddingEntry['나의 최고 응찰 가격']
										? firstBiddingEntry['나의 최고 응찰 가격'] + (finalInput?.biddingPrice || 1)
										: firstBiddingEntry['현재 최고 가격'] + (finalInput?.biddingPrice || 1),
							},
						],
					}))
				}

				const uids = getRow?.[0]?.['경매 번호']
				const updatedResData = resData.map((item) => {
					if (uids.includes(item.auctionNumber)) {
						item.memberBiddingPrice =
							item.biddingPrice === 0
								? item.auctionStartPrice + finalInput?.biddingPrice // 이건 작동 됨
								: item.biddingPrice >= 1 && item.biddingPrice <= item.memberBiddingPrice
								? item.memberBestBiddingPrice + finalInput.biddingPrice
								: item.biddingPrice + finalInput?.biddingPrice
					}
					return item
				})

				console.log('updatedResData', updatedResData[0]?.memberBiddingPrice)
				console.log('finalInput?.biddingPrice ', finalInput?.biddingPrice)
				setGetRow(add_element_field(updatedResData, AuctionBiddingFields))
			})
		}
	}

	return (
		<>
			<FadeOverlay />
			<ModalContainer style={{ width: '75%', height: '95vh' }}>
				<BlueBarHeader style={{ height: '60px' }}>
					<div>패키지 상세 보기(경매)</div>
					<div>
						<WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
					</div>
				</BlueBarHeader>
				<BlueSubContainer style={{ padding: '0px 30px' }}>
					<FilterContianer style={{ height: '65vh' }}>
						<div style={{ marginTop: '50px' }}></div>
						<FilterTopContainer>
							<FilterTCTop>
								<h6>패키지 번호</h6>
								<p>{aucDetail['패키지 번호']}</p>
							</FilterTCTop>
						</FilterTopContainer>
						<ClaimTable style={{ marginBottom: '30px' }}>
							{[0]?.map((index) => (
								<ClaimRow key={index}>
									{titleData.slice(index * 4, index * 4 + 4).map((title, idx) => (
										<Fragment key={idx}>
											<ClaimTitle>{title}</ClaimTitle>
											<ClaimContent>{contentData[index * 4 + idx]}</ClaimContent>
										</Fragment>
									))}
								</ClaimRow>
							))}
						</ClaimTable>
						<TableDiv>
							<TableContianer style={{ height: '55vh' }}>
								<TCSubContainer bor>
									<div></div>
									<div style={{ display: 'flex', gap: '10px' }}>
										<PageDropdown handleDropdown={handleTablePageSize} />
										<Excel getRow={getRow} sheetName="패키지 상세" />
									</div>
								</TCSubContainer>
								{nowAuction && (
									<TCSubContainer>
										<div></div>
										<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
											<p>일괄 경매 응찰 | 최고가 +</p>
											<CustomInput
												placeholder="응찰가 + 최고가 입력"
												width={140}
												height={32}
												value={finalInput.biddingPrice !== null ? finalInput.biddingPrice : ''}
												onChange={(e) => {
													setFinalInput((p) => ({
														...p,
														biddingPrice: parseInt(e.target.value) || null,
													}))
												}}
											/>
											<TGreyBtn height={30} style={{ minWidth: '50px' }} onClick={handleButtonClick}>
												적용
											</TGreyBtn>
											<BtnBound />
											<SkyBtn style={{ width: '200px', fontSize: '20px' }} height={50} onClick={confirmOnClickHandler}>
												응찰
											</SkyBtn>
										</div>
									</TCSubContainer>
								)}

								<Table
									// hei2={400}
									hei={55}
									getCol={tableField.current}
									getRow={getRow}
									tablePagination={tablePagination}
									onPageChange={onPageChange}
								/>
							</TableContianer>
							<NewBottomBtnWrap style={{ height: '10%' }} bottom={-5}>
								<BlackBtn width={13} height={40} onClick={modalClose}>
									닫기
								</BlackBtn>
							</NewBottomBtnWrap>
						</TableDiv>
					</FilterContianer>
				</BlueSubContainer>
			</ModalContainer>
		</>
	)
}

export default PackDetail

const TableDiv = styled.div`
	overflow-y: scroll;
	max-height: 95%;
	display: flex;
	flex-direction: column;
`
