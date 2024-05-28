import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BlackBtn, GreyBtn, NewBottomBtnWrap, SkyBtn, WhiteBtn, WhiteRedBtn } from '../../../common/Button/Button'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import {
	invenDestination,
	selectedRows2Switch,
	selectedRowsAtom2,
	toggleAtom,
	WinningCreateFindAtom,
	winningDestiData,
	WinningProductAddAtom,
} from '../../../store/Layout/Layout'

import {
	FilterContianer,
	FilterHeader,
	FilterTCBottom,
	FilterTCBSubdiv,
	FilterTCTop,
	FilterTopContainer,
	Input,
	TableContianer,
	TCSubContainer,
} from '../../../modal/External/ExternalFilter'

import PageDropdown from '../../../components/TableInner/PageDropdown'

import { InputContainer } from '../../../common/Input/Input'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtom, useAtomValue } from 'jotai'
import { isArray, isEqual } from 'lodash'
import {
	getAuctionDetailDestination,
	getAuctionNumber,
	successfulBid,
	useGetWinningCreateBiddingProducts,
	useGetWinningCreateBiddingTotalPrice,
} from '../../../api/auction/winning'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import { AuctionWinningCreateFields, AuctionWinningCreateFieldsCols } from '../../../constants/admin/Auction'
import useReactQuery from '../../../hooks/useReactQuery'
import CustomerCodeFind from '../../../modal/Multi/CustomerCodeFind'
import CustomerFind from '../../../modal/Multi/CustomerFind'
import useAlert from '../../../store/Alert/useAlert'
import Table from '../../Table/Table'
import TableV2HiddenSection from '../../Table/TableV2HiddenSection'
import BiddingSearchFields from '../Bidding/BiddingSearchFields'
import WinningProductAdd from './WinningProductAdd'
import useTableSelection from '../../../hooks/useTableSelection'
import WinningProductCreateBtn from './WinningProductCreateBtn'
import { numberDeleteComma } from '../../../utils/utils'
import { add_element_field } from '../../../lib/tableHelpers'
import { AuctionWinningFields } from '../../../constants/admin/Winning'

