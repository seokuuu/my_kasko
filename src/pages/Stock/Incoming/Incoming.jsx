import { useAtom, useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { FilterContianer, FilterHeader, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import { blueModalAtom, selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import Table from '../../Table/Table'
import useReactQuery from '../../../hooks/useReactQuery'
import { deleteIncomeProduct, getInComingList, incomingConfirm, postExcelSubmitProduct } from '../../../api/stock'
import { StockIncomingFields, stockFields } from '../../../constants/admin/StockIncoming'
import { KilogramSum } from '../../../utils/KilogramSum'
import { add_element_field } from '../../../lib/tableHelpers'
import axios from 'axios'
import useMutationQuery from '../../../hooks/useMutationQuery'
import useAlert from '../../../store/Alert/useAlert'
import UploadV2 from '../../../modal/Upload/UploadV2'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import IncomingSearchFields from './IncomingSearchFields'
import { SwitchBtn, WhiteBlackBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { isEqual } from 'lodash'
const Incoming = ({}) => {
	const { simpleConfirm, simpleAlert } = useAlert()

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

	const modalOpen = () => {
		setIsModal(true)
	}

	const formatTableRowData = (inComingData) => {
		return add_element_field(inComingData, stockFields)
	}
	const [getRow, setGetRow] = useState('')
	// 데이터 가져오기
	const paramData = {
		pageNum: 1,
		pageSize: 5,
		orderStatus: '확정 전송',
		// receiptStatusList: '입고 요청',
	}
	const [param, setParam] = useState(paramData)
	const [inComingPagination, setInComingPagination] = useState([])
	const [inComingListData, setInComingListData] = useState(null)
	const { data: inComingData, isSuccess, refetch } = useReactQuery(param, 'getInComingList', getInComingList)
	useEffect(() => {
		if (inComingData && inComingData.data && inComingData.data.list) {
			setInComingListData(formatTableRowData(inComingData.data.list))
			setInComingPagination(inComingData.data.pagination)
		}
	}, [inComingData, isSuccess])
	const onPageChange = (value) => {
		setParam((prevParam) => ({
			...prevParam,
			pageNum: Number(value),
		}))
	}

	const checkBoxSelect = useAtomValue(selectedRowsAtom)
	const totalWeight = inComingData?.data.pagination.totalWeight
	const formattedTotalWeight = totalWeight && totalWeight.toLocaleString()


	/**
	 * @description 재고 수신
	 */
	const stockReceive = async () => {
		try {
			await axios.post(`${process.env.REACT_APP_API_URL}/admin/store/receipt`, {})
			await refetch()
			simpleAlert('재고수신이 완료되었습니다.')
		} catch (error) {
			console.log('재고수신 에러발생', error)
		}
	}

	/**
	 * @description 제품 삭제
	 */
	const { mutate: deleteIncome } = useMutationQuery('deleteIncomeProduct', deleteIncomeProduct)
	const [selectInComeNumber, setSelectInComeNumber] = useState([])
	useEffect(() => {
		if (checkBoxSelect?.length === 0) return
		setSelectInComeNumber(() => checkBoxSelect?.map((i) => i['제품 고유 번호']))
	}, [checkBoxSelect])
	const handleDelete = () => {
		simpleConfirm('정말로 삭제하시겠습니까?', () => {
			deleteIncome(selectInComeNumber?.join(','), {
				onSuccess: () => {
					refetch()
				},
			})
		})
	}

	/**
	 * @description 제품 등록
	 */
	const [uploadModal, setUploadModal] = useState(false)
	const [excelToJson, setExcelToJson] = useState([])
	/**
	 * @description 검색하는 부분
	 */
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
	const globalProductResetOnClick = () => {
		// if resetting the search field shouldn't rerender table
		// then we need to create paramData object to reset the search fields.
		setParam(paramData)
	}

	const { mutate: incomeConfirm } = useMutationQuery('incomingConfirm', incomingConfirm)
	const handleConfirm = async() => {
		simpleConfirm('입고 확정으로 바꾸시겠습니까?', () => {
			incomeConfirm(selectInComeNumber?.join(','), {
				onSuccess: () => {
					refetch()
				},
			})
		})
	}
	useEffect(() => {
		console.log('checkBox값 추적', checkBoxSelect)
	}, [checkBoxSelect])

	return (
		<>
			<FilterContianer>
				<div>
					<FilterHeader>
						<h1>입고 관리</h1>
						<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
					</FilterHeader>
					<>
						{exFilterToggle && (
							<>
								<GlobalProductSearch
									param={param}
									isToggleSeparate={true}
									renderCustomSearchFields={(props) => <IncomingSearchFields {...props} />}
									globalProductSearchOnClick={globalProductSearchOnClick}
									globalProductResetOnClick={globalProductResetOnClick}
								/>
							</>
						)}
					</>
				</div>

				<TableContianer>
					<TCSubContainer bor>
						<div>
							조회 목록 (선택 <span>{checkBoxSelect?.length > 0 ? checkBoxSelect?.length : '0'}</span> /
							{inComingPagination?.listCount}개 )<Hidden />
						</div>
						<div style={{ display: 'flex', gap: '10px' }}>
							<PageDropdown />
							<Excel
							 getRow={getRow}
							/>
						</div>
					</TCSubContainer>
					<TCSubContainer>
						<div>
							선택 중량<span>{KilogramSum(checkBoxSelect)}</span>kg / 총 {formattedTotalWeight}kg
						</div>
						<div style={{ display: 'flex', gap: '10px' }}>
							<SwitchBtn onClick={handleConfirm}>입고 확정</SwitchBtn>
						</div>
					</TCSubContainer>

					<Table
						getCol={StockIncomingFields}
						getRow={inComingListData}
						tablePagination={inComingPagination}
						onPageChange={onPageChange}
					/>
					<TCSubContainer>
						<div></div>
						<div style={{ display: 'flex', gap: '10px' }}>
							<WhiteBlackBtn onClick={() => setUploadModal(true)}>제품 등록</WhiteBlackBtn>
							<WhiteRedBtn onClick={handleDelete}>제품 삭제</WhiteRedBtn>
							<WhiteSkyBtn onClick={stockReceive}>재고 수신</WhiteSkyBtn>
						</div>
					</TCSubContainer>
				</TableContianer>
			</FilterContianer>
			{uploadModal && (
				<UploadV2
					originEngRowField={stockFields}
					setModalSwitch={setUploadModal}
					postApi={postExcelSubmitProduct()}
					setExcelToJson={setExcelToJson}
					excelToJson={excelToJson}
				/>
			)}
		</>
	)
}

export default Incoming
