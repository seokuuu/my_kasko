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

import { InputContainer, NoOutInput, Unit } from '../../../common/Input/Input'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { isArray, isEqual } from 'lodash'
import { getAuctionDetailDestination, getAuctionNumber, successfulBid } from '../../../api/auction/winning'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import { AuctionWinningCreateFieldsCols } from '../../../constants/admin/Auction'
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

const WinningCreate = ({}) => {
	const navigate = useNavigate()
	const { simpleConfirm, simpleAlert, showAlert } = useAlert()
	const [destinationPopUp, setDestinationPopUp] = useAtom(invenDestination)
	const [destinationData, setDestinationData] = useAtom(winningDestiData)

	const checkSales = ['전체', '확정 전송', '확정 전송 대기']
	const [editData, setEditData] = useState({
		auctionNumber: '',
		addProductUids: [],
		deleteAuctionProductList: [],
	})

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
	const [destiData, setDestiData] = useState()

	const [isModal, setIsModal] = useAtom(WinningCreateFindAtom)
	const [addProdModal, setAddProdModal] = useAtom(WinningProductAddAtom)
	//checkSales

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

	// 경매 번호 자동 생성
	const { data: auctionNowNum } = useReactQuery('', 'getAuctionNumber', getAuctionNumber)

	const { data: auctionDestination, refetch } = useReactQuery(
		customerData?.code,
		'getAuctionDetailDestination',
		getAuctionDetailDestination,
	)

	const [propsUid, setPropsUid] = useState(null) // CustomerCodeFind에서 찾아온 uid
	const [destiObject, setDestiObject] = useState()

	console.log('destiObject', destiObject)

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
		}))
	}, [propsUid, auctionNowNum, customerData])

	const [tablePagination, setTablePagination] = useState([])

	const [getRow, setGetRow] = useState('')

	const tableField = useRef(AuctionWinningCreateFieldsCols)
	const getCol = tableField.current
	const queryClient = useQueryClient()

	const [checkedArray2, setCheckedArray2] = useAtom(selectedRowsAtom2)

	const [rowAtomSwitch, setRowAtomSwitch] = useAtom(selectedRows2Switch)
	const [totalWon, setTotalWon] = useState({
		biddingPrice: null,
		confirmPrice: null,
	})

	useEffect(() => {
		const updatedProductList = checkedArray2?.map((item) => ({
			productUid: item['제품 고유 번호'],
			biddingPrice: winningCreateInput.biddingPrice,
			confirmPrice: winningCreateInput.confirmPrice,
			// 여기에 다른 필요한 속성을 추가할 수 있습니다.
		}))

		// winningCreateData를 업데이트하여 productList를 갱신
		setWinningCreateData((prevData) => ({
			...prevData,
			productList: updatedProductList,
		}))

		setTotalWon((prevData) => ({
			...prevData,
			biddingPrice: winningCreateInput?.biddingPrice * (checkedArray2?.length || 0),
			confirmPrice: winningCreateInput?.confirmPrice * (checkedArray2?.length || 0),
		}))
	}, [checkedArray2, winningCreateInput])

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
		//타입, 리액트쿼리, 데이터 확인 후 실행
		if (Array.isArray(newResData)) {
			const combinedData = [...newResData]

			setGetRow(combinedData)
			// setTablePagination(resPagination)
		}
	}, [newResData])

	const dupleUids = getRow && getRow?.map((item) => item['제품 고유 번호'])

	const handleRemoveBtn = useCallback(() => {
		if (!isArray(checkedArray2) || !checkedArray2.length > 0) return simpleAlert('추가할 항목을 선택해주세요.')

		simpleConfirm('선택한 항목을 삭제 목록에 추가하시겠습니까?', () => {
			const filteredArray = newResData.filter(
				(item) => !checkedArray2.some((checkedItem) => checkedItem['제품 고유 번호'] === item['제품 고유 번호']),
			)
			setNewResData(filteredArray)
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
		onError: () => {
			simpleAlert('오류가 발생했습니다. 다시 시도해주세요.')
		},
	})

	const successfulBidOnClick = () => {
		successfulBidMutation(winningCreateData)
	}

	const globalProductResetOnClick = () => {
		// if resetting the search field shouldn't rerender table
		// then we need to create paramData object to reset the search fields.
		setParam(paramData)
	}
	// import
	const globalProductSearchOnClick = (userSearchParam) => {
		setParam((prevParam) => {
			if (isEqual(prevParam, { ...prevParam, ...userSearchParam })) {
				// refetch()
				return prevParam
			}
			return {
				...prevParam,
				...userSearchParam,
			}
		})
	}

	const { selectedData, selectedWeightStr, selectedWeight, selectedCountStr } = useTableSelection({
		weightKey: '중량',
	})

	const totalWeight = getRow && getRow?.map((x) => x['중량'])
	const sum = totalWeight && totalWeight?.reduce((acc, curr) => acc + parseInt(curr), 0)

	return (
		<FilterContianer>
			<FilterHeader>
				<div style={{ display: 'flex' }}>
					<h1>낙찰 생성</h1>
				</div>
				{/* 토글 쓰기 */}
				<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
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
							<InputContainer>
								<NoOutInput type="number" value={totalWon?.biddingPrice} />
								<Unit>원</Unit>
							</InputContainer>
						</div>
						{/* <div style={{ marginRight: '10px' }}>
                  <h6 style={{ fontSize: '17px' }}>총 중량</h6>
                  <Input />
                </div> */}

						<div style={{ marginRight: '10px' }}>
							<h6 style={{ fontSize: '17px' }}> 확정전송액 (공급가)</h6>
							<InputContainer>
								<NoOutInput type="number" value={totalWon?.confirmPrice} />
								<Unit>원</Unit>
							</InputContainer>
						</div>
					</FilterTCBSubdiv>
				</FilterTCBottom>
			</FilterTopContainer>
			{exFilterToggle && (
				<>
					<GlobalProductSearch
						param={param}
						isToggleSeparate={true}
						renderCustomSearchFields={(props) => <BiddingSearchFields type={'낙찰 생성'} {...props} />} // 만들어야함 -> WinningSearchFields
						globalProductSearchOnClick={globalProductSearchOnClick} // import
						globalProductResetOnClick={globalProductResetOnClick} // import
					/>
				</>
			)}
			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{selectedCountStr}</span> / {getRow?.length}개 )
						<TableV2HiddenSection />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />
						<Excel getRow={getRow} sheetName="낙찰 생성" />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택 중량 <span> {selectedWeightStr} </span> (kg) / 총 중량 <span>{sum.toLocaleString()}</span> (kg)
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						{/* 제품 대량 업로드 */}
						<WinningProductCreateBtn setNewResData={setNewResData} />
						<SkyBtn
							onClick={() => {
								setAddProdModal(true)
							}}
						>
							제품 추가
						</SkyBtn>
					</div>
				</TCSubContainer>
				<Table getCol={getCol} getRow={getRow} tablePagination={tablePagination} onPageChange={onPageChange} />
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
