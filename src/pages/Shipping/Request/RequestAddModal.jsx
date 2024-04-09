import React, { useEffect, useState } from 'react'
import { BlackBtn } from '../../../common/Button/Button'
import { aucProAddModalAtom, selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'
import { FilterContianer, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { useAtom, useAtomValue } from 'jotai'
import {
	BlueBarBtnWrap,
	BlueBarHeader,
	BlueSubContainer,
	FadeOverlay,
	ModalContainer,
	WhiteCloseBtn,
} from '../../../modal/Common/Common.Styled'
import { useShipmentListQuery } from '../../../api/shipment'
import { useSetAtom } from 'jotai/index'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import { isEqual } from 'lodash'
import RequestAddModalSerarchFilter from './RequestAddModalSerarchFilter'
import useTableData from '../../../hooks/useTableData'
import { RegisterFields, RegisterFieldsCols } from '../fields/RegisterFields'
import useTableSelection from '../../../hooks/useTableSelection'
import { authAtom } from '../../../store/Auth/auth'
import TableV2HiddenSection from '../../Table/TableV2HiddenSection'
import TableV2 from '../../Table/TableV2'
import { calculateTotal } from './utils'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'

const initData = {
	pageNum: 1,
	pageSize: 10000,
	shipmentStatus: '출하 지시',
}

// 합짐 추가 등록 메인 컴포넌트
const RequestAddModal = ({ list, onListAdd }) => {
	const auth = useAtomValue(authAtom)
	const [exFilterToggle, setExFilterToggle] = useState(toggleAtom)
	const selectedRows = useAtomValue(selectedRowsAtom)
	const setAddModal = useSetAtom(aucProAddModalAtom)

	const [param, setParam] = useState(initData)
	const [serverData, setServerData] = useState({ list: [] })

	const { data, isLoading, refetch } = useShipmentListQuery(param)

	const { tableRowData } = useTableData({
		tableField: RegisterFields(auth),
		serverData,
	})

	// 선택 항목
	const { selectedWeightStr, selectedCountStr } = useTableSelection({
		weightKey: '중량',
	})

	// 제품 추가
	const onAdd = () => {
		if (!selectedRows || selectedRows.length === 0) {
			return
		}
		const key = '주문 고유 번호'
		const findKey = selectedRows.map((item) => item[key])
		const addData = serverData?.list?.filter((item) => findKey.includes(item.orderUid))

		onListAdd(addData)
	}

	const modalClose = () => setAddModal(false)

	const resetOnClick = () => setParam(initData)

	const searchOnClick = (userSearchParam) => {
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
		// 이미 추가된 데이터 중복 제거
		const newList = data?.list?.filter((obj) => !list?.some((item) => obj.orderUid === item.orderUid))
		if (newList && Array.isArray(newList)) {
			setServerData({ list: newList })
		}
	}, [data])

	useEffect(() => {
		refetch()
	}, [param])

	return (
		<>
			<FadeOverlay />
			<ModalContainer style={{ width: '1400px', height: '90vh' }}>
				<BlueBarHeader style={{ height: '60px' }}>
					<div>선별 추가 등록</div>
					<div>
						<WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
					</div>
				</BlueBarHeader>
				<BlueSubContainer style={{ padding: '0px 30px' }}>
					<FilterContianer style={{ paddingBottom: '0px' }}>
						<div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '24px 0' }}>
							<HeaderToggle
								exFilterToggle={exFilterToggle}
								toggleBtnClick={() => setExFilterToggle((prev) => !prev)}
								toggleMsg={exFilterToggle ? 'On' : 'Off'}
							/>
						</div>
						{exFilterToggle && (
							<GlobalProductSearch
								param={param}
								setParam={setParam}
								isToggleSeparate={true}
								globalProductSearchOnClick={searchOnClick}
								globalProductResetOnClick={resetOnClick}
								renderCustomSearchFields={(props) => <RequestAddModalSerarchFilter {...props} />}
							/>
						)}
						<TableContianer>
							<TCSubContainer bor>
								<div>
									조회 목록 (선택 <span>{selectedCountStr}</span> / {serverData.list?.length?.toLocaleString()}개 )
									{/*<TableV2HiddenSection />*/}
								</div>
							</TCSubContainer>
							<TCSubContainer>
								<div>
									선택중량 <span> {selectedWeightStr} </span> kg / 총 중량 {calculateTotal(serverData.list, 'weight')}{' '}
									kg
								</div>
							</TCSubContainer>
							<TableV2
								hei2={exFilterToggle ? 200 : 480}
								hei={100}
								getRow={tableRowData}
								loading={isLoading}
								getCol={RegisterFieldsCols(RegisterFields(auth))}
							/>
						</TableContianer>
					</FilterContianer>
				</BlueSubContainer>
				<BlueBarBtnWrap style={{ padding: '40px' }}>
					<BlackBtn fontSize={17} width={10} height={35} onClick={onAdd}>
						선택 추가
					</BlackBtn>
				</BlueBarBtnWrap>
			</ModalContainer>
		</>
	)
}

export default RequestAddModal
