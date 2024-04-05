// array total value calculate
import { formatWeight, numberDeleteComma } from '../../../utils/utils'

export const getAddNewDestination = (checkedData) => {
	if (!checkedData || checkedData?.length === 0) {
		throw new Error('제품을 선택해주세요.')
	}
	// 목적지 3개 이상 체크
	const selectKey = '목적지 명'
	const selectKey2 = 'destinationName'
	const destination = checkedData?.map((item) => item[selectKey] ?? item[selectKey2])
	const duplicationDestination = [...new Set(destination)]
	if (duplicationDestination.length > 3) {
		throw new Error('선별할 시 목적지 3개 이상은 선별 목록에 추가할 수 없습니다.')
	}
	while (duplicationDestination.length < 3) {
		duplicationDestination.push('-')
	}
	return duplicationDestination
}

export const calculateTotalCustom = (list, key) => {
	if (!list) return 0
	return formatWeight(list?.map((item) => parseInt(item[key]?.replace(/,/g, ''))).reduce((acc, cur) => acc + cur, 0))
}

export const calculateTotal = (list, key) => {
	if (!list) return 0
	return formatWeight(list?.map((item) => Number(numberDeleteComma(item[key]))).reduce((acc, cur) => acc + cur, 0))
}

export const calculateTowDataTotal = (list, key, key2) => {
	if (!list) return 0
	const totalValue = list?.map((item) => Number(numberDeleteComma(item[key]))).reduce((acc, cur) => acc + cur, 0)
	const totalValue2 = list?.map((item) => Number(numberDeleteComma(item[key2]))).reduce((acc, cur) => acc + cur, 0)
	return formatWeight(Number(totalValue + totalValue2))
}

// 같은 창고인지 체크
export const storageValid = (list) => {
	const storageKey = '창고'
	const storageKey2 = 'storageName'
	const hasDuplicate = list?.reduce((acc, obj, idx, arr) => {
		if (idx === 0) return false

		const selectKey = obj[storageKey] ? storageKey : storageKey2

		return acc || arr.some((otherObj) => obj[selectKey] !== otherObj[selectKey])
	}, false)

	if (hasDuplicate) {
		throw new Error('서로 다른 창고가 존재합니다!')
	}
}
