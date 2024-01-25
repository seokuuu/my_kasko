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

//경매 목록 수정(단일)
const RoundAucListEdit = ({ setEditPage, types, uidAtom, auctionNum }) => {
	const [newResData, setNewResData] = useState([])
	const [editData, setEditData] = useState({
		type: types,
		auctionNumber: auctionNum,
		addProductUids: [],
		deleteAuctionProductList: [],
	})

	console.log('newResData auc prod add => ', newResData)

	const [addList, setAddList] = useState([])
	const [deleteList, setDeleteList] = useState([])
	const checkSales = ['전체', '확정 전송', '확정 전송 대기']
	const [addModal, setAddModal] = useAtom(aucProAddModalAtom)
	//checkSales
	const [check1, setCheck1] = useState(Array.from({ length: checkSales.length }, () => false))

	//checkShips
	const [checkData1, setCheckData1] = useState(Array.from({ length: checkSales.length }, () => ''))

	useEffect(() => {
		// true에 해당되면, value를, false면 빈값을 반환
		const updatedCheck = checkSales.map((value, index) => {
			return check1[index] ? value : ''
		})
		// 빈값을 제외한 진짜배기 값이 filteredCheck에 담긴다.
		const filteredCheck = updatedCheck.filter((item) => item !== '')
		setCheckData1(filteredCheck)

		// 전송용 input에 담을 때
		// setInput({
		//   ...input,
		//   businessType: updatedCheck.filter(item => item !== ''),
		// });
	}, [check1])

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
	const tableField = useRef(AuctionRoundDetailFieldsCols)
	const getCol = tableField.current
	const queryClient = useQueryClient()
	const checkedArray = useAtom(selectedRowsAtom)[0]
	console.log('checkedArray', checkedArray)

	const [originalRow, setOriginalRow] = useState([]) //원본 row를 저장해서 radio check에러 막기

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

	const [resData2, setResData2] = useState(null)

	useEffect(() => {
		if (isSuccess) {
			setResData2(resData)
		}
	}, [isSuccess, data]) // `data`를 의존성 배열에 추가했습니다.

	console.log('resData2', resData2)

	// Todo
	useEffect(() => {
		// let getData = resData
		// //타입, 리액트쿼리, 데이터 확인 후 실행
		// if (!isSuccess && !resData) return
		// if (Array.isArray(getData)) {
		//   setGetRow(add_element_field(getData, AuctionRoundDetailFields))
		// }
		// let getData = resData

		//타입, 리액트쿼리, 데이터 확인 후 실행

		// newResData : 추가한 애들
		// updatedData : 원래 resData
		// 둘다 상태관리를 해야하며,
		if (!isSuccess && !resData2) return
		if (Array.isArray(resData2, newResData)) {
			const updatedData = add_element_field(resData2, AuctionRoundDetailFields)
			const combinedData = [...newResData, ...updatedData]
			setGetRow(combinedData)
		}
	}, [isSuccess, resData2, newResData])

	// input의 addProductUids 값 채우기
	useEffect(() => {
		const uniqueNumbers = newResData?.map((item) => item['고유 번호'])
		setEditData({ ...editData, addProductUids: uniqueNumbers })
	}, [newResData])

	// TODO : 경매 회차 관리 resData 쪽 object 눈속임으로 없애기 ..`
	// input의 deleteAuctionProductList 값 채우기
	const handleRemoveBtn = useCallback(() => {
		if (isArray(checkedArray) && checkedArray.length > 0) {
			if (window.confirm('선택한 항목을 삭제 목록에 추가하시겠습니까?')) {
				const resultRemove = checkedArray
					.filter((item) => item && item['경매 제품 고유 번호'] !== undefined && item['경매 제품 고유 번호'] !== null)
					.map((item) => item['경매 제품 고유 번호'])

				setEditData({ ...editData, deleteAuctionProductList: resultRemove })

				// '원래 DATA' 관련 object array 삭제
				const filteredArray2 = resData2.filter(
					(item) =>
						!checkedArray.some((checkedItem) => checkedItem['경매 제품 고유 번호'] === item['경매 제품 고유 번호']),
				)
				console.log('filteredArray2', filteredArray2)
				setResData2(filteredArray2)

				// '추가한 DATA' 관련 array
				const filteredArray = newResData.filter(
					(item) =>
						!checkedArray.some((checkedItem) => checkedItem['경매 제품 고유 번호'] === item['경매 제품 고유 번호']),
				)
				setNewResData(filteredArray)
			}
		} else {
			alert('선택해주세요!')
		}
	}, [checkedArray, editData, setEditData, newResData, setNewResData])

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
						<CustomInput placeholder="" width={120} height={32} />
						<TGreyBtn height={30} style={{ width: '50px' }}>
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
				<Table getCol={getCol} getRow={getRow} />
				<TCSubContainer>
					<div style={{ display: 'flex', gap: '10px' }}></div>
					<div>
						<WhiteRedBtn onClick={handleRemoveBtn}>선택 목록 제거</WhiteRedBtn>
					</div>
				</TCSubContainer>
				{addModal && (
					<RoundAucProAdd
						setAddModal={setAddModal}
						newResData={newResData}
						setNewResData={setNewResData}
						types={types}
						propsResData={resData}
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
