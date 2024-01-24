import { useAtom, useAtomValue } from 'jotai'
import React, { useState, Fragment, useEffect } from 'react'
import { styled } from 'styled-components'
import {
	BtnBound,
	SkyBtn,
	TGreyBtn,
	TWhiteBtn,
	WhiteBlackBtn,
	WhiteRedBtn,
	WhiteSkyBtn,
} from '../../../common/Button/Button'
import Excel from '../../../components/TableInner/Excel'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import {
	CustomInput,
	FilterContianer,
	FilterHeader,
	FilterTCTop,
	TCSubContainer,
	TableContianer,
} from '../../../modal/External/ExternalFilter'
import {
	blueModalAtom,
	invenDestination,
	invenDestinationData,
	selectedRowsAtom,
	toggleAtom,
} from '../../../store/Layout/Layout'
import Test3 from '../../Test/Test3'
import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle } from '../../../components/MapTable/MapTable'
import { TableWrap } from '../../../components/MapTable/MapTable'
import { useParams } from 'react-router-dom'
import { getSaleProductDetail } from '../../../api/saleProduct'
import useReactQuery from '../../../hooks/useReactQuery'
import {
	saleProductOrderDetailsTableRowMap,
	saleProductOrderDetailsCols,
} from '../../../constants/admin/saleProductOrderDetails'
import { add_element_field } from '../../../lib/tableHelpers'
import useAlert from '../../../store/Alert/useAlert'
import Table from '../../Table/Table'
import useMutationQuery from '../../../hooks/useMutationQuery'
import { destiApproveReq, destiChangeApprove, destiChangeReject } from '../../../api/auction/winning'
import InventoryFind from '../../../modal/Multi/InventoryFind'
import { getDestinationFind } from '../../../api/search'
import { formatWeight } from '../../../utils/utils'
import { KilogramSum } from '../../../utils/KilogramSum'
const SellOrderDetail = () => {
	const { id } = useParams()
	const { simpleAlert, showAlert, simpleConfirm, showConfirm, redAlert } = useAlert()

	const paramData = {
		pageNum: 1,
		pageSize: 50,
		auctionNumber: id,
	}

	const [param, setParam] = useState(paramData)
	console.log('uid =>', id)
	const {
		isLoading,
		isError,
		data: getSaleProductDetailResponse,
		isSuccess,
	} = useReactQuery(param, 'getSaleProductDetail', getSaleProductDetail)

	const titleData = ['주문 번호', '고객사', '고객코드', '총 수량', '총 중량(KG)', '입금 요청 금액(원)']
	const contentDataInit = ['2023040558', '4,685,798', 'K00000', '30', '4,685,798', '54,685,798']

	const [contentData, setContentData] = useState(contentDataInit)
	const [saleProductDetailData, setSaleProductDetailData] = useState([])
	const [saleProductDetailPagination, setSaleProductDetailPagination] = useState([])

	useEffect(() => {
		if (getSaleProductDetailResponse && getSaleProductDetailResponse.data && getSaleProductDetailResponse.data.data) {
			setSaleProductDetailData(formatTableRowData(getSaleProductDetailResponse.data.data.list))
			setSaleProductDetailPagination(getSaleProductDetailResponse.data.data.pagination)
			setContentData([
				getSaleProductDetailResponse.data.data.list[0].orderNumber,
				getSaleProductDetailResponse.data.data.list[0].customerName,
				getSaleProductDetailResponse.data.data.list[0].customerCode,
				getSaleProductDetailResponse.data.data.list[0].totalQuantity,
				parseFloat(getSaleProductDetailResponse.data.data.list[0].totalWeight).toLocaleString({
					minimumFractionDigits: 2,
				}),
				getSaleProductDetailResponse.data.data.list[0].depositRequestAmount,
			])
		}
		if (isError) {
			console.log('error')
		}
	}, [isSuccess, getSaleProductDetailResponse, isError])

	const formatTableRowData = (singleProductListData) => {
		return add_element_field(singleProductListData, saleProductOrderDetailsTableRowMap)
	}

	const handleSelectChange = (selectedOption, name) => {
		// setInput(prevState => ({
		//   ...prevState,
		//   [name]: selectedOption.label,
		// }));
	}
	const [isRotated, setIsRotated] = useState(false)

	// Function to handle image click and toggle rotation
	const handleImageClick = () => {
		setIsRotated((prevIsRotated) => !prevIsRotated)
	}

	// 토글 쓰기
	const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)
	const [toggleMsg, setToggleMsg] = useState('On')
	const toggleBtnClick = () => {
		setExfilterToggle((prev) => !prev)
		if (exFilterToggle === true) {
			setToggleMsg('Off')
		} else {
			setToggleMsg('On')
		}
	}

	const [isModal, setIsModal] = useAtom(blueModalAtom)

	console.log('isModal =>', isModal)

	const modalOpen = () => {
		setIsModal(true)
	}

	const onPageChange = (value) => {
		setParam((prevParam) => ({
			...prevParam,
			pageNum: Number(value),
		}))
	}

	const [destinationPopUp, setDestinationPopUp] = useAtom(invenDestination)
	const [destinationData, setDestinationData] = useAtom(invenDestinationData)
	const init = {
		updateList: [
			{
				uid: 9307, // orderUid
				requestCustomerDestinationUid: 61, // destination uid
			},
		],
		// memberUid: 1660,
	}

	const [input, setInput] = useState(init)

	// 목적지 적용 버튼
	const handleSetCustomerDestinationUid = () => {
		const updatedWinningList = input.updateList?.map((item) => ({
			...item,
			requestCustomerDestinationUid: destinationData.uid,
		}))

		// setBiddingList(updatedBiddingList)
		setInput((prevInput) => ({
			...prevInput,
			updateList: [...updatedWinningList],
		}))
	}

	// 목적지 승인 요청 POST
	const destiApproveMutation = useMutationQuery('', destiApproveReq)
	const destiApproveOnClickHandler = () => {
		destiApproveMutation.mutate(input)
	}

	// 목적지 변경 반려 POST
	const destiChangeRejMutation = useMutationQuery('', destiChangeReject)
	const destiChangeRejOnClickHandler = () => {
		destiChangeRejMutation.mutate(input)
	}
	// 목적지 변경 승인 POST
	const destiChangeApproveMutation = useMutationQuery('', destiChangeApprove)
	const destiChangeApprovOnClickHandler = () => {
		destiChangeApproveMutation.mutate(input)
	}

	const { data: inventoryDestination } = useReactQuery('', 'getDestinationFind', getDestinationFind)
	const checkBoxSelect = useAtomValue(selectedRowsAtom)

	const handleTablePageSize = (event) => {
		setParam((prevParam) => ({
			...prevParam,
			pageSize: Number(event.target.value),
			pageNum: 1,
		}))
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
						<CustomInput placeholder="h50" width={60} height={32} defaultValue={destinationData?.code} />
						<CustomInput placeholder="목적지명" width={120} height={32} defaultValue={destinationData?.name} />
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
						<TGreyBtn onClick={handleSetCustomerDestinationUid}>적용</TGreyBtn>
						<BtnBound style={{ margin: '0px' }} />
						<WhiteBlackBtn onClick={destiApproveOnClickHandler}>목적지 승인 요청</WhiteBlackBtn>

						<BtnBound style={{ margin: '0px' }} />
						<WhiteRedBtn onClick={destiChangeRejOnClickHandler}>목적지 변경 반려</WhiteRedBtn>
						<WhiteSkyBtn str onClick={destiChangeApprovOnClickHandler}>
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
						<WhiteRedBtn>부분 주문 취소</WhiteRedBtn>
						<SkyBtn>부분 입금 확인</SkyBtn>
					</div>
				</TCSubContainer>
			</TableContianer>
			{destinationPopUp && (
				<InventoryFind
					title={'목적지 찾기'}
					setSwitch={setDestinationPopUp}
					data={inventoryDestination}
					handleButtonOnClick={() => {}}
				/>
			)}
		</FilterContianer>
	)
}

export default SellOrderDetail

export const P = styled.p`
	position: relative;
	top: 5px;
`
