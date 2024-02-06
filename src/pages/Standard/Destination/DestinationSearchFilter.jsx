import { FilterLeft, FilterRight, RowWrap } from '../../../modal/External/ExternalFilter'
import { DestinationSearch } from '../../../components/Search'

const DestinationSearchFilter = ({
	// prettier-ignore
	search,
	setSearch,
}) => {
	const onChange = (key, value) => {
		setSearch((p) => ({ ...p, [key]: value }))
	}

	return (
		<>
			<FilterLeft>
				<RowWrap>
					<DestinationSearch
						name={search.destinationName}
						code={search.destinationCode}
						setName={(value) => onChange('destinationName', value)}
						setCode={(value) => onChange('destinationCode', value)}
					/>
				</RowWrap>
			</FilterLeft>
			<FilterRight></FilterRight>
		</>
	)
}

export default DestinationSearchFilter
