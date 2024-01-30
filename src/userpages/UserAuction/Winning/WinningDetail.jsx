import { useAtom } from 'jotai'
import React, { useState, Fragment, useEffect, useRef } from 'react'
import { styled } from 'styled-components'
import { BtnBound, TGreyBtn, WhiteBlackBtn, WhiteSkyBtn } from '../../../common/Button/Button'
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
import Test3 from '../../../pages/Test/Test3'
import {
	blueModalAtom,
	invenDestination,
	invenDestinationData,
	selectedRowsAtom,
	toggleAtom,
} from '../../../store/Layout/Layout'

import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle } from '../../../components/MapTable/MapTable'

import { TableWrap } from '../../../components/MapTable/MapTable'
import useReactQuery from '../../../hooks/useReactQuery'
import { getDestinationFind } from '../../../api/search'
import { destiApproveReq, getWinningDetail } from '../../../api/auction/winning'
import { AuctionWinningDetailFields, AuctionWinningDetailFieldsCols } from '../../../constants/admin/Auction'
import { useQueryClient } from '@tanstack/react-query'
import { add_element_field } from '../../../lib/tableHelpers'
import InventoryFind from '../../../modal/Multi/InventoryFind'
import Table from '../../../pages/Table/Table'
import useMutationQuery from '../../../hooks/useMutationQuery'
import PrintDepositRequestButton from '../../UserSales/_components/PrintDepositRequestButton'

