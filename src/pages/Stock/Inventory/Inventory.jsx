import React, { useEffect, useMemo, useRef, useState } from 'react'
import { WhiteBlackBtn, WhiteRedBtn } from '../../../common/Button/Button'

import Excel from '../../../components/TableInner/Excel'

import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import Table from '../../../pages/Table/Table'
import { StockMultiModal, selectedRowsAtom, toggleAtom, weightAtom } from '../../../store/Layout/Layout'

import { useAtom, useAtomValue } from 'jotai'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'

import { FilterContianer, FilterHeader, TCSubContainer, TableContianer } from '../../../modal/External/ExternalFilter'
import { modalAtom } from '../../../store/Layout/Layout'

import { isArray } from 'lodash'
import { getInventoryStocks, patchStockCategory, postCancelInStock } from '../../../api/stocks/Inventory'
import { StockInventoryFieldCols, StockInventoryFields } from '../../../constants/admin/StockInventory'
import useMutationQuery from '../../../hooks/useMutationQuery'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import Multi2 from '../../../modal/Common/Multi2'
import { changeCategoryAtom } from '../../../store/Layout/Popup'

import { isEqual } from 'lodash'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import useTablePaginationPageChange from '../../../hooks/useTablePaginationPageChange'
import WeightSales from '../../../modal/Multi/WeightSales'
import useAlert from '../../../store/Alert/useAlert'
import { KilogramSum } from '../../../utils/KilogramSum'
import { onSizeChange } from '../../Operate/utils'
import InventorySearchFields from './InventorySearchFields'
import TableV2HiddenSection from '../../Table/TableV2HiddenSection'

const Inventory = ({}) => {
	const paramData = { pageNum: 1, pageSize: 50, reciptStatus: '입고 확정' }
	const [param, setParam] = useState(paramData)
	const checkBoxSelect = useAtomValue(selectedRowsAtom)
	const {
		data: TableData,
		isLoading,
		isSuccess,
		refetch,
	} = useReactQuery(param, 'getInventroyStock', getInventoryStocks)
	const { mutate, isError } = useMutationQuery('change-category2', patchStockCategory)
	// const { tableRowData, paginationData, totalWeight } = useTableData(data, StockInventoryFields)
	const table = useRef(StockInventoryFieldCols)
	const getCol = table.current
	const page = TableData?.data?.pagination
	const [pagenations, setPaginations] = useState([])
	const [weight, setWeight] = useAtom(weightAtom)
	const [isMulti, setIsMulti] = useAtom(StockMultiModal)
	// const [selectObj, setSelectObj] = useAtom(weightObj)
	const [selectProductNumber, setSelectProductNumber] = useState([])

	const tableRowData = useMemo(() => {
		if (!TableData || !TableData?.data?.list) {
			return []
		}
		const rowData = TableData?.data?.list
		const displayData = add_element_field(rowData, StockInventoryFields)
		setPaginations(page)
		return displayData
	}, [isSuccess, TableData])

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
	const [parameter, setParameter] = useAtom(changeCategoryAtom)
	// const [nowPopup, setNowPopup] = useAtom(popupObject)
	const [modalSwitch, setModalSwitch] = useAtom(modalAtom)
	const [errorMsg, setErrorMsg] = useState('')
	const openModal = () => {
		setModalSwitch(true)
	}
	const { simpleAlert, simpleConfirm, showAlert } = useAlert()
	const changeSaleCategory = () => {
		const res = mutate(parameter, {
			onSuccess: (d) => {
				if (d?.data.status === 200) {
					showAlert({
						title: '저장되었습니다.',
						func: () => {
							setIsMulti(false)
							window.location.reload()
						},
					})
				}
				if (d.data.status === 400) {
					showAlert({
						title: `${d.data.message}`,
						func: () => {
							setIsMulti(false)
							// window.location.reload()
						},
					})
				}
			},
			onError: (e) => {
				setErrorMsg(e.data.message)
				if (e.data.status === 400) {
					showAlert({
						title: errorMsg,
						func: () => {
							setIsMulti(false)
							// window.location.reload()
						},
					})
				}
			},
		})

		return res
	}
	const globalProductResetOnClick = () => {
		// if resetting the search field shouldn't rerender table
		// then we need to create paramData object to reset the search fields.
		setParam(paramData)
	}

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
	const { mutate: cancelInStock } = useMutationQuery('cancelInStock', postCancelInStock)
	const handleCancelInStock = () => {
		const dataUid = checkBoxSelect?.map((item) => item['제품 고유 번호'])
		console.log(dataUid)
		cancelInStock(dataUid, {
			onSuccess: () => {
				showAlert({
					title: '삭제에 성공했습니다.',
					func: () => {
						window.location.reload()
					},
				})
			},
		})
	}

	useEffect(() => {
		if (checkBoxSelect) return setSelectProductNumber((p) => [...checkBoxSelect.map((i) => i['제품 번호'])])
	}, [checkBoxSelect])
	const { pagination: customPagination, onPageChanage } = useTablePaginationPageChange(TableData, setParam)
	return (
		<FilterContianer>
			<FilterHeader>
				<h1>재고 관리</h1>
				{/* 토글 쓰기 */}
				<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
			</FilterHeader>
			{exFilterToggle && (
				<>
					<GlobalProductSearch
						// prettier-ignore
						param={param}
						isToggleSeparate={true}
						renderCustomSearchFields={(props) => <InventorySearchFields {...props} />}
						globalProductSearchOnClick={globalProductSearchOnClick}
						globalProductResetOnClick={globalProductResetOnClick}
					/>
				</>
			)}
			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{checkBoxSelect?.length > 0 ? checkBoxSelect?.length : '0'}</span> /{' '}
						{pagenations ? pagenations?.listCount : TableData?.listCount}개 )
						<TableV2HiddenSection />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={(e) => onSizeChange(e, setParam)} />
						<Excel getRow={TableData} />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택 중량<span> {KilogramSum(checkBoxSelect)} </span>kg / 총 {pagenations?.totalWeight} kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteBlackBtn
							onClick={() => {
								if (!isArray(checkBoxSelect)) return
								if (checkBoxSelect.length === 0) {
									alert('제품을 선택해주세요')
								} else {
									openModal()
								}
							}}
						>
							판매 구분 변경
						</WhiteBlackBtn>
						<WhiteRedBtn onClick={handleCancelInStock}>입고 확정 취소</WhiteRedBtn>
					</div>
				</TCSubContainer>
				<Table getRow={tableRowData} getCol={getCol} tablePagination={page} onPageChange={onPageChanage} />
			</TableContianer>

			{modalSwitch && (
				<Multi2
					closeFn={(e, text) => {
						const { tagName } = e.target
						if (tagName === 'IMG') {
							setModalSwitch(false)
						}
					}}
					length={2}
					setModalSwitch={setModalSwitch}
					errMsg={errorMsg}
					saveFn={changeSaleCategory}
					productNumbers={selectProductNumber}
					isPkg={false}
				/>
			)}

			{weight && <WeightSales />}
		</FilterContianer>
	)
}

export default Inventory