const WinningCreate = () => {
	const [values, setValues] = useState([]) // 배열 형태로 초기화
	const navigate = useNavigate()
	const { simpleConfirm, simpleAlert, showAlert } = useAlert()
	const [destinationPopUp, setDestinationPopUp] = useAtom(invenDestination)

	const init = {
		auctionNumber: '',
		customerUid: null,
		memberUid: null,
		customerDestinationUid: null,
		productList: [],
	}

	const productListInner = {
		biddingPrice: null,
		confirmPrice: null,
	}

	const [winningCreateData, setWinningCreateData] = useState(init)
	const [winningCreateInput, setwinningCreateInput] = useState(productListInner)

	const [customerData, setCustomerData] = useState()

	const [isModal, setIsModal] = useAtom(WinningCreateFindAtom)
	const [addProdModal, setAddProdModal] = useAtom(WinningProductAddAtom)

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

	// 경매 번호 자동 생성
	const { data: auctionNowNum } = useReactQuery('', 'getAuctionNumber', getAuctionNumber)

	const { data: auctionDestination, refetch } = useReactQuery(
		customerData?.code,
		'getAuctionDetailDestination',
		getAuctionDetailDestination,
	)

	const [propsUid, setPropsUid] = useState(null) // CustomerCodeFind에서 찾아온 uid
	const [destiObject, setDestiObject] = useState()

	// 낙찰가 총액 정보
	const [totalBiddingPriceRequestData, setTotalBiddingPriceRequestData] = useState(null)

	// prettier-ignore
	const { data: newTableData } = useGetWinningCreateBiddingProducts(totalBiddingPriceRequestData)
	const [totalBiddingPriceData, setTotalBiddingPriceData] = useState({
		totalBiddingPrice: 0,
		totalSendBiddingPrice: 0,
	})

	const [tableRowsData, setTableRowsData] = useState([])

	useEffect(() => {
		if (Array.isArray(newTableData)) {
			if (newTableData.length === 0) {
				return simpleAlert('추가한 제품들은 존재하지 않습니다.')
			}

			setTableRowsData(add_element_field(newTableData, AuctionWinningCreateFields))

			const totalBiddingPrice = newTableData
				.map((item) => item?.totalBiddingPrice)
				.reduce((acc, cur) => Number(acc) + Number(cur), 0)
				.toLocaleString()

			const totalSendBiddingPrice = newTableData
				.map((item) => item?.totalSendBiddingPrice)
				.reduce((acc, cur) => Number(acc) + Number(cur), 0)
				.toLocaleString()

			setTotalBiddingPriceData({ totalBiddingPrice, totalSendBiddingPrice })
		}
	}, [newTableData])

	// 목적지 찾기 및 목적지 uid, auctionNumber set //
	useEffect(() => {
		const selectedObject = auctionDestination?.data?.data.find((item) => item.uid === propsUid)

		setDestiObject(selectedObject)
		setWinningCreateData((p) => ({
			...p,
			customerDestinationUid: selectedObject?.uid,
			auctionNumber: auctionNowNum?.data?.data,
			customerUid: customerData?.uid,
			memberUid: customerData?.memberUid,
			productList: values,
		}))
	}, [propsUid, auctionNowNum, customerData])

	const [tablePagination, setTablePagination] = useState([])

	const tableField = useRef(AuctionWinningCreateFieldsCols)
	const getCol = tableField.current
	const queryClient = useQueryClient()

	const checkedArray2 = useAtomValue(selectedRowsAtom2)

	useEffect(() => {
		// winningCreateData를 업데이트하여 productList를 갱신
		setWinningCreateData((prevData) => ({
			...prevData,
			productList: values,
		}))
	}, [checkedArray2, winningCreateInput, addProdModal])

	const paramData = {
		pageNum: 1,
		pageSize: 50,
		saleType: '경매 대상재',
		registrationStatus: '경매 등록 대기',
	}
	const [param, setParam] = useState(paramData)

	// GET
	// const resPagination = data?.data?.data?.pagination
	const [newResData, setNewResData] = useState([])

	useEffect(() => {
		if (newResData?.length > 0 && destiObject) {
			const requestData = newResData.map((item) => ({
				productNumber: item['제품 번호'],
				customerDestinationUid: destiObject.uid,
				biddingPrice: Number(numberDeleteComma(item['낙찰가'])),
				sendBiddingPrice: Number(numberDeleteComma(item['확정전송가'])),
			}))
			setTotalBiddingPriceRequestData(requestData)
		}
	}, [newResData, destiObject])

	const dupleUids = tableRowsData && tableRowsData?.map((item) => item['제품 번호'])

	const handleRemoveBtn = useCallback(() => {
		if (!isArray(checkedArray2) || !checkedArray2.length > 0) return simpleAlert('추가할 항목을 선택해주세요.')

		simpleConfirm('선택한 항목을 목록에서 제거하시겠습니까?', () => {
			const filteredArray = newResData.filter(
				(item) => !checkedArray2.some((checkedItem) => checkedItem['제품 번호'] === item['제품 번호']),
			)
			setNewResData(filteredArray)

			const deleteProductUids = checkedArray2.map((item) => item['제품 번호'])
			const filteredValues = values.filter((item) => !deleteProductUids.includes(item.productUid))
			setValues(filteredValues)
		})
	}, [checkedArray2, newResData])

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

	// 응찰 Mutate
	const { mutate: successfulBidMutation } = useMutation(successfulBid, {
		onSuccess() {
			showAlert({
				title: '낙찰이 생성되었습니다.',
				content: '',
				func: () => {
					refetch()
					queryClient.invalidateQueries('winningcreate')
					navigate('/auction/winning')
				},
			})
		},
		onError: (e) => {
			simpleAlert(e?.data?.message || '오류가 발생했습니다. 다시 시도해주세요.')
		},
	})

	const successfulBidOnClick = () => {
		if (!destiObject) return simpleAlert('목적지 적용이 필요합니다.')
		if (winningCreateData?.productList?.length === 0) {
			return simpleAlert('제품을 추가해주세요.')
		}
		successfulBidMutation(winningCreateData)
	}

	const { selectedWeightStr, selectedCountStr } = useTableSelection({
		weightKey: '중량',
	})

	const totalWeight = tableRowsData && tableRowsData?.map((x) => x['중량'])
	const sum = totalWeight && totalWeight?.reduce((acc, curr) => acc + parseInt(curr), 0)

	const productAddOnClickHandler = () => {
		if (!customerData) {
			return simpleAlert('제품 추가 전 고객사를 선택해주세요.')
		}
		if (!destiObject) {
			return simpleAlert('제품 추가 전 목적지를 적용해주세요.')
		}
		setAddProdModal(true)
	}

	return (
		<FilterContianer>
			<FilterHeader>
				<div style={{ display: 'flex' }}>
					<h1>낙찰 생성</h1>
				</div>
				{/*/!* 토글 쓰기 *!/*/}
				{/*<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />*/}
			</FilterHeader>

			<FilterTopContainer>
				<FilterTCTop>
					<h6>경매 번호</h6>
					<p>{auctionNowNum?.data?.data}</p>
				</FilterTCTop>
				<FilterTCBottom>
					<FilterTCBSubdiv>
						<div>
							<h6 style={{ fontSize: '18px' }}>고객사 명/고객사 코드</h6>
							<Input style={{ width: '110px', marginRight: '10px', fontSize: '16px' }} value={customerData?.name} />
							<Input style={{ width: '110px', marginRight: '10px', fontSize: '16px' }} value={customerData?.code} />
							<GreyBtn
								style={{ width: '70px' }}
								height={35}
								margin={10}
								fontSize={17}
								onClick={() => {
									setIsModal(true)
								}}
							>
								찾기
							</GreyBtn>
							{/* <p style={{ color: '#4C83D6' }}>{customerData?.code}</p> */}
						</div>

						<div>
							<h6 style={{ fontSize: '18px' }}>목적지</h6>
							<Input
								placeholder="코드"
								style={{ width: '60px', marginRight: '10px', fontSize: '16px' }}
								defaultValue={destiObject?.code}
							/>
							<Input
								placeholder="목적지명"
								style={{ width: '120px', marginRight: '10px', fontSize: '16px' }}
								defaultValue={destiObject?.destinationName}
							/>
							<Input
								placeholder="하차지명"
								style={{ width: '130px', marginRight: '10px', fontSize: '16px' }}
								defaultValue={destiObject?.name}
							/>
							<Input
								placeholder="하차지 연락처"
								style={{ width: '130px', marginRight: '10px', fontSize: '16px' }}
								defaultValue={destiObject?.phone}
							/>
							<Input
								placeholder="주소"
								style={{ width: '130px', marginRight: '10px', fontSize: '16px' }}
								defaultValue={destiObject?.address}
							/>

							<GreyBtn
								style={{ width: '70px' }}
								height={35}
								margin={10}
								fontSize={17}
								onClick={() => {
									setDestinationPopUp(true)
								}}
							>
								찾기
							</GreyBtn>
						</div>
					</FilterTCBSubdiv>
					<FilterTCBSubdiv>
						<div style={{ marginRight: '10px' }}>
							<h6 style={{ fontSize: '18px' }}>낙찰가 총액 (공급가)</h6>
							<InputContainer>{totalBiddingPriceData?.totalBiddingPrice?.toLocaleString() + '원'}</InputContainer>
						</div>

						<div style={{ marginRight: '10px' }}>
							<h6 style={{ fontSize: '17px' }}>확정전송액 (공급가)</h6>
							<InputContainer>{totalBiddingPriceData?.totalSendBiddingPrice?.toLocaleString() + '원'}</InputContainer>
						</div>
					</FilterTCBSubdiv>
				</FilterTCBottom>
			</FilterTopContainer>
			{/*{exFilterToggle && (*/}
			{/*	<>*/}
			{/*		<GlobalProductSearch*/}
			{/*			param={param}*/}
			{/*			setParam={setParam}*/}
			{/*			isToggleSeparate={true}*/}
			{/*			renderCustomSearchFields={(props) => <BiddingSearchFields type={'낙찰 생성'} {...props} />} // 만들어야함 -> WinningSearchFields*/}
			{/*			globalProductSearchOnClick={globalProductSearchOnClick} // import*/}
			{/*			globalProductResetOnClick={globalProductResetOnClick} // import*/}
			{/*		/>*/}
			{/*	</>*/}
			{/*)}*/}
			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{selectedCountStr}</span> / {tableRowsData?.length}개 )
						<TableV2HiddenSection />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />
						<Excel getRow={tableRowsData} sheetName="낙찰 생성" />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택 중량 <span> {selectedWeightStr} </span> (kg) / 총 중량 <span>{sum.toLocaleString()}</span> (kg)
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						{/* 제품 대량 업로드 */}
						<WinningProductCreateBtn
							newResData={newResData}
							setNewResData={setNewResData}
							values={values}
							setValues={setValues}
							setWinningCreateData={setWinningCreateData}
							customerData={customerData}
							destiObject={destiObject}
						/>
						<SkyBtn onClick={productAddOnClickHandler}>제품 추가</SkyBtn>
					</div>
				</TCSubContainer>
				<Table getCol={getCol} getRow={tableRowsData} tablePagination={tablePagination} onPageChange={onPageChange} />
				<TCSubContainer>
					<div></div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteRedBtn onClick={handleRemoveBtn}>선택 목록 제거</WhiteRedBtn>
					</div>
				</TCSubContainer>
				<NewBottomBtnWrap bottom={-5}>
					<WhiteBtn
						width={13}
						height={40}
						onClick={() => {
							navigate(-1)
						}}
					>
						돌아가기
					</WhiteBtn>
					<BlackBtn width={13} height={40} onClick={successfulBidOnClick}>
						등록
					</BlackBtn>
				</NewBottomBtnWrap>
			</TableContianer>
			{isModal && <CustomerFind setSwitch={setIsModal} setModalData={setCustomerData} />}
			{addProdModal && (
				<WinningProductAdd
					addModal={addProdModal}
					setAddModal={setAddProdModal}
					newResData={newResData}
					setNewResData={setNewResData}
					setwinningCreateInput={setwinningCreateInput}
					dupleUids={dupleUids}
					values={values}
					setValues={setValues}
					setWinningCreateData={setWinningCreateData}
				/>
			)}
			{destinationPopUp && (
				<CustomerCodeFind
					title={'목적지 찾기'}
					type={'낙찰 생성'}
					setSwitch={setDestinationPopUp}
					data={auctionDestination}
					setPropsUid={setPropsUid}
				/>
			)}
		</FilterContianer>
	)
}

export default WinningCreate
