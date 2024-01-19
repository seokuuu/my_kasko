import { useEffect, useMemo, useRef, useState } from 'react'
import Table from '../../../pages/Table/Table'
import { MainSelect } from '../../../common/Option/Main'
import { BlackBtn } from '../../../common/Button/Button'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { toggleAtom } from '../../../store/Layout/Layout'
import {
	FilterContianer,
	FilterFooter,
	FilterHeader,
	FilterRight,
	FilterSubOneContainer,
	FilterWrap,
	Input,
	PartWrap,
	ResetImg,
	RowWrap,
	TableContianer,
	TCSubContainer,
} from '../../../modal/External/ExternalFilter'
import { add_element_field } from '../../../lib/tableHelpers'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { UserNoticeListFieldCols, UserNoticeListFields } from '../../../constants/userNotDoc'
import { useNoticeListQuery } from '../../../api/operate/notice'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import useTablePaginationPageChange from '../../../hooks/useTablePaginationPageChange'

const Docs = () => {
	const [title, setTitle] = useState('')

	const Params = {
		type: '자료실',
		pageNum: 1,
		pageSize: 50,
		category: '',
		keyword: title,
	}

	const [param, setParam] = useState(Params)
	const { isSuccess, data: Docs, refetch } = useNoticeListQuery(param)
	const pagination = Docs?.pagination

	const { onPageChanage } = useTablePaginationPageChange(Docs, setParam)

	const [isRotated, setIsRotated] = useState(false)
	const [getRow, setGetRow] = useState('')
	const navigate = useNavigate()
	const tableField = useRef(UserNoticeListFieldCols)
	const getCol = tableField.current
	const [fixed, setFixed] = useState([])
	const fixedItem = Docs && Docs?.list.filter((i) => i.status !== 0)
	useEffect(() => {
		if (!title && fixedItem) {
			setFixed(fixedItem)
		}
	}, [Docs, isSuccess])

	const handleImageClick = () => {
		setIsRotated((prevIsRotated) => !prevIsRotated)
	}

	const [topData, setTopData] = useState([])

	const mappingData2 = useMemo(
		() =>
			Docs
				? Docs.list.filter((d, index) => {
						// console.log('DD', moment(d.createDate).format('YYYY-MM-DD'))
						if (!d.status) {
							return {
								...d,
								createDate: moment(d.createDate).format('YYYY-MM-DD'),
								// id: Docs.length, // 순번 내림차순
								uid: d.uid,
								title: d.title,
								count: d.count,
								name: d.name,
							}
						}
				  })
				: [],
		[Docs],
	)

	useEffect(() => {
		if (Docs) {
			const newTopData = Docs.list.filter((d, index) => {
				if (d.status) {
					return {
						...d,
						createDate: d.createDate ? moment(d.createDate).format('YYYY-MM-DD') : '-',
						작성자: d.name,
						순번: '고정',
						고유값: d.uid,
						제목: d.getFile ? `${d.title} 📎` : `${d.title} `,
						조회수: d.count,
						타입: '자료실',
					}
				} else {
					return null
				}
			})
			setTopData(newTopData)
		}
	}, [Docs])

	function createData(data) {
		var result = []
		for (var i = 0; i < data.length; i++) {
			result.push({
				createDate: data[i].createDate ? moment(data[i].createDate).format('YYYY-MM-DD') : '-',
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
	// console.log(Docs)
	// 테이블 row값 가져오기
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
	}, [isSuccess, mappingData2])

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

	const handleSearch = () => {
		refetch()
	}

	const handleOnRowClicked = (e) => {
		const uid = e.data.고유값
		navigate(`/userpage/docs/${uid}`)
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

	return (
		<FilterContianer>
			<div>
				<FilterHeader>
					<h1>자료실</h1>
					{/* 토글 쓰기 */}
					<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
				</FilterHeader>
				{exFilterToggle && (
					<FilterWrap>
						<FilterSubOneContainer>
							<RowWrap none>
								<PartWrap>
									<h6 style={{ width: '100px' }}> 검색</h6>
									<MainSelect />
									<Input
										style={{ marginLeft: '10px' }}
										value={title}
										onChange={(e) => {
											setTitle(e.target.value)
										}}
									/>
								</PartWrap>
							</RowWrap>
							<FilterRight></FilterRight>
						</FilterSubOneContainer>
						<FilterFooter>
							<div style={{ display: 'flex' }}>
								<p>초기화</p>
								<ResetImg
									src="/img/reset.png"
									style={{ marginLeft: '10px', marginRight: '20px' }}
									onClick={handleImageClick}
									className={isRotated ? 'rotate' : ''}
								/>
							</div>
							<div style={{ width: '180px' }}>
								<BlackBtn width={100} height={40} onClick={handleSearch}>
									검색
								</BlackBtn>
							</div>
						</FilterFooter>
					</FilterWrap>
				)}
			</div>

			<TableContianer>
				<TCSubContainer bor>
					<div>
						게시글 목록 ({pagination?.listCount}개)
						<Hidden />
					</div>
					<div style={{ gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />
					</div>
				</TCSubContainer>
				<Table
					getRow={getRow}
					getCol={getCol}
					tablePagination={pagination}
					isRowClickable={true}
					handleOnRowClicked={handleOnRowClicked}
					onPageChange={onPageChanage}
					topData={createData(fixed)}
				/>
			</TableContianer>
		</FilterContianer>
	)
}

export default Docs
