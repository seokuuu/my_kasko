import { useEffect, useState } from 'react'
import { getFaqList } from '../../../api/customerService'
import FAQ from './FAQ'
import Header from '../../../components/Header/Header'
import SubHeader from '../../../components/Header/SubHeader'
import UserSideBar from '../../../components/Left/UserSideBar'
import { OverAllMain, OverAllSub, OverAllTable } from '../../../common/Overall/Overall.styled'
import useReactQuery from '../../../hooks/useReactQuery'

const FAQPage = () => {
	const depth2Color = 'FAQ'
	const paramData = {
		pageNum: 1,
		pageSize: 50,
		category: '카테고리', // This value is hard coded value. It is not user selected category.
		keyword: '경매', // This is the user selected category.
	}
	const [param, setParam] = useState(paramData)
	const [expanded, setExpanded] = useState('고객센터')
	const [faqList, setFaqList] = useState(null)
	const [faqPagination, setFaqPagination] = useState([])
	const { isLoading, isError, data: getFaqListRes, isSuccess } = useReactQuery(param, 'getFaqList', getFaqList)

	useEffect(() => {
		if (getFaqListRes && getFaqListRes.data && getFaqListRes.data.data) {
			setFaqList(getFaqListRes.data.data.list)
			setFaqPagination(getFaqListRes.data.data.pagination)
		}
	}, [isSuccess, getFaqListRes])

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
							faqList={faqList}
							faqPagination={faqPagination}
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
