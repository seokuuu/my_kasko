import moment from 'moment/moment'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProductListToRegisterClaimQuery } from '../../../../api/operate/claim'
import { BlackBtn, WhiteBtn } from '../../../../common/Button/Button'
import { ClaimProductListFieldCols, ClaimProductListFields } from '../../../../constants/admin/Claim'
import useGlobalProductSearchFieldData from '../../../../hooks/useGlobalProductSearchFieldData'
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

	// 검색 셀렉트 옵션 목록
	const { supplierList, makerList, stockStatusList, gradeList, preferThicknessList } = useGlobalProductSearchFieldData()

	// 목록 리스트
	const [row, setRow] = useState([])

	// 테이블에서 선택된 값,선택된 데이터 갯수
	const { selectedData, selectedCount } = useTableSelection()
	// 검색 필터 상태 초기값

	// 검색필터 상태값
	const [search, setSearch] = useState({
		pageNum: 1,
		pageSize: 50,
		storage: { label: '전체', value: '', address: null }, // 창고 구분
		supplier: supplierList[0], // 매입처
		spec: '', // 규격 약호
		spart: { label: '제품군', value: '' }, // 제품군
		maker: makerList[0], // 제조사
		stockStatus: stockStatusList[0], // 재고 상태
		grade: gradeList[0], // 등급
		preferThickness: preferThicknessList[0], // 정척 여부
		saleCategoryList: [], // 판매 구분
		saleType: [], // 판매 유형
		salePriceType: [], // 판매가 유형
		minThickness: 0, // 최소 두깨,
		maxThickness: 0, // 최대 두깨
		minWidth: 0, // 최소 폭
		maxWidth: 0, // 최대 폭
		minLength: 0, // 최소 길이
		maxLength: 0, // 최대 길이
		minFailCount: 0, // 유찰 횟수 범위 시작
		maxFailCount: 0, // 유찰 횟수 범위 종료
		productNumberList: [],
	})

	console.log('search :', search)
	// 목록 요청 PARAMETER
	const listRequestParams = {
		...search,
		storage: search.storage.value,
		supplier: search.supplier.value,
		spart: search.spart.value,
		maker: search.maker.value,
		stockStatus: search.stockStatus.value,
		grade: search.grade.value,
		preferThickness: search.preferThickness.value,
	}
	// 목록 API
	const { data, refetch } = useProductListToRegisterClaimQuery(listRequestParams)

	console.log('data :', data)

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
					setChoiceComponent={() => {}}
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
