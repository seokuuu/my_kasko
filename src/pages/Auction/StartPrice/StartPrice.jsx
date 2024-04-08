import { useCallback, useEffect, useRef, useState } from 'react'
import { TGreyBtn, WhiteBlackBtn, WhiteRedBtn } from '../../../common/Button/Button'
import DateGrid from '../../../components/DateGrid/DateGrid'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

import PageDropdown from '../../../components/TableInner/PageDropdown'

import {
	CustomInput,
	FilterContianer,
	FilterHeader,
	TableContianer,
	TCSubContainer,
} from '../../../modal/External/ExternalFilter'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { isEqual } from 'lodash'
import moment from 'moment'
import {
	deleteStartPrice,
	getStartPrice,
	patchEditPrice,
	unitPricePost,
	uploadMultiPrice,
} from '../../../api/auction/startprice'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import {
	AuctionStartPriceFields,
	AuctionStartPriceFieldsCols,
	AuctionUnitPricePost,
	AuctionUnitPricePostDropOptions2,
} from '../../../constants/admin/Auction'
import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import useReactQuery from '../../../hooks/useReactQuery'
import useTableSelection from '../../../hooks/useTableSelection'
import { add_element_field } from '../../../lib/tableHelpers'
import Upload from '../../../modal/Upload/Upload'
import useAlert from '../../../store/Alert/useAlert'
import { AuctionUnitPriceAtom } from '../../../store/Layout/Layout'
import { onSizeChange } from '../../Operate/utils'
import Table from '../../Table/Table'
import TableV2HiddenSection from '../../Table/TableV2HiddenSection'
import StartPriceFields from './StartPriceFields'

