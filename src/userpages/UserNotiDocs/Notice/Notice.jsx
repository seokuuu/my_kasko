import { useEffect, useMemo, useRef, useState } from 'react'

import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { useNoticeListQuery } from '../../../api/operate/notice'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { UserNoticeListFieldCols, UserNoticeListFields } from '../../../constants/userNotDoc'
import useTablePaginationPageChange from '../../../hooks/useTablePaginationPageChange'
import { add_element_field } from '../../../lib/tableHelpers'
import {
	FilterContianer,
	FilterHeader,
	FilterWrap,
	TCSubContainer,
	TableContianer,
} from '../../../modal/External/ExternalFilter'
import FAQSearchFields from '../../../pages/Operate/Common/FAQ/components/FAQSearchFields'
import { noticeSearchCategoryOptions } from '../../../pages/Operate/constants'
import useGlobalSearch from '../../../pages/Operate/hook/useGlobalSearch'
import Table from '../../../pages/Table/Table'
import { toggleAtom } from '../../../store/Layout/Layout'

const Notice = () => {
	const [title, setTitle] = useState('')

	const Params = {
		type: '공지사항',
		pageNum: 1,
		pageSize: 50,
	}

	const [param, setParam] = useState(Params)
	const { isSuccess, data: notices, refetch } = useNoticeListQuery(param)
	const pagination = notices?.pagination

	const { onPageChanage } = useTablePaginationPageChange(notices, setParam)
	// Function to handle image click and toggle rotation

	// 토글 쓰기
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

	const [getRow, setGetRow] = useState('')
	const navigate = useNavigate()
	const tableField = useRef(UserNoticeListFieldCols)
	const getCol = tableField.current
	const [fixed, setFixed] = useState([])
	const fixedItem = notices && notices?.list.filter((i) => i.status !== 0)

	useEffect(() => {
		if (!title && fixedItem) {
			setFixed(fixedItem)
		}
	}, [notices])

	const mappingData2 = useMemo(
		() =>
			notices
				? notices.list.filter((d, index) => {
						if (!d.status) {
							return {
								...d,
								작성일자: d.createDate ? moment(d.createDate).format('YYYY-MM-DD HH:mm:ss') : '-',
								// id: Notice.length, // 순번 내림차순
								uid: d.uid,
								title: d.title,
								count: d.count,
								name: d.name,
							}
						}
				  })
				: [],
		[notices],
	)

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
	const gettingRow = () => {
		const getData = mappingData2

		if (!isSuccess && !getData) return null
		if (Array.isArray(getData)) {
			setGetRow(add_element_field(getData, UserNoticeListFields))
		}
	}
	useEffect(() => {
		gettingRow()
		//타입, 리액트쿼리, 데이터 확인 후 실행
	}, [isSuccess, notices])

	const handleOnRowClicked = (e) => {
		const uid = e.data.고유값
		navigate(`/userpage/notice/${uid}`)
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
	}, [])

	const { globalProductSearchOnClick, globalProductResetOnClick } = useGlobalSearch({
		setSearch: setParam,
		refetch,
		initParams: {
			type: '공지사항',
		},
	})

	return (
		<FilterContianer>
			<div>
				<FilterHeader>
					<h1>공지사항</h1>
					{/* 토글 쓰기 */}
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
							globalProductSearchOnClick={globalProductSearchOnClick}
							globalProductResetOnClick={globalProductResetOnClick}
						/>
					</FilterWrap>
				)}
			</div>

			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 ({pagination?.listCount}개 )
						<Hidden />
					</div>
					<div style={{ gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />
					</div>
				</TCSubContainer>
				<div>
					<Table
						getRow={getRow}
						getCol={getCol}
						tablePagination={pagination}
						isRowClickable={true}
						handleOnRowClicked={handleOnRowClicked}
						onPageChange={onPageChanage}
						topData={createData(fixed)}
					/>
				</div>
			</TableContianer>
		</FilterContianer>
	)
}

export default Notice
