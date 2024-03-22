const KEY = 'order_table_data'

// list 형태
// [
// 	{
// 		page: '',
//    type: '', // table, popup( or table2 - 같은 페이지 이중테이블)
// 		columns: [
//      {id: '', index: 0}
// 	  ]
// 	}
// ]

const getOrderTableList = () => {
	const storageItems = localStorage.getItem(KEY)
	return JSON.parse(storageItems)
}

/**
 * 페이지 항목 순서 데이터
 * @returns {any}
 */
export const getOrderTableStore = (type) => {
	const list = getOrderTableList()
	const page = window.location.pathname

	if (!list || list?.length === 0) {
		return null
	}

	return list.filter((item) => item.page === page && item.type === type)[0]
}

/**
 * 테이블 항목 순서 변경 시 로컬스토리지 저정
 * @param data 변경된 순서 데이터 [{id, index}]
 * @param type 원본데이터 타입 (table, popup)
 */
export const setOrderTableStore = (data, type) => {
	const PATHNAME = window.location.pathname

	const newData = createNewData(data, type, PATHNAME)
	const newList = createNewList(newData, PATHNAME)

	const jsonStr = JSON.stringify(newList)
	localStorage.setItem(KEY, jsonStr)
}

const createNewData = (data, type, pathname) => {
	if (!data) {
		return
	}
	return {
		page: pathname,
		type,
		columns: data,
	}
}

const createNewList = (data, pathname) => {
	const list = getOrderTableList()
	if (list?.length > 0) {
		const prevList = list.filter((item) => item.page !== pathname)
		return [...prevList, data]
	}
	return [data]
}
