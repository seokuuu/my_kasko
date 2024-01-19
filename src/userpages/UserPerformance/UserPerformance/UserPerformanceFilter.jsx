import {
	FilterSubcontianer,
	ExInputsWrap,
	FilterRight,
	FilterLeft,
	Input,
	MiniInput,
	PWRight,
	PartWrap,
	RowWrap,
	Tilde,
} from '../../../modal/External/ExternalFilter'
import { CustomerSearch, DateSearchSelect, ProductNumberListSearch } from '../../../components/Search'
import React from 'react'
import { GreyBtn } from '../../../common/Button/Button'
import { useAtom } from 'jotai/index'
import { claimProductModalAtom } from '../../../store/Layout/Layout'
import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import { MainSelect } from '../../../common/Option/Main'
import StandardFind from '../../../modal/Multi/StandardFind'

const UserPerformanceFilter = ({ param, onChange }) => {
	const [isModal, setIsModal] = useAtom(claimProductModalAtom)
	const { storageList, spartList, gradeList } = useGlobalProductSearchFieldData()

	// 규격 약호 핸들러
	function onSpecHandler(e, text) {
		const { tagName } = e.target
		if (tagName === 'IMG') {
			setIsModal(false)
		} else {
			onChange('spec', text)
			setIsModal(false)
		}
	}
	// 규격 약호 모달
	function modalOpen() {
		setIsModal(true)
	}

	return (
		<FilterSubcontianer>
			<FilterLeft>
				<RowWrap>
					<DateSearchSelect
						title={'경매 일자'}
						sta자rtInitDate={param.auctionStartDate}
						endInitDate={param.auctionEndDate}
						startDateChange={(value) => onChange('auctionStartDate', value)}
						endDateChange={(value) => onChange('auctionEndDate', value)}
					/>
					<DateSearchSelect
						title={'출고 일자'}
						startInitDate={param.shipmentStartDate}
						endInitDate={param.shipmentEndDate}
						startDateChange={(value) => onChange('shipmentStartDate', value)}
						endDateChange={(value) => onChange('shipmentEndDate', value)}
					/>
				</RowWrap>
				<RowWrap>
					<PartWrap>
						<h6>창고 구분</h6>
						<PWRight>
							<MainSelect
								options={storageList}
								value={param.storage}
								name="storage"
								onChange={(e) => onChange('storage', e)}
							/>
						</PWRight>
					</PartWrap>
					<PartWrap>
						<h6>규격 약호</h6>
						<Input readOnly={true} value={param.spec} />
						<GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17} onClick={modalOpen}>
							찾기
						</GreyBtn>
					</PartWrap>
				</RowWrap>
				<RowWrap>
					<PartWrap first>
						<h6>구분</h6>
						{/* 제품군 */}
						<MainSelect
							options={spartList}
							defaultValue={spartList[0]}
							value={param.spart}
							name="spart"
							onChange={(e) => onChange('spart', e)}
						/>
						{/* 등급 */}
						<MainSelect
							options={gradeList}
							defaultValue={gradeList[0]}
							value={param.grade}
							name="grade"
							onChange={(e) => onChange('grade', e)}
						/>
					</PartWrap>
					<PartWrap>
						<CustomerSearch
							name={param.customerName}
							code={param.customerCode}
							setName={(value) => onChange('customerName', value)}
							setCode={(value) => onChange('customerCode', value)}
						/>
					</PartWrap>
				</RowWrap>
				<RowWrap none>
					{/* 두깨 */}
					<PartWrap>
						<h6>두께(MM)</h6>
						<ExInputsWrap>
							<MiniInput
								type="number"
								name="minThickness"
								value={param.minThickness}
								onChange={(e) => onChange(e.target.name, e.target.value)}
								min={0}
							/>
							<Tilde>~</Tilde>
							<MiniInput
								type="number"
								name="maxThickness"
								value={param.maxThickness}
								onChange={(e) => onChange(e.target.name, e.target.value)}
								min={0}
							/>
						</ExInputsWrap>
					</PartWrap>
					{/* 폭 */}
					<PartWrap>
						<h6>폭(MM)</h6>
						<ExInputsWrap>
							<MiniInput
								type="number"
								name="minWidth"
								value={param.minWidth}
								onChange={(e) => onChange(e.target.name, e.target.value)}
								min={0}
							/>
							<Tilde>~</Tilde>
							<MiniInput
								type="number"
								name="maxWidth"
								value={param.maxWidth}
								onChange={(e) => onChange(e.target.name, e.target.value)}
								min={0}
							/>
						</ExInputsWrap>
					</PartWrap>
					{/* 길이 */}
					<PartWrap>
						<h6>길이(MM)</h6>
						<ExInputsWrap>
							<MiniInput
								type="number"
								name="minLength"
								value={param.minLength}
								onChange={(e) => onChange(e.target.name, e.target.value)}
								min={0}
							/>
							<Tilde>~</Tilde>
							<MiniInput
								type="number"
								name="maxLength"
								value={param.maxLength}
								onChange={(e) => onChange(e.target.name, e.target.value)}
								min={0}
							/>
						</ExInputsWrap>
					</PartWrap>
				</RowWrap>
				{isModal === true && <StandardFind closeFn={onSpecHandler} />}
			</FilterLeft>
			<FilterRight>
				<ProductNumberListSearch
					value={param.productNumberList}
					onChange={(e) => onChange('productNumberList', e.target.value)}
				/>
			</FilterRight>
		</FilterSubcontianer>
	)
}

export default UserPerformanceFilter
