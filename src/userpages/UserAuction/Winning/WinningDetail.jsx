import { useAtom } from 'jotai'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { BtnBound, TGreyBtn, WhiteBlackBtn } from '../../../common/Button/Button'
import Excel from '../../../components/TableInner/Excel'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import {
	CustomInput,
	FilterContianer,
	FilterHeader,
	FilterTCTop,
	TableContianer,
	TCSubContainer,
} from '../../../modal/External/ExternalFilter'
import { invenDestination, invenDestinationData, selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle } from '../../../components/MapTable/MapTable'
import useReactQuery from '../../../hooks/useReactQuery'
import { getCustomerDestinationByCustomerCode, getDestinationFind } from '../../../api/search'
import { destiApproveReq, getWinningDetail } from '../../../api/auction/winning'
import { UserAuctionWinningDetailFields, UserAuctionWinningDetailFieldsCols } from '../../../constants/admin/Auction'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { add_element_field } from '../../../lib/tableHelpers'
import InventoryFind from '../../../modal/Multi/InventoryFind'
import Table from '../../../pages/Table/Table'
import PrintDepositRequestButton from '../../UserSales/_components/PrintDepositRequestButton'
import useAlert from '../../../store/Alert/useAlert'

const WinningDetail = ({ detailRow }) => {
	const { simpleAlert, simpleConfirm, showAlert } = useAlert()
	const [destinationPopUp, setDestinationPopUp] = useAtom(invenDestination)

	// const NewDummy = {
	// 	'고객사 명': '(주) 아이덴잇',
	// 	'고객 코드': 'K00-0012',
	// 	'': '',
	// 	'총 수량': '30',
	// 	'총 중량(KG)': '4,612,157',
	// 	'입금 요청 금액 (원)': '45,237,876',
	// 	'제품금액(VAT 포함)': '000',
	// 	'운임비(VAT 포함)': '000',
	// 	ㅤ: 'ㅤ',
	// }

	// const entries = Object.entries(NewDummy)
	// const chunkedEntries = []

	// for (let i = 0; i < entries.length; i += 3) {
	// 	chunkedEntries.push(entries.slice(i, i + 3))
	// }

	console.log('detailRow', detailRow)

	const titleData = [
		'고객사 명',
		'고객 코드',
		'',
		'총 수량',
		'총 중량',
		'입금 요청 금액',
		'제품 금액 (VAT 포함)',
		'운반비 (VAT 포함)',
		'',
	]
	const contentData = [
		detailRow?.['고객사명'],
		detailRow?.['고객 코드'],
		'',
		detailRow?.['수량'],
		detailRow?.['중량'],
		new Intl.NumberFormat('en-US').format(detailRow?.['입금 요청액']) + '원',
		new Intl.NumberFormat('en-US').format(detailRow?.['제품 금액 (VAT 포함)']) + '원',
		new Intl.NumberFormat('en-US').format(detailRow?.['운반비 (VAT 포함)']) + '원',
		'',
	]

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
	const tableField = useRef(UserAuctionWinningDetailFieldsCols)
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
		pageNum: 1,
		pageSize: 50,
	})

	useEffect(() => {
		setDetailParams((prev) => ({
			...prev,
			auctionNumber: detailRow['경매 번호'],
			storage: detailRow['창고'],
			customerDestinationUid: detailRow['고객사 목적지 고유 번호'],
			biddingStatus: detailRow['낙찰 상태'],
		}))
	}, [detailRow])

	const customerCode = detailRow?.['고객 코드']
	const { data: inventoryDestination } = useReactQuery(
		customerCode,
		'getCustomerDestinationByCustomerCode',
		getCustomerDestinationByCustomerCode,
	)

	const { isLoading, isError, data, isSuccess, refetch } = useReactQuery(
		detailParams,
		'getWinningDetail',
		getWinningDetail,
	)
	const resData = data?.data?.data?.list
	const resPagination = data?.data?.data?.pagination
	const [winningCreateData, setWinningCreateData] = useState({})

	useEffect(() => {
		let getData = resData
		//타입, 리액트쿼리, 데이터 확인 후 실행
		if (!isSuccess && !resData) return
		if (Array.isArray(getData)) {
			setGetRow(add_element_field(getData, UserAuctionWinningDetailFields))
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
	const { mutate: destiApproveMutation } = useMutation(destiApproveReq, {
		onSuccess() {
			showAlert({
				title: '목적지 승인이 완료되었습니다.',
				content: '',
				func: () => {
					refetch()
					queryClient.invalidateQueries('destiApprove')
					setWinningCreateData({})
				},
			})
		},
		onError: () => {
			simpleAlert('오류가 발생했습니다. 다시 시도해주세요.')
		},
	})
	const destiApproveOnClickHandler = () => {
		destiApproveMutation(winningCreateData)
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

				{/* <TableWrap style={{ marginTop: '5px' }}>
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
				</TableWrap> */}
				<ClaimTable style={{ marginBottom: '30px' }}>
					{[0, 1, 2].map((index) => (
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
