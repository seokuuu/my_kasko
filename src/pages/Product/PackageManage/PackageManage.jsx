import React, { useEffect, useState } from 'react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import Excel from '../../../components/TableInner/Excel'
import { BtnBound, WhiteBlackBtn, WhiteRedBtn, WhiteSkyBtn, YellBtn } from '../../../common/Button/Button'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import {
	packageCreateAtom,
	packageDetailModal,
	packageModeAtom,
	selectedRowsAtom,
	toggleAtom,
} from '../../../store/Layout/Layout'
import { add_element_field } from '../../../lib/tableHelpers'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { FilterContianer, FilterHeader, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import {
	deletePackage,
	getPackageList,
	patchBeBestPackageRecommend,
	patchPkgSaleCategory,
} from '../../../api/SellProduct'
import useReactQuery from '../../../hooks/useReactQuery'
import { packageDispatchFields, packageDispatchFieldsCols } from '../../../constants/admin/SellPackage'
import PackageManageFind from '../../../modal/Multi/PackageManage'
import PackageDetailModal from '../../../modal/Multi/PackageDetailModal.jsx'
import useMutationQuery from '../../../hooks/useMutationQuery.js'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch.jsx'
import PackageProductSearchFields from './PackageProductSearchFields.jsx'
import { isEqual } from 'lodash'
import Multi2 from '../../../modal/Common/Multi2.jsx'
import { changePkgSaleTypeAtom } from '../../../store/Layout/Popup.jsx'
import useAlert from '../../../store/Alert/useAlert.js'
import useTableData from '../../../hooks/useTableData.js'
import useTableSelection from '../../../hooks/useTableSelection'
import TableV2HiddenSection from '../../Table/TableV2HiddenSection'
import TableV2 from '../../Table/TableV2'

const paramData = {
	pageNum: 1,
	pageSize: 50,
}

const PackageManage = () => {
	const { simpleAlert } = useAlert()
	const detailModal = useAtomValue(packageDetailModal)
	const setPackBtn = useSetAtom(packageModeAtom)
	const [isModal, setIsModal] = useAtom(packageCreateAtom)
	const checkBoxSelect = useAtomValue(selectedRowsAtom)
	const request = useAtomValue(changePkgSaleTypeAtom)

	const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)
	const [toggleMsg, setToggleMsg] = useState('On')
	const [isCreate, setIsCreate] = useState(false)
	const [selectUids, setSelectUid] = useState([])
	const [isPopup, setIsPopup] = useState(false)

	const [getRow, setGetRow] = useState('')
	const [filteredData, setFilterData] = useState([])

	const [param, setParam] = useState(paramData)
	const { data, isSuccess, isLoading, refetch } = useReactQuery(param, 'package-list', getPackageList)
	const packageList = data?.r
	const pagination = data?.pagination

	const { mutate: beRecommend } = useMutationQuery('beRecommend', patchBeBestPackageRecommend)
	const { mutate: deletePkg } = useMutationQuery('deletePkg', deletePackage)
	const { mutate: changeCT } = useMutationQuery('change-Pkg-category', patchPkgSaleCategory)

	const { tableRowData, paginationData, totalWeightStr, totalCountStr } = useTableData({
		tableField: packageDispatchFields,
		serverData: filteredData,
		wish: { display: false },
		best: { display: true },
	})

	// 선택 항목
	const { selectedWeightStr, selectedCountStr } = useTableSelection({
		weightKey: '중량',
	})

	const toggleBtnClick = () => {
		setExfilterToggle((prev) => !prev)
		if (exFilterToggle === true) {
			setToggleMsg('Off')
		} else {
			setToggleMsg('On')
		}
	}

	// 패키지생성 모달창 띄우기
	const onClickPostHandler = () => {
		setPackBtn('post')
		setIsModal(true)
		setIsCreate(true)
	}

	const patchRecommend = () => {
		if (selectUids?.length === 0) {
			simpleAlert('제품을 선택해주세요')
			return
		}
		beRecommend(
			{
				status: true,
				uids: selectUids,
			},
			{
				onSuccess: (data) => {
					if (data.status === 200) {
						simpleAlert('완료했습니다.', () => {
							window.location.reload()
						})
					}
					if (data.status === 400) {
						simpleAlert(data?.message)
					}
					setSelectUid([])
				},
			},
		)
	}
	const handleDeletePkg = () => {
		if (selectUids?.length === 0) {
			simpleAlert('제품을 선택해주세요')
			return
		}
		deletePkg(selectUids, {
			onSuccess: () => {
				simpleAlert('해제되었습니다.', () => {
					window.location.reload()
				})
			},
			onError: (e) => {
				simpleAlert(e?.data?.message ?? '해제 실패하였습니다.')
			},
		})
	}

	const handleOpenSaleType = () => {
		if (request?.uids?.length === 0) {
			simpleAlert('제품을 선택해주세요')
			return
		}
		changeCT(request, {
			onSuccess: () => {
				simpleAlert('저장이 되었습니다.', () => {
					window.location.reload()
				})
			},
			onError: (e) => {
				simpleAlert(e?.data?.message || '실파하였습니다.')
			},
		})
	}

	const globalProductResetOnClick = () => {
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

	const handleTablePageSize = (event) => {
		setParam((prevParam) => ({
			...prevParam,
			pageSize: Number(event.target.value),
			pageNum: 1,
		}))
	}

	const onChangePage = (value) => {
		setParam((prev) => ({ ...prev, pageNum: Number(value) }))
	}

	useEffect(() => {
		if (checkBoxSelect) {
			setSelectUid(() => [...checkBoxSelect.map((i) => i['고유 번호'])])
		}
	}, [checkBoxSelect])

	useEffect(() => {
		const newFilterData = { list: packageList, pagination: pagination }
		if (isSuccess && Array.isArray(newFilterData?.list)) {
			setGetRow(add_element_field(newFilterData?.list, packageDispatchFields))
			setFilterData(newFilterData)
		}
	}, [isSuccess, data])

	useEffect(() => {
		refetch()
	}, [param])

	return (
		<FilterContianer>
			<FilterHeader>
				<h1>패키지 관리</h1>
				{/* 토글 쓰기 */}
				<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
			</FilterHeader>
			{exFilterToggle && (
				<GlobalProductSearch
					param={param}
					isToggleSeparate={true}
					renderCustomSearchFields={(props) => <PackageProductSearchFields {...props} />}
					globalProductSearchOnClick={globalProductSearchOnClick}
					globalProductResetOnClick={globalProductResetOnClick}
				/>
			)}
			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{selectedCountStr}</span> / {totalCountStr}개 )
						<TableV2HiddenSection />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />
						<Excel getRow={getRow} sheetName="판매제품_패키지관리" />
					</div>
				</TCSubContainer>
				<TCSubContainer bor>
					<div>
						선택중량 <span> {selectedWeightStr} </span> kg / 총 중량 {totalWeightStr} kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<YellBtn onClick={patchRecommend}>추천제품지정 ({pagination?.bestCount} / 10)</YellBtn>
						<BtnBound />
						<WhiteBlackBtn
							onClick={() => {
								setIsPopup(true)
							}}
						>
							판매 구분 변경
						</WhiteBlackBtn>
						<BtnBound />
						<WhiteRedBtn onClick={handleDeletePkg}>패키지 해제</WhiteRedBtn>

						<WhiteSkyBtn onClick={onClickPostHandler}>
							<p style={{ color: '#4C83D6' }}>패키지 생성</p>
						</WhiteSkyBtn>
					</div>
				</TCSubContainer>
				<TableV2
					getRow={tableRowData}
					loading={isLoading}
					getCol={packageDispatchFieldsCols}
					tablePagination={paginationData}
					onPageChange={onChangePage}
					isRowClickable={true}
				/>
			</TableContianer>
			{isModal && <PackageManageFind isCreate={isCreate} url={'/product/packagecreate'} />}
			{detailModal && <PackageDetailModal />}
			{isPopup && (
				<Multi2
					closeFn={(e, text) => {
						const { tagName } = e.target
						if (tagName === 'IMG') {
							setIsPopup(false)
						}
					}}
					// errMsg={errorMsg}
					saveFn={handleOpenSaleType}
					productNumbers={selectUids}
					length={3}
					isPkg={true}
				/>
			)}
		</FilterContianer>
	)
}

export default PackageManage
