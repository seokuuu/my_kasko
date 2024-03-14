import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { packageDetailModal, packageUidsAtom, selectedRowsAtom } from '../../../store/Layout/Layout'
import { useAtomValue } from 'jotai'
import {
	FilterContianer,
	FilterHeader,
	SubTitle,
	TableBottomWrap,
	TableContianer,
	TCSubContainer,
} from '../../../modal/External/ExternalFilter'
import { BlackBtn, WhiteBlackBtn, WhiteRedBtn } from '../../../common/Button/Button'
import useReactQuery from '../../../hooks/useReactQuery'
import useMutationQuery from '../../../hooks/useMutationQuery'
import { getPackageList, patchBeBestPackageRecommend, patchChangeBestPackageRecommend } from '../../../api/SellProduct'
import { packageDispatchFields } from '../../../constants/admin/SellPackage'
import { packageRecommendDispatchFieldsCols } from '../../../constants/admin/Remcommed'
import useAlert from '../../../store/Alert/useAlert'
import TableV2 from '../../Table/TableV2'
import TableV2HiddenSection from '../../Table/TableV2HiddenSection'
import useTableData from '../../../hooks/useTableData'
import useTableSelection from '../../../hooks/useTableSelection'
import PackageDetailModal from '../../../modal/Multi/PackageDetailModal'

const parameter = {
	pageNum: 1,
	pageSize: 50,
	saleType: '',
	bestStatus: '1',
}

const RecommendPack = () => {
	const { simpleConfirm, simpleAlert } = useAlert()

	const detailModal = useAtomValue(packageDetailModal)
	const checkBoxSelect = useAtomValue(selectedRowsAtom)
	const [selectUid, setSelectUid] = useState([])
	const uids = useAtomValue(packageUidsAtom)

	const [serverData, setServerData] = useState({ list: [], pagination: {} })

	const { data, isSuccess, isLoading } = useReactQuery(parameter, 'package-list', getPackageList)
	const packageList = data?.r
	const pagination = data?.pagination

	const { mutate } = useMutationQuery('patchPkgBest', patchChangeBestPackageRecommend)
	const { mutate: beTheRecommend } = useMutationQuery('patchPkgBeRecommend', patchBeBestPackageRecommend)

	const { tableRowData, totalWeightStr, totalCountStr } = useTableData({
		tableField: packageDispatchFields,
		serverData,
		best: { display: true },
	})

	// 선택 항목
	const { selectedWeightStr, selectedCountStr } = useTableSelection({
		weightKey: '중량',
	})

	const handleChangeBest = () => {
		mutate(
			{ uids: uids },
			{
				onSuccess: () => {
					simpleAlert('순서변경 완료되었습니다.')
					window.location.reload()
				},
				onError: () => {
					simpleAlert('순서변경 실패하였습니다.')
				},
			},
		)
	}
	const handleRemoveBest = () => {
		beTheRecommend(
			{ status: false, uids: selectUid },
			{
				onSuccess: () => {
					simpleAlert('해제완료되었습니다.')
					window.location.reload()
				},
				onError: () => {
					simpleAlert('순서변경 실패하였습니다.')
				},
			},
		)
	}

	useEffect(() => {
		if (checkBoxSelect) return setSelectUid(() => checkBoxSelect.map((i) => i['고유 번호']))
	}, [checkBoxSelect])

	useEffect(() => {
		if (!isSuccess && !packageList) return
		if (Array.isArray(packageList)) {
			const newServerData = { list: packageList, pagination: pagination }
			setServerData(newServerData)
		}
	}, [isSuccess, packageList])

	return (
		<FilterContianer>
			<FilterHeader>
				<div style={{ display: 'flex' }}>
					<h1>카스코 추천 제품 관리</h1>
					<SubTitle>
						<Link to={`/product/recommend`}>
							<h6>단일</h6>
						</Link>
						<h5>패키지</h5>
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
					getCol={packageRecommendDispatchFieldsCols}
					dragAndDrop={true}
				/>
				<TableBottomWrap>
					<BlackBtn
						width={15}
						height={40}
						onClick={() => {
							simpleConfirm('저장하시겠습니까?', handleChangeBest)
						}}
					>
						저장
					</BlackBtn>
				</TableBottomWrap>
			</TableContianer>
			{detailModal && <PackageDetailModal />}
		</FilterContianer>
	)
}

export default RecommendPack
