const KEY = 'hidden_table_data'

// list 형태
// [
// 	{
// 		page: '',
// 		pageTable: {hiddenIds: [], showId: []},
// 		popupTable: {hiddenIds: [], showId: []},
// 	}
// ]

/**
 * 숨김데이터 전체 목록
 * @returns {any}
 */
export const getTableLocalStorage = () => {
	const list = localStorage.getItem(KEY)
	return JSON.parse(list)
}

/**
 * 해당 페이지 숨김데이터 조회
 * @returns {*|null}
 */
export const getTableLocalStorageByPageName = () => {
	const PATHNAME = window.location.pathname
	const list = getTableLocalStorage()
	if (!list || list?.length === 0) {
		return null
	}
	return list.filter((item) => item.page === PATHNAME)[0]
}

/**
 * 테이블 항목 숨김 처리
 * @param data 숨김 데이터 목록
 * @param type 원본데이터 타입 (pageTable, popupTable)
 */
export const setTableLocalStorage = (data, type) => {
	const PATHNAME = window.location.pathname

	const newData = createNewData(data, type, PATHNAME)
	const newList = createNewList(newData, PATHNAME)

	const jsonStr = JSON.stringify(newList)
	localStorage.setItem(KEY, jsonStr)
}

const createNewData = (data, type, pathname) => {
	const pageData = getTableLocalStorageByPageName()

	if (pageData) {
		const hiddenIds = pageData[type].hiddenIds
		const newHiddenIds = Array.from(new Set([...hiddenIds, ...data[type].hiddenIds]))
		return {
			...pageData,
			[type]: {
				...pageData[type],
				hiddenIds: newHiddenIds,
			},
		}
	}
	return {
		page: pathname,
		...data,
	}
}

const createNewList = (data, pathname) => {
	const list = getTableLocalStorage()
	if (list?.length > 0) {
		const prevList = list.filter((item) => item.page !== pathname)
		return [...prevList, data]
	}
	return [data]
}

/**
 * 테이블 숨김 항목 제거
 * @param value 제거할 항목
 * @param type 원본데이터 타입 (pageTable, popupTable)
 */
export const removeTableLocalStorage = (value, type) => {
	const PATHNAME = window.location.pathname
	const list = getTableLocalStorage()
	const data = getTableLocalStorageByPageName()

	const hiddenIds = data[type].hiddenIds
	const newHiddenIds = hiddenIds?.filter((item) => item !== value)

	const newData = {
		...data,
		[type]: {
			...data[type],
			hiddenIds: newHiddenIds,
		},
	}

	const newList = list.map((item) => (item.page === PATHNAME ? newData : item))

	const jsonStr = JSON.stringify(newList)
	localStorage.setItem(KEY, jsonStr)
}
