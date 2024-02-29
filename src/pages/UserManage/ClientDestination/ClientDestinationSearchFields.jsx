import { FilterLeft, FilterRight, RowWrap } from '../../../modal/External/ExternalFilter'
import { CustomerSearch } from '../../../components/Search'

const ClientDestinationSearchFields = ({ search, setSearch }) => {
	return (
		<>
			<FilterLeft>
				<RowWrap>
					<CustomerSearch search={search} setSearch={setSearch} />
				</RowWrap>
			</FilterLeft>

			<FilterRight></FilterRight>
		</>
	)
}

export default ClientDestinationSearchFields
