import React, { useEffect, useState } from 'react'

import moment from 'moment'
import { useNoticeListQuery } from '../../../api/operate/notice'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { UserNoticeListFieldCols, UserNoticeListFields } from '../../../constants/userNotDoc'
import {
	FilterContianer,
	FilterHeader,
	FilterWrap,
	TableContianer,
	TCSubContainer,
} from '../../../modal/External/ExternalFilter'
import FAQSearchFields from '../../../pages/Operate/Common/FAQ/components/FAQSearchFields'
import { noticeSearchCategoryOptions } from '../../../pages/Operate/constants'
import { toggleAtom } from '../../../store/Layout/Layout'
import TableV2 from '../../../pages/Table/TableV2'
import useTableData from '../../../hooks/useTableData'
import { useNavigate } from 'react-router-dom'
import TableV2HiddenSection from '../../../pages/Table/TableV2HiddenSection'
import { isEqual } from 'lodash'

const Notice = () => {
	const navigate = useNavigate()
	const [title, setTitle] = useState('')

	const Params = {
		type: '공지사항',
		pageNum: 1,
		pageSize: 50,
	}

	const [param, setParam] = useState(Params)
	const { isLoading, data, refetch } = useNoticeListQuery(param)
	const [newData, setNewData] = useState([])

	useEffect(() => {
		const list = data?.list
		if (list && Array.isArray(list)) {
			setNewData({
				...data,
				list: data.list.filter((d, index) => {
					if (!d.status) {
						return {
							...d,
							작성일자: d.createDate ? moment(d.createDate).format('YYYY-MM-DD HH:mm:ss') : '-',
							uid: d.uid,
							title: d.title,
							count: d.count,
							name: d.name,
						}
					}
				}),
			})
		}
	}, [data])

	const { tableRowData, paginationData, totalCount } = useTableData({
		tableField: UserNoticeListFields,
		serverData: newData,
	})

	const onPageChange = (value) => {
		setParam((prevParam) => ({
			...prevParam,
			pageNum: Number(value),
		}))
	}

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

	const [fixed, setFixed] = useState([])
	const fixedItem = data && data?.list.filter((i) => i.status !== 0)

	const handleOnRowClicked = (e) => {
		const uid = e.data.고유값
		navigate(`/userpage/notice/${uid}`)
	}

	useEffect(() => {
		if (!title && fixedItem) {
			setFixed(fixedItem)
		}
	}, [data])

	function createData(data) {
		var result = []
		for (var i = 0; i < data?.length; i++) {
			result.push({
				작성일자: data[i].createDate ? moment(data[i].createDate).format('YYYY-MM-DD HH:mm:ss') : '-',
				작성자: data[i].name,
				순번: '고정',
				고유값: data[i].uid,
				제목: data[i].getFile ? `${data[i].title} 📎` : `${data[i].title} `,
				조회수: data[i].count,
				타입: '자료실',
			})
		}
		return result
	}

	const handleTablePageSize = (event) => {
		setParam((prevParam) => ({
			...prevParam,
			pageSize: Number(event.target.value),
			pageNum: 1,
		}))
	}

	useEffect(() => {
		refetch()
	}, [param])

	const searchOnClick = (userSearchParam) => {
		setParam((prevParam) => {
			if (isEqual(prevParam, { ...prevParam, ...userSearchParam })) {
				return prevParam
			}
			return {
				...prevParam,
				...userSearchParam,
				pageNum: 1,
			}
		})
	}

	const resetOnClick = () => {
		setParam(Params)
	}

	return (
		<FilterContianer>
			<div>
				<FilterHeader>
					<h1>공지사항</h1>
					<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
				</FilterHeader>
				{exFilterToggle && (
					<FilterWrap>
						<GlobalProductSearch
							param={param}
							isToggleSeparate={true}
							renderCustomSearchFields={(props) => (
								<FAQSearchFields {...props} searchOptions={noticeSearchCategoryOptions} />
							)}
							globalProductSearchOnClick={searchOnClick}
							globalProductResetOnClick={resetOnClick}
						/>
					</FilterWrap>
				)}
			</div>

			<TableContianer>
				<TCSubContainer bor>
					<div>
						게시글 목록 ({totalCount?.toLocaleString()}개 )
						<TableV2HiddenSection />
					</div>
					<div style={{ gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />
					</div>
				</TCSubContainer>
				<div>
					<TableV2
						getRow={tableRowData}
						loading={isLoading}
						getCol={UserNoticeListFieldCols}
						tablePagination={paginationData}
						onPageChange={onPageChange}
						topData={createData(fixed)}
						handleOnRowClicked={handleOnRowClicked}
					/>
				</div>
			</TableContianer>
		</FilterContianer>
	)
}

export default Notice
