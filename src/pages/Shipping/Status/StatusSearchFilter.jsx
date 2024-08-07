import React, { useMemo } from 'react'
import { MainSelect } from '../../../common/Option/Main'
import { CustomerSearch, DateSearchSelect, DestinationSearch, RadioSearchButton } from '../../../components/Search'
import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import { FilterLeft, PWRight, PartWrap, RowWrap, SearchContainer } from '../../../modal/External/ExternalFilter'
import { useAtomValue } from 'jotai/index'
import { authAtom } from '../../../store/Auth/auth'
import { useDriverGetTransports } from '../../../api/driver'

const StatusSearchFilter = ({ search, setSearch }) => {
	const auth = useAtomValue(authAtom)
	const { storageList } = useGlobalProductSearchFieldData()
	const { data: transportData } = useDriverGetTransports()

	const transportList = useMemo(() => {
		if (transportData) {
			return [{ label: '전체', value: '' }, ...transportData.map((item) => ({ label: item.label, value: item.label }))]
		}
		return [{ label: '전체', value: '' }]
	}, [transportData])

	const onChange = (key, value) => {
		setSearch((p) => ({ ...p, [key]: value }))
	}

	return (
		<SearchContainer>
			<FilterLeft>
				<RowWrap>
					{auth?.role !== '창고' && (
						<PartWrap first>
							<h6>창고 구분</h6>
							<PWRight>
								<MainSelect
									options={storageList}
									// defaultValue={storageList[0]}
									value={search.storage}
									name="storage"
									onChange={(e) => onChange('storage', e)}
								/>
							</PWRight>
						</PartWrap>
					)}
					{auth?.role !== '운송사' && (
						<PartWrap first>
							<h6>운송사</h6>
							<PWRight>
								<MainSelect
									options={transportList}
									defaultValue={transportList[0]}
									value={search.transportName}
									name="transportName"
									onChange={(e) => onChange('transportName', e)}
								/>
							</PWRight>
						</PartWrap>
					)}
					<PartWrap>
						<h6>배차 여부</h6>
						<RadioSearchButton
							options={[
								{ label: '전체', value: '' },
								{ label: 'Y', value: 1 },
								{ label: 'N', value: 0 },
							]}
							value={search.driverStatus}
							onChange={(value) => onChange('driverStatus', value)}
						/>
					</PartWrap>
				</RowWrap>

				<RowWrap>
					<PartWrap first>
						<DestinationSearch
							name={search.destinationName}
							code={search.destinationCode}
							setName={(value) => onChange('destinationName', value)}
							setCode={(value) => onChange('destinationCode', value)}
						/>
						<DestinationSearch
							name={search.destinationName2}
							code={search.destinationCode2}
							setName={(value) => onChange('destinationName2', value)}
							setCode={(value) => onChange('destinationCode2', value)}
						/>
						<DestinationSearch
							name={search.destinationName3}
							code={search.destinationCode3}
							setName={(value) => onChange('destinationName3', value)}
							setCode={(value) => onChange('destinationCode3', value)}
						/>
					</PartWrap>
				</RowWrap>
				<RowWrap>
					<PartWrap first>
						<CustomerSearch search={search} setSearch={setSearch} />
					</PartWrap>
				</RowWrap>

				<RowWrap none>
					<DateSearchSelect
						title={'출하 지시 일자'}
						startInitDate={search.shippingStartDate}
						endInitDate={search.shippingEndDate}
						startDateChange={(value) => onChange('shippingStartDate', value)}
						endDateChange={(value) => onChange('shippingEndDate', value)}
					/>

					<DateSearchSelect
						title={'출고 요청 일자'}
						startInitDate={search.shipmentRequestStartDate}
						endInitDate={search.shipmentRequestEndDate}
						startDateChange={(value) => onChange('shipmentRequestStartDate', value)}
						endDateChange={(value) => onChange('shipmentRequestEndDate', value)}
					/>
				</RowWrap>
				<RowWrap none>
					<PartWrap first>
						<DateSearchSelect
							title={'출고 일자'}
							startInitDate={search.shipmentStartDate}
							endInitDate={search.shipmentEndDate}
							startDateChange={(value) => onChange('shipmentStartDate', value)}
							endDateChange={(value) => onChange('shipmentEndDate', value)}
						/>
					</PartWrap>
				</RowWrap>
			</FilterLeft>
		</SearchContainer>
	)
}

export default StatusSearchFilter
