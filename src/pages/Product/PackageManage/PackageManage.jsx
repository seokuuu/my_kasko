import { useEffect, useRef, useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import Excel from '../../../components/TableInner/Excel'
import { BtnBound, WhiteBlackBtn, WhiteRedBtn, WhiteSkyBtn, YellBtn } from '../../../common/Button/Button'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import {
	packageCreateAtom,
	packageDetailModal,
	packageModeAtom,
	popupAtom,
	selectedRowsAtom,
	toggleAtom,
} from '../../../store/Layout/Layout'
import { add_element_field } from '../../../lib/tableHelpers'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { FilterContianer, FilterHeader, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import Hidden from '../../../components/TableInner/Hidden'
import {
	deletePackage,
	getPackageList,
	patchBeBestPackageRecommend,
	patchPkgSaleCategory,
} from '../../../api/SellProduct'
import useReactQuery from '../../../hooks/useReactQuery'
import { packageDispatchFields, packageDispatchFieldsCols } from '../../../constants/admin/SellPackage'
import Table from '../../Table/Table'
import PackageManageFind from '../../../modal/Multi/PackageManage'
import PackageDetailModal from '../../../modal/Multi/PackageDetailModal.jsx'
import useMutationQuery from '../../../hooks/useMutationQuery.js'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch.jsx'
import PackageProductSearchFields from './PackageProductSearchFields.jsx'
import { isEqual } from 'lodash'
import Multi2 from '../../../modal/Common/Multi2.jsx'
import { changePkgSaleTypeAtom } from '../../../store/Layout/Popup.jsx'
import useAlert from '../../../store/Alert/useAlert.js'
import { KilogramSum } from '../../../utils/KilogramSum.js'
import useTableData from '../../../hooks/useTableData.js'

const PackageManage = () => {
	const [isCreate, setIsCreate] = useState(false)
	const [packBtn, setPackBtn] = useAtom(packageModeAtom)
	const [isModal, setIsModal] = useAtom(packageCreateAtom)

	// 패키지생성 모달창 띄우기
	const onClickPostHandler = () => {
		setPackBtn('post')
		setIsModal(true)
		setIsCreate(true)
	}

	const [detailModal, setDatilModal] = useAtom(packageDetailModal)
	const tableFields = useRef(packageDispatchFieldsCols)
	const getCol = tableFields.current
	const paramData = {
		pageNum: 1,
		pageSize: 50,
		saleType: '',
	}
	const { simpleAlert } = useAlert()
	const [param, setParam] = useState(paramData)
	const { data, isSuccess, refetch } = useReactQuery(param, 'package-list', getPackageList)
	const packageList = data?.r
	const pagination = data?.pagination

	const [getRow, setGetRow] = useState('')
	const [pages, setPages] = useState([])
	const [filteredData, setFilterData] = useState([])

	useEffect(() => {
		refetch()
	}, [])

	useEffect(() => {
		if (!isSuccess && !packageList) return
		if (Array.isArray(filteredData)) {
			setGetRow(add_element_field(packageList, packageDispatchFields))
			setPages(pagination)
		}
	}, [isSuccess, packageList])

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
	const onChangePage = (value) => {
		setParam((prev) => ({ ...prev, pageNum: Number(value) }))
	}
	const [selectProductNumber, setSelectProductNumber] = useState([])
	const [selectUids, setSelectUid] = useState([])
	const checkBoxSelect = useAtomValue(selectedRowsAtom)
	const { mutate: beRecommend } = useMutationQuery('beRecommend', patchBeBestPackageRecommend)
	const { mutate: deletePkg } = useMutationQuery('deletePkg', deletePackage)
	const { tableRowData, paginationData, totalWeightStr, totalCountStr, totalCount } = useTableData({
		tableField: packageDispatchFields,
		serverData: data,
		wish: { display: false },
		best: { display: true },
	})
	useEffect(() => {
		if (checkBoxSelect) {
			setSelectProductNumber(() => [...checkBoxSelect.map((i) => i['패키지 번호'])])
			setSelectUid(() => [...checkBoxSelect.map((i) => i['고유 번호'])])
		}
	}, [checkBoxSelect])

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
				simpleAlert('해제되었습니다.')
				window.location.reload()
			},
			onError: (e) => {
				simpleAlert(e?.data?.message ?? '해제 실패하였습니다.')
			},
		})
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
	const [isPopup, setIsPopup] = useState(false)
	const [popUp, setPopup] = useAtom(popupAtom)
	const [request, setRequest] = useAtom(changePkgSaleTypeAtom)
	const { mutate: changeCT } = useMutationQuery('change-Pkg-category', patchPkgSaleCategory)

	const handleOpenSaleType = () => {
		changeCT(request, {
			onSuccess: () => {
				simpleAlert('저장이 되었습니다.')
				window.location.reload()
			},
			onError: (e) => {
				simpleAlert(e?.data?.message)
			},
		})
	}

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
						조회 목록 (선택 <span>{checkBoxSelect?.length > 0 ? checkBoxSelect?.length : '0'}</span> /{' '}
						{pagination ? pagination?.listCount : pagination?.listCount}개 )
						<Hidden />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown
							handleDropdown={(e) => {
								setParam((p) => ({ ...p, pageNum: 1, pageSize: e.target.value }))
							}}
						/>
						<Excel getRow={getRow} sheetName="판매제품_패키지관리" />
					</div>
				</TCSubContainer>
				<TCSubContainer bor>
					<div>
						선택 중량<span> {KilogramSum(checkBoxSelect)} </span>kg / 총{' '}
						{pagination
							? pagination?.totalWeight.toLocaleString('ko-kr')
							: pagination?.totalWeight.toLocaleString('ko-kr')}{' '}
						중량 kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<YellBtn onClick={patchRecommend}>추천제품지정 ({pages?.bestCount} / 10)</YellBtn>
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
							{/* <Link to="/product/packagecreate" style={{ color: '#4C83D6' }}></Link> */}
						</WhiteSkyBtn>
					</div>
				</TCSubContainer>
				<Table
					getRow={getRow}
					getCol={getCol}
					tablePagination={pages}
					onPageChange={onChangePage}
					isRowClickable={true}
					setChoiceComponent={() => {
						// console.log('수정')
					}}
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