const WinningDetail = ({ detailRow }) => {
	const [destinationPopUp, setDestinationPopUp] = useAtom(invenDestination)

	const NewDummy = {
		'고객사 명': '(주) 아이덴잇',
		'고객 코드': 'K00-0012',
		'': '',
		'총 수량': '30',
		'총 중량(KG)': '4,612,157',
		'입금 요청 금액 (원)': '45,237,876',
		'제품금액(VAT 포함)': '000',
		'운임비(VAT 포함)': '000',
		ㅤ: 'ㅤ',
	}

	const entries = Object.entries(NewDummy)
	const chunkedEntries = []

	for (let i = 0; i < entries.length; i += 3) {
		chunkedEntries.push(entries.slice(i, i + 3))
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

	const [getRow, setGetRow] = useState('')
	const tableField = useRef(AuctionWinningDetailFieldsCols)
	const getCol = tableField.current
	const queryClient = useQueryClient()
	const checkedArray = useAtom(selectedRowsAtom)[0]
	const [tablePagination, setTablePagination] = useState([])
	const [destinationData, setDestinationData] = useAtom(invenDestinationData)

	console.log('destinationData', destinationData)
	const init = {
		updateList: [],
	}
	const [input, setInput] = useState(init)

	const [detailParams, setDetailParams] = useState({
		// pageNum: 1,
		// pageSize: 50,
		// auctionNumber: '',
		// storage: '',
		// customerDestinationUid: '',
		// biddingStatus: '',
		pageNum: 1,
		pageSize: 50,
		auctionNumber: '2024010211',
		storage: '우성',
		customerDestinationUid: '165',
		biddingStatus: '낙찰 취소',
	})

	const { data: inventoryDestination } = useReactQuery('', 'getDestinationFind', getDestinationFind)

	console.log('inventoryDestination', inventoryDestination?.data?.data)
	const { isLoading, isError, data, isSuccess } = useReactQuery(detailParams, 'getWinningDetail', getWinningDetail)
	const resData = data?.data?.data?.list
	const resPagination = data?.data?.data?.pagination
	const [winningCreateData, setWinningCreateData] = useState({})

	console.log('resData !@#', resData)

	useEffect(() => {
		let getData = resData
		//타입, 리액트쿼리, 데이터 확인 후 실행
		if (!isSuccess && !resData) return
		if (Array.isArray(getData)) {
			setGetRow(add_element_field(getData, AuctionWinningDetailFields))
			setTablePagination(resPagination)
		}
	}, [isSuccess, resData])

	useEffect(() => {
		const productNumbers = checkedArray?.map((item) => item['주문 고유 번호'])

		const updatedBiddingList = productNumbers?.map((uid) => ({
			uid,
		}))

		setInput((prevInput) => ({
			...prevInput,
			updateList: updatedBiddingList?.map((item) => ({
				...item,
				uid: item.uid, // 유지하고 싶은 다른 속성은 그대로 두고
			})),
		}))

		// setBiddingList(updatedBiddingList)
	}, [checkedArray])

	console.log('updateList', input.updateList?.length)
	const [destiObject, setDestiObject] = useState()
	const [finalInput, setFinalInput] = useState({
		requestCustomerDestinationUid: null,
	})

	console.log('destiObject ###', destiObject)
	console.log('finalInput ###', finalInput)
	useEffect(() => {
		setDestiObject(destinationData)
	}, [destinationData])

	useEffect(() => {
		const updatedProductList = checkedArray?.map((item) => ({
			uid: item['주문 고유 번호'],
			requestCustomerDestinationUid: finalInput?.requestCustomerDestinationUid,
			// 여기에 다른 필요한 속성을 추가할 수 있습니다.
		}))

		// winningCreateData를 업데이트하여 productList를 갱신
		setWinningCreateData((prevData) => ({
			...prevData,
			updateList: updatedProductList,
		}))
	}, [checkedArray, finalInput])

	console.log('winningCreateData', winningCreateData)

	const onPageChange = (value) => {
		setDetailParams((prevParam) => ({
			...prevParam,
			pageNum: Number(value),
		}))
	}

	// 목적지 승인 요청 POST
	const destiApproveMutation = useMutationQuery('', destiApproveReq)
	const destiApproveOnClickHandler = () => {
		destiApproveMutation.mutate(winningCreateData)
	}

	return (
		<FilterContianer>
			<div>
				<FilterHeader>
					<h1>낙찰 확인 상세</h1>
				</FilterHeader>
				<FilterTCTop>
					<h6>경매 번호</h6>
					<p>{detailRow && detailRow['경매 번호']}</p>
				</FilterTCTop>

				<TableWrap style={{ marginTop: '5px' }}>
					<ClaimTable>
						{chunkedEntries.map((chunk, i) => (
							<ClaimRow key={i}>
								{chunk.map(([title, content], j) => (
									<Fragment key={j}>
										<ClaimTitle>{title}</ClaimTitle>
										<ClaimContent>{content}</ClaimContent>
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
						조회 목록 (선택 <span>2</span> / 50개 )
						<Hidden />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown />
						<Excel
						// getRow={getRow}
						/>

						{/*<Excel getRow={getRow} />*/}
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택 중량<span> 2 </span>kg / 총 중량 kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<P>목적지</P>
						<CustomInput placeholder="h50" width={60} height={32} defaultValue={destinationData?.code} readOnly />
						<CustomInput placeholder="목적지명" width={120} height={32} defaultValue={destinationData?.name} readOnly />
						<WhiteBlackBtn
							onClick={() => {
								setDestinationPopUp(true)
							}}
						>
							찾기
						</WhiteBlackBtn>
						<TGreyBtn
							onClick={() => {
								setFinalInput((prevFinalInput) => ({
									...prevFinalInput,
									requestCustomerDestinationUid: destiObject && destiObject.uid,
								}))
							}}
						>
							적용
						</TGreyBtn>
						<BtnBound />
						<WhiteBlackBtn
							onClick={() => {
								destiApproveOnClickHandler()
							}}
						>
							목적지 승인 요청
						</WhiteBlackBtn>
					</div>
				</TCSubContainer>
				<Table getCol={getCol} getRow={getRow} tablePagination={tablePagination} onPageChange={onPageChange} />
				<TCSubContainer>
					<div></div>
					{/* 입금 확인 요청서 */}
					<PrintDepositRequestButton
						auctionNumber={'2023112201'}
						storage={'우성'}
						customerDestinationUid={'120'}
						biddingStatus={'낙찰 확정'}
					/>
				</TCSubContainer>
			</TableContianer>
			{destinationPopUp && (
				<InventoryFind title={'목적지 찾기'} setSwitch={setDestinationPopUp} data={inventoryDestination} />
			)}
		</FilterContianer>
	)
}

export default WinningDetail

const P = styled.p`
	position: relative;
	top: 5px;
`
