// array total value calculate
import { formatWeight } from '../../../utils/utils'

export const getAddNewDestination = (checkedData) => {
  if (!checkedData || checkedData?.length === 0) {
    throw new Error('제품을 선택해주세요.')
  }
  // 목적지 3개 이상 체크
  const destination = checkedData?.map((item) => item['목적지 명'])
  const duplicationDestination = [...new Set(destination)]
  if (duplicationDestination.length > 3) {
    throw new Error('선별할 시 목적지 3개 이상은 선별 목록에 추가할 수 없습니다.')
  }
  while (duplicationDestination.length < 3) {
    duplicationDestination.push('-')
  }
  return duplicationDestination
}

export const calculateTotal = (list, key) => {
  if (!list) return 0
  return formatWeight(list?.map((item) => Number(item[key])).reduce((acc, cur) => acc + cur, 0))
}

export const calculateTowDataTotal = (list, key, key2) => {
  if (!list) return 0
  const totalValue = list?.map((item) => Number(item[key])).reduce((acc, cur) => acc + cur, 0)
  const totalValue2 = list?.map((item) => Number(item[key2])).reduce((acc, cur) => acc + cur, 0)
  return formatWeight(Number(totalValue + totalValue2))
}
