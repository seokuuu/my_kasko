/* eslint-disable no-unused-vars */
import { useMutation } from '@tanstack/react-query'
import { useAtom, useAtomValue } from 'jotai'
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import { getInventoryLedger } from '../../../../api/operate/inventory'
import { getDestinationFind, getSPartList, getStorageList } from '../../../../api/search'
import GlobalProductSearch from '../../../../components/GlobalProductSearch/GlobalProductSearch'
import Excel from '../../../../components/TableInner/Excel'
import Hidden from '../../../../components/TableInner/Hidden'
import PageDropdown from '../../../../components/TableInner/PageDropdown'
import { InventoryFieldsCols, InvertoryFields } from '../../../../constants/admin/Inventroy'
import useReactQuery from '../../../../hooks/useReactQuery'
import useTablePaginationPageChange from '../../../../hooks/useTablePaginationPageChange'
import { add_element_field } from '../../../../lib/tableHelpers'
import {
	FilterContianer,
	FilterHeader,
	TCSubContainer,
	TableContianer,
} from '../../../../modal/External/ExternalFilter'
import InventoryFind from '../../../../modal/Multi/InventoryFind'
import { getCustomerFind } from '../../../../service/admin/Auction'
import {
	invenCustomer,
	invenCustomerData,
	invenDestination,
	invenDestinationData,
	selectedRowsAtom,
	toggleAtom,
} from '../../../../store/Layout/Layout'
import { KilogramSum } from '../../../../utils/KilogramSum'
import Table from '../../../Table/Table'
import useGlobalSearch from '../../hook/useGlobalSearch'
import InventorySearchFields from './InventorySearchFields'

