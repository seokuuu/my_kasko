import React, { Fragment, useEffect, useRef, useState } from 'react'
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

import Hidden from '../../../components/TableInner/Hidden'
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

// 패키지 상세보기 (경매)
const PackDetail = ({ aucDetail, setAucDetailModal, packNum, destiObject }) => {
	const auctionNum = aucDetail['경매 번호']
	const { simpleAlert, simpleConfirm, showAlert } = useAlert() // 에러 핸들링
	const queryClient = useQueryClient()
	const checkedArray = useAtom(selectedRowsAtom)[0]
	const productListInner = {
		biddingPrice: null,
	}

	const tableField = useRef(AuctionBiddingFieldsCols)
	const [packDetailInput, setPackDetailInput] = useState(null)
	const [innerObject, setInnerObject] = useState({})

	// 체크박스 없애기
	useEffect(() => {
		const modifiedCols = tableField.current.filter((col) => col.field !== '') // 체크박스 열 제거
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
	}, [])

	const [winningCreateInput, setwinningCreateInput] = useState(productListInner) // 응찰 상태
	const [finalInput, setFinalInput] = useState({
		biddingPrice: null,
	})

	console.log('finalInput', finalInput)
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

	console.log('패키지 모달 바디값 ', winningCreateInput)
	console.log('getRow', getRow)

	// useEffect(() => {
	// 	const updatedProductList = {
	// 		packageNumber: packNum,
	// 		customerDestinationUid: destiObject && destiObject['uid'],
	// 		biddingPrice: '',
	// 	}
	// 	// winningCreateData를 업데이트하여 productList를 갱신
	// 	setWinningCreateData((prevData) => ({
	// 		...prevData,
	// 		biddingList: updatedProductList,
	// 	}))
	// }, [finalInput])

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

	// 응찰가 일괄 적용 버튼
	const handleButtonClick = () => {
		const firstBiddingEntry = getRow[0]
		if (firstBiddingEntry) {
			setWinningCreateData((prevData) => ({
				...prevData,
				biddingList: [
					{
						packageNumber: packNum,
						customerDestinationUid: destiObject && destiObject?.['uid'],
						biddingPrice: firstBiddingEntry.memberBiddingPrice + finalInput?.biddingPrice,
					},
				],
			}))
		}

		const uids = getRow?.[0]?.['경매 번호']
		const updatedResData = resData.map((item) => {
			if (uids.includes(item.auctionNumber)) {
				item.memberBiddingPrice = item.memberBiddingPrice + finalInput?.biddingPrice
			}
			return item
		})
		setGetRow(add_element_field(updatedResData, AuctionBiddingFields))
	}

	// JSX 내부에서 버튼에 onClick 이벤트 핸들러 추가
	;<button onClick={handleButtonClick}>클릭</button>

	return (
		<>
			<FadeOverlay />
			<ModalContainer style={{ width: '75%', height: '95vh' }}>
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
									<p>일괄 경매 응찰 최고가 +</p>
									<CustomInput
										placeholder="응찰가 + 최고가 입력"
										width={140}
										height={32}
										onChange={(e) => {
											setFinalInput((p) => ({
												...p,
												biddingPrice: parseInt(e.target.value) || null,
											}))
										}}
									/>
									<TGreyBtn height={30} style={{ width: '50px' }} onClick={handleButtonClick}>
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
								getCol={tableField.current}
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
