import { FilterLeft, FilterRight, PartWrap, RowWrap } from '../../../modal/External/ExternalFilter'
import { DateSearchSelect, RadioSearchButton } from '../../../components/Search'
import ProductNumber from '../../../components/GlobalProductSearch/SearchFields/ProductNumber'

const WinningDetailFields = ({
	// prettier-ignore
	search,
	setSearch,
	commonDropdownButtonHandler,
}) => {
	const onChangeRadio = (key, value) => {
		setSearch((p) => ({ ...p, [key]: value }))
	}

	return (
		<>
			<FilterLeft>
				<RowWrap>
					{/* 구분 */}
					<PartWrap first>
						<DateSearchSelect
							title={'확정 전송 일자'}
							startInitDate={search.startSendDate}
							endInitDate={search.endSendDate}
							startDateChange={(value) => commonDropdownButtonHandler(value, 'startSendDate')}
							endDateChange={(value) => commonDropdownButtonHandler(value, 'endSendDate')}
						/>
					</PartWrap>
				</RowWrap>
				{/* 2행 */}
				<RowWrap>
					{/* 구분 */}
					<PartWrap first>
						<h6>낙찰 상태</h6>
						<RadioSearchButton
							options={[
								{ label: '전체', value: '전체' },
								{ label: '낙찰', value: '낙찰' },
								{ label: '낙찰 취소', value: '낙찰 취소' },
								{ label: '낙찰 확정', value: '낙찰 확정' },
							]}
							value={search.biddingStatus}
							onChange={(value) => onChangeRadio('biddingStatus', value)}
						/>
					</PartWrap>
				</RowWrap>
			</FilterLeft>

			<FilterRight>
				<ProductNumber
					initialValue={search.productNumberList}
					setState={setSearch}
					valueName={'productNumberList'}
					height="100%"
				/>
			</FilterRight>
		</>
	)
}

export default WinningDetailFields
