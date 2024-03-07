import { useAtom } from 'jotai'
import { useMemo, useRef, useState } from 'react'
import { BlackBtn } from '../../common/Button/Button'
import useGlobalProductSearchFieldData from '../../hooks/useGlobalProductSearchFieldData'
import {
	FilterFooter,
	FilterHeader,
	FilterSubcontianer,
	FilterWrap,
	ResetImg,
} from '../../modal/External/ExternalFilter'
import { globalProductSearchToggleAtom } from '../../store/Layout/GlobalProductSearch'
import HeaderToggle from '../Toggle/HeaderToggle'
import ProductSearchFields from './ProductSearchFields'

const GlobalProductSearch = ({
	// prettier-ignore
	globalProductResetOnClick,
	globalProductSearchOnClick,
	renderCustomSearchFields,
	isToggleSeparate = false,
}) => {
	const [toggle, setToggle] = useAtom(globalProductSearchToggleAtom)
	const [searchReset, setSearchReset] = useState(false)

	const {
		// prettier-ignore
		// supplierList,
		// makerList,
		stockStatusList,
		gradeList,
		preferThicknessList,
		spartList,
		storageList,
	} = useGlobalProductSearchFieldData()

	const initialSearchParams = useMemo(() => {
		return {
			// storage: { label: '전체', value: '' }, // 창고 구분
			storage: storageList[0], // 창고 구분
			keyword: '', // 검색어 (Search keyword)
			status: '', // 상태값 (Status)
			statusList: [], // 상태값 목록 (Status list)
			category: '', // 검색 카테고리 (Search category)
			type: '', // 메뉴 타입 (Menu type)
			startDate: '', // 시작 날짜 (Start date)
			endDate: '', // 종료 날짜 (End date)
			approvalStatus: '', // 승인 상태 (Approval status)
			approvalStatusList: [], // 승인 상태 목록 (Approval status list)
			number: '', // 제품 번호 (Product number)
			productNumberList: [], // 제품 번호 목록 (Product number list)
			packageNumber: '', // 패키지 번호 (Package number)
			packageNumberList: [], // 패키지 번호 목록 (Package number list)
			supplier: '', // 매입처
			spart: spartList[0], // 제품군
			spartUid: null, // 제품군 번호 (Product group UID)
			maker: '', // 제조사
			stockStatus: stockStatusList[0], // 재고 상태
			spec: '', // 규격 약호 (Specification abbreviation)
			grade: gradeList[0], // 등급
			preferThickness: preferThicknessList[0], // 정척 여부
			saleCategory: '', // 판매 구분 (Sale category)
			saleCategoryList: [], // 판매 구분 목록 (Sale category list)
			bestStatus: false, // 추천 상품 여부 (Best status)
			saleType: '', // 판매 유형 (Sale type)
			saleTypeList: [], // 판매 유형 목록 (Sale type list)
			salePriceType: '', // – (Sale price type)
			salePriceTypeList: [], // 판매가 유형 목록 (Sale price type list)
			customerName: '', // 고객사 명 (Customer name)
			minThickness: '', // 최소 두께 (Minimum thickness)
			maxThickness: '', // 최대 두께 (Maximum thickness)
			minWidth: '', // 최소 폭 (Minimum width)
			maxWidth: '', // 최대 폭 (Maximum width)
			minLength: '', // 최소 길이 (Minimum length)
			maxLength: '', // 최대 길이 (Maximum length)
			minFailCount: '', // 유찰 횟수 (Minimum fail count)
			maxFailCount: '', // 유찰 횟수 (Maximum fail count)
			proNo: '', // proNo
			receiptStatus: '', // 입고 상태 (Receipt status)
			receiptStatusList: [], // 입고 상태 목록 (Receipt status list)
			registrationStatus: '', // 경매 등록 상태 (Auction registration status)
			orderStatus: '', // 주문 상태 (Order status)
			orderStatusList: [], // 주문 상태 목록 (Order status list)
			customerCode: '', // 고객 코드 (Customer code)
			destinationCode: '', // 목적지 코드 (Destination code)
			destinationName: '', // 목적지명 (Destination name)
			customerDestinationUid: null, // 고객사 목적지 고유 번호 (Customer destination UID)
			auctionNumber: '', // 경매 번호 (Auction number)
			sendDate: '', // Send date
			biddingStatus: '', // 낙찰 상태 (Bidding status)
			driverName: '', // 기사명 (Driver name)
			carNumber: '', // 차량 번호 (Car number)
			memberUid: null, // 회원 고유 번호 (Member UID)
			startSendDate: '', // 시작 확정 전송일 (Start send date), 확정 전송 일자
			endSendDate: '', // 종료 확정 전송일 (End send date) , 확정 전송 일자
			claimStatus: '', // 클레임 진행 상태 (Claim status)
			timeOfDay: '', // 시간대 (Time of day)
			exceptSplitProduct: false, // 중량 판매 제품 제외 여부 (Exclude split product)
			productStatus: '', // 제품 상태 (Product status)
			packageStatus: false, // 패키지 상태여부 (Package status)
			shipmentStatus: '', // 출하 상태 (Shipment status)
			shipmentStatusList: [], // 출하 상태 목록 (Shipment status list)
			auctionStartDate: '', // 경매 시작 일자 (Auction start date)
			auctionEndDate: '', // 경매 종료 일자 (Auction end date)
			orderStartDate: '', // 주문 시작 일자 (Order start date)
			orderEndDate: '', // 주문 종료 일자 (Order end date)
			shippingStartDate: '', // 출하 시작 일자 (Shipping start date)
			shippingEndDate: '', // 출하 종료 일자 (Shipping end date)
			shipmentRequestStartDate: '', // 출고 요청 시작 일자 (Shipment request start date)
			shipmentRequestEndDate: '', // 출고 요청 종료 일자 (Shipment request end date)
			shipmentStartDate: '', // 출고 시작 일자 (Shipment start date)
			shipmentEndDate: '', // 출고 종료 일자 (Shipment end date)
			mergeStatus: false, // 합짐 여부 (Merge status)
			driverStatus: false, // 배차 입력 여부 (Driver status)
			dockStatus: false, // 상차도 여부 (Dock status)
			orderType: '', // 주문 타입 (Order type)
			orderNumber: '', // 주문 번호 (Order number)
			carType: '', // 차량종류
			receiptDate: '',
			createDate: '',
			updateDate: '',
			roles: [], // 사용자 구분 (창고 / 운송사 / 카스코철강 / 현대제철 / 고객사)
		}
	}, [storageList, spartList, stockStatusList, gradeList, preferThicknessList])

	const initialParamRef = useRef(initialSearchParams)
	const [userSearchParam, setUserSearchParam] = useState({ ...initialSearchParams })

	const getUpdatedProperties = () => {
		let updatedProperties = {}
		for (let key in userSearchParam) {
			if (
				typeof userSearchParam[key] === 'object' &&
				userSearchParam[key] !== null &&
				'value' in userSearchParam[key]
			) {
				// Handling complex objects like supplier with an inline check
				// if (userSearchParam[key].value !== initialParamRef.current[key].value) {
				// 	updatedProperties[key] = userSearchParam[key].value // Storing just the value as a string
				// }
				updatedProperties[key] = userSearchParam[key].value // Storing just the value as a string
			} else if (userSearchParam[key] !== initialParamRef.current[key]) {
				// Handling normal properties
				updatedProperties[key] = userSearchParam[key]
			}
		}

		return updatedProperties
	}

	const searchResetButtonOnClickHandler = () => {
		setSearchReset((searchReset) => !searchReset)
		setUserSearchParam({ ...initialParamRef.current })
		globalProductResetOnClick()
	}

	const searchButtonOnClickHandler = () => {
		globalProductSearchOnClick(getUpdatedProperties(userSearchParam))
	}

	const toggleBtnClick = () => {
		setToggle((currentState) => !currentState)
	}

	return (
		<div>
			{!isToggleSeparate && (
				<FilterHeader>
					<div></div>
					<HeaderToggle exFilterToggle={toggle} toggleBtnClick={toggleBtnClick} />
				</FilterHeader>
			)}
			{toggle && (
				<FilterWrap style={{ marginTop: '25px', marginBottom: '25px ' }}>
					<FilterSubcontianer modal style={{ height: '100%' }}>
						<ProductSearchFields
							// prettier-ignore
							search={userSearchParam}
							setSearch={setUserSearchParam}
							renderCustomSearchFields={renderCustomSearchFields}
						/>
					</FilterSubcontianer>
					<FilterFooter>
						<div style={{ display: 'flex' }}>
							<p>초기화</p>
							<ResetImg
								id="resetBtn"
								src="/img/reset.png"
								style={{ marginLeft: '10px', marginRight: '20px' }}
								onClick={searchResetButtonOnClickHandler}
								className={searchReset ? 'rotate' : ''}
							/>
						</div>
						<div style={{ width: '180px' }}>
							<BlackBtn type="button" width={100} height={40} onClick={searchButtonOnClickHandler}>
								검색
							</BlackBtn>
						</div>
					</FilterFooter>
				</FilterWrap>
			)}
		</div>
	)
}

export default GlobalProductSearch
