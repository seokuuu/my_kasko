import { useState, useEffect, useRef } from 'react'
import { useAtom, useAtomValue } from 'jotai'

import Excel from '../../../components/TableInner/Excel'

import { BlackBtn, BtnWrap, YellBtn, BtnBound, WhiteRedBtn } from '../../../common/Button/Button'

import { WhiteBlackBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import {
	packageCreateAtom,
	packageModeAtom,
	toggleAtom,
	packageDetailModal,
	selectedRowsAtom,
} from '../../../store/Layout/Layout'
import { add_element_field } from '../../../lib/tableHelpers'
import PageDropdown from '../../../components/TableInner/PageDropdown'

import { FilterContianer, FilterHeader, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import Hidden from '../../../components/TableInner/Hidden'
import { deletePackage, getPackageList, patchBeBestPackageRecommend } from '../../../api/SellProduct'
import useReactQuery from '../../../hooks/useReactQuery'
import { packageDispatchFields, packageDispatchFieldsCols } from '../../../constants/admin/SellPackage'
import Table from '../../Table/Table'
import PackageManageFind from '../../../modal/Multi/PackageManage'
import PackageDetailModal from '../../../modal/Multi/PackageDetailModal.jsx'
import useMutationQuery from '../../../hooks/useMutationQuery.js'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch.jsx'
import PackageProductSearchFields from './PackageProductSearchFields.jsx'
import { isEqual } from 'lodash'

const PackageManage = ({}) => {
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
	const [selectUids, setSelectUid] = useState([])
	const checkBoxSelect = useAtomValue(selectedRowsAtom)
	const { mutate: beRecommend } = useMutationQuery('beRecommend', patchBeBestPackageRecommend)
	const { mutate: deletePkg } = useMutationQuery('deletePkg', deletePackage)

	useEffect(() => {
		if (checkBoxSelect) return setSelectUid(() => [...checkBoxSelect.map((i) => i['고유 번호'])])
	}, [checkBoxSelect])

	const patchRecommend = () => {
		beRecommend(
			{
				status: true,
				uids: selectUids,
			},
			{
				onSuccess: () => {
					alert('추가 완료했습니다.')
					setSelectUid([])
				},
				onError: (e) => {
					console.log(e)
					alert(e.data?.message)
				},
			},
		)
	}
	const handleDeletePkg = () => {
		console.log(selectUids)
		deletePkg(selectUids)
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
						조회 목록 (선택 <span>2</span> / 50개 )
						<Hidden />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown
							handleDropdown={(e) => {
								setParam((p) => ({ ...p, pageNum: 1, pageSize: e.target.value }))
							}}
						/>
						<Excel />
					</div>
				</TCSubContainer>
				<TCSubContainer bor>
					<div>
						선택 중량<span> 2 </span>kg / 총 중량 kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<YellBtn onClick={patchRecommend}>추천제품지정 ({pages?.bestCount} / 10)</YellBtn>
						<BtnBound />
						<WhiteBlackBtn>판매 구분 변경</WhiteBlackBtn>
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
		</FilterContianer>
	)
}

export default PackageManage
