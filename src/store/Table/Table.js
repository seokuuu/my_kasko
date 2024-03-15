import { atom } from 'jotai'
import { selectedRows2Switch } from '../Layout/Layout'
import { getTableLocalStorageByPageName, removeTableLocalStorage, setTableLocalStorage } from './tabeleLocalStorage'

export const adminDestinationList = atom({
	'목적지 고유번호': '',
	'목적지 코드': '',
	'목적지 명': '',
	작성자: '',
	작성일: '',
	수정자: '',
	수정일: '',
})

export const adminDestinationList2 = atom({
	'목적지 고유번호': '',
	'목적지 코드': '',
	'목적지 명': '',
	작성자: '',
	작성일: '',
	수정자: '',
	수정일: '',
})

export const adminDestinationList3 = atom({
	'목적지 고유번호': '',
	'목적지 코드': '',
	'목적지 명': '',
	작성자: '',
	작성일: '',
	수정자: '',
	수정일: '',
})

/* ==============================
  테이블 숨기기 컬럼
============================== */
export const TABLE_TYPE = {
	pageTable: 'pageTable',
	popupTable: 'popupTable',
}

const initialHiddenState = {
	[TABLE_TYPE.pageTable]: { hiddenIds: [], showId: '' },
	[TABLE_TYPE.popupTable]: { hiddenIds: [], showId: '' },
}

/**
 * 숨긴항목 처리 스토어
 * @description
 * - pageTable: 페이지 테이블 숨긴항목 데이터
 * - popupTable: 팝업 테이블 숨긴항목 데이터
 */
const talbeHiddenAtom = atom(JSON.parse(JSON.stringify(initialHiddenState)))

/**
 * 숨김항목 read/write 스토어
 */
export const tableHiddenColumnAtom = atom(
	(get) => {
		const saved = get(talbeHiddenAtom)
		const localSaved = getTableLocalStorageByPageName()
		if (localSaved) {
			return Object.keys(localSaved).reduce((acc, key) => ({ ...acc, [key]: localSaved[key].hiddenIds || [] }), {})
		}
		return Object.keys(saved).reduce((acc, key) => ({ ...acc, [key]: saved[key].hiddenIds || [] }), {})
	},
	(get, set, update) => {
		const prevState = get(talbeHiddenAtom)
		const { type, value } = update
		const newState = {
			...prevState,
			[type]: {
				...prevState[type],
				hiddenIds: Array.from(new Set([...prevState[type].hiddenIds, value])),
			},
		}
		setTableLocalStorage(newState, type)
		set(talbeHiddenAtom, newState)
	},
)

/**
 * 노출항목 read/write 스토어
 */
export const tableShowColumnAtom = atom(
	(get) => {
		const saved = get(talbeHiddenAtom)
		return Object.keys(saved).reduce((acc, key) => ({ ...acc, [key]: saved[key].showId || '' }), {})
	},
	(get, set, update) => {
		const prevState = get(talbeHiddenAtom)
		const { type, value } = update

		const newData = {
			...prevState,
			[type]: {
				...prevState[type],
				showId: value,
			},
		}
		removeTableLocalStorage(value, type)
		set(talbeHiddenAtom, newData)
	},
)

/**
 * 숨김항목 해제 writeOnly 스토어
 */
export const tableRestoreColumnAtom = atom(null, (get, set, update) => {
	const prevState = get(talbeHiddenAtom)
	const { type } = update
	const prevHiddenId = prevState[type].showId

	set(talbeHiddenAtom, {
		...prevState,
		[type]: {
			hiddenIds: prevState[type].hiddenIds.filter((v) => v !== prevHiddenId),
			showId: '',
		},
	})
})

/**
 * 테이블 초기화 writeOnly 스토어
 */
export const tableResetColumnAtom = atom(null, (get, set, update) => {
	set(
		talbeHiddenAtom,
		update && update.type
			? { ...get(talbeHiddenAtom), [update.type]: { hiddenIds: [], showId: '' } }
			: JSON.parse(JSON.stringify(initialHiddenState)),
	)
})
