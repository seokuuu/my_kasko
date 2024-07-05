import React, { useMemo, useState } from 'react'
import { FilterHeader, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import { WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { useShipmentMergeMutation } from '../../../api/shipment'
import MergeHeader from './MergeHeader'
import { calculateTotal } from './utils'
import useAlert from '../../../store/Alert/useAlert'
import { useLoading } from '../../../store/Loading/loadingAtom'
import { RegisterFields, RegisterFieldsCols } from '../fields/RegisterFields'
import TableV2 from '../../Table/TableV2'
import { useAtomValue } from 'jotai/index'
import { authAtom } from '../../../store/Auth/auth'
import { selectedRowsAtom3 } from '../../../store/Layout/Layout'
import { numberDeleteComma } from '../../../utils/utils'

function getSumFromObjList(numKey, list) {
	const sums = list.reduce((sum, item) => {
		const num = numberDeleteComma(item[numKey]) || 0
		return num ? sum + Number(num) : sum
	}, 0)
	return sums
}

const RequestSelector = ({ list, destinations, removeSelector }) => {
	const auth = useAtomValue(authAtom)
	const { simpleAlert, simpleConfirm } = useAlert()
	const [dockStatus, setDockStatus] = useState(false) // 상차도 여부
	const [mergeCost, setMergeCost] = useState(0) // 합짐비

	const selectedData = useAtomValue(selectedRowsAtom3)
	// 선택 항목 총 개수
	const selected2Count = useMemo(() => selectedData?.length || 0, [selectedData])
	// 선택 항목 총 중량
	const selected2Weight = useMemo(
		() => (!selectedData || '중량' === undefined ? 0 : getSumFromObjList('중량', selectedData || [])),
		[selectedData],
	)

	const { mutate: onCreateMerge, isLoading } = useShipmentMergeMutation()

	// 선별 등록
	const onRegister = () => {
		const orderUids = list?.map((item) => item['주문 고유 번호'])
		if (orderUids.length === 0) {
			return simpleAlert('선별 목록에 제품을 추가해주세요.')
		}
		simpleConfirm(`${auth.role === '카스코철강' ? '선별 등록 하시겠습니까?' : '출하 지시하시겠습니까?'}`, () => {
			onCreateMerge({ dockStatus, orderUids })
		})
	}

	useLoading(isLoading)

	return (
		<>
			<FilterHeader style={{ marginTop: '30px' }}>
				<h1>선별 등록</h1>
			</FilterHeader>
			<MergeHeader
				list={list}
				destinations={destinations}
				mergeCost={mergeCost}
				setMergeCost={setMergeCost}
				dockStatus={dockStatus}
				setDockStatus={setDockStatus}
			/>
			<TableContianer>
				<TCSubContainer bor>
					<div>
						선택목록 (선택 <span>{selected2Count?.toLocaleString()}</span> / {list?.length?.toLocaleString()}개 )
					</div>
					<div style={{ display: 'flex', gap: '10px' }}></div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택중량 <span> {selected2Weight?.toLocaleString()} </span> kg / 총 중량 {calculateTotal(list, '중량')} kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteRedBtn onClick={removeSelector}>목록 제거</WhiteRedBtn>
						<WhiteSkyBtn onClick={onRegister}>{auth?.role === '카스코철강' ? '선별 등록' : '출하 지시'}</WhiteSkyBtn>
					</div>
				</TCSubContainer>

				<TableV2 getRow={list} getCol={RegisterFieldsCols(RegisterFields(auth))} isMultiple={true} />
			</TableContianer>
		</>
	)
}

export default RequestSelector
