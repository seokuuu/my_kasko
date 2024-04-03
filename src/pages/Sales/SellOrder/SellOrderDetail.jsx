import React, { Fragment, useEffect, useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { useNavigate, useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import { getSaleProductDetail, usePostSaleProductOrderPartConfirm } from '../../../api/saleProduct'
import { getDestinationFind } from '../../../api/search'
import { cancelAllOrderList, useDepositOrderCancel } from '../../../api/orderList'
import {
	useAuctionSuccessfulBidApprove,
	useAuctionSuccessfulBidReject,
	useAuctionSuccessfulBidRequest,
} from '../../../api/auction/successfulBid'
import useReactQuery from '../../../hooks/useReactQuery'
import useAlert from '../../../store/Alert/useAlert'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import InventoryFind from '../../../modal/Multi/InventoryFind'
import {
	FilterContianer,
	FilterHeader,
	FilterTCTop,
	TableContianer,
	TCSubContainer,
} from '../../../modal/External/ExternalFilter'
import {
	BlackBtn,
	BtnBound,
	NewBottomBtnWrap,
	SkyBtn,
	TGreyBtn,
	WhiteRedBtn,
	WhiteSkyBtn,
} from '../../../common/Button/Button'
import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle, TableWrap } from '../../../components/MapTable/MapTable'
import { invenDestination, selectedRowsAtom } from '../../../store/Layout/Layout'
import {
	saleProductOrderDetailsCols,
	saleProductOrderDetailsTableRowMap,
} from '../../../constants/admin/saleProductOrderDetails'
import useMutationQuery from '../../../hooks/useMutationQuery'
import { queryClient } from '../../../api/query'
import useTableData from '../../../hooks/useTableData'
import useTableSelection from '../../../hooks/useTableSelection'
import { USER_URL } from '../../../api/user'
import TableV2ExcelDownloader from '../../Table/TableV2ExcelDownloader'
import TableV2HiddenSection from '../../Table/TableV2HiddenSection'
import TableV2 from '../../Table/TableV2'
import DestinationChange from '../../../modal/Multi/DestinationChange'

const SellOrderDetail = () => {
	const { simpleAlert, simpleConfirm } = useAlert()
	const navigate = useNavigate()
	const { id, status } = useParams()

	const paramDataInit = {
		pageNum: 1,
		pageSize: 50,
		auctionNumber: id,
		saleStatus: status,
	}

	const contentDataInit = ['2023040558', '4,685,798', 'K00000', '30', '4,685,798', '54,685,798']
	const titleData = ['주문 번호', '고객사', '고객코드', '총 수량', '총 중량(KG)', '입금 요청 금액(원)']

	const checkBoxSelect = useAtomValue(selectedRowsAtom)
	const [destinationPopUp, setDestinationPopUp] = useAtom(invenDestination)

	const [contentData, setContentData] = useState(contentDataInit)
	const [param, setParam] = useState(paramDataInit)
	const [serverData, setServerData] = useState({ list: [], pagination: {} })
	const [isPackage, setIsPackage] = useState(false)

	// 목적지 데이터 || 목적지 변경 항목 데이터
	const [destination, setDestination] = useState(null) // { code: '', name: '', tel: '' }

	// 테이블 데이터, 페이지 데이터, 총 중량
	const { tableRowData, paginationData, totalWeightStr, totalCountStr, totalCount } = useTableData({
		tableField: saleProductOrderDetailsTableRowMap,
		serverData,
		wish: { display: true, key: ['productNumber', 'packageNumber'] },
		best: { display: true },
	})

	// 선택항목 데이터
	const { selectedWeightStr, selectedCountStr } = useTableSelection({ weightKey: '중량' })

	const {
		// prettier-ignore
		data: inventoryDestination,
	} = useReactQuery('', 'getDestinationFind', getDestinationFind)

	const {
		isLoading,
		isError,
		data: getSaleProductDetailResponse,
	} = useReactQuery(param, 'getSaleProductDetail', getSaleProductDetail)

	const {
		// prettier-ignore
		mutate: mutateAuctionSuccessfulBidApprove,
	} = useAuctionSuccessfulBidApprove() // 목적지 변경 승인
	const {
		// prettier-ignore
		mutate: mutateAuctionSuccessfulBidReject,
	} = useAuctionSuccessfulBidReject() // 목적지 변경 반려

	const {
		// prettier-ignore
		mutate: mutateAuctionSuccessfulBidRequest,
	} = useAuctionSuccessfulBidRequest() // 목적지 승인 요청

	const {
		// prettier-ignore
		mutate: mutateDepositOrderCancel,
		loading: orderPartCancelLoading,
	} = useDepositOrderCancel() // 부분 주문 취소

	const { mutate: cancelAllOrder, loading: loadingOrderCancel } = useMutationQuery(
		'cancelAllOrderList',
		cancelAllOrderList,
	) // 패키지 주문 취소

	const {
		// prettier-ignore
		mutate: mutateDepositOrderConfirm,
		loading: orderConfirmLoading,
	} = usePostSaleProductOrderPartConfirm() // 부분 입금 확인

	useEffect(() => {
		if (getSaleProductDetailResponse?.data?.data) {
			const { list, pagination } = getSaleProductDetailResponse.data.data
			if (list && list.length > 0) {
				const [firstItem] = list
				const {
					// prettier-ignore
					auctionNumber,
					customerName,
					customerCode,
				} = firstItem
				const {
					// prettier-ignore
					listCount,
					totalWeight,
				} = pagination

				const totalPrice = list.map((item) => item.totalPrice).reduce((prev, curr) => prev + curr, 0)

				setServerData({ list, pagination })
				setContentData([
					auctionNumber,
					customerName,
					customerCode,
					listCount,
					totalWeight?.toLocaleString(),
					totalPrice?.toLocaleString(),
				])
				setIsPackage(!!list[0].packageNumber)
			}
		}

		if (isError) {
			simpleAlert('요청중 오류가 발생했습니다.\n다시 시도해 주세요.')
		}
	}, [getSaleProductDetailResponse, isError])

	const handleTablePageSize = (event) => {
		setParam((prevParam) => ({
			...prevParam,
			pageSize: Number(event.target.value),
			pageNum: 1,
		}))
	}

	const onPageChange = (value) => {
		setParam((prevParam) => ({
			...prevParam,
			pageNum: Number(value),
		}))
	}

	const handleButtonClick = (alertMessage, confirmMessage, mapFunction, mutationFunction) => {
		if (checkBoxSelect === null || checkBoxSelect.length === 0) {
			return simpleAlert(alertMessage)
		}

		simpleConfirm(confirmMessage, () => {
			const data = checkBoxSelect.map(mapFunction)
			mutationFunction({ updateList: data })
		})
	}

	// 부분 주문 취소 버튼
	const depositOrderCancelButtonOnClickHandler = () => {
		handleButtonClick(
			'주문 취소할 제품을 선택해 주세요.',
			'선택한 주문을 취소하시겠습니까?',
			(value) => ({ uid: value['주문번호'], saleType: '상시판매 대상재' }),
			mutateDepositOrderCancel,
		)
	}

	const packageOrderCancelHandler = () => {
		const requestList = [{ auctionNumber: id, saleType: '상시판매 대상재' }]

		simpleConfirm('주문 취소하시겠습니까?', () => {
			cancelAllOrder(requestList, {
				onSuccess: () => {
					simpleAlert('주문 취소 성공하였습니다.', () => {
						queryClient.invalidateQueries({ queryKey: 'getSaleProductList' })
						navigate(-1, { replace: true })
					})
				},
				onError: () => {
					simpleAlert('주문 취소 중 오류가 발생했습니다.')
				},
			})
		})
	}

	// 부분 입금 확인 버튼
	const depositOrderConfirmButtonOnClickHandler = () => {
		handleButtonClick(
			'입금 확인할 제품을 선택해 주세요.',
			'선택한 주문에 대한 입금을 확인하시겠습니까?',
			(value) => ({ uid: value['주문번호'] }),
			mutateDepositOrderConfirm,
		)
	}

	// 목적지 변경 승인 버튼
	const destinationChangeApproveButtonOnClickHandler = () => {
		handleButtonClick(
			'목적지 변경 승일할 제품을 선택해 주세요.',
			'선택한 제품의 목적지 변경을 승인하시겠습니까?',
			(value) => ({ uid: value['주문번호'], requestCustomerDestinationUid: value['변경 목적지 번호'] }),
			mutateAuctionSuccessfulBidApprove,
		)
	}

	// 목적지 변경 반려 버튼
	const destinationChangeRejectButtonOnClickHandler = () => {
		handleButtonClick(
			'목적지 변경 반려할 제품을 선택해 주세요.',
			'선택한 제품의 목적지 변경을 반려하시겠습니까?',
			(value) => ({ uid: value['주문번호'], requestCustomerDestinationUid: value['변경 목적지 번호'] }),
			mutateAuctionSuccessfulBidReject,
		)
	}

	// 목적지 적용 버튼
	const updateCustomerDestinationButtonOnClick = () => {
		handleButtonClick(
			'목적지를 적용할 제품을 선택해 주세요.',
			'선택한 제품에 목적지를 적용하시겠습니까?',
			(value) => ({ uid: value['주문번호'], requestCustomerDestinationUid: destination?.uid }),
			mutateAuctionSuccessfulBidRequest,
		)
	}

	return (
		<FilterContianer>
			<div>
				<FilterHeader>
					<h1>상시 판매 주문 확인 상세</h1>
				</FilterHeader>
				<FilterTCTop>
					<h6>상시 판매 번호</h6>
					<p>{id}</p>
				</FilterTCTop>
				<TableWrap>
					<ClaimTable>
						{[0, 1].map((index) => (
							<ClaimRow key={index}>
								{titleData.slice(index * 3, index * 3 + 3).map((title, idx) => (
									<Fragment key={title}>
										<ClaimTitle>{title}</ClaimTitle>
										<ClaimContent>{contentData[index * 3 + idx]}</ClaimContent>
									</Fragment>
								))}
							</ClaimRow>
						))}
					</ClaimTable>
				</TableWrap>
			</div>
			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{selectedCountStr}</span> / {totalCountStr}개 )
						<TableV2HiddenSection />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />
						<TableV2ExcelDownloader
							requestUrl={USER_URL.orderDetail}
							requestParam={{ auctionNumber: id }}
							requestCount={totalCount}
							field={saleProductOrderDetailsTableRowMap}
							sheetName={`주문확인상세(${id})`}
						/>
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택중량 <span> {selectedWeightStr} </span> (kg) / 총 중량 {totalWeightStr} (kg)
					</div>
					<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
						<P>목적지</P>
						<DestinationChange
							customerCode={contentData[2]}
							customerName={contentData[3]}
							value={destination}
							onSubmit={(d) => {
								setDestination(d)
							}}
						/>
						<TGreyBtn onClick={updateCustomerDestinationButtonOnClick}>적용</TGreyBtn>
						{/*<BtnBound style={{ margin: '0px' }} />*/}
						{/*<WhiteBlackBtn onClick={destinationRequestButtonOnClickHandler}>목적지 승인 요청</WhiteBlackBtn>*/}
						<BtnBound style={{ margin: '0px' }} />
						<WhiteRedBtn onClick={destinationChangeRejectButtonOnClickHandler}>목적지 변경 반려</WhiteRedBtn>
						<WhiteSkyBtn str onClick={destinationChangeApproveButtonOnClickHandler}>
							목적지 변경 승인
						</WhiteSkyBtn>
					</div>
				</TCSubContainer>
				<TableV2
					getRow={tableRowData}
					getCol={saleProductOrderDetailsCols}
					loading={isLoading}
					paginationData={paginationData}
					onPageChange={onPageChange}
				/>
				<TCSubContainer>
					<div></div>
					<div style={{ display: 'flex', gap: '10px' }}>
						{isPackage ? (
							<WhiteRedBtn onClick={packageOrderCancelHandler} disabled={loadingOrderCancel}>
								주문 취소
							</WhiteRedBtn>
						) : (
							<WhiteRedBtn onClick={depositOrderCancelButtonOnClickHandler} disabled={orderPartCancelLoading}>
								부분 주문 취소
							</WhiteRedBtn>
						)}
						<SkyBtn onClick={depositOrderConfirmButtonOnClickHandler} disabled={orderConfirmLoading}>
							부분 입금 확인
						</SkyBtn>
					</div>
				</TCSubContainer>
				<NewBottomBtnWrap>
					<BlackBtn
						width={13}
						height={40}
						onClick={() => {
							navigate(-1)
						}}
					>
						돌아가기
					</BlackBtn>
				</NewBottomBtnWrap>
			</TableContianer>
			{destinationPopUp && (
				<InventoryFind title={'목적지 찾기'} setSwitch={setDestinationPopUp} data={inventoryDestination} />
			)}
		</FilterContianer>
	)
}

export default SellOrderDetail

export const P = styled.p`
	position: relative;
	top: 5px;
`
