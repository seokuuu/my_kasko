import { useAtom, useAtomValue } from 'jotai'
import React, { useEffect, useState } from 'react'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { FilterContianer, FilterHeader, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import { selectedRowsAtom, singleProductModify, toggleAtom } from '../../../store/Layout/Layout'

import { isEqual } from 'lodash'
import { client } from '../../../api'
import { deleteIncomeProduct, getInComingList, incomingConfirm, postExcelSubmitProduct } from '../../../api/stock'
import { SwitchBtn, WhiteBlackBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { stockFields, StockIncomingFields } from '../../../constants/admin/StockIncoming'
import useMutationQuery from '../../../hooks/useMutationQuery'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import Upload from '../../../modal/Upload/Upload'
import useAlert from '../../../store/Alert/useAlert'
import { KilogramSum } from '../../../utils/KilogramSum'
import Table from '../../Table/Table'
import IncomingModify from './IncomingModify'
import IncomingSearchFields from './IncomingSearchFields'
import { onSizeChange } from '../../Operate/utils'

const Incoming = ({}) => {
	const { simpleConfirm, simpleAlert } = useAlert()

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

	const formatTableRowData = (inComingData) => {
		return add_element_field(inComingData, stockFields)
	}
	const [getRow, setGetRow] = useState('')
	// 데이터 가져오기
	const paramData = {
		pageNum: 1,
		pageSize: 50,
		orderStatus: '확정 전송',
		receiptStatusList: ['입고 대기', '입고 확정 취소'],
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
			await client.post(`/admin/store/receipt`, {})
			await refetch()
			simpleAlert('재고수신이 완료되었습니다.')
		} catch (error) {
			simpleAlert('재고 수신에 실패하였습니다.')
			console.log('재고수신 에러발생', error)
		}
	}

	/**
	 * @description 제품 삭제
	 */
	const { mutate: deleteIncome } = useMutationQuery('deleteIncomeProduct', deleteIncomeProduct, {
		onError: (error) => {
			simpleAlert(error.message)
		},
	})

	const handleDelete = () => {
		simpleConfirm('정말로 삭제하시겠습니까?', () => {
			deleteIncome(selectInComeNumber?.join(','), {
				onSuccess: () => {
					refetch()
				},
				onError() {
					simpleAlert('삭제에 실패하였습니다.')
				},
			})
		})
	}

	const [selectInComeNumber, setSelectInComeNumber] = useState([])

	useEffect(() => {
		if (checkBoxSelect?.length === 0) return
		setSelectInComeNumber(() => checkBoxSelect?.map((i) => i['제품 고유 번호']))
	}, [checkBoxSelect])

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

	/**
	 * @description 입고 확정 버튼
	 */
	const { mutate: incomeConfirm } = useMutationQuery('incomingConfirm', incomingConfirm, {
		onError: (error) => {
			simpleAlert(error.message)
		},
	})

	const handleConfirm = async () => {
		simpleConfirm('입고 확정으로 바꾸시겠습니까?', () => {
			incomeConfirm(selectInComeNumber?.join(','), {
				onSuccess: () => {
					refetch()
				},
			})
		})
	}

	// 엑셀 대량 등록
	const [singleModfiy, setSingleModify] = useAtom(singleProductModify)

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
							조회 목록 (선택 <span>{checkBoxSelect?.length > 0 ? checkBoxSelect?.length : '0'}</span> /{param.pageSize}
							개 )<Hidden />
						</div>
						<div style={{ display: 'flex', gap: '10px' }}>
							<PageDropdown handleDropdown={(e) => onSizeChange(e, setParam)} />
							<Excel getRow={getRow} />
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
			{singleModfiy && <IncomingModify title={'제품 수정'} />}
			{uploadModal && (
				<Upload
					isExcelUploadOnly={true}
					setModalSwitch={setUploadModal}
					title={'제품 대량 등록'}
					excelUploadAPI={postExcelSubmitProduct}
					refreshQueryKey={'getInComingList'}
				/>
			)}
		</>
	)
}

export default Incoming
