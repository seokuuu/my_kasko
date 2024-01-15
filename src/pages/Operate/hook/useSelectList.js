import { useMemo } from 'react'
import { getSPartList, getStorageList } from '../../../api/search'
import useReactQuery from '../../../hooks/useReactQuery'

/**
 * @description
 * 검색 목록 SelectList에 사용되는 옵션 값들
 * @returns
 */
const useSelectList = () => {
	// 창고 목록
	const { data: storage } = useReactQuery('', 'getStorageList', getStorageList)
	const storageList = useMemo(
		() => (storage ? [{ label: '전체', value: '', address: null }, ...storage] : []),
		[storage],
	)

	// 매입처 목록
	const supplierList = [
		{ label: '전체', value: '' },
		{ label: '현대제철', value: '현대제철' },
		{ label: '동은 스틸', value: '동은 스틸' },
	]

	// 제품군 목록
	const { data: spart } = useReactQuery('', 'getSPartList', getSPartList)
	const spartList = useMemo(() => (spart ? [{ label: '제품군', value: '' }, ...spart] : []), [spart])

	// 제조사 목록
	const makerList = [
		{
			label: '제조사',
			value: '',
		},
		{
			label: '현대제철',
			value: '현대제철',
		},
		{
			label: '동은스틸',
			value: '동은스틸',
		},
	]
	// 재고 상태 목록
	const stockStatusList = [
		{
			label: '재고 상태',
			value: '',
		},
		{
			label: '타사 재고',
			value: '타사 재고',
		},
		{
			label: '자사 재고',
			value: '자사 재고',
		},
	]
	// 등급 목록
	const gradeList = [
		{
			label: '등급 목록',
			value: '',
		},
		{
			label: '1',
			value: 1,
		},
		{
			label: '2',
			value: 2,
		},
		{
			label: '3',
			value: 3,
		},
		{
			label: '4',
			value: 4,
		},
		{
			label: '5',
			value: 5,
		},
		{
			label: '6',
			value: 6,
		},
		{
			label: '7',
			value: 7,
		},
		{
			label: '8',
			value: 8,
		},
		{
			label: '9',
			value: 9,
		},
	]
	// 정척 여부
	const preferThicknessList = [
		{
			label: '정척여부',
			value: '',
		},
		{
			label: 'Y',
			value: 'Y',
		},
		{
			label: 'N',
			value: 'N',
		},
	]
	return { storageList, supplierList, spartList, makerList, stockStatusList, gradeList, preferThicknessList }
}

export default useSelectList