const Inventory = ({}) => {
	const checkStores = ['전체', '미 입고', '입고 대기', '입고 확정', '입고 확정 취소']
	const checkSales = ['전체', '판매재', '판매제외제']
	const checkShips = ['전체', '확정 전송', '확정 전송 대기']
	const checkTransits = ['전체', '출고 완료', '미출고']
	const checkShipments = ['전체', '출하 대기', '출하 완료', '출고 지시', '출고 완료', '운송 완료']

	//checkSales
	const [check1, setCheck1] = useState(Array.from({ length: checkSales.length }, () => false))
	const [check2, setCheck2] = useState(Array.from({ length: checkShips.length }, () => false))
	const [check3, setCheck3] = useState(Array.from({ length: checkStores.length }, () => false))
	const [check4, setCheck4] = useState(Array.from({ length: checkTransits.length }, () => false))
	const [check5, setCheck5] = useState(Array.from({ length: checkShipments.length }, () => false))

	// Date
	const [checkSalesStart, setCheckSalesStart] = useState('') // 경매일자 시작
	const [checkSalesEnd, setCheckSalesEnd] = useState('') // 경매일자 끝

	const [Start2, setStart2] = useState('') // 주문일자 시작
	const [End2, setEnd2] = useState('') // 주문일자 끝

	const [Start3, setStart3] = useState('') // 주문일자 시작
	const [End3, setEnd3] = useState('') // 주문일자 끝

	const [Start4, setStart4] = useState('') // 주문일자 시작
	const [End4, setEnd4] = useState('') // 주문일자 끝

	const [Start5, setStart5] = useState('') // 주문일자 시작
	const [End5, setEnd5] = useState('') // 주문일자 끝

	// 제품 번호
	const [productNumber, setProductNumber] = useState('')

	// 목적지 팝업 상태,객체
	const [destinationPopUp, setDestinationPopUp] = useAtom(invenDestination)
	const [destinationData, setDestinationData] = useAtom(invenDestinationData)
	// 고객사 팝업 상태,객체
	const [customerPopUp, setCustomerPopUp] = useAtom(invenCustomer)
	const [customerData, setCustomerData] = useAtom(invenCustomerData)

	//checkShips
	const [checkData1, setCheckData1] = useState(Array.from({ length: checkSales.length }, () => ''))
	const [checkData2, setCheckData2] = useState(Array.from({ length: checkShips.length }, () => ''))
	const [checkData3, setCheckData3] = useState(Array.from({ length: checkStores.length }, () => ''))
	const [checkData4, setCheckData4] = useState(Array.from({ length: checkTransits.length }, () => ''))
	const [checkData5, setCheckData5] = useState(Array.from({ length: checkShipments.length }, () => ''))

	// SELECT 데이터
	const [selected, setSelected] = useState({ storage: '', sPart: '' })
	// checkSelect
	const checkBoxSelect = useAtomValue(selectedRowsAtom)

	// 테이블 데이터
	const [getRow, setGetRow] = useState('')
	const tableField = useRef(InventoryFieldsCols)
	const getCol = tableField.current
	const checkedArray = useAtom(selectedRowsAtom)[0]

	const Param = {
		pageNum: 1, // 현재페이지
		pageSize: 50, // 총 데이터 갯수
		spart: '',
		storage: '',
		destinationCode: '',
		destinationName: '',
		customerCode: '',
		customerName: '',
		saleCategoryList: [], //판매구분
		orderStatusList: [], //주문상태구분
		shipmentStatusList: [], //출하상태구분
	}
	const [param, setParam] = useState(Param)
	// 인벤토리 테이블 리스트 데이터 불러오기
	const { data, isSuccess, refetch } = useReactQuery(param, 'getInventoryLedge', getInventoryLedger)
	// 창고
	const { data: storageList } = useReactQuery('', 'getStorageList', getStorageList)
	// 제품군
	const { data: spartList } = useReactQuery('', 'getSPartList', getSPartList)
	const { data: inventoryCustomer } = useReactQuery('', 'getCustomerFind', getCustomerFind)
	const { data: inventoryDestination } = useReactQuery('', 'getDestinationFind', getDestinationFind)
	const pagination = data?.data?.data?.pagination

	const { onPageChanage } = useTablePaginationPageChange(data, setParam)

	useEffect(() => {
		const getData = data?.data?.data?.list

		if (!isSuccess && !getData) return
		if (Array.isArray(getData)) {
			setGetRow(add_element_field(getData, InvertoryFields))
		}
	}, [isSuccess, data])

	useEffect(() => {
		// true에 해당되면, value를, false면 빈값을 반환
		const updatedCheck = checkSales.map((value, index) => {
			return check1[index] ? value : ''
		})
		// 빈값을 제외한 진짜배기 값이 filteredCheck에 담긴다.
		const filteredCheck = updatedCheck.filter((item) => item !== '')
		setCheckData1(filteredCheck)
	}, [check1])

	useEffect(() => {
		// true에 해당되면, value를, false면 빈값을 반환
		const updatedCheck = checkShips.map((value, index) => {
			return check2[index] ? value : ''
		})
		// 빈값을 제외한 진짜배기 값이 filteredCheck에 담긴다.
		const filteredCheck = updatedCheck.filter((item) => item !== '')
		setCheckData2(filteredCheck)
	}, [check2])

	useEffect(() => {
		// true에 해당되면, value를, false면 빈값을 반환
		const updatedCheck = checkStores.map((value, index) => {
			return check3[index] ? value : ''
		})
		// 빈값을 제외한 진짜배기 값이 filteredCheck에 담긴다.
		const filteredCheck = updatedCheck.filter((item) => item !== '')
		setCheckData3(filteredCheck)
	}, [check3])

	useEffect(() => {
		// true에 해당되면, value를, false면 빈값을 반환
		const updatedCheck = checkTransits.map((value, index) => {
			return check4[index] ? value : ''
		})
		// 빈값을 제외한 진짜배기 값이 filteredCheck에 담긴다.
		const filteredCheck = updatedCheck.filter((item) => item !== '')
		setCheckData4(filteredCheck)
	}, [check4])

	useEffect(() => {
		// true에 해당되면, value를, false면 빈값을 반환
		const updatedCheck = checkShipments.map((value, index) => {
			return check5[index] ? value : ''
		})
		// 빈값을 제외한 진짜배기 값이 filteredCheck에 담긴다.
		const filteredCheck = updatedCheck.filter((item) => item !== '')
		setCheckData5(filteredCheck)
	}, [check5])

	const [isRotated, setIsRotated] = useState(false)

	// Function to handle image click and toggle rotation
	const handleImageClick = () => {
		setIsRotated((prevIsRotated) => !prevIsRotated)
		// window.location.reload()
		setCheck1([])
		setCheck2([])
		setCheck3([])
		setCheck4([])
		setCheck5([])
		setCheckSalesStart('')
		setCheckSalesEnd('')
		setStart2('')
		setStart3('')
		setStart4('')
		setStart5('')
		setEnd2('')
		setEnd3('')
		setEnd4('')
		setEnd5('')
		setSelected((p) => ({ storage: null, sPart: null }))
		setDestinationData({ name: '', code: '' })
		setCustomerData({ name: '', code: '' })
		setProductNumber('')
	}

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

	const handleChangeProductNumber = (e) => {
		e.preventDefault()
		setProductNumber(e.target.value)
	}

	const mutation = useMutation((data) => getInventoryLedger(data), {
		onSuccess: () => {
			refetch()
		},
	})

	// 필터링 함수
	const handleFilter = () => {
		const Param = {
			pageNum: param.pageNum,
			pageSize: param.pageSize,
			spart: selected.sPart,
			storage: selected.storage,
			destinationCode: destinationData.code,
			destinationName: destinationData.name,
			customerCode: customerData.code,
			customerName: customerData.name,
			saleCategoryList: checkData1.join(','), //판매구분
			receiptStatusList: checkData3.join(','), //입고상태목록
			orderStatusList: checkData2.join(','), //주문상태구분
			shipmentStatusList: checkData5.join(','), //출하상태구분
			auctionStartDate: checkSalesStart ? moment(checkSalesStart).format('YYYY-MM-DD HH:mm:ss') : '',
			auctionEndDate: checkSalesEnd && moment(checkSalesEnd).format('YYYY-MM-DD HH:mm:ss'),
			orderStartDate: Start2 && moment(Start2).format('YYYY-MM-DD HH:mm:ss'),
			orderEndDate: End2 && moment(End2).format('YYYY-MM-DD HH:mm:ss'),
			shippingStartDate: Start3 ? moment(Start3).format('YYYY-MM-DD HH:mm:ss') : '',
			shippingEndDate: End3 ? moment(End3).format('YYYY-MM-DD HH:mm:ss') : '',
			shipmentRequestStartDate: Start4 ? moment(Start4).format('YYYY-MM-DD HH:mm:ss') : '',
			shipmentRequestEndDate: End5 ? moment(End4).format('YYYY-MM-DD HH:mm:ss') : '',
			shipmentStartDate: Start5 ? moment(Start5).format('YYYY-MM-DD HH:mm:ss') : '',
			shipmentEndDate: End5 ? moment(End5).format('YYYY-MM-DD HH:mm:ss') : '',
			productNumberList: productNumber,
		}

		setParam(Param)
		mutation.mutate(Param)
	}

	const { globalProductSearchOnClick, globalProductResetOnClick } = useGlobalSearch({ setSearch: setParam, refetch })

	useEffect(() => {
		refetch()
	}, [param.pageNum, param.pageSize])

	return (
		<FilterContianer>
			<FilterHeader>
				<div style={{ display: 'flex' }}>
					<h1>재고 수불 관리</h1>
				</div>
			</FilterHeader>
			{exFilterToggle && (
				<>
					<GlobalProductSearch
						param={param}
						isToggleSeparate={true}
						renderCustomSearchFields={(props) => <InventorySearchFields {...props} />}
						globalProductSearchOnClick={globalProductSearchOnClick}
						globalProductResetOnClick={globalProductResetOnClick}
					/>
				</>
			)}
			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{checkBoxSelect?.length > 0 ? checkBoxSelect?.length : '0'}</span> /{' '}
						{pagination?.listCount}개 )
						<Hidden />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown
							handleDropdown={(e) => setParam((prev) => ({ ...prev, pageNum: 1, pageSize: parseInt(e.target.value) }))}
						/>
						<Excel getRow={getRow} />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div style={{ padding: '8px 0' }}>
						선택 중량<span> {KilogramSum(checkBoxSelect)} </span>kg / 총 중량 {pagination?.totalWeight}kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>{/* <SwitchBtn>입고 확정</SwitchBtn> */}</div>
				</TCSubContainer>
				<div>
					<Table
						getCol={getCol}
						getRow={getRow}
						tablePagination={pagination}
						onPageChange={onPageChanage}
						setChoiceComponent={() => {}}
					/>
				</div>
			</TableContianer>
			{customerPopUp && <InventoryFind title={'고객사 찾기'} setSwitch={setCustomerPopUp} data={inventoryCustomer} />}
			{destinationPopUp && (
				<InventoryFind title={'목적지 찾기'} setSwitch={setDestinationPopUp} data={inventoryDestination} />
			)}
		</FilterContianer>
	)
}

export default Inventory
