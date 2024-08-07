// base64 > file
export function base64toFile(base_data, filename) {
	var arr = base_data.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n)

	while (n--) {
		u8arr[n] = bstr.charCodeAt(n)
	}

	return new File([u8arr], filename, { type: mime })
}

/**
 * 사진 가로세로 크기 확인
 */
export const getFileWidth = (file) => {
	const img = new Image()
	let _URL = window.URL || window.webkitURL
	img.src = _URL.createObjectURL(file)
	return new Promise(
		(resolve) =>
			(img.onload = function () {
				resolve({ w: this.width, h: this.height })
			}),
	)
}

// 객체에 key, value를 입력하여 추가
export function addPropertyToObject(obj, key, value) {
	// 기존 객체를 복사하여 새로운 객체 생성
	const newObj = { ...obj }

	// 새로운 속성 추가
	newObj[key] = value

	return newObj
}

// 날짜 포멧(YYYY.MM.DD) or use separator
export function formatDateString(date, separator = '.') {
	const transformDate = new Date(date)
	const year = transformDate.getFullYear()
	const month = (transformDate.getMonth() + 1).toString().padStart(2, '0')
	const day = transformDate.getDate().toString().padStart(2, '0')

	const dateString = [year, month, day].join(separator)
	return dateString
}

// 'weight'가 null이나 undefined가 아니면, 숫자를 콤마가 있는 형식으로 포맷합니다.
export const formatWeight = (weight) => {
	return weight ? weight.toLocaleString() : 0
}

export function customNumberFormatter(params) {
	if (typeof params.value === 'number') {
		return new Intl.NumberFormat('ko-KR').format(params.value)
	} else {
		return params.value
	}
}

// 콤마 제거
export function numberDeleteComma(value) {
	if (typeof value === 'string' && value?.includes(',')) {
		return value.replaceAll(',', '')
	}
	return value
}

// 중량 계산
export function calculateWeight(thickness, width, length) {
	const volume = Number(thickness) * Number(width) * Number(length)
	const weight = volume * 7.85

	return Math.ceil(weight / 1000000)
}

// 딜레이
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
