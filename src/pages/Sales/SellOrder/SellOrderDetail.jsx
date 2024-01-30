import { useState, Fragment, useEffect } from 'react'
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
import Excel from '../../../components/TableInner/Excel'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import Table from '../../Table/Table'
import InventoryFind from '../../../modal/Multi/InventoryFind'
import {
	CustomInput,
	FilterContianer,
	FilterHeader,
	FilterTCTop,
	TCSubContainer,
	TableContianer,
} from '../../../modal/External/ExternalFilter'
import {
	BtnBound,
	SkyBtn,
	TGreyBtn,
	TWhiteBtn,
	WhiteBlackBtn,
	WhiteRedBtn,
	WhiteSkyBtn,
} from '../../../common/Button/Button'
import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle } from '../../../components/MapTable/MapTable'
import { TableWrap } from '../../../components/MapTable/MapTable'
import { invenDestination, invenDestinationData, selectedRowsAtom } from '../../../store/Layout/Layout'
import {
	saleProductOrderDetailsTableRowMap,
	saleProductOrderDetailsCols,
} from '../../../constants/admin/saleProductOrderDetails'
import { add_element_field } from '../../../lib/tableHelpers'
import { formatWeight } from '../../../utils/utils'
import { KilogramSum } from '../../../utils/KilogramSum'
import useMutationQuery from '../../../hooks/useMutationQuery'
import { queryClient } from '../../../api/query'

const SellOrderDetail = () => {
	const { simpleAlert, simpleConfirm } = useAlert()
	const navigate = useNavigate()
	const { id } = useParams()

	const paramDataInit = {
		pageNum: 1,
		pageSize: 50,
		auctionNumber: id,
	}

	const contentDataInit = ['2023040558', '4,685,798', 'K00000', '30', '4,685,798', '54,685,798']
	const titleData = ['주문 번호', '고객사', '고객코드', '총 수량', '총 중량(KG)', '입금 요청 금액(원)']

	const checkBoxSelect = useAtomValue(selectedRowsAtom)
	const destinationData = useAtomValue(invenDestinationData)
	const [destinationPopUp, setDestinationPopUp] = useAtom(invenDestination)

	const [contentData, setContentData] = useState(contentDataInit)
	const [param, setParam] = useState(paramDataInit)
	const [saleProductDetailData, setSaleProductDetailData] = useState([])
	const [saleProductDetailPagination, setSaleProductDetailPagination] = useState([])
	const [isPackage, setIsPackage] = useState(false)

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
					totalQuantity,
					totalWeight,
					depositRequestAmount,
				} = firstItem

				setSaleProductDetailData(formatTableRowData(list))
				setSaleProductDetailPagination(pagination)
				setContentData([
					auctionNumber,
					customerName,
					customerCode,
					totalQuantity,
					parseFloat(totalWeight).toLocaleString(undefined, { minimumFractionDigits: 2 }),
					depositRequestAmount,
				])
				setIsPackage(!!list[0].packageNumber)
			}
		}

		if (isError) {
			simpleAlert('요청중 오류가 발생했습니다.\n다시 시도해 주세요.')
		}
	}, [getSaleProductDetailResponse, isError])

	const formatTableRowData = (singleProductListData) => {
		return add_element_field(singleProductListData, saleProductOrderDetailsTableRowMap)
	}

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

	const handleButtonClick = (alertMessage, mapFunction, mutationFunction) => {
		if (checkBoxSelect === null || checkBoxSelect.length === 0) {
			return simpleAlert(alertMessage)
		}

		const data = checkBoxSelect.map(mapFunction)

		mutationFunction({ updateList: data })
	}

	// 부분 주문 취소 버튼
	const depositOrderCancelButtonOnClickHandler = () => {
		handleButtonClick(
			'주문 취소할 제품을 선택해 주세요.',
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
			(value) => ({ uid: value['주문번호'] }),
			mutateDepositOrderConfirm,
		)
	}

	// 목적지 승인 요청 버튼
	const destinationRequestButtonOnClickHandler = () => {
		handleButtonClick(
			'목적지를 적용할 제품을 선택해 주세요.',
			(value) => ({ uid: value['주문번호'], requestCustomerDestinationUid: destinationData.uid }),
			mutateAuctionSuccessfulBidRequest,
		)
	}

	// 목적지 변경 승인 버튼
	const destinationChangeApproveButtonOnClickHandler = () => {
		handleButtonClick(
			'목적지 변경 승일할 제품을 선택해 주세요.',
			(value) => ({ uid: value['주문번호'], requestCustomerDestinationUid: destinationData.uid }),
			mutateAuctionSuccessfulBidApprove,
		)
	}

	// 목적지 변경 반려 버튼
	const destinationChangeRejectButtonOnClickHandler = () => {
		handleButtonClick(
			'목적지 변경 반려할 제품을 선택해 주세요.',
			(value) => ({ uid: value['주문번호'], requestCustomerDestinationUid: destinationData.uid }),
			mutateAuctionSuccessfulBidReject,
		)
	}

	// 목적지 적용 버튼
	const updateCustomerDestinationButtonOnClick = () => {
		handleButtonClick(
			'목적지를 적용할 제품을 선택해 주세요.',
			(value) => ({ uid: value['주문번호'], requestCustomerDestinationUid: destinationData.uid }),
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
						조회 목록 (선택 <span>{checkBoxSelect?.length > 0 ? checkBoxSelect?.length : '0'}</span> /{' '}
						{saleProductDetailPagination?.listCount}개 )
						<Hidden />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />
						<Excel getRow={saleProductDetailData} />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택 중량
						<span> {formatWeight(KilogramSum(checkBoxSelect))} </span>
						kg / 총 중량 {formatWeight(saleProductDetailPagination.totalWeight)} kg
					</div>
					<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
						<p>목적지</p>
						<CustomInput placeholder="h50" width={60} height={32} defaultValue={destinationData?.code} readOnly />
						<CustomInput placeholder="목적지명" width={120} height={32} defaultValue={destinationData?.name} readOnly />
						{/* <CustomInput placeholder="도착지 연락처" width={120} height={32} /> */}
						<TWhiteBtn
							style={{ writingMode: 'horizontal-tb' }}
							height={30}
							onClick={() => {
								setDestinationPopUp(true)
							}}
						>
							찾기
						</TWhiteBtn>
						<TGreyBtn onClick={updateCustomerDestinationButtonOnClick}>적용</TGreyBtn>
						<BtnBound style={{ margin: '0px' }} />
						<WhiteBlackBtn onClick={destinationRequestButtonOnClickHandler}>목적지 승인 요청</WhiteBlackBtn>
						<BtnBound style={{ margin: '0px' }} />
						<WhiteRedBtn onClick={destinationChangeRejectButtonOnClickHandler}>목적지 변경 반려</WhiteRedBtn>
						<WhiteSkyBtn str onClick={destinationChangeApproveButtonOnClickHandler}>
							목적지 변경 승인
						</WhiteSkyBtn>
					</div>
				</TCSubContainer>
				{/* <Test3 /> */}
				<Table
					getCol={saleProductOrderDetailsCols}
					getRow={saleProductDetailData}
					loading={isLoading}
					tablePagination={saleProductDetailPagination}
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