const StartPrice = ({}) => {
	const { simpleConfirm, simpleAlert, showAlert } = useAlert()

	const { selectedCount, selectedData } = useTableSelection()
	const [uploadModal, setUploadModal] = useState(false)
	const [excelToJson, setExcelToJson] = useState([])
	const [final, setFinal] = useState()

	const [insertList, setInsertList] = useState({ insertList: [] })

	const [tablePagination, setTablePagination] = useState([])
	const checkSales = ['전체', '확정 전송', '확정 전송 대기']

	const [applyDate, setApplyDate] = useState() // 적용 일자
	// 단가 일괄 변경 data
	const effectDate = moment(applyDate).format('YYYY-MM-DD')
	const nowDate = new Date()
	const nowRealDate = moment(nowDate).format('YYYY-MM-DD')
	const [effectPrice, setEffectPrice] = useState() // 단가
	const [initObject, setInitObject] = useState()

	const [modalSwitch, setModalSwitch] = useAtom(AuctionUnitPriceAtom)

	const [dropInput, setDropInput] = useState({
		spart: '',
		preferThickness: '',
		grade: '',
	})

	const handleSelectChange = (selectedOption, name) => {
		setDropInput((prevState) => ({
			...prevState,
			[name]: selectedOption.label,
		}))
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
	const tableField = useRef(AuctionStartPriceFieldsCols)
	const getCol = tableField.current
	const queryClient = useQueryClient()
	const checkedArray = useAtom(selectedRowsAtom)[0]

	const paramData = {
		pageNum: 1,
		pageSize: 50,
	}
	const [param, setParam] = useState(paramData)

	// GET
	const { isLoading, isError, data, isSuccess, refetch } = useReactQuery(param, 'getStartPrice', getStartPrice)
	const resData = data?.data?.data?.list

	const resPagination = data?.data?.data?.pagination
	useEffect(() => {
		let getData = resData
		//타입, 리액트쿼리, 데이터 확인 후 실행
		if (!isSuccess && !resData) return
		if (Array.isArray(getData)) {
			setGetRow(add_element_field(getData, AuctionStartPriceFields))
			setTablePagination(resPagination)
		}
	}, [isSuccess, resData])

	// 페이지 핸들러
	const onPageChange = (value) => {
		setParam((prevParam) => ({
			...prevParam,
			pageNum: Number(value),
		}))
	}

	// 체크 시 응찰가, 적용일자 자동 적용
	// TODO : 응찰가와 적용일자가 비어있으면 체크 안되게 막는 법 예외처리
	useEffect(() => {
		const updatedProductList = checkedArray?.map((item) => ({
			uid: item['고유 번호'],
			effectDate: applyDate,
			effectPrice: effectPrice,
			// 여기에 다른 필요한 속성을 추가할 수 있습니다.
		}))

		// winningCreateData를 업데이트하여 productList를 갱신
		setInitObject((prevData) => ({
			...prevData,
			updateList: updatedProductList,
		}))
	}, [checkedArray, applyDate, effectPrice])

	// 삭제 mutate
	const { mutate: remove } = useMutation(deleteStartPrice, {
		onSuccess: () => {
			queryClient.invalidateQueries('auction')
		},
	})

	// 삭제 핸들러
	const handleRemoveBtn = useCallback(() => {
		if (selectedCount > 0) {
			simpleConfirm('선택한 항목을 삭제하시겠습니까?', () => remove(selectedData.map((c) => c['고유 번호'])))
		} else {
			simpleAlert('항목을 선택해주세요.')
		}
	}, [selectedData])

	const editInit = {
		failCount: '',
		effectPrice: '',
		effectDate: nowRealDate,
	}

	// 단가 등록
	const [editInput, setEditInput] = useState(editInit)

	// editInput과 onEditHandler를 name 매칭
	const convertKey = {
		유찰횟수: 'failCount',
		'적용 단가': 'effectPrice',
	}

	// 단가 등록 API
	const { mutate: unitPriceRegister } = useMutation(unitPricePost, {
		onSuccess() {
			showAlert({
				title: '저장이 완료되었습니다.',
				content: '',
				func: () => {
					setModalSwitch(false)
					queryClient.invalidateQueries('auction')
				},
			})
		},
	})

	// 단가 등록
	const propsPost = () => {
		unitPriceRegister({ insertList: final })
	}

	// 단가 등록 폼 핸들러
	const onEditHandler = useCallback((e) => {
		const { name, value } = e.target

		// failCount와 effectPrice에 대해서만 정수로 변환
		const intValue = ['failCount', 'effectPrice'].includes(name) ? parseInt(value, 10) : value

		setEditInput((prevEditInput) => ({
			...prevEditInput,
			[name]: ['failCount', 'effectPrice'].includes(name) ? (isNaN(intValue) ? '' : intValue) : value,
		}))
	}, [])

	// 단가 등록 셀렉트 리스트
	const { spartList, gradeList } = useGlobalProductSearchFieldData()

	const dropdownProps = [
		{ options: spartList, defaultValue: spartList[0] },
		{ options: AuctionUnitPricePostDropOptions2, defaultValue: AuctionUnitPricePostDropOptions2[0] },
		{ options: gradeList, defaultValue: gradeList[0] },
	]

	useEffect(() => {
		// editInput을 포함하는 객체를 생성하고 insertList 상태에 할당합니다.
		setInsertList([{ ...editInput }])
	}, [editInput])

	// 초기화
	const globalProductResetOnClick = () => {
		// if resetting the search field shouldn't rerender table
		// then we need to create paramData object to reset the search fields.
		setParam(paramData)
	}

	// 검색
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

	// 일괄 단가 적용 API
	const { mutate: priceUpodate } = useMutation(patchEditPrice, {
		onSuccess: () => {
			simpleAlert('적용되었습니다.')
			queryClient.invalidateQueries('auction')
		},
		onError() {
			simpleAlert('적용 실패하였습니다.')
		},
	})

	// 일괄 단가 적용 버튼 핸들러
	const editPriceOnClickHandler = () => {
		if (selectedCount === 0) return simpleAlert('항목을 선택해주세요.')
		if (!Boolean(effectPrice)) return simpleAlert('응찰가를 입력해주세요.')
		if (!Boolean(applyDate)) return simpleAlert('적용일자를 선택해주세요.')

		priceUpodate(initObject)
	}

	return (
		<FilterContianer>
			<FilterHeader>
				<div style={{ display: 'flex' }}>
					<h1>경매 시작 단가 관리</h1>
				</div>
				{/* 토글 쓰기 */}
				<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
			</FilterHeader>

			{exFilterToggle && (
				<>
					<GlobalProductSearch
						param={param}
						isToggleSeparate={true}
						renderCustomSearchFields={(props) => <StartPriceFields {...props} />}
						globalProductSearchOnClick={globalProductSearchOnClick}
						globalProductResetOnClick={globalProductResetOnClick}
					/>
				</>
			)}
			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{selectedCount}</span> / {param.pageSize}개 )
						<TableV2HiddenSection />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={(e) => onSizeChange(e, setParam)} />
						<Excel getRow={getRow} sheetName="경매 시작 단가 관리" />
					</div>
				</TCSubContainer>
				<TCSubContainer bor>
					{/* <div>
						선택 중량<span> 2 </span>kg / 총 중량 kg
					</div> */}
					<div></div>
					<div
						style={{
							display: 'flex',
							gap: '10px',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<p>일괄 단가 적용</p>
						<CustomInput
							type={'number'}
							placeholder="단가 입력"
							width={120}
							height={32}
							value={effectPrice}
							onChange={(e) => {
								setEffectPrice(parseInt(e.target.value))
							}}
						/>
						<DateGrid
							placeholder="적용일자"
							bgColor={'white'}
							fontSize={14}
							height={32}
							width={130}
							startDate={applyDate}
							setStartDate={setApplyDate}
						/>
						<TGreyBtn height={30} style={{ minWidth: '50px' }} onClick={editPriceOnClickHandler}>
							적용
						</TGreyBtn>
					</div>
				</TCSubContainer>
				<Table
					getCol={getCol}
					getRow={getRow}
					tablePagination={tablePagination}
					onPageChange={onPageChange}
					loading={isLoading}
				/>
				<TCSubContainer>
					<div></div>
					<div>
						<WhiteRedBtn style={{ marginRight: '10px' }} onClick={handleRemoveBtn}>
							삭제
						</WhiteRedBtn>
						<WhiteBlackBtn
							onClick={() => {
								setModalSwitch(true)
							}}
						>
							단가 등록
						</WhiteBlackBtn>
					</div>
				</TCSubContainer>
				{/* <NewBottomBtnWrap bottom={0}>
					<BlackBtn width={12} height={40}>
						저장
					</BlackBtn>
				</NewBottomBtnWrap> */}
			</TableContianer>
			{modalSwitch && (
				<Upload
					modalSwitch={modalSwitch}
					setModalSwitch={setModalSwitch}
					title={'단가 등록'}
					propsHandler={propsPost}
					modalInTable={AuctionUnitPricePost}
					getRow={getRow}
					// uidAtom={uidAtom}
					onEditHandler={onEditHandler}
					dropdownProps={dropdownProps}
					editInput={editInput}
					setEditInput={setEditInput}
					convertKey={convertKey}
					handleSelectChange={handleSelectChange}
					dropInput={dropInput}
					setDropInput={setDropInput}
					excelUploadAPI={uploadMultiPrice}
					refreshQueryKey={'auction'}
					category={'단가 등록'}
					setFinal={setFinal}
				/>
			)}
			{/* {modalSwitch && (
				<UploadV2
					originEngRowField={AuctionStartPriceFields}
					setModalSwitch={setUploadModal}
					postApi={postExcelSubmitProduct}
					setExcelToJson={setExcelToJson}
					excelToJson={excelToJson}
				/>
			)} */}
		</FilterContianer>
	)
}

export default StartPrice
