import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BtnBound, SkyBtn, TGreyBtn, TWhiteBtn, WhiteGrnBtn } from '../../../common/Button/Button'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

import {
	CustomInput,
	FilterContianer,
	FilterHeader,
	FilterHeaderAlert,
	SubTitle,
	TableContianer,
	TCSubContainer,
} from '../../../modal/External/ExternalFilter'

import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'

import { useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { isEqual } from 'lodash'
import { getBidding, postBidding } from '../../../api/auction/bidding'
import { getAuctionDestination } from '../../../api/auction/winning'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import { AuctionBiddingFields, AuctionBiddingFieldsCols } from '../../../constants/admin/Auction'
import useMutationQuery from '../../../hooks/useMutationQuery'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import InventoryFind from '../../../modal/Multi/InventoryFind'
import Table from '../../../pages/Table/Table'
import { userPageSingleDestiFindAtom } from '../../../store/Layout/Layout'
import UserBiddingSearchFields from './UserBiddingSearchFields'
import useTableSelection from '../../../hooks/useTableSelection'
import useTableData from '../../../hooks/useTableData'
import AddWishButton from '../../UserSales/_components/AddWishButton'
import { PROD_COL_NAME } from '../../../constants/user/constantKey'
import { CAUTION_CATEGORY, CautionBox } from '../../../components/CautionBox'

const Single = ({}) => {
	const radioDummy = ['전체', '미응찰', '관심제품', '응찰']
	const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))
	const [destinationPopUp, setDestinationPopUp] = useAtom(userPageSingleDestiFindAtom)
	const [savedRadioValue, setSavedRadioValue] = useState('')
	useEffect(() => {
		const checkedIndex = checkRadio.findIndex((isChecked, index) => isChecked && index < radioDummy.length)

		// 찾지 못하면 -1을 반환하므로, -1이 아닌 경우(찾은 경우)
		// if (checkedIndex !== -1) {
		//   const selectedValue = radioDummy[checkedIndex];
		//   setSavedRadioValue(selectedValue); //내 state에 반환
		//   setInput({ ...input, type: selectedValue }); //서버 전송용 input에 반환
		// }
	}, [checkRadio])

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

	const { data: auctionDestination } = useReactQuery('', 'getAuctionDestination', getAuctionDestination)

	console.log('auctionDestination', auctionDestination?.data?.data)

	const [customerData, setCustomerData] = useState()
	const [propsUid, setPropsUid] = useState(null)
	const [destiObject, setDestiObject] = useState() //

	const productListInner = {
		biddingPrice: null,
		customerDestinationUid: null,
	}

	const [winningCreateInput, setwinningCreateInput] = useState(productListInner)

	console.log('winningCreateInput', winningCreateInput)

	const [getRow, setGetRow] = useState('')
	const tableField = useRef(AuctionBiddingFieldsCols)
	const getCol = tableField.current
	const queryClient = useQueryClient()
	const checkedArray = useAtom(selectedRowsAtom)[0]
	const [tablePagination, setTablePagination] = useState([])

	const paramData = {
		pageNum: 1,
		pageSize: 50,
		type: '단일',
	}
	const [param, setParam] = useState(paramData)

	// 전체 GET
	const { isLoading, isError, data, isSuccess, refetch } = useReactQuery(param, 'getBidding', getBidding)
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

	// 경매 번호 가져오기
	const auctionNumber = checkedArray?.[0]?.['경매 번호']

	const init = {
		auctionNumber: null,
		type: '단일',
	}
	const [winningCreateData, setWinningCreateData] = useState(init)

	//
	useEffect(() => {
		const selectedObject = auctionDestination?.data?.data.find((item) => item.uid === propsUid)
		setDestiObject(selectedObject)
		setWinningCreateData((p) => ({
			...p,
			auctionNumber: auctionNumber,
		}))
	}, [propsUid, auctionNumber])

	const [finalInput, setFinalInput] = useState({
		biddingPrice: null,
		customerDestinationUid: null,
	})

	console.log('finalInput', finalInput)

	// biddingList에 들어갈 3총사를 다 넣어줌.
	useEffect(() => {
		const updatedProductList = checkedArray?.map((item) => ({
			productUid: item['제품 고유 번호'],
			biddingPrice: finalInput?.biddingPrice,
			customerDestinationUid: finalInput?.customerDestinationUid,
			// 여기에 다른 필요한 속성을 추가할 수 있습니다.
		}))

		// winningCreateData를 업데이트하여 productList를 갱신
		setWinningCreateData((prevData) => ({
			...prevData,
			biddingList: updatedProductList,
		}))
	}, [checkedArray, finalInput])

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

	const postMutation = useMutationQuery('', postBidding)

	// 응찰 버튼 POST
	const confirmOnClickHandler = () => {
		postMutation.mutate(winningCreateData)
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
				refetch()
				return prevParam
			}
			return {
				...prevParam,
				...userSearchParam,
			}
		})
	}

	console.log('winningCreateData <33', winningCreateData)

	/* ==================== 관심상품 등록 start ==================== */
	/**
	 * @todo 
	 * [1] 테이블 데이터를 아래 hook의 tableRowData로 사용하므로 다른 기능에 충돌이 있는지 확인이 필요합니다.
	 * [2] 선택 데이터, 총 중량 등 아래 hook에서 제공하는 변수와 겹치는 항목이 있다면 정리가 필요합니다.
	 */
	// 선택상품(checked product) - 선택상품 정보를 조회합니다.
	const { selectedData, selectedWeightStr, selectedWeight, selectedCountStr } = useTableSelection({
		weightKey: '중량',
	});
	// 테이블 데이터, 페이지 데이터, 총 중량
	const { tableRowData, paginationData, totalWeightStr, totalCountStr, totalCount } = useTableData({
		tableField: AuctionBiddingFields,
		serverData: data?.data?.data,
		wish: { display: true, key: ['productNumber', 'packageNumber'] },
		best: { display: true }
	});
	/* ==================== 관심상품 등록 end ==================== */

	return (
		<FilterContianer>
			<FilterHeader>
				<div style={{ display: 'flex' }}>
					<h1>경매 응찰</h1>
					<SubTitle>
						<h5>단일</h5>
						<Link to={`/userpage/auctionpackage`}>
							<h6>패키지</h6>
						</Link>
					</SubTitle>
				</div>
				{/* 토글 쓰기 */}
				<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
			</FilterHeader>
			{/* 주의사항 */}
			<CautionBox category={CAUTION_CATEGORY.singleProduct} />
			{exFilterToggle && (
				<>
					{/* <FilterSubcontianer>
						<FilterLeft>
							<RowWrap>
								<PartWrap first>
									<h6>창고 구분</h6>
									<PWRight>
										<MainSelect options={storageOptions} defaultValue={storageOptions[0]} />
									</PWRight>
								</PartWrap>

								<PartWrap>
									<h6>매입처</h6>
									<PWRight>
										<MainSelect options={storageOptions} defaultValue={storageOptions[0]} />
									</PWRight>
								</PartWrap>

								<PartWrap>
									<h6>규격 약호</h6>
									<Input />
									<GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17}>
										찾기
									</GreyBtn>
								</PartWrap>
							</RowWrap>
							<RowWrap>
								<PartWrap first>
									<h6>조회 구분</h6>
									<ExRadioWrap>
										{radioDummy.map((text, index) => (
											<RadioMainDiv key={index}>
												<RadioCircleDiv
													isChecked={checkRadio[index]}
													onClick={() => {
														setCheckRadio(CheckBox(checkRadio, checkRadio.length, index))
													}}
												>
													<RadioInnerCircleDiv isChecked={checkRadio[index]} />
												</RadioCircleDiv>
												<div style={{ display: 'flex', marginLeft: '5px' }}>{text}</div>
											</RadioMainDiv>
										))}
									</ExRadioWrap>
								</PartWrap>
							</RowWrap>
							<RowWrap style={{ borderBottom: '0px' }}>
								<PartWrap first>
									<h6>구분</h6>
									<MainSelect />
									<span style={{ margin: '0px -10px 0px 5px' }}>~</span>
									<MainSelect />
								</PartWrap>
							</RowWrap>
							<RowWrap none>
								<PartWrap first>
									<h6>두께(MM)</h6>
									<MiniInput /> <Tilde>~</Tilde>
									<MiniInput />
								</PartWrap>
								<PartWrap>
									<h6>폭(MM)</h6>
									<MiniInput /> <Tilde>~</Tilde>
									<MiniInput />
								</PartWrap>
								<PartWrap>
									<h6>길이(MM)</h6>
									<MiniInput /> <Tilde>~</Tilde>
									<MiniInput />
								</PartWrap>
							</RowWrap>
						</FilterLeft>
						<FilterRight>
							<DoubleWrap>
								<h6>제품 번호 </h6>
								<textarea
									placeholder='복수 조회 진행 &#13;&#10;  제품 번호 "," 혹은 enter로 &#13;&#10;  구분하여 작성해주세요.'
								/>
							</DoubleWrap>
						</FilterRight>
					</FilterSubcontianer>
					<FilterFooter>
						<div style={{ display: 'flex' }}>
							<p>초기화</p>
							<ResetImg
								src="/img/reset.png"
								style={{ marginLeft: '10px', marginRight: '20px' }}
								onClick={handleImageClick}
								className={isRotated ? 'rotate' : ''}
							/>
						</div>
						<div style={{ width: '180px' }}>
							<BlackBtn width={100} height={40}>
								검색
							</BlackBtn>
						</div>
					</FilterFooter> */}
					<GlobalProductSearch
						param={param}
						isToggleSeparate={true}
						renderCustomSearchFields={(props) => <UserBiddingSearchFields {...props} />} // 만들어야함 -> WinningSearchFields
						globalProductSearchOnClick={globalProductSearchOnClick} // import
						globalProductResetOnClick={globalProductResetOnClick} // import
					/>
				</>
			)}
			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{selectedCountStr}</span> / {totalCountStr}개 )
						<Hidden />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleTablePageSize={handleTablePageSize} />
						<Excel getRow={getRow} />
						<AddWishButton 
							products={selectedData} 
							productNumberKey={PROD_COL_NAME.productNumber} 
						/>
					</div>
				</TCSubContainer>
				<TCSubContainer bor>
					<div>
						선택중량 <span> {selectedWeightStr} </span> (kg) / 총 중량 {totalWeightStr} (kg)
					</div>
					<div
						style={{
							display: 'flex',
							gap: '10px',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<p>목적지</p>
						<CustomInput placeholder="h50" width={60} height={32} defaultValue={destiObject?.code} />
						<CustomInput placeholder="목적지명" width={120} height={32} defaultValue={destiObject?.destinationName} />
						<CustomInput placeholder="도착지 연락처" width={120} height={32} defaultValue={destiObject?.name} />
						<TWhiteBtn
							style={{ width: '50px' }}
							height={30}
							onClick={() => {
								setDestinationPopUp(true)
							}}
						>
							찾기
						</TWhiteBtn>
						<TGreyBtn
							onClick={() => {
								setFinalInput((prevFinalInput) => ({
									...prevFinalInput,
									customerDestinationUid: destiObject && destiObject.uid,
								}))
							}}
						>
							적용
						</TGreyBtn>

						<BtnBound style={{ margin: '0px' }} />
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
						<BtnBound style={{ margin: '0px' }} />
						<SkyBtn style={{ width: '200px', fontSize: '20px' }} height={50} onClick={confirmOnClickHandler}>
							응찰
						</SkyBtn>
					</div>
				</TCSubContainer>
				<Table getCol={getCol} getRow={tableRowData} tablePagination={tablePagination} onPageChange={onPageChange} />
			</TableContianer>
			{destinationPopUp && (
				<InventoryFind
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

export default Single
