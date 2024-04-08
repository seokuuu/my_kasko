import { MainSelect } from '../../../common/Option/Main'
import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import {
	ExInputsWrap,
	FilterLeft,
	FilterRight,
	Input,
	PWRight,
	PartWrap,
	RowWrap,
	Tilde,
} from '../../../modal/External/ExternalFilter'

import { DateSearchSelect } from '../../../components/Search'

const StartPriceFields = ({
	// prettier-ignore
	search,
	setSearch,
	commonDropdownButtonHandler,
	commonNumInputHandler,
	onSpecHandler,
}) => {
	const {
		// prettier-ignore

		spartList,

		gradeList,
		preferThicknessList,
	} = useGlobalProductSearchFieldData()

	/**
	 * @description
	 * 경매 일자 auctionStartDate, auctionEndDate
	 * 경매 회차 번호 auctionEndDate
	 * 진행 상태 ?
	 * 제품 번호 auctionEndDate
	 */

	return (
		<>
			<FilterLeft>
				<RowWrap>
					<PartWrap first>
						<h6>구분</h6>
						<PWRight>
							<MainSelect
								options={gradeList}
								defaultValue={gradeList[0]}
								value={search.grade}
								name="grade"
								onChange={(e) => commonDropdownButtonHandler(e, 'grade')}
							/>
							<MainSelect
								options={spartList}
								defaultValue={spartList[0]}
								value={search.spart}
								name="spart"
								onChange={(e) => commonDropdownButtonHandler(e, 'spart')}
							/>
							<MainSelect
								options={preferThicknessList}
								defaultValue={preferThicknessList[0]}
								value={search.preferThickness}
								name="preferThickness"
								onChange={(e) => commonDropdownButtonHandler(e, 'preferThickness')}
							/>
						</PWRight>
					</PartWrap>
				</RowWrap>
				<RowWrap>
					{/* 창고 구분 */}
					<PartWrap first>
						<DateSearchSelect
							title={'적용 일자'}
							startInitDate={search.startDate}
							endInitDate={search.endDate}
							startDateChange={(value) => commonDropdownButtonHandler(value, 'startDate')}
							endDateChange={(value) => commonDropdownButtonHandler(value, 'endDate')}
						/>
					</PartWrap>
					<PartWrap>
						<h6>유찰 횟수</h6>
						<ExInputsWrap>
							<Input
								type="number"
								name="minFailCount"
								value={search.minFailCount}
								onChange={commonNumInputHandler}
								min={0}
							/>
							<Tilde>~</Tilde>
							<Input
								type="number"
								name="maxFailCount"
								value={search.maxFailCount}
								onChange={commonNumInputHandler}
								min={0}
							/>
						</ExInputsWrap>
					</PartWrap>
					{/* 규격약호 */}
				</RowWrap>
			</FilterLeft>
			<FilterRight></FilterRight>
		</>
	)
}

export default StartPriceFields
