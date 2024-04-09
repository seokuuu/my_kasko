import { useEffect, useState } from 'react'
import {
	BlackBtn,
	BtnBound,
	NewBottomBtnWrap,
	SkyBtn,
	TGreyBtn,
	WhiteBtn,
	WhiteRedBtn,
} from '../../../common/Button/Button'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

import {
	CustomInput,
	FilterContianer,
	FilterHeader,
	FilterTCTop,
	FilterTopContainer,
	TCSubContainer,
	TableContianer,
} from '../../../modal/External/ExternalFilter'

import { useMutation } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { isEqual } from 'lodash'
import { editAuction, getDetailAuction } from '../../../api/auction/round'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { AuctionRoundDetailFields, AuctionRoundDetailFieldsCols } from '../../../constants/admin/Auction'
import useReactQuery from '../../../hooks/useReactQuery'
import useTableData from '../../../hooks/useTableData'
import useTableSelection from '../../../hooks/useTableSelection'
import { add_element_field } from '../../../lib/tableHelpers'
import useAlert from '../../../store/Alert/useAlert'
import { aucProAddModalAtom } from '../../../store/Layout/Layout'
import Table from '../../Table/Table'
import RoundAucListEditFields from './RoundAucListEditFields'
import RoundAucProAdd from './RoundAucProAdd'
import { useLoading } from '../../../store/Loading/loadingAtom'

