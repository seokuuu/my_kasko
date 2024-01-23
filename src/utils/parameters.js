import moment from "moment/moment"

/**
 * 유효 PARAMS 반환 함수
 * @param {object} params 파라미터로 사용할 객체
 * @return {object} 유효한 파라미터 객체
 * @description
 * - 빈 배열일시 포함하지 않습니다.
 * - 빈 문자열일 때 포함하지 않습니다.
 * - Date일 때 YYYYMMDD 포맷으로 변환하여 포함합니다.
 */
export function getValidParams(params) {
	const validParams = Object.keys(params).reduce((acc, key) => {
		let value = params[key]
		if (Array.isArray(value)) {
			value = value.length < 1 ? null : value.toString()
		} else if (typeof value === 'string' && value.length < 1) {
			value = null
		} else if (key === 'orderStartDate' || key === 'orderEndDate') {
			value = value ? moment(value).format('YYYYMMDD') : null
		}
		return value ? { ...acc, [key]: value } : acc
	}, {})
	return validParams
}

/**
 * 제품번호 목록을 포함한 필터 파라미터 반환 함수
 * @param {string} url API url
 * @param {string} param.productNumberList 제품번호 목록
 * @returns {string} url including searchParams
 */
export function getUrlWithSearchParam(url, param) {
	if (param && param.productNumberList) {
		param.productNumberList = param.productNumberList.replace(/[\n ,]+/g, ',')
	}
	const params = new URLSearchParams(param)
	return `${url}?${params.toString()}`
}