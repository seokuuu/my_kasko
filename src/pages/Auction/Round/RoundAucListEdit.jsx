import { useCallback, useEffect, useRef, useState } from 'react'
import {
	BlackBtn,
	BtnBound,
	GreyBtn,
	NewBottomBtnWrap,
	SkyBtn,
	TGreyBtn,
	WhiteBtn,
	WhiteRedBtn,
} from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import { storageOptions } from '../../../common/Option/SignUp'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

import {
	CustomInput,
	DoubleWrap,
	ExInputsWrap,
	FilterContianer,
	FilterFooter,
	FilterHeader,
	FilterLeft,
	FilterRight,
	FilterSubcontianer,
	FilterTCTop,
	FilterTopContainer,
	Input,
	MiniInput,
	PWRight,
	PartWrap,
	ResetImg,
	RowWrap,
	TCSubContainer,
	TableContianer,
	Tilde,
} from '../../../modal/External/ExternalFilter'

import { useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { getDetailAuction } from '../../../api/auction/round'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { AuctionRoundDetailFields, AuctionRoundDetailFieldsCols } from '../../../constants/admin/Auction'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import { aucProAddModalAtom } from '../../../store/Layout/Layout'
import Table from '../../Table/Table'
import RoundAucProAdd from './RoundAucProAdd'
import { isArray, isEqual } from 'lodash'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import RoundAucListEditFields from './RoundAucListEditFields'
import useAlert from '../../../store/Alert/useAlert'

//경매 목록 수정(단일)
const RoundAucListEdit = ({ setEditPage, types, uidAtom, auctionNum }) => {
	const [newResData, setNewResData] = useState([])
	const [addAuction, setAddAuction] = useState({
		productUid: null,
		auctionStartPrice: null,
	})
	const [delAuction, setDelAuction] = useState({
		productUid: null,
		auctionProductUid: null,
	})
	const [editData, setEditData] = useState({
		type: types,
		auctionNumber: auctionNum,
		addAuctionProductList: [],
		deleteAuctionProductList: [],
	})
	const { simpleAlert, simpleConfirm } = useAlert()

	console.log('newResData auc prod add => ', newResData)

	const [rows, setRows] = useState('')
	const [list, setList] = useState([])
	const [addModal, setAddModal] = useAtom(aucProAddModalAtom)
	const [pagination, setPagination] = useState(null)
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
	const tableField = useRef(AuctionRoundDetailFieldsCols)
	const getCol = tableField.current
	const queryClient = useQueryClient()
	const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom)
	// const checkedArray = useAtom(selectedRowsAtom)[0]

	const paramData = {
		pageNum: 1,
		pageSize: 50,
		auctionNumber: auctionNum,
	}
	const [param, setParam] = useState(paramData)

	useEffect(() => {
		setParam((prevParams) => ({
			...prevParams,
			type: types,
		}))
	}, [types])

	const { isLoading, isError, data, isSuccess, refetch } = useReactQuery(param, 'getdetailauction', getDetailAuction)

	useEffect(() => {
		refetch()
	}, [param, refetch])

	const resData = data?.data?.data?.list

	// const [resData2, setResData2] = useState(null)

	// useEffect(() => {
	// 	if (isSuccess) {
	// 		setResData2(resData)
	// 	}
	// }, [isSuccess, data]) // `data`를 의존성 배열에 추가했습니다.

	// console.log('resData2', resData2)

	const [startPrice, setStartPrice] = useState(null)
	const [realStartPrice, realSetStartPrice] = useState(null)

	console.log('realStartPrice', realStartPrice)

	// Todo
	// useEffect(() => {
	// 	// let getData = resData
	// 	// //타입, 리액트쿼리, 데이터 확인 후 실행
	// 	// if (!isSuccess && !resData) return
	// 	// if (Array.isArray(getData)) {
	// 	//   setGetRow(add_element_field(getData, AuctionRoundDetailFields))
	// 	// }
	// 	// let getData = resData

	// 	//타입, 리액트쿼리, 데이터 확인 후 실행

	// 	// newResData : 추가한 애들
	// 	// updatedData : 원래 resData
	// 	// 둘다 상태관리를 해야하며,
	// 	if (!isSuccess && !resData2) return
	// 	if (Array.isArray(resData2, newResData)) {
	// 		const updatedData = add_element_field(resData2, AuctionRoundDetailFields)
	// 		const combinedData = [...newResData, ...updatedData]
	// 		setGetRow(combinedData)
	// 	}
	// }, [isSuccess, resData2, newResData])
	useEffect(() => {
		if (list && Array.isArray(list)) {
			setRows(add_element_field(list, AuctionRoundDetailFields))
		}
	}, [list])

	useEffect(() => {
		if (resData && Array.isArray(resData)) {
			setList(resData)
		}
	}, [resData])

	// TODO : 경매 회차 관리 resData 쪽 object 눈속임으로 없애기 ..`
	// input의 deleteAuctionProductList 값 채우기
	// const handleRemoveBtn = useCallback(() => {
	// 	if (isArray(checkedArray) && checkedArray.length > 0) {
	// 		if (window.confirm('선택한 항목을 삭제 목록에 추가하시겠습니까?')) {
	// 			const resultRemove = checkedArray
	// 				.filter((item) => item && item['경매 제품 고유 번호'] !== undefined && item['경매 제품 고유 번호'] !== null)
	// 				.map((item) => item['경매 제품 고유 번호'])

	// 			setEditData({ ...editData, deleteAuctionProductList: resultRemove })

	// 			// '원래 DATA' 관련 object array 삭제
	// 			const filteredArray2 = resData2.filter(
	// 				(item) =>
	// 					!checkedArray.some((checkedItem) => checkedItem['경매 제품 고유 번호'] === item['경매 제품 고유 번호']),
	// 			)
	// 			console.log('filteredArray2', filteredArray2)
	// 			setResData2(filteredArray2)

	// 			// '추가한 DATA' 관련 array
	// 			const filteredArray = newResData.filter(
	// 				(item) =>
	// 					!checkedArray.some((checkedItem) => checkedItem['경매 제품 고유 번호'] === item['경매 제품 고유 번호']),
	// 			)
	// 			setNewResData(filteredArray)
	// 		}
	// 	} else {
	// 		alert('선택해주세요!')
	// 	}
	// }, [checkedArray, editData, setEditData, newResData, setNewResData])

	// 목록 추가
	// selectedData가 newResData
	// list가 updatedData

	const [outAddData, setOutAddData] = useState()
	const [delData, setDelData] = useState()
	const onListAdd = (selectedData) => {
		try {
			const newList = [...new Set([...selectedData, ...list])]
			setList(newList) // 선별 목록 데이터 등록
			setSelectedRows([]) // 테이블 체크 목록 초기화
			setOutAddData(selectedData.map((x) => x.uid))
		} catch (error) {
			simpleAlert(error.message)
		}
	}

	// // input의 addAuctionProductList 값 채우기
	// 수정 부분의 "추가" 바인딩
	useEffect(() => {
		const uniqueNumbers = outAddData?.map((item) => ({
			productUid: item['uid'],
			auctionStartPrice: realStartPrice,
		}))

		setEditData({ ...editData, addAuctionProductList: uniqueNumbers })
	}, [newResData, outAddData, realStartPrice])

	console.log('selectedRows', selectedRows)

	// 목록 제거
	const onListRemove = () => {
		if (!selectedRows || selectedRows.length === 0) {
			return simpleAlert('제품을 선택해주세요.')
		}
		const key = '제품 고유 번호'
		const newKey = '고유 번호'
		const deleteKeys = selectedRows.map((item) => item[key])
		const newSelectors = list.filter((item) => !deleteKeys.includes(item?.productUid))

		if (outAddData) {
			const updatedOutAddData = outAddData.filter((item) => !selectedRows.map((row) => row[newKey]).includes(item)) // add된 것들 처리
			setOutAddData(updatedOutAddData)
		}

		// deleteAuctionProductList에 기존 list 바인딩 !! TODO
		const resultRemove = selectedRows
			.filter((item) => item && item['경매 제품 고유 번호'] !== undefined && item['경매 제품 고유 번호'] !== null)
			.map((item) => item['경매 제품 고유 번호'])

		setEditData({ ...editData, deleteAuctionProductList: resultRemove })
		setList(newSelectors)
		setSelectedRows([]) // 테이블 체크 목록 초기화
		setDelData(resultRemove)
	}
	console.log('outAddData', outAddData)

	// 추가 가져온 애 테스트임. 이거 필요없음. 기존에 있던 list 가 잘되는지 체크 하기
	//
	// useEffect(() => {
	// 	const uniqueNumbers = list?.map((item) => ({
	// 		productUid: item['uid'],
	// 		auctionStartPrice: realStartPrice,
	// 	}))

	// 	setEditData({ ...editData, addAuctionProductList: uniqueNumbers })
	// }, [list, realStartPrice])

	console.log('nesRES', newResData)
	console.log('editData @@@ ', editData)

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

	return (
		<FilterContianer>
			<FilterHeader>
				<div style={{ display: 'flex' }}>
					<h1>경매 목록 수정 ({types})</h1>
				</div>
				{/* 토글 쓰기 */}
				<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
			</FilterHeader>
			<FilterTopContainer>
				<FilterTCTop>
					<h6>경매 번호</h6>
					<p>{auctionNum}</p>
				</FilterTCTop>
			</FilterTopContainer>
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
									<h6>매입처 </h6>
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
							<RowWrap style={{ borderBottom: '0px' }}>
								<PartWrap first>
									<h6>구분</h6>
									<MainSelect />
									<MainSelect />
									<MainSelect />
									<MainSelect />
									<MainSelect />
								</PartWrap>
							</RowWrap>
							<RowWrap style={{ borderBottom: '0px' }}>
								<PartWrap first>
									<h6>두께(MM)</h6>
									<ExInputsWrap>
										<MiniInput /> <Tilde>~</Tilde>
										<MiniInput />
									</ExInputsWrap>
								</PartWrap>
								<PartWrap>
									<h6>폭(MM)</h6>
									<ExInputsWrap>
										<MiniInput /> <Tilde>~</Tilde>
										<MiniInput />
									</ExInputsWrap>
								</PartWrap>
								<PartWrap>
									<h6>길이(MM)</h6>
									<ExInputsWrap>
										<MiniInput /> <Tilde>~</Tilde>
										<MiniInput />
									</ExInputsWrap>
								</PartWrap>
							</RowWrap>
							<RowWrap>
								<PartWrap first>
									<h6>유찰 횟수</h6>
									<ExInputsWrap>
										<Input /> <Tilde>~</Tilde>
										<Input />
									</ExInputsWrap>
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
					</FilterSubcontianer> */}
					{/* <FilterFooter>
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
						renderCustomSearchFields={(props) => <RoundAucListEditFields {...props} />} // 만들어야함 -> WinningSearchFields
						globalProductSearchOnClick={globalProductSearchOnClick} // import
						globalProductResetOnClick={globalProductResetOnClick} // import
					/>
				</>
			)}
			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>2</span> / 50개 )
						<Hidden />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown />
						<Excel getRow={getRow} />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택 중량<span> 2 </span>kg / 총 중량 kg
					</div>
					<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
						<p>시작가 일괄 변경</p>
						<CustomInput
							placeholder=""
							width={120}
							height={32}
							onChange={(e) => {
								setStartPrice(parseInt(e.target.value))
							}}
						/>
						<TGreyBtn
							height={30}
							style={{ width: '50px' }}
							onClick={() => {
								realSetStartPrice(startPrice)
							}}
						>
							적용
						</TGreyBtn>
						<BtnBound />
						<SkyBtn
							onClick={() => {
								setAddModal(true)
							}}
						>
							제품 추가
						</SkyBtn>
					</div>
				</TCSubContainer>
				<Table getCol={AuctionRoundDetailFieldsCols} getRow={rows} loading={isLoading} />
				<TCSubContainer>
					<div style={{ display: 'flex', gap: '10px' }}></div>
					<div>
						<WhiteRedBtn onClick={onListRemove}>선택 목록 제거</WhiteRedBtn>
					</div>
				</TCSubContainer>
				{addModal && (
					<RoundAucProAdd
						setAddModal={setAddModal}
						// newResData={newResData}
						// setNewResData={setNewResData}
						types={types}
						// propsResData={resData}
						list={list}
						onListAdd={onListAdd}
						outAddData={outAddData}
						setOutAddData={setOutAddData}
					/>
				)}
				<NewBottomBtnWrap bottom={-5}>
					<WhiteBtn width={13} height={40}>
						돌아가기
					</WhiteBtn>
					<BlackBtn width={13} height={40}>
						완료
					</BlackBtn>
				</NewBottomBtnWrap>
			</TableContianer>
		</FilterContianer>
	)
}

export default RoundAucListEdit
