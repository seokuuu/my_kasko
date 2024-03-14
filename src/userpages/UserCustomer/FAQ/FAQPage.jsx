import { useEffect, useState } from 'react'
import { getFaqList } from '../../../api/customerService'
import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import UserSideBar from '../../../components/Left/UserSideBar'
import useReactQuery from '../../../hooks/useReactQuery'
import FAQ from './FAQ'
import useTableData from '../../../hooks/useTableData'
import { responseToTableRowMap } from '../../../constants/user/faqTableConfig'

const FAQPage = () => {
	const depth2Color = 'FAQ'
	const paramData = {
		pageNum: 1,
		pageSize: 50,
		category: '카테고리',
		keyword: '경매',
	}
	const [param, setParam] = useState(paramData)
	const [expanded, setExpanded] = useState('고객센터')
	const { isLoading, isError, data, refetch } = useReactQuery(param, 'getFaqList', getFaqList)
	const { tableRowData, paginationData, totalCount } = useTableData({
		tableField: responseToTableRowMap,
		serverData: data,
	})

	useEffect(() => {
		refetch()
	}, [param])

	const onPageChange = (value) => {
		setParam((prevParam) => ({
			...prevParam,
			pageNum: Number(value),
		}))
	}

	const onSelectedCategory = (category) => {
		setParam((prevParam) => ({
			...prevParam,
			keyword: category,
		}))
	}

	const handleTablePageSize = (event) => {
		setParam((prevParam) => ({
			...prevParam,
			pageSize: Number(event.target.value),
			pageNum: 1,
		}))
	}

	return (
		<>
			<Header />
			<OverAllMain>
				<UserSideBar expanded={expanded} setExpanded={setExpanded} depth2Color={depth2Color} />
				<OverAllSub>
					<SubHeader />
					<OverAllTable>
						<FAQ
							handleTablePageSize={handleTablePageSize}
							faqList={tableRowData}
							faqPagination={paginationData}
							totalCount={totalCount}
							onPageChange={onPageChange}
							onSelectedCategory={onSelectedCategory}
							isLoading={isLoading}
							isError={isError}
						/>
					</OverAllTable>
				</OverAllSub>
			</OverAllMain>
		</>
	)
}

export default FAQPage
