import moment from 'moment/moment'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProductListToRegisterClaimQuery } from '../../../../api/operate/claim'
import { BlackBtn, WhiteBtn } from '../../../../common/Button/Button'
import { ClaimProductListFieldCols, ClaimProductListFields } from '../../../../constants/admin/Claim'
import useTablePaginationPageChange from '../../../../hooks/useTablePaginationPageChange'
import useTableSelection from '../../../../hooks/useTableSelection'
import { add_element_field } from '../../../../lib/tableHelpers'
import { FilterContianer, TableContianer } from '../../../../modal/External/ExternalFilter'
import Table from '../../../Table/Table'
import CommonTableHeader from '../../UI/CommonTableHeader'
import ClaimProductHeader from './components/ClaimProductHeader'
import { StyledBtnContainer } from './styles/StyledClaim'

const ClaimProduct = () => {
	const navigate = useNavigate()

	// 목록 리스트
	const [row, setRow] = useState([])

	// 테이블에서 선택된 값,선택된 데이터 갯수
	const { selectedData, selectedCount } = useTableSelection()
	// 검색 필터 상태 초기값

	// 검색필터 상태값
	const [search, setSearch] = useState({
		pageNum: 1,
		pageSize: 50,
	})

	// 목록 API
	const { data, refetch } = useProductListToRegisterClaimQuery(search)

	/**
	 * @constant
	 * @description
	 * 테이블 목록 데이터입니다.
	 * 날짜 포멧과 순번 데이터 생성을 위해 기존 데이터를 원하는 방식으로 맵핑합니다.
	 */
	const mappingData = useMemo(
		() =>
			data
				? data.list.map((d, index) => ({
						...d,
						createDate: d.createDate ? moment(d.createDate).format('YYYY-MM-DD') : '-',
						updateDate: d.updateDate ? moment(d.updateDate).format('YYYY-MM-DD') : '-',
						totalOrderProductPrice: Number(d.orderPrice) + Number(d.orderPriceVat), // 제품 금액
						totalFreightCost: Number(d.freightCost) + Number(d.freightCostVat), // 운반비금액
						totalSupplyCost: Number(d.orderPrice) + Number(d.freightCost), // 총 공급가
						totalVatCost: Number(d.orderPriceVat) + Number(d.freightCostVat), // 총 부가세
						totalCost: Number(d.orderPrice) + Number(d.freightCostVat), // 합계 금액
						id: data.list.length - (index + (search.pageNum - 1) * search.pageSize), // 순번 내림차순
						uid: d.uid,
				  }))
				: [],
		[data],
	)

	function claimRegister() {
		if (!selectedData || selectedData.length === 0) return alert('등록할 제품을 선택해주세요.')

		navigate('/operate/common/product/register')
	}

	useEffect(() => {
		if (mappingData) {
			setRow(add_element_field(mappingData, ClaimProductListFields))
		}
	}, [mappingData])

	// 제품을 2개이상 선택할 시, 새로고침
	useEffect(() => {
		if (selectedCount > 1) {
			alert('제품은 1개만 선택 가능합니다.')
			window.location.reload()
		}
	}, [selectedCount])

	const { pagination, onPageChanage } = useTablePaginationPageChange(data, setSearch)
	return (
		<FilterContianer>
			{/* 카테고리탭 & 검색필터 on & 검색 */}
			<ClaimProductHeader search={search} setSearch={setSearch} refetch={refetch} />

			{/* 테이블 */}
			<TableContianer>
				<CommonTableHeader
					isNoneBtn={true}
					totalLength={data && data.list.length}
					selectedLength={selectedCount}
					setState={setSearch}
				/>
				<Table
					getCol={ClaimProductListFieldCols}
					getRow={row}
 					tablePagination={pagination}
					onPageChange={onPageChanage}
				/>
				{/* 버튼 */}
				<StyledBtnContainer>
					<WhiteBtn width={10} height={40} onClick={() => navigate('/operate/common')}>
						돌아가기
					</WhiteBtn>
					<BlackBtn width={10} height={40} onClick={claimRegister}>
						제품 등록
					</BlackBtn>
				</StyledBtnContainer>
			</TableContianer>
		</FilterContianer>
	)
}

export default ClaimProduct
