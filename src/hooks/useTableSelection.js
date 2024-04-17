import { useAtom, useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { selectedRowsAtom } from '../store/Layout/Layout'
import { numberDeleteComma } from '../utils/utils'

/**
 * 테이블 셀렉트 HOOK
 * @description
 * - 전역에서 사용할 수 있는 테이블 셀렉트 함수입니다.
 * - 선택항목 목록, 선택항목 갯수, 선택항목 중량을 확인하기 위하여 사용합니다.
 *
 * @param {string} param.weightKey 선택항목에서 중량값과 매칭되는 키
 *
 * @returns {Array<any>} selectedRows: 선택한 데이터
 * @returns {number} selectedCount: 총 선택항목 갯수
 * @returns {string} selectedCountStr: 총 선택항목 갯수 localString
 * @retutns {number} selectedWeight: 총 중량
 * @retutns {string} selectedWeightStr: 총 선택항목 갯수 localString
 * @returns {boolean} hasSelected: 선택항목이 1개 이상인지 여부
 * */
export default function useTableSelection(param = {}) {
	const { weightKey } = param

	// 테이블 선택 항목
	const [selectedData, setSelectedData] = useAtom(selectedRowsAtom)
	// 선택 항목 총 갯수
	const selectedCount = useMemo(() => selectedData?.length || 0, [selectedData])
	// 선택 항목 총 중량
	const selectedWeight = useMemo(
		() => (!selectedData || weightKey === undefined ? 0 : getSumFromObjList(weightKey, selectedData || [])),
		[selectedData],
	)

	return {
		selectedData: selectedData || [], // 선택 데이터
		selectedWeight, // 선택 데이터 총 중량
		selectedWeightStr: selectedWeight.toLocaleString(), // 선택 데이터 총 중량 (localString)
		selectedCount, // 선택 데이터 총 갯수
		selectedCountStr: selectedCount.toLocaleString(), // 선택 데이터 총 갯수(localString)
		hasSelected: selectedCount > 0, // 선택 여부
		resetSelectData: () => setSelectedData([]),
	}
}

/**
 *
 * @param {string} numKey 키
 * @param {array<any>} list 목록
 * @returns {number} sum 총합계
 */
function getSumFromObjList(numKey, list) {
	const sums = list.reduce((sum, item) => {
		const num = numberDeleteComma(item[numKey]) || 0
		return num ? sum + Number(num) : sum
	}, 0)
	return sums
}
