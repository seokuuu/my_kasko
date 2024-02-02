import React, { useCallback, useEffect, useState } from 'react'
import { BtnBound, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import Excel from '../../../components/TableInner/Excel'
import {
	AuctionRestrictionModal,
	btnCellUidAtom,
	selectedRowsAtom,
	toggleAtom,
	usermanageClientEdit,
} from '../../../store/Layout/Layout'
import { FilterContianer, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import ClientAuctionRestrictionModal from './ClientAuctionRestrictionModal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtom, useAtomValue } from 'jotai'
import { isArray, isEqual } from 'lodash'
import { deleteCustomer, getCustomer, postChangeAuction } from '../../../api/userManage'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { UserManageCustomerManageFields, UserManageCustomerManageFieldsCols } from '../../../constants/admin/UserManage'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import useAlert from '../../../store/Alert/useAlert'
import Table from '../../Table/Table'
import ClientPostModal from './ClientPostModal'
import ClientSearchFields from './ClientSearchFields'
import { GlobalFilterHeader } from '../../../components/Filter'

const paramData = {
	pageNum: 1,
	pageSize: 50,
}

const Client = ({ setChoiceComponent, setModal, postModal, setPostModal }) => {
	const { simpleAlert, redAlert } = useAlert()
	const queryClient = useQueryClient()
	const exFilterToggle = useAtomValue(toggleAtom)
	const [uidAtom, setUidAtom] = useAtom(btnCellUidAtom)
	const [editModal, setEditModal] = useAtom(usermanageClientEdit)
	const [selectedValue, setSelectedValue] = useState('') // 경매 제한 상태
	const checkedArray = useAtom(selectedRowsAtom)[0]

	const [param, setParam] = useState(paramData)
	// //Modal
	const [auctionModal, setAuctionModal] = useAtom(AuctionRestrictionModal)

	const [getRow, setGetRow] = useState([])
	const [tablePagination, setPagination] = useState([])

	const { isLoading, data, isSuccess, refetch } = useReactQuery(param, 'getClient', getCustomer)
	const responseData = data?.data?.list

	// 회원 삭제 API
	const mutation = useMutation(deleteCustomer, {
		onSuccess: () => {
			simpleAlert('삭제가 완료되었습니다')
			queryClient.invalidateQueries('getClient')
		},
		onError: () => {
			simpleAlert('수정 실패하였습니다.')
		},
	})

	// 경매 제한 상태 변경 API
	const mutationAuction = useMutation(postChangeAuction, {
		onSuccess: () => {
			setAuctionModal(false)
			simpleAlert('수정되었습니다.')
			queryClient.invalidateQueries('getClient')
			queryClient.refetchQueries('getClient')
		},
		onError: () => {
			simpleAlert('수정 실패하였습니다.')
		},
	})

	// 회원 제한 수정
	const handleRemoveBtn = useCallback(() => {
		if (!isArray(checkedArray) || checkedArray.length === 0) return simpleAlert('삭제할 항목을 선택해주세요.')

		redAlert('사용자를 삭제하면 해당 사용자의 \n 데이터가 삭제 됩니다. 삭제 하시겠습니까?', () => {
			const memberUids = checkedArray.map((item) => item['고객 구분'])
			mutation.mutate(memberUids)
		})
	}, [checkedArray])

	// 회원 제한 수정창 열기
	const openAuctionModal = () => {
		if (!checkedArray || checkedArray.length === 0) {
			return simpleAlert('고객을 선택해주세요')
		}
		const selected = checkedArray[0]
		setSelectedValue(selected['회원 제한 상태'])
		setAuctionModal(true)
	}

	// 회원 제안 수정
	const clientRestrict = async () => {
		if (!selectedValue) {
			return simpleAlert('선택해주세요 ')
		}
		let req = { uids: [], auctionStatus: '' }
		checkedArray?.forEach((item) => {
			req.uids.push(item['순번'])
			req.auctionStatus = selectedValue
		})

		await mutationAuction.mutate(req)
	}

	const handleTablePageSize = (event) => {
		setParam((prevParam) => ({
			...prevParam,
			pageSize: Number(event.target.value),
			pageNum: 1,
		}))
	}

	const onPageChange = (value) => {
		setParam((prevParam) => ({
			...prevParam,
			pageNum: Number(value),
		}))
	}

	const globalProductResetOnClick = () => {
		setParam(paramData)
	}

	const globalProductSearchOnClick = (userSearchParam) => {
		setParam((prevParam) => {
			if (isEqual(prevParam, { ...prevParam, ...userSearchParam })) {
				return prevParam
			}
			return {
				...prevParam,
				...userSearchParam,
				pageNum: 1,
			}
		})
	}

	useEffect(() => {
		if (!isSuccess && !responseData) return
		if (Array.isArray(responseData)) {
			setGetRow(add_element_field(responseData, UserManageCustomerManageFields))
			setPagination(data.data.pagination)
		}
	}, [isSuccess, responseData])

	useEffect(() => {
		refetch()
	}, [param])

	return (
		<>
			<FilterContianer>
				<GlobalFilterHeader title={'사용자 관리'} />
				{exFilterToggle && (
					<GlobalProductSearch
						param={param}
						isToggleSeparate={true}
						renderCustomSearchFields={(props) => <ClientSearchFields {...props} />}
						globalProductSearchOnClick={globalProductSearchOnClick}
						globalProductResetOnClick={globalProductResetOnClick}
					/>
				)}
				<TableContianer>
					<TCSubContainer bor>
						<div>
							고객 정보 목록 (선택 <span>{checkedArray?.length || 0}</span> /{getRow?.length || 0} 개)
							<Hidden />
						</div>
						<div style={{ display: 'flex', gap: '10px' }}>
							<PageDropdown handleDropdown={handleTablePageSize} />
							<Excel getRow={getRow} sheetName={'고객사 관리'} />
						</div>
					</TCSubContainer>
					<TCSubContainer>
						<div>
							선택 <span> {checkedArray?.length || 0} </span>(명)
							<span></span>
						</div>
						<div style={{ display: 'flex', gap: '10px' }}>
							<WhiteRedBtn onClick={openAuctionModal}>회원 제한</WhiteRedBtn>
							<BtnBound />
							<WhiteRedBtn onClick={handleRemoveBtn}>회원 삭제</WhiteRedBtn>
							<WhiteSkyBtn onClick={() => setPostModal(true)}>회원 생성</WhiteSkyBtn>
						</div>
					</TCSubContainer>
					<Table
						getRow={getRow}
						getCol={UserManageCustomerManageFieldsCols}
						loading={isLoading}
						tablePagination={tablePagination}
						onPageChange={onPageChange}
					/>
				</TableContianer>
			</FilterContianer>
			{auctionModal && (
				<ClientAuctionRestrictionModal
					selectedValue={selectedValue}
					setSelectedValue={setSelectedValue} //경매 제한 상태
					setAuctionModal={setAuctionModal}
					clientRestrict={clientRestrict}
				/>
			)}
			{editModal && <ClientPostModal setEditModal={setEditModal} id={uidAtom} />}
			{postModal && <ClientPostModal setEditModal={setPostModal} id={null} />}
		</>
	)
}

export default Client
