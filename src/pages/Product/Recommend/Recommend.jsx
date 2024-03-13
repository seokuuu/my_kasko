import React, { useEffect, useState } from 'react'
import { packageUidsAtom, selectedRowsAtom } from '../../../store/Layout/Layout'
import {
	FilterContianer,
	FilterHeader,
	SubTitle,
	TableBottomWrap,
	TableContianer,
	TCSubContainer,
} from '../../../modal/External/ExternalFilter'
import { BlackBtn, WhiteBlackBtn, WhiteRedBtn } from '../../../common/Button/Button'
import { Link } from 'react-router-dom'
import { getSingleProducts, patchBeBestRecommend, patchChangeBestRecommend } from '../../../api/SellProduct'
import useReactQuery from '../../../hooks/useReactQuery'
import { useAtomValue } from 'jotai'
import useMutationQuery from '../../../hooks/useMutationQuery'
import { singleRecommendDispatchFieldsCols } from '../../../constants/admin/Remcommed'
import useAlert from '../../../store/Alert/useAlert'
import useTableData from '../../../hooks/useTableData'
import useTableSelection from '../../../hooks/useTableSelection'
import TableV2 from '../../Table/TableV2'
import TableV2HiddenSection from '../../Table/TableV2HiddenSection'
import { singleDispatchFields } from '../../../constants/admin/Single'

const requestParameter = {
	pageNum: 1,
	pageSize: 10,
	type: '단일',
	category: '전체',
	bestStatus: '1',
}

const Recommend = ({}) => {
	const { simpleConfirm, simpleAlert } = useAlert()

	const [serverData, setServerData] = useState({ list: [], pagination: {} })

	const { data, isSuccess, isLoading } = useReactQuery(requestParameter, 'product-list', getSingleProducts)
	const singleData = data?.r
	const pagination = data?.pagination

	const uids = useAtomValue(packageUidsAtom)
	const [selectUid, setSelectUid] = useState([])
	const checkBoxSelect = useAtomValue(selectedRowsAtom)

	const { mutate } = useMutationQuery('patchBest', patchChangeBestRecommend)
	const { mutate: beTheRecommend } = useMutationQuery('patchBeRecommend', patchBeBestRecommend)

	const { tableRowData, totalWeightStr, totalCountStr } = useTableData({
		tableField: singleDispatchFields,
		serverData,
		best: { display: true },
	})

	// 선택 항목
	const { selectedWeightStr, selectedCountStr } = useTableSelection({
		weightKey: '중량',
	})

	const handleChangeBest = () => {
		mutate(
			{ numbers: uids },
			{
				onSuccess: () => {
					simpleAlert('순서변경이 완료되었습니다.', () => {
						window.location.reload()
					})
				},
				onError: (e) => {
					simpleAlert(`${e?.data.message}`, () => {
						window.location.reload()
					})
				},
			},
		)
	}
	const handleRemoveBest = () => {
		beTheRecommend(
			{ status: false, numbers: selectUid },
			{
				onSuccess: () => {
					simpleAlert('해제하였습니다.', () => {
						window.location.reload()
					})
				},
			},
		)
	}

	useEffect(() => {
		if (!isSuccess && !singleData) return
		if (Array.isArray(singleData)) {
			const newServerData = { list: singleData, pagination: pagination }
			setServerData(newServerData)
		}
	}, [isSuccess, singleData])

	useEffect(() => {
		if (checkBoxSelect) return setSelectUid(() => checkBoxSelect.map((i) => i['제품 번호']))
	}, [checkBoxSelect])

	return (
		<FilterContianer>
			<FilterHeader>
				<div style={{ display: 'flex' }}>
					<h1>카스코 추천 제품 관리</h1>
					<SubTitle>
						<h5>단일</h5>
						<Link to={`/product/recommendpkg`}>
							<h6>패키지</h6>
						</Link>
					</SubTitle>
				</div>
			</FilterHeader>

			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{selectedCountStr}</span> / {totalCountStr}개 )
						<TableV2HiddenSection />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}></div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택중량 <span> {selectedWeightStr} </span> kg / 총 중량 {totalWeightStr} kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteBlackBtn>
							<img src="/img/belly.png" alt={'order_change_icon'} /> 순서 변경
						</WhiteBlackBtn>
						<WhiteRedBtn onClick={handleRemoveBest}>추천 상품 해제</WhiteRedBtn>
					</div>
				</TCSubContainer>

				<TableV2
					getRow={tableRowData}
					loading={isLoading}
					getCol={singleRecommendDispatchFieldsCols}
					dragAndDrop={true}
				/>

				<TableBottomWrap>
					<BlackBtn
						width={15}
						height={40}
						onClick={() => {
							simpleConfirm('저장하시겠습니까', () => {
								handleChangeBest()
							})
						}}
					>
						저장
					</BlackBtn>
				</TableBottomWrap>
			</TableContianer>
		</FilterContianer>
	)
}

export default Recommend