//경매 목록 수정(단일)
const RoundAucListEdit = ({ setEditPage, types, uidAtom, auctionNum, auctionStatus, roundPageRefetch }) => {
	const [btnClick, setBtnClick] = useState(false)
	const [newResData, setNewResData] = useState([])

	console.log('newResData', newResData)

	const [editData, setEditData] = useState({
		type: types,
		auctionNumber: auctionNum,
		addAuctionProductList: [],
		deleteAuctionProductList: [],
	})
	const { simpleAlert, simpleConfirm } = useAlert()

	// const [rows, setRows] = useState('')
	// const [list, setList] = useState([])
	const [addModal, setAddModal] = useAtom(aucProAddModalAtom)
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
	const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom)

	// const checkedArray = useAtom(selectedRowsAtom)[0]

	const paramData = {
		pageNum: 1,
		pageSize: 10000,
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

	const [startPrice, setStartPrice] = useState(null)
	const [realStartPrice, setRealStartPrice] = useState(null)

	const [initRow, setInitRow] = useState([])

	const uids = selectedRows?.map((item) => item['제품 번호'])

	const totalWeight = getRow && getRow?.map((x) => x['중량'])
	const sum = totalWeight && totalWeight?.reduce((acc, curr) => acc + parseInt(curr), 0)

	const startPriceOnClickHandler = () => {
		// resData는 영문이라 add_element_field 처리해야하고
		// newResData는 한글이라 그냥 setGetRow 처리해야함

		// resData는 item이 영문으로 넣어줘야하고
		// newResData는 그냥 한글로 넣어주면 됨
		// 다 한뒤에 mergedData 해주고, setGetRow 해주면 됨

		const updatedResData = resData.map((item) => {
			if (uids.includes(item.productNumber)) {
				item.auctionStartPrice = parseInt(item.auctionStartPrice) + parseInt(startPrice)
			}
			return item
		})

		const updatedNewResData = newResData.map((item) => {
			if (uids.includes(item['제품 번호'])) {
				item['시작가'] = parseInt(item['시작가']) + parseInt(startPrice)
			}
			return item
		})

		if (selectedRows.some((row) => row.매입처 === '현대제철')) {
			simpleAlert('현대제철(타사) 시작가 변경이 불가합니다.')
		} else {
			setRealStartPrice(startPrice)
			setGetRow([...add_element_field(updatedResData, AuctionRoundDetailFields), ...updatedNewResData])
			// setGetRow(add_element_field(updatedResData, AuctionRoundDetailFields))
			//  newResData 한글로 된것들은 그대로두고,  resData는 필드항목 씌워서 setGetRow처리
		}
	}

	useEffect(() => {
		if (resData && Array.isArray(resData)) {
			const newInitRow = add_element_field(resData, AuctionRoundDetailFields)

			// 제품 추가에서 '고유 번호' 중복 object 제거
			const removeDuplicates = (data) => {
				// 중복을 확인할 객체 생성
				const uniqueMap = {}

				// 중복을 제거한 결과 반환
				return data.filter((item) => {
					const uniqueKey = item['고유 번호']

					// 중복된 '고유 번호'가 없으면 해당 항목을 유지하고 true 반환
					if (!uniqueMap[uniqueKey]) {
						uniqueMap[uniqueKey] = true
						return true
					}

					// 중복된 '고유 번호'가 있으면 해당 항목을 제거하고 false 반환
					return false
				})
			}

			const uniqueData = removeDuplicates(newResData)
			setInitRow(newInitRow)
			setGetRow([...uniqueData, ...newInitRow])
		}
	}, [isSuccess, resData, addModal])

	const dupleUids = getRow && getRow?.map((item) => item['제품 고유 번호'] || item['고유 번호'])

	const [outAddData, setOutAddData] = useState([])

	const onListAdd = (selectedData) => {
		console.log('selectedData', selectedData)
		try {
			setSelectedRows([]) // 테이블 체크 목록 초기화
			// setOutAddData((prev) => [...prev, ...selectedData.map((x) => x['uid'])])
		} catch (error) {
			simpleAlert(error.message)
		}
	}

	// // input의 addAuctionProductList 값 채우기
	// 수정 부분의 "추가" 바인딩
	useEffect(() => {
		const uniqueNumbers = outAddData?.map((item) => ({
			productUid: item,
			auctionStartPrice: realStartPrice,
		}))

		setEditData({ ...editData, addAuctionProductList: uniqueNumbers })
	}, [outAddData, realStartPrice])

	// 목록 제거
	const onListRemove = () => {
		// 제품 추가를 통해 띄워진 목록 "경매 목록 수정 TABLE에서 삭제(단순 목록에서 삭제)"
		if (!selectedRows || selectedRows.length === 0) {
			return simpleAlert('제품을 선택해주세요.')
		}

		simpleConfirm('선택한 항목을 목록에 제외시키겠습니까?', () => {
			const filteredArray = newResData.filter(
				(item) => !selectedRows.some((checkedItem) => checkedItem['고유 번호'] === item['고유 번호']),
			)

			setNewResData(filteredArray)

			const resultRemove = selectedRows
				.filter((item) => item && item['경매 제품 고유 번호'] !== undefined && item['경매 제품 고유 번호'] !== null)
				.map((item) => ({
					auctionProductUid: item['경매 제품 고유 번호'],
					productUid: item['제품 고유 번호'],
				}))

			const updatedDelData = [...editData.deleteAuctionProductList, ...resultRemove]
			setEditData((prevEditData) => ({
				...prevEditData,
				deleteAuctionProductList: updatedDelData,
			}))

			const filteredArray2 = getRow.filter(
				(item) =>
					!selectedRows.some((checkedItem) => checkedItem['경매 제품 고유 번호'] === item['경매 제품 고유 번호']),
			)

			setGetRow([...filteredArray, ...filteredArray2])

			setSelectedRows([]) // 테이블 체크 목록 초기화

			const newKey = '고유 번호'

			// 제품 추가된 항목 삭제 처리
			if (outAddData) {
				const updatedOutAddData = outAddData.filter((item) => !selectedRows.map((row) => row[newKey]).includes(item)) // add된 것들 처리

				setOutAddData((prev) => ({
					...prev,
					updatedOutAddData,
				}))
				setOutAddData(updatedOutAddData)
			}
		})

		setBtnClick((prev) => !prev)
	}

	const globalProductResetOnClick = () => {
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

	// 수정 PATCH
	const { mutate: auctionEdit, isLoading: auctionEditLoading } = useMutation(editAuction, {
		onSuccess: () => {
			simpleAlert('수정 되었습니다.', () => {
				setEditPage(false)
				refetch()
				roundPageRefetch()
			})
		},
		onError: () => {
			simpleAlert('오류가 발생했습니다. 다시 시도해주세요.')
		},
	})

	const auctionEditHandler = () => {
		auctionEdit(editData)
	}

	const [incomingCheckState, setIncomingCheckState] = useState(false)
	const incomingCheck = selectedRows?.map((x) => x['매입처'])

	const { selectedData, selectedWeightStr, selectedWeight, selectedCountStr } = useTableSelection({
		weightKey: '중량',
	})

	const { tableRowData, paginationData, totalWeightStr, totalCountStr, totalCount } = useTableData({
		tableField: AuctionRoundDetailFields,
		serverData: data?.data?.data,
		wish: { display: true, key: ['productNumber', 'packageNumber'] },
		best: { display: true },
	})

	useLoading(auctionEditLoading)

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
					<GlobalProductSearch
						param={param}
						setParam={setParam}
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
						조회 목록 (선택 <span>{selectedCountStr}</span> / {getRow?.length}개 )
						<Hidden />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={(e) => setParam((p) => ({ ...p, pageSize: e.target.value }))} />
						<Excel getRow={getRow} sheetName="경매 목록 수정" />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택 중량 <span> {selectedWeightStr} </span> (kg) / 총 중량 <span>{sum.toLocaleString()}</span> (kg)
					</div>
					{auctionStatus !== '종료' && (
						<>
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
								<TGreyBtn height={30} style={{ width: '50px' }} onClick={startPriceOnClickHandler}>
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
						</>
					)}
				</TCSubContainer>
				<Table getCol={AuctionRoundDetailFieldsCols} getRow={getRow} loading={isLoading} />
				{auctionStatus !== '종료' && (
					<>
						<TCSubContainer>
							<div style={{ display: 'flex', gap: '10px' }}></div>
							<div>
								<WhiteRedBtn onClick={onListRemove}>선택 목록 제거</WhiteRedBtn>
							</div>
						</TCSubContainer>
					</>
				)}
				{addModal && (
					<RoundAucProAdd
						setAddModal={setAddModal}
						newResData={newResData}
						setNewResData={setNewResData}
						types={types}
						// propsResData={resData}
						// list={list}
						onListAdd={onListAdd}
						outAddData={outAddData}
						setOutAddData={setOutAddData}
						auctionNumber={auctionNum}
						dupleUids={dupleUids}
					/>
				)}
				<NewBottomBtnWrap bottom={-5} borderTop={'none'}>
					<WhiteBtn
						width={13}
						height={40}
						onClick={() => {
							setEditPage(false)
						}}
					>
						돌아가기
					</WhiteBtn>
					<BlackBtn width={13} height={40} onClick={auctionEditHandler}>
						완료
					</BlackBtn>
				</NewBottomBtnWrap>
			</TableContianer>
		</FilterContianer>
	)
}

export default RoundAucListEdit
